import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PaginationMaterial from "@material-ui/lab/Pagination";

import {
  MenuItem,
  Grid,
  Button,
  TextField,
  Select,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
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
  FormHelperText,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import {
  GET_DISCOUNT,
  SAVE_DISCOUNT,
  GET_DISCOUNT_AND_STICKERS,
} from "../../Queries/Discount";
import moment from "moment";
import FindProduct from "./FindProduct";

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse: function (value, options) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format: function (value, options) {
    var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    return moment.utc(value).format(format);
  },
});

/**
 * @summary Discount
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Discount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      isOpenProductModal: false,
      stickers: null,
      discount: null,
      errors: null,
      pageNumber: 1,
    };

    // Event
    this.hasError = this.hasError.bind(this);
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this._isMounted = false;
  }

  /**
   * @summary Get discount
   */
  getDiscount() {
    this.props.apolloClient.httpClient
      .query({
        query: GET_DISCOUNT,
        variables: {
          page: {
            limit: 1,
            pageNumber: this.state.pageNumber,
            orderBy: "createdDate",
            type: "DESC",
          },
        },
      })
      .then((result) => {
        this._isMounted &&
          this.setState({
            discount: result.data.getDiscount,
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
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_DISCOUNT_AND_STICKERS,
        variables: {
          page: {
            limit: 1,
            pageNumber: 1,
            orderBy: "createdDate",
            type: "DESC",
          },
        },
      })
      .then((result) => {
        this._isMounted &&
          this.setState({
            discount: result.data.getDiscount,
            stickers: result.data.getStickers,
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
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNumber !== this.state.pageNumber) {
      this.getDiscount();
    }
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary New discount form
   * @param {MouseEvent} event
   */
  onNewDiscount(event) {
    event.preventDefault();

    this.setState({
      discount: {
        totalElements: this.state.discount.totalElements,
        list: [
          {
            id: "",
            products: [],
          },
        ],
      },
    });
  }

  /**
   * @summary Change page number
   * @param {int} pageNumber
   */
  handlePageNumber(event, pageNumber) {
    this.setState({
      pageNumber: pageNumber,
    });
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenProductsModal(e) {
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
   * @summary Product list form submit
   * @summary {MouseEvent} event
   */
  onSubmitProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll("productId");
    let discount = this.state.discount;

    (productIds || []).map((id) => {
      if (!discount.list[0].products.find((f) => f.id === id))
        discount.list[0].products.push({
          productId: id,
          name: formData.get(id),
        });
    });

    this.setState({
      discount: discount,
      isOpenProductModal: false,
    });
  }

  /**
   * @summary Remove product
   * @param {MouseEvent} event
   */
  onRemoveProduct(event, index) {
    let discount = this.state.discount;
    discount.list[0].products.splice(index, 1);

    this.setState({ discount: discount });
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate discount
   * @param {Object} discount
   * @param {Object} formData
   */
  onValidateSubmit(discount, formData) {
    const schema = {
      discountType: {
        presence: {
          allowEmpty: false,
          message: "^Discount type field is required.",
        },
      },
      percent: function (
        value,
        attributes,
        attributeName,
        options,
        constraints
      ) {
        if (formData.get("discountType") === "Percent") {
          let constraint = {
            presence: {
              allowEmpty: false,
              message: "^The percentage field is required.",
            },
            numericality: {
              onlyInteger: true,
              greaterThan: 0,
              lessThan: 100,
              message: "^The percentage must be between 0 to 100.",
            },
          };

          return constraint;
        }

        return null;
      },
      price: function (value, attributes, attributeName, options, constraints) {
        if (formData.get("discountType") === "Price") {
          return {
            presence: {
              allowEmpty: false,
              message: "^Amount field is required.",
            },
            length: {
              maximum: 9,
              message: "^Maximum length should be 9.",
            },
            format: {
              pattern: "^[0-9]*$",
              message: "^Should be numbers only.",
            },
          };
        }

        return null;
      },
      total: {
        presence: {
          allowEmpty: false,
          message: "^This field is required.",
        },
        length: {
          maximum: 9,
          message: "^Maximum length should be 9.",
        },
        format: {
          pattern: "^[0-9]*$",
          message: "^Should be numbers only.",
        },
      },
      startDate: {
        datetime: {
          dateOnly: true,
          message: "^Start date field is required.",
        },
      },
      endDate: {
        datetime: {
          dateOnly: true,
          message: "^End date field is required.",
        },
      },
    };

    // Validate
    const errors = validate(discount, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();
    // Form data
    const formData = new FormData(event.target);

    let discountProducts = (this.state.discount.list[0] || {}).products || [];

    // Form data to object
    let discount = {
      id: formData.get("id"),
      discountType: formData.get("discountType"),
      discount:
        formData.get("discountType") === "Percent"
          ? formData.get("percent")
          : formData.get("price"),
      startDate: moment(formData.get("startDate")).format("YYYY-MM-DD"),
      endDate: moment(formData.get("endDate")).format("YYYY-MM-DD"),
      stickerId: formData.get("stickerId"),
      total: formData.get("total"),
      productIds: discountProducts.reduce((accumulator, product) => {
        accumulator.push(product.productId);
        return accumulator;
      }, []),
    };

    // Validate
    if (
      this.onValidateSubmit(
        {
          ...discount,
          ...{
            percent: formData.get("percent"),
            price: formData.get("price"),
          },
        },
        formData
      )
    )
      return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_DISCOUNT,
        variables: {
          discount: discount,
        },
      })
      .then((result) => {
        if (result.data.saveDiscount.statusCode === 200) {
          this.props.enqueueSnackbar("Discount has been successfully saved.", {
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

    if (!formData.get("id")) {
      this.setState({
        isProcessing: false,
        pageNumber: 1,
      });
    } else {
      this.setState({ isProcessing: false });
    }
  }

  /**
   * @override
   */
  render() {
    if (!this.state.discount) return null;

    let data = this.state.discount ? this.state.discount.list[0] || {} : null;

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Discount setting"
              title="Discount setting"
              icon={<ReceiptIcon />}
            />
          </Grid>
        </Grid>

        <div className="card mt-20">
          <form
            id="my-form-managemnt"
            onSubmit={this.onHandleSubmit.bind(this)}
          >
            <input type="hidden" name="id" value={data.id} />
            {/* Discount */}
            <Grid container spacing={2} key={data.id}>
              <Grid item md={5} xs={12}>
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
                        label="Percent"
                        size="small"
                        variant="outlined"
                        name="percent"
                        defaultValue={
                          data.discountType === "Percent" ? data.discount : null
                        }
                        error={this.hasError("percent")}
                        helperText={
                          this.hasError("percent")
                            ? this.state.errors["percent"][0]
                            : null
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
                        label="Amount"
                        size="small"
                        variant="outlined"
                        name="price"
                        defaultValue={
                          data.discountType === "Price" ? data.discount : null
                        }
                        error={this.hasError("price")}
                        helperText={
                          this.hasError("price")
                            ? this.state.errors["price"][0]
                            : null
                        }
                      />
                    }
                  />
                </RadioGroup>
                {this.hasError("discountType") ? (
                  <FormHelperText>
                    {this.state.errors["discountType"][0]}
                  </FormHelperText>
                ) : null}

                <h5>Period</h5>
                <TextField
                  id="startDate-basic"
                  type="date"
                  size="small"
                  variant="outlined"
                  name="startDate"
                  style={{ marginLeft: "28px", width: "187px" }}
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
                  InputProps={{
                    readOnly: data.id !== "",
                  }}
                />
                <TextField
                  id="startDate-basic"
                  type="date"
                  size="small"
                  variant="outlined"
                  name="endDate"
                  style={{ marginLeft: "43px", width: "187px" }}
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
                  InputProps={{
                    readOnly: data.id !== "",
                  }}
                />

                <h5>Sticker</h5>
                <FormControl fullWidth size="small" variant="outlined">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="stickerId"
                    style={{ marginLeft: "28px", width: "417px" }}
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
                </FormControl>

                <h5>Limited quantity for product purchase</h5>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"
                  name="total"
                  style={{ marginLeft: "28px", width: "417px" }}
                  defaultValue={data.total}
                  error={this.hasError("total")}
                  helperText={
                    this.hasError("total")
                      ? this.state.errors["total"][0]
                      : null
                  }
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <h5>Products</h5>
                <List>
                  {(data.products || []).map((product, productIndex) => {
                    return (
                      <ListItem>
                        <ListItemText
                          id={productIndex}
                          primary={product.name}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) =>
                                this.onRemoveProduct(e, productIndex)
                              }
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>

                <Grid item md={12} xs={12} className="mt-20">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={this.onOpenProductsModal.bind(this)}
                    startIcon={<AddIcon />}
                  >
                    Add product
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>

          {/* Button section */}
          <Divider className="mt-20" />

          <Grid container wrap="wrap" className="mt-20">
            <Grid item md={4}>
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
                Save
              </Button>

              <Button
                className="ml-20"
                variant="outlined"
                size="small"
                color="default"
                type="button"
                disabled={this.state.isProcessing}
                startIcon={<NoteAddIcon fontSize="small" className="mr-10" />}
                onClick={this.onNewDiscount.bind(this)}
              >
                New Discount
              </Button>
            </Grid>
          </Grid>
        </div>

        {/* Pagination  */}

        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(this.state.discount.totalElements)}
              page={this.state.pageNumber}
              onChange={this.handlePageNumber}
              color="primary"
            />
          </Grid>
        </Grid>

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

export default withSnackbar(connect(mapStateToProps, null)(Discount));
