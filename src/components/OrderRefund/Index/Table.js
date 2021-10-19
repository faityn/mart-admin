import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import moment from "moment";
import validate from "validate.js";
import {
  GET_ORDER_REFUNDS,
  SET_ORDER_REFUND_STATUS,
  SET_ORDER_REFUND_AMOUNT,
} from "./Queries";
import { withSnackbar } from "notistack";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";

/**
 * @summary Order refund list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package OrderRefund
 */
class OrderRefund extends React.Component {
  
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      items: {
        list: []
      },
      checkedItems: [],
      isProcessing: false,
      isOpenModal: false,
      errors: null
    };

    // Bind event
    this.onProcessStart = this.onProcessStart.bind(this);
    this.confirmReturn = this.confirmReturn.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.hasError = this.hasError.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this._isMounted = false;
  }

  /**
   * @summary Load order refund list
   */
  async loadItems() {
    let promise = await new Promise(resolve => this.props.apolloClient.httpClient
      .query({
        query: GET_ORDER_REFUNDS,
        variables: {
          search: this.props.searchVariables,
          page: {
            limit: this.props.pagination.rowsPerPage,
            pageNumber: this.props.pagination.pageNumber,
            orderBy: this.props.orderBy,
            type: this.props.type,
          },
        },
      })
      .then((result) => {
        if (result && result.data) {
          resolve({
            success: true,
            ordersRefund: result.data.getOrdersRefund
          });
        }
        else {
          resolve({
            success: false
          });
        }
      })
      .catch((error) => {
        resolve({
          success: false
        });
      })
    );

    return promise;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    if (this.props.data && this.props.data.getOrdersRefund) {
      this.setState({
        items: this.props.data.getOrdersRefund
      });
    }
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevProps && prevProps.data && prevProps.data !== this.props.data) {
      this.setState({
        items: this.props.data.getOrdersRefund
      });
    }
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary Process start
   */
  onProcessStart() {
    this._isMounted && this.setState({
      isProcessing: true,
    });
  }

  /**
   * @summary Toggle order selection
   * @param {MouseEvent} event
   * @param {String} orderNumber
   */
  onSelect(event, order) {
    event.stopPropagation();

    let checkedItems = this.state.checkedItems;
    const index = checkedItems.findIndex(f => f.orderNumber === order.orderNumber);

    if (index === -1) {
      checkedItems.push(order);
    } else {
      checkedItems.splice(index, 1);
    }

    this.setState({
      checkedItems: checkedItems,
    });
  }

  /**
   * @summary Toggle selections
   */
  onSelectAll(event, orders) {
    event.stopPropagation();

    let checkedItems = this.state.checkedItems;

    if (checkedItems.length > 0) {
      checkedItems = [];
    } else {
      (orders || []).map((item) => {
        if (item.status !== 'O') {
          checkedItems.push(item);
        }
      });
    }

    this.setState({
      checkedItems: checkedItems,
    });
  }

  /**
   * @summary confirmReturn
   * @param {Boolean} confirmReturn
   */
  async confirmReturn() {
    // Process start
    this.onProcessStart();

    this.props.enqueueSnackbar("The confirm process is being started ...", {
      variant: "info"
    });

    // Mutate
    let promise = await new Promise(resolve => this.props.apolloClient.httpClient
      .mutate({
        mutation: SET_ORDER_REFUND_STATUS,
        variables: {
          orderNumbers: this.state.checkedItems.reduce((accumulator, item) => {
            accumulator.push(item.orderNumber);
            return accumulator;
          }, [])
        },
      })
      .then(async (result) => {
        if (result && result.data && result.data.orderRefundStatus.statusCode === 200) {
          const data = await this.loadItems();
          resolve(data);
        }
        else {
          resolve({
            success: false
          });
        }
      })
      .catch((error) => {
        resolve({
          success: false
        });
      })
    );

    if (this._isMounted) {
      let checkedItems = [];
      let items = this.state.items;
      
      if (promise.success === true) {
        this.props.enqueueSnackbar(
          "Selected refunds succesfully confirmed.", 
          { variant: "success" }
        );

        items = promise.ordersRefund;
      } else {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while confirming refunds.",
          { variant: "error" }
        );

        checkedItems = this.state.checkedItems;
      }

      this.setState({
        checkedItems: checkedItems,
        isProcessing: false,
        items: items
      })
    }
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, index) {
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
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate data
   * @param {Array} data
   */
  onValidateSubmit(amounts, orderAmounts) {
    let schema = {};

    Object.keys(amounts).map((key) => {
      schema[key] = {
        presence: {
          allowEmpty: false,
          message: "^This field is required.",
        },
        format: {
          pattern: "^[0-9]+\.[0-9]{1,2}$",
          message: '^Should be money only. Format: 0.00' 
        },
        numericality: {
          greaterThan: 0,
          lessThanOrEqualTo: parseFloat(orderAmounts[key]),
          message: '^Should be less than or equal to the order amount.' 
        }
      }
    });

    // Validate
    const errors = validate(amounts, schema);

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
    let data = [];
    const amounts = formData.getAll("amount");
    const orderAmounts = formData.getAll("orderAmount");
    let amountsForValidation = {};
    let orderAmountsForValidation = {};

    // Form data to object
    formData.getAll("orderNumber").map((orderNumber, index) => {
      data.push({
        orderNumber: orderNumber,
        amount: amounts[index]
      });

      amountsForValidation["amount"+index] = amounts[index];
      orderAmountsForValidation["amount"+index] = orderAmounts[index];
    });

    // Validate
    if (this.onValidateSubmit(amountsForValidation, orderAmountsForValidation)) 
      return;

    // Process start
    this.onProcessStart();

    // Mutate
    let promise = await new Promise(resolve => this.props.apolloClient.httpClient
      .mutate({
        mutation: SET_ORDER_REFUND_AMOUNT,
        variables: {
          refundAmounts: data         
        },
      })
      .then(async(result) => {
        if (result && result.data && result.data.orderRefundAmount.statusCode === 200) {
          let data = await this.loadItems();
          resolve(data);          
        }
        else {
          resolve({
            success: false
          });
        }
      })
      .catch((error) => {
        resolve({
          success: false
        });
      })
    );

    if (this._isMounted) {
      let checkedItems = [];
      let items = this.state.items;
      
      if (promise.success === true) {
        this.props.enqueueSnackbar(
          "Refund amount succesfully saved.", 
          { variant: "success" }
        );

        items = promise.ordersRefund;
      } else {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving refunds amount.",
          { variant: "error" }
        );

        checkedItems = this.state.checkedItems;
      }

      this.setState({
        checkedItems: checkedItems,
        isProcessing: false,
        items: items,
        isOpenModal: false
      })
    }
  }

  /**
   * @override
   */
  render() {
    
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <Grid container>
                <Grid item xs={12} className="text-right">
                  <Button
                    variant="outlined"
                    color="default"
                    size="small"
                    onClick={this.confirmReturn}
                    disabled={this.state.checkedItems.findIndex(f => f.status === 'X') === -1}
                  >
                   Confirmation the return of goods
                  </Button>
                  <Button
                    variant="outlined"
                    color="default"
                    size="small"
                    onClick={(e) => this.onOpenModal(e)}
                    disabled={this.state.checkedItems.findIndex(f => f.type === 'ADMIN') === -1}
                    style={{marginLeft: '10px'}}
                  >
                    Set return amount
                  </Button>
                </Grid>
              </Grid>
              <div className="mt-20">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={
                            this.state.checkedItems.length === ((this.state.items.list || []).length - (this.state.items.list.filter(f => f.status === 'O') || []).length) &&
                            this.state.checkedItems.length > 0
                          }
                          onChange={(e) =>
                            this.onSelectAll(
                              e,
                              this.state.items.list
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>Order date</TableCell>
                      <TableCell>Cancellation date</TableCell>
                      <TableCell>Recipient</TableCell>
                      <TableCell>Order Number</TableCell>
                      <TableCell>Refund number</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Order amount</TableCell>
                      <TableCell>Cancellation amount</TableCell>
                      <TableCell>Application type</TableCell>
                      <TableCell>Confirmation returns</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.state.items.list || []).map((item, index) => (
                      <TableRow key={item.orderNumber}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="true"
                            checked={
                              this.state.checkedItems.findIndex(f => f.orderNumber === item.orderNumber) !== -1
                            }
                            onChange={(e) => this.onSelect(e, item)}
                            disabled={item.status === 'O'}
                          />
                        </TableCell>
                        <TableCell>
                          {moment(item.orderDate).format("YYYY-MM-DD HH:mm:ss")}
                        </TableCell>
                        <TableCell>
                          {moment(item.cancelDate).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )}
                        </TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.orderNumber}</TableCell>
                        <TableCell>{item.refundNumber}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.orderAmount ? item.orderAmount.toFixed(2) : null}</TableCell>
                        <TableCell>{item.cancellationAmount ? item.cancellationAmount.toFixed(2) : null}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getOrdersRefund.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
              boundaryCount={100}
            />
          </Grid>
        </Grid>

        {/* Refund Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Refund</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form id="return-form" noValidate onSubmit={this.onHandleSubmit}>
              {
                (this.state.checkedItems.filter(f => f.type === 'ADMIN').map((item, index) => {
                  return <Grid container 
                    spacing={4} 
                    className="align-items-center"
                    key={index}
                  >
                    <Grid item md={6}>
                      {item.orderNumber}
                      <input type="hidden" name="orderNumber" value={item.orderNumber} />
                      <input type="hidden" name="orderAmount" value={item.orderAmount} />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        name="amount"
                        defaultValue={item.orderAmount.toFixed(2)}
                        placeholder={item.orderAmount.toFixed(2)}
                        multiline
                        rows={1}
                        variant="outlined"
                        error={this.hasError('amount'+index)}
                        helperText={
                          this.hasError('amount'+index)? this.state.errors['amount'+index][0] : null
                        }
                      />
                    </Grid>
                  </Grid>
                }))
              }
            </form>
          </DialogContent>

          <Divider />
          {/* Actions */}
          <DialogActions>
            <Button onClick={this.onCloseModal.bind(this)} color="primary">
              Cancel
            </Button>
            <Button form="return-form" type="submit" color="primary">
              Save
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

export default withSnackbar(connect(mapStateToProps, null)(OrderRefund));
