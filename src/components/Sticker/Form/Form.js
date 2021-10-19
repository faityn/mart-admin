import React from "react";
import {
  Grid,
  RadioGroup,
  TextField,
  Radio,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { SketchPicker } from "react-color";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import { STICKER, SAVE_STICKER, SAVE_PRODUCT_STICKER } from "../Queries";
import LinearProgress from "@material-ui/core/LinearProgress";
import FindProduct from "./FindProduct";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import moment from "moment";
import validate from "validate.js";

/**
 * @summary Sticker Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Sticker/Form
 */
class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isOpenProductModal: false,
      sticker: {},
      products: null,
      color: "#3abe30",
      search: {
        code: "",
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedProducts: [],
      errors: null,
    };

    // Bind this
    this.onOpenProductsModal = this.onOpenProductsModal.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.setState({
        isFetching: true,
      });
      this.props.apolloClient.httpClient
        .query({
          query: STICKER,
          variables: { id: this.props.id },
        })
        .then((result) => {
          this.setState({
            sticker: result.data.sticker,
            color: result.data.sticker.color,
            isFetching: false,
          });
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }
  }

  /**
   * @summary Open box
   * @param {event}
   */
  async onOpenProductsModal(e) {
    this.setState({
      isOpenProductModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseProductsModal() {
    this.setState({ isOpenProductModal: false });
  }

  /**
   * @summary Add input
   * @param {MouseEvent} event
   */
  onColorChange = (color) => {
    this.setState({ color: color.hex });
  };

  /**
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(e, index) {
    let sticker = this.state.sticker;
    sticker.products.splice(index, 1);

    this.setState({ sticker: sticker });
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate product
   * @param {Object} product
   */
  onValidateSubmit(product) {
    const schema = {
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name field is required.",
        },
        length: {
          maximum: 25,
          message: "^Maximum length should be 25.",
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
      priority: {
        presence: {
          allowEmpty: false,
          message: "^Priority field is required.",
        },
      },
    };

    // Validate
    const errors = validate(product, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Product list form submit
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let sticker = this.state.sticker;

    (productIds || []).map((id) => {
      if (!sticker.products.find((f) => f.id === id))
        sticker.products.push({
          id: id,
          name: formData.get(id),
        });
    });

    this.setState({
      sticker: sticker,
      isOpenProductModal: false,
    });
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Extract form data
    const formData = new FormData(event.target);

    // Form data to object
    let sticker = {
      id: formData.get("id") ? formData.get("id") : "",
      name: formData.get("name"),
      imageUrl: formData.get("image") ? formData.get("image") : "no-image",
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      position: formData.get("position"),
      color: this.state.color ? this.state.color : "#3abe30",
      active: formData.get("active") === "true",
      priority: formData.get("priority"),
    };

    let stickerProducts = this.state.sticker.products
      ? this.state.sticker.products
      : [];

    // Form data to object
    let productSticker = {
      stickerId: formData.get("id"),
      productIds: stickerProducts.reduce((accumulator, product) => {
        accumulator.push({ id: product.id });
        return accumulator;
      }, []),
    };

    // Validate
    if (this.onValidateSubmit(sticker)) return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Form data id
    let id = formData.get("id");

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_STICKER,
        variables: {
          sticker: sticker,
        },
      })
      .then(async (result) => {
        const message = id
          ? "Sticker has been successfully updated."
          : "Sticker has been successfully created.";
        this.props.enqueueSnackbar(message, { variant: "success" });

        if (!id) {
          id = result.data.id;
        }

        if (id) {
          await this.props.apolloClient.httpClient.mutate({
            mutation: SAVE_PRODUCT_STICKER,
            variables: {
              productSticker: productSticker,
            },
          });
        }

        this.props.handleClose();
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
    // Data
    let data = this.state.sticker ? this.state.sticker : {};

    return (
      <React.Fragment>
        {/* Dialog form */}
        <Dialog
          open={this.props.open}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Sticker Popup</h2>
          </DialogTitle>

          <Divider />

          {/* Content */}
          <DialogContent>
            {this.state.isFetching && this.props.id ? (
              <div className="customPopup">
                <LinearProgress />
              </div>
            ) : (
              <form
                id="my-form-sticker"
                onSubmit={this.onSubmit.bind(this)}
                key={data.id}
              >
                {/* List */}
                <div className="customPopup">
                  {this.props.id ? (
                    <input type="hidden" name="id" value={this.props.id} />
                  ) : null}
                  <input type="hidden" name="image" value={data.imageUrl} />

                  {/* Container */}
                  <Grid container spacing={3} className="align-items-center">
                    {/* Title */}
                    <Grid item md={2} xs={12}>
                      <h5>Sticker name </h5>
                    </Grid>

                    {/* Sticker item */}
                    <Grid item md={10} xs={12} className="text-right">
                      {/* Name */}
                      <TextField
                        fullWidth
                        id="name-basic"
                        label="Name"
                        size="small"
                        variant="outlined"
                        name="name"
                        defaultValue={data.name}
                        error={this.hasError("name")}
                        helperText={
                          this.hasError("name")
                            ? this.state.errors["name"][0]
                            : null
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Container */}
                  <Grid container spacing={3} className="align-items-center">
                    {/* Position */}
                    <Grid item md={2} xs={12}>
                      <h5>Exposure position</h5>
                    </Grid>

                    {/* Exposure item */}
                    <Grid item md={10} xs={12}>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue={data.position ? data.position : "left"}
                      >
                        <FormControlLabel
                          value="left"
                          control={<Radio />}
                          label="Top left of thumbnail"
                        />
                        <FormControlLabel
                          value="right"
                          control={<Radio />}
                          label="Top right of thumbnail"
                        />
                        <FormControlLabel
                          value="top"
                          control={<Radio />}
                          label="Product name top"
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>

                  {/* Dates */}
                  <Grid container spacing={3} className="align-items-center">
                    {/* Title */}
                    <Grid item md={2} xs={12}>
                      <h5>Date</h5>
                    </Grid>

                    {/* Start date */}
                    <Grid item md={5} xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        type="date"
                        name="startDate"
                        defaultValue={moment(
                          data.startDate,
                          "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("YYYY-MM-DD")}
                        error={this.hasError("startDate")}
                        helperText={
                          this.hasError("startDate")
                            ? this.state.errors["startDate"][0]
                            : null
                        }
                      />
                    </Grid>

                    {/* End date */}
                    <Grid item md={5} xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        type="date"
                        name="endDate"
                        defaultValue={moment(
                          data.endDate,
                          "YYYY-MM-DDTHH:mm:ssZ"
                        ).format("YYYY-MM-DD")}
                        error={this.hasError("endDate")}
                        helperText={
                          this.hasError("endDate")
                            ? this.state.errors["endDate"][0]
                            : null
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Container */}
                  <Grid container spacing={1}>
                    {/* Color */}
                    <Grid item md={2} xs={12}>
                      <h5>Background color</h5>
                    </Grid>

                    <Grid item md={5} xs={12}>
                      {/* Color */}
                      <SketchPicker
                        color={this.state.color}
                        onChangeComplete={this.onColorChange.bind(this)}
                      />
                    </Grid>

                    <Grid item md={5} xs={12}>
                      {/* Use */}
                      <h5 style={{ marginBottom: "0" }}>
                        Whether or not to use
                      </h5>

                      {/* Used or not */}
                      <RadioGroup
                        row
                        aria-label="active"
                        name="active"
                        defaultValue={data.active === true ? "true" : "false"}
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Use"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not use"
                        />
                      </RadioGroup>

                      {/* Priority */}
                      <h5 style={{ marginBottom: "5px" }}>Priority</h5>

                      {/* Pagination */}
                      <TextField
                        fullWidth
                        id="name-basic"
                        size="small"
                        variant="outlined"
                        name="priority"
                        defaultValue={data.priority ? data.priority : 0}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 100 } }}
                        error={this.hasError("priority")}
                        helperText={
                          this.hasError("priority")
                            ? this.state.errors["priority"][0]
                            : null
                        }
                      />
                    </Grid>
                  </Grid>

                  {/* Products */}
                  {this.state.sticker.products ? (
                    <Grid container spacing={3} className="align-items-center">
                      {/* Title */}
                      <Grid item md={2} xs={12}>
                        <h5>Selected products</h5>
                      </Grid>

                      {/* Sticker item */}
                      <Grid item md={10} xs={12}>
                        {/* Product code */}
                        <List>
                          {(this.state.sticker.products || []).map(
                            (product, productIndex) => {
                              return (
                                <ListItem>
                                  <ListItemText
                                    id={productIndex}
                                    primary={product.name}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton
                                      edge="end"
                                      aria-label="comments"
                                    >
                                      <DeleteIcon
                                        onClick={(e) =>
                                          this.onRemoveProduct(e, productIndex)
                                        }
                                      />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              );
                            }
                          )}
                        </List>
                      </Grid>
                    </Grid>
                  ) : null}

                  {/* if statement Id */}
                  {this.props.id ? (
                    <Grid container className="mt-20">
                      <Grid item md={2} xs={12}></Grid>
                      <Grid item md={10} xs={12}>
                        <Button
                          size="small"
                          variant="contained"
                          color="secondary"
                          onClick={this.onOpenProductsModal.bind(this)}
                          startIcon={<AddIcon />}
                        >
                          Add product
                        </Button>
                      </Grid>
                    </Grid>
                  ) : null}
                </div>
              </form>
            )}
          </DialogContent>

          <Divider />
          <DialogActions>
            <Button
              autoFocus
              onClick={this.props.handleClose.bind(this)}
              color="primary"
            >
              Cancel
            </Button>

            <Button
              form="my-form-sticker"
              type="submit"
              color="primary"
              startIcon={<SaveIcon />}
              className="MuiButton-containedSecondary"
              style={{ fontWeight: "400" }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Find product Popup */}
        <Dialog
          open={this.state.isOpenProductModal}
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
              onClick={this.onCloseProductsModal.bind(this)}
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
