import React from "react";
import PageTitle from "../../core/common/Partials/PageTitle";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormHelperText,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import RedeemIcon from "@material-ui/icons/Redeem";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import FindProduct from "./FindProduct";
import { GET_STICKERS, GET_NPLUSONE, SAVE_NPLUSONE } from "../Queries/Queries";

class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      errors: null,
      isOpenModal: false,
      open: false,
      files: [],
      stickers: null,
      index: null,
      nPlus: [],
    };

    // Events
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onAddNPlusOne = this.onAddNPlusOne.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_STICKERS,
      })
      .then((result) => {
        this.setState({
          stickers: result.data.getStickers,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });

    await this.props.apolloClient.httpClient
      .query({
        query: GET_NPLUSONE,
      })
      .then((result) => {
        this.setState({
          nPlus: result.data.getNPlusOne,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, index) {
    this.setState({
      index: index,
      isOpenModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(e, index, productIndex) {
    let nPlus = this.state.nPlus;
    nPlus[index].products.splice(productIndex, 1);

    this.setState({ nPlus: nPlus });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let nPlus = this.state.nPlus;
    let index = this.state.index;

    (productIds || []).map((id) => {
      if (!nPlus[index].products.find((f) => f.id === id))
        nPlus[index].products.push({
          productId: id,
          name: formData.get(id),
        });
    });

    this.setState({
      nPlus: nPlus,
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
    let nplus = [];

    // datas
    let ids = formData.getAll("id");
    let counts = formData.getAll("count");
    let totals = formData.getAll("total");
    let stickerIds = formData.getAll("stickerId");

    for (let i = 0; i < counts.length; i++) {
      let productIds = this.state.nPlus[i].products
        ? this.state.nPlus[i].products
        : null;

      nplus.push({
        id: ids[i],
        count: counts[i],
        total: totals[i],
        stickerId: stickerIds[i],
        productIds: productIds.reduce((accumulator, product) => {
          accumulator.push(product.productId);
          return accumulator;
        }, []),
      });
    }

    // Validate
    // if (this.onValidateSubmit(nplus))
    //   return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_NPLUSONE,
        variables: {
          nplus: nplus,
        },
      })
      .then((result) => {
        if (result.data.saveNPlusOne.statusCode === 200) {
          this.props.enqueueSnackbar("N + 1 has been successfully updated.", {
            variant: "success",
          });
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
   * @summary Detail
   * @param {Event} childrenName
   */
  onAddNPlusOne() {
    this.setState((prevState) => ({
      nPlus: prevState.nPlus.concat([
        {
          id: "",
          count: "",
          total: "",
          stickerId: "",
          products: [],
        },
      ]),
    }));
  }

  render() {
    
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle menuName="N + 1" title="N + 1" icon={<RedeemIcon />} />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8}>
            <form
              id="my-form-managemnt"
              onSubmit={this.onHandleSubmit.bind(this)}
            >
              {this.state.nPlus.map((nPlus, index) => (
                <div className="card mt-20" key={index}>
                  <input type="hidden" name="id" value={nPlus.id} />
                  <Grid container spacing={5} className="align-items-center">
                    <Grid item md={3} xs={12}>
                      <h5>N + 1</h5>
                    </Grid>
                    <Grid item md={9} xs={12}>
                      {/* Title */}
                      <Grid
                        container
                        spacing={3}
                        className="align-items-center"
                      >
                        <Grid item md={6} xs={12}>
                          <TextField
                            fullWidth
                            id="nameEng-basic"
                            label="N+1 quantity"
                            size="small"
                            variant="outlined"
                            name={"count"}
                            defaultValue={nPlus.count}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            fullWidth
                            size="small"
                            variant="outlined"
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              Sticker
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              label="Sticker"
                              name={"stickerId"}
                              defaultValue={nPlus.stickerId}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              {(this.state.stickers || []).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Phrase */}
                        <Grid item md={12} xs={12}>
                          <TextField
                            fullWidth
                            id="nameEng-basic"
                            label="Enter the limited the quantity of products purchased"
                            size="small"
                            variant="outlined"
                            name={"total"}
                            defaultValue={nPlus.total}
                          />
                        </Grid>

                        <Grid item md={12} xs={12}>
                          <List>
                            {(nPlus.products || []).map(
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
                                            this.onRemoveProduct(
                                              e,
                                              index,
                                              productIndex
                                            )
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

                        {/* Image */}
                        <Grid item md={12} xs={12}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={(e) => this.onOpenModal(e, index)}
                          >
                            Add Product
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </form>

            <div className="card mt-20">
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Button
                    form="my-form-managemnt"
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
                  <Button
                    className="ml-20 bordered"
                    variant="contained"
                    size="small"
                    color="default"
                    onClick={this.onAddNPlusOne}
                    startIcon={<NoteAddIcon />}
                  >
                    New N+1
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
