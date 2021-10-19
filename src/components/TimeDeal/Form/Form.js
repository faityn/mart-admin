import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  TextField,
  Radio,
  CircularProgress,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import {
  GET_STICKERS,
  GET_TIMEDEAL,
  SAVE_TIMEDEAL,
} from "../../Queries/Queries";
import SaveIcon from "@material-ui/icons/Save";
import FindProduct from "./FindProduct";
import moment from "moment";

/**
 * @summary Time deal
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Time deal
 */
class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      stickers: false,
      isProcessing: false,
      errors: null,
      timeDeal: {
        products: []
      },
      isOpenModal: false,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.hasError = this.hasError.bind(this);
    this.onRemoveProduct = this.onRemoveProduct.bind(this);

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
        query: GET_TIMEDEAL,
      })
      .then((result) => {

        let timeDeal = result.data.getTimeDeal;
        timeDeal.products = timeDeal.products || [];

        this.setState({
          timeDeal: timeDeal,
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
  onOpenModal(e) {
    this.setState({
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
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(e, index) {
    let timeDeal = this.state.timeDeal;
    timeDeal.products.splice(index, 1);

    this.setState({ timeDeal: timeDeal });
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
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
      discount: {
        presence: {
          allowEmpty: false,
          message: "^Discount field is required.",
        },
      },
      startDate: {
        presence: {
          allowEmpty: false,
          message: "^Start date field is required.",
        },
      },
      productIds: {
        presence: {
          allowEmpty: false,
          message: "^Choose Products!",
        },
      },
      endDate: {
        presence: {
          allowEmpty: false,
          message: "^End date field is required.",
        },
      },
      stickerId: {
        presence: {
          allowEmpty: false,
          message: "^Sticker field is required.",
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
    let timeDeal = this.state.timeDeal;

    (productIds || []).map((id) => {
      if (!timeDeal.products.find((f) => f.id === id))
        timeDeal.products.push({
          productId: id,
          name: formData.get(id),
        });
    });

    this.setState({
      timeDeal: timeDeal,
      isOpenModal: false,
    });
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    let timeDealProducts = this.state.timeDeal.products
      ? this.state.timeDeal.products
      : [];

    let id = this.state.timeDeal.id ? this.state.timeDeal.id : null;

    // Form data to object
    let timeDeal = {
      id: id,
      discountType: formData.get("discountType"),
      discount:
        formData.get("discountType") === "Percent"
          ? formData.get("percent")
          : formData.get("price"),
      startDate: moment(formData.get("startDate")+":00.00", 'YYYY-MM-DDTHH:mm:ss.ss').format('YYYY-MM-DDTHH:mm:ss.ss[Z]'),
      endDate: moment(formData.get("endDate")+":00.00", 'YYYY-MM-DDTHH:mm:ss.ss').format('YYYY-MM-DDTHH:mm:ss.ss[Z]'),
      stickerId: formData.get("stickerId"),
      productIds: timeDealProducts.reduce((accumulator, product) => {
        accumulator.push(product.productId);
        return accumulator;
      }, []),
    };

    // Validate
    if (this.onValidateSubmit(timeDeal)) return;

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_TIMEDEAL,
        variables: {
          timeDeal: timeDeal,
        },
      })
      .then((result) => {
        if (result.data.saveTimeDeal.statusCode === 200) {
          const message = id
            ? "Time deal has been successfully updated."
            : "Time deal has been successfully created.";
          this.props.enqueueSnackbar(message, { variant: "success" });

          if (!id) {
            id = result.data.id;
          }
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

    this._isMounted &&
      this.setState({
        isProcessing: false,
        id: id,
      });
  }

  /**
   * @override
   */
  render() {
    let isShowForm = this.state.stickers || this.state.timeDeal;

    if (!isShowForm) return <LinearProgress />;

    let data = this.state.timeDeal ? this.state.timeDeal : null;

    return (
      <React.Fragment key={data.id}>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Time Deal"
              links={[{ name: "Time Deal list", href: "/product-timedeal" }]}
              title="Time Deal create"
              icon={<AlarmIcon />}
            />
          </Grid>
        </Grid>

        <div className="card mt-20">
          <form id="my-form-managemnt" onSubmit={this.onHandleSubmit}>
            {/* MD’s Pick container */}
            <Grid container>
              <Grid item md={5} xs={12}>
                {/* Discount */}
                <h5>Discount type</h5>
                <RadioGroup
                  aria-label="discountType"
                  name="discountType"
                  defaultValue={data.discountType}
                  row
                >
                  <FormControlLabel
                    value="Percent"
                    label="End"
                    control={<Radio />}
                    label={
                      <TextField
                        fullWidth
                        id="rate-basic"
                        label="Enter discount rate"
                        size="small"
                        variant="outlined"
                        name="percent"
                        defaultValue={
                          data.discountType === "Percent" ? data.discount : null
                        }
                      />
                    }
                  />
                  <FormControlLabel
                    value="Price"
                    label="End"
                    control={<Radio />}
                    label={
                      <TextField
                        fullWidth
                        id="amount-basic"
                        label="Enter discount amount"
                        size="small"
                        variant="outlined"
                        name="price"
                        defaultValue={
                          data.discountType === "Price" ? data.discount : null
                        }
                      />
                    }
                  />
                </RadioGroup>

                {/* Period */}
                <h5>Period</h5>
                <Grid container>
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    size="small"
                    variant="outlined"
                    name="startDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={moment(
                      data.startDate,
                      "YYYY-MM-DDTHH:mm:ss.ss[Z]"
                    ).format("YYYY-MM-DDTHH:mm:ss")}
                    error={this.hasError("startDate")}
                    helperText={
                      this.hasError("startDate")
                        ? this.state.errors["startDate"][0]
                        : null
                    }
                    style={{ width: "187px", marginLeft: "28px" }}
                  />
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    size="small"
                    variant="outlined"
                    name="endDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={moment(
                      data.endDate,
                      "YYYY-MM-DDTHH:mm:ss.ss[Z]"
                    ).format("YYYY-MM-DDTHH:mm:ss.ss")}
                    helperText={
                      this.hasError("endDate")
                        ? this.state.errors["endDate"][0]
                        : null
                    }
                    style={{ paddingLeft: "45px", width: "187px" }}
                  />
                </Grid>

                {/* Sticker */}
                <h5>Sticker</h5>
                <Grid container>
                  <FormControl
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={this.hasError("stickerId")}
                    style={{ marginLeft: "28px", width: "420px" }}
                  >
                    <InputLabel id="demo-simple-select-error-label">
                      Sticker selection
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      label="Sticker selection"
                      name="stickerId"
                      defaultValue={data.stickerId}
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
                    <FormHelperText>
                      {this.hasError("stickerId")
                        ? this.state.errors["stickerId"][0]
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item md={7} xs={12}>
                <h5>Products</h5>
                <Grid container>
                  <Grid item xs={12}>
                    <List>
                      {(this.state.timeDeal.products || []).map(
                        (product, index) => {
                          return (
                            <ListItem>
                              <ListItemText id={index} primary={product.name} />
                              <FormHelperText
                                error={this.hasError("productIds")}
                              >
                                {this.hasError("productIds")
                                  ? this.state.errors["productIds"][0]
                                  : null}
                              </FormHelperText>
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                  <DeleteIcon
                                    onClick={(e) =>
                                      this.onRemoveProduct(e, index)
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
                  <Grid item xs={12} className="text-right mt-20">
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={this.onOpenModal.bind(this)}
                      startIcon={<AddIcon />}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Divider className="mt-20" />

            <Grid container className="mt-20">
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
              </Grid>
            </Grid>
          </form>

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
              <Button
                autoFocus
                form="product-form"
                type="submit"
                color="primary"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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
