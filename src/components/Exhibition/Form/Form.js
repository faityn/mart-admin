import React from "react";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import CKEditor from "ckeditor4-react";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
  Card,
  CardHeader,
  FormHelperText,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import FindProduct from "./FindProduct";
import {
  GET_EXHIBITION,
  SAVE_EXHIBITION,
  UPLOAD_IMAGE_EXHIBITION,
} from "../../Queries/Queries";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import moment from "moment";

class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      id: this.props.match.params.id ? this.props.match.params.id : "",
      description: "",
      photo: "",
      exhibition: {
        products: [],
      },
      isProcessing: false,
      isOpenModal: false,
      errors: null,
    };

    // Events
    this.onOpenModal = this.onOpenModal.bind(this);
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    if (this.state.id !== "") {
      await this.props.apolloClient.httpClient
        .query({
          query: GET_EXHIBITION,
          variables: {
            id: this.state.id,
          },
        })
        .then((result) => {
          this.setState({
            exhibition: result.data.exhibition,
          });
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching products.",
            { variant: "error" }
          );
        });
    }
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate exhibition
   * @param {Object} exhibition
   */
  onValidateSubmit(exhibition) {
    const schema = {
      title: {
        presence: {
          allowEmpty: false,
          message: "^Title field is required.",
        },
      },
      startDate: {
        presence: {
          allowEmpty: false,
          message: "^Start date field is required.",
        },
      },
      endDate: {
        presence: {
          allowEmpty: false,
          message: "^End date field is required.",
        },
      },
      description: {
        presence: {
          allowEmpty: false,
          message: "^Description field is required.",
        },
      },
    };

    // Validate
    const errors = validate(exhibition, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Add image
   * @param {String} url
   */
  onAddImageToState(url) {
    this.setState({
      exhibition: Object.assign(this.state.exhibition, { imageUrl: url }),
    });
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      exhibition: Object.assign(this.state.exhibition, {
        description: editor.getData(),
      }),
    });
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e) {
    this.setState({
      isOpenModal: true,
    });
  }

  /**
   * @summary Delete Image
   * @param {String} url
   */
  onClickDelete(event) {
    event.stopPropagation();

    this.setState({
      exhibition: Object.assign(this.state.exhibition, { imageUrl: "" }),
    });
  }

  /**
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(e, index) {
    let exhibition = this.state.exhibition;
    exhibition.products.splice(index, 1);

    this.setState({ exhibition: exhibition });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @summary Upload images
   * @param {!Array<Object>} images
   */
  async onDrop(images) {
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let promises = await images.reduce(
      (accumulatorPromise, image) =>
        accumulatorPromise.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_IMAGE_EXHIBITION,
                  variables: { image },
                })
                .then((result) => {
                  if (result.data.uploadImageExhibition.statusCode === 200) {
                    this.onAddImageToState(
                      result.data.uploadImageExhibition.data
                    );

                    resolve([...prevResolve, ...[true]]);
                  } else {
                    this.props.enqueueSnackbar(
                      "Sorry, there is an error occurred while uploading image.",
                      { variant: "error" }
                    );
                    resolve([...prevResolve, ...[false]]);
                  }
                })
                .catch((error) => {
                  this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while uploading image.",
                    { variant: "error" }
                  );
                  resolve([...prevResolve, ...[false]]);
                });
            })
        ),
      Promise.resolve([])
    );

    let message = !promises.find((f) => f === false)
      ? "The uploading process has been completed successfully."
      : "The uploading process has been completed with errors.";
    let variant = !promises.find((f) => f === false) ? "success" : "warning";

    this.props.enqueueSnackbar(message, { variant: variant });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let exhibition = this.state.exhibition;

    (productIds || []).map((id) => {
      if (!exhibition.products.find((f) => f.id === id))
        exhibition.products.push({
          id: id,
          name: formData.get(id),
        });
    });

    this.setState({
      exhibition: exhibition,
      isOpenModal: false,
    });
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // N plus
    let exhibitionProducts = this.state.exhibition
      ? this.state.exhibition.products
      : [];

    // Form data to object
    let exhibition = {
      id: this.state.id,
      title: formData.get("title"),
      imageUrl: this.state.exhibition ? this.state.exhibition.imageUrl : "",
      description: formData.get("description"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      productIds: exhibitionProducts.reduce((accumulator, product) => {
        accumulator.push(product.id);
        return accumulator;
      }, []),
    };

    // Validate
    if (this.onValidateSubmit(exhibition)) return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_EXHIBITION,
        variables: {
          exhibition: exhibition,
        },
      })
      .then((result) => {
        if (result.data.saveExhibition.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Event pick one has been successfully updated.",
            { variant: "success" }
          );
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this.setState({ isProcessing: false });
  }

  /**
   * @override
   */
  render() {
    let data = this.state.exhibition ? this.state.exhibition : { products: [] };

    return (
      <React.Fragment key={data.id}>
        <Grid container>
          {/* Title section */}
          <Grid item>
            <PageTitle
              menuName="Exhibitions"
              title="Exhibition create"
              icon={<PhotoAlbumIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8}>
            <div className="card mt-20">
              <form
                id="my-form-exhibition"
                onSubmit={this.onHandleSubmit.bind(this)}
              >
                <Grid container>
                  <Grid item md={6} style={{ paddingRight: "30px" }}>
                    {/* Title */}
                    <h5>Title</h5>
                    <Grid container className="align-items-center">
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Title"
                          size="small"
                          variant="outlined"
                          name="title"
                          defaultValue={data.title}
                          error={this.hasError("title")}
                          helperText={
                            this.hasError("title")
                              ? this.state.errors["title"][0]
                              : null
                          }
                        />
                      </Grid>
                    </Grid>

                    {/* Thumbnail */}
                    <h5>Thumbnail</h5>
                    <Grid container className="align-items-center">
                      <Grid item xs={12}>
                        {data.imageUrl ? (
                          <Card>
                            <CardHeader
                              action={
                                <IconButton
                                  color="primary"
                                  onClick={this.onClickDelete.bind(this)}
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              }
                              title={
                                <img
                                  src={
                                    process.env.REACT_APP_CDN_URL +
                                    "exhibition/" +
                                    data.imageUrl
                                  }
                                  width="100%"
                                />
                              }
                            />
                          </Card>
                        ) : (
                          <DropzoneArea
                            maxFileSize={30000000}
                            acceptedFiles={["image/jpeg", "image/png"]}
                            filesLimit={1}
                            onDrop={this.onDrop.bind(this)}
                          />
                        )}
                      </Grid>
                    </Grid>

                    {/* Container */}
                  </Grid>
                  <Grid item md={6}>
                    {/* Period */}
                    <h5 style={{ marginBottom: "9px" }}>Period</h5>
                    <Grid container className="align-items-center">
                      {/* Start date */}
                      <Grid item md={5} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          type="date"
                          name="startDate"
                          error={this.hasError("startDate")}
                          helperText={
                            this.hasError("startDate")
                              ? this.state.errors["startDate"][0]
                              : null
                          }
                          defaultValue={moment(
                            data.startDate,
                            "YYYY-MM-DDTHH:mm:ssZ"
                          ).format("YYYY-MM-DD")}
                        />
                      </Grid>

                      {/* Start date */}
                      <Grid item md={2} xs={12} className="text-center">
                        <h5>TO</h5>
                      </Grid>

                      {/* End date */}
                      <Grid item md={5} xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          type="date"
                          name="endDate"
                          error={this.hasError("endDate")}
                          helperText={
                            this.hasError("endDate")
                              ? this.state.errors["endDate"][0]
                              : null
                          }
                          defaultValue={moment(
                            data.endDate,
                            "YYYY-MM-DDTHH:mm:ssZ"
                          ).format("YYYY-MM-DD")}
                        />
                      </Grid>
                    </Grid>

                    <Grid container className="align-items-center">
                      {/* Product */}
                      <Grid item xs={12}>
                        <h5 style={{ marginTop: "9px", marginBottom: "9px" }}>
                          Product List
                        </h5>
                        
                        <Button onClick={(e) => this.onOpenModal(e)}variant="contained" size="small" color="primary">
                          Add products
                        </Button>
                        <List>
                          {this.state.exhibition.products.map((pick, pickIndex) => {
                            return (
                              <ListItem>
                                <ListItemText
                                  id={pickIndex}
                                  primary={
                                    data.products[pickIndex]
                                      ? data.products[pickIndex].name
                                      : "SELECT PRODUCT"
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton edge="end" aria-label="comments">
                                    <DeleteIcon
                                      onClick={(e) =>
                                        this.onRemoveProduct(e, pickIndex)
                                      }
                                    />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    {/* Container */}
                    <Grid container className="align-items-center mt-20">
                      {/* Start date */}
                      <Grid item xs={12}>
                        <h5>Description</h5>
                        <FormControl fullWidth>
                          <CKEditor
                            type="classic"
                            name="description"
                            data={data.description}
                            onChange={({ event, editor }) =>
                              this.onChangeDescription(event, editor)
                            }
                          />
                          <textarea
                            name="description"
                            value={data.description}
                            style={{ display: "none" }}
                          />
                        </FormControl>
                        <FormHelperText error>
                          {this.hasError("description")
                            ? this.state.errors["description"][0]
                            : null}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>

              <Divider className="mt-20" />

              <Grid container className="align-items-center mt-20">
                <Grid item className="text-right">
                  <Button
                    form="my-form-exhibition"
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={this.state.isProcessing}
                    startIcon={
                      this.state.isProcessing ? (
                        <CircularProgress color="white" size="1rem" />
                      ) : (
                        <SaveIcon fontSize="small" className="mr-10" />
                      )
                    }
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        {/* Find product Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Find product</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form
              id="product-form"
              onSubmit={this.onSubmitProductForm.bind(this)}
            >
              <FindProduct />
            </form>
          </DialogContent>

          <Divider />
          {/* Actions */}
          <DialogActions>
            <Button
              autoFocus
              onClick={this.onCloseModal.bind(this)}
              color="primary"
            >
              Cancel
            </Button>
            <Button autoFocus form="product-form" type="submit" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(Form));
