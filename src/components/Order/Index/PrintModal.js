import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from "@material-ui/core";
import moment from "moment";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import QRCode from "qrcode.react";

// Query
import {
  GET_ORDER_PRINT_SHEET,
  UPLOAD_IMAGE_ORDER_QR,
  UPDATE_ORDER_QR,
} from "../../Queries/Queries";

// Icon
import PrintIcon from "@material-ui/icons/Print";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setOrdersPrint } from "../../../core/redux/Actions";

class StatusModal extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      printSheets: [],
      qrUpload: false,
    };

    this._isMounted = false;
  }

  /**
   * @summary Load order print sheet
   */
  async loadOrderPrint() {
    let promises = await (this.props.orderNumbers || []).reduce(
      (accumulator, orderNumber) =>
        accumulator.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.httpClient
                .query({
                  query: GET_ORDER_PRINT_SHEET,
                  variables: {
                    orderNumber: orderNumber,
                  },
                })
                .then((result) => {
                  resolve([...prevResolve, ...[result.data.orderPrintSheet]]);
                })
                .catch((error) => {
                  this._isMounted &&
                    this.props.enqueueSnackbar(
                      "Sorry, there is an error occurred while fetching data.",
                      { variant: "error" }
                    );
                  resolve(prevResolve);
                });
            })
        ),
      Promise.resolve([])
    );

    this._isMounted &&
      this.setState({
        printSheets: promises,
      });
    this.props.setOrdersPrint(promises);
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.orderNumbers.length > 0 &&
      this.props.open === true &&
      this.props.open !== prevProps.open
    ) {
      this.loadOrderPrint();
    }

    if (this.state.qrUpload === true) {
      this.loadOrderPrint();

      this.setState({
        qrUpload: false,
      });
    }
  }

  /**
   * @override
   */
  componentDidMount() {
    this._isMounted = true;
    // Orders function
    // this.loadOrderPrint();
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  async onQrUpload(event, orderNumber) {
    this.props.enqueueSnackbar("The changing process is being started ...", {
      variant: "info",
    });

    let file = event.target.files[0];

    this.props.apolloClient.uploadClient
      .mutate({
        mutation: UPLOAD_IMAGE_ORDER_QR,
        variables: { file },
      })
      .then((result) => {
        if (result.data.qrVerificationImage.statusCode === 200) {
          this.props.apolloClient.uploadClient
            .mutate({
              mutation: UPDATE_ORDER_QR,
              variables: {
                orderNumber: orderNumber,
                imageUrl: result.data.qrVerificationImage.data,
              },
            })
            .then((result1) => {
              if (result1.data.updateQrVerification.statusCode === 200) {
                this.props.enqueueSnackbar(
                  "The uploading process has been completed successfully.",
                  { variant: "success" }
                );

                this.setState({
                  qrUpload: true,
                });
              }
            });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while uploading QR.",
          { variant: "error" }
        );
      });
  }

  /**
   * @override
   */
  render() {
    if (!this.state.printSheets || this.state.printSheets.length === 0)
      return null;

    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClosePrintModal}
        aria-labelledby="form-dialog-title"
        maxWidth="lg"
      >
        <DialogContent>
          {this.state.printSheets.map((printSheet) => {
            return (
              <div className="page">
                <div className="customPopup subpage">
                  <div className="Deviver">
                    <div className="head">
                      <div className="userInformation">
                        <p>Ship to :</p>
                        <h3 className="username">
                          {printSheet.firstName}
                          {printSheet.lastName}
                        </h3>
                        <h3 className="address">
                          {printSheet.address.address}
                        </h3>
                        <h3 className="city">{printSheet.address.city}</h3>
                        <h3 className="state">
                          {printSheet.address.state}
                          &nbsp;
                          {printSheet.address.postalCode}
                        </h3>
                        <h3 className="country">
                          {printSheet.address.country}
                        </h3>
                      </div>
                      <div className="btnWrap">
                        <Grid item xs={3}>
                          {printSheet.qrImageUrl ? (
                            <img
                              src={
                                process.env.REACT_APP_CDN_URL +
                                "order/" +
                                printSheet.qrImageUrl
                              }
                              width="120px"
                            />
                          ) : null}
                        </Grid>
                        <Grid item xs={2}>
                          <Box displayPrint="none">
                            <Link
                              to="/orders/detail"
                              style={{ display: "black" }}
                            >
                              <Button
                                fullWidth
                                variant="outlined"
                                color="default"
                                size="small"
                                // onClick={() => window.print()}
                                startIcon={<PrintIcon />}
                              >
                                Print
                              </Button>
                            </Link>

                            <input
                              type="file"
                              onChange={(e) =>
                                this.onQrUpload(e, printSheet.orderNumber)
                              }
                              accept="image/*"
                              id="icon-button-file"
                              className="displayNone"
                            />
                            <label
                              htmlFor="icon-button-file"
                              style={{
                                width: "128px",
                                display: "block",
                                marginBottom: "20px",
                              }}
                            >
                              <Button
                                fullWidth
                                variant="outlined"
                                color="default"
                                aria-label="upload qr"
                                component="span"
                                size="small"
                              >
                                Upload image
                              </Button>
                            </label>
                          </Box>
                        </Grid>
                        <Grid item xs={3} className="qrcode">
                          <QRCode
                            value={
                              window.location.protocol +
                              "//" +
                              window.location.hostname +
                              "/print/" +
                              printSheet.orderNumber
                            }
                          />
                        </Grid>
                      </div>
                    </div>
                    <hr />
                    <div className="orderInformation">
                      <h5>Order number : {printSheet.orderNumber}</h5>
                      <p>Thank you for purchasing the product from SAZAXA.</p>
                      <div className="orderDetail">
                        <div className="shoppingAddress">
                          <strong>Shipping address</strong>
                          <p>
                            {printSheet.firstName} {printSheet.middleName}{" "}
                            {printSheet.lastName} <br />
                            {printSheet.address.address}
                            <br />
                            {printSheet.address.city}
                            <br />
                            {printSheet.address.state}&nbsp;
                            {printSheet.address.postalCode}
                            <br />
                            {printSheet.address.country}
                          </p>
                        </div>
                        <div className="shippingInfo">
                          <p className="orderDate">
                            <strong>Order date</strong>
                            <br />
                            {moment(printSheet.registerDate).format(
                              "MMM Do YY"
                            )}
                          </p>
                          <p className="shippingService">
                            <strong>Shipping service</strong>
                            <br />
                            {printSheet.shippingType}
                          </p>
                          <p className="sellerName">
                            <strong>Seller name</strong>
                            <br /> Aniborsso
                          </p>
                        </div>
                        <div className="paymentInfo">
                          <p className="payment">
                            <strong>Payment</strong>
                            <br />
                            {printSheet.paymentMethod}
                          </p>
                        </div>
                      </div>
                      <div className="productsInfo">
                        <table>
                          <thead>
                            <tr>
                              <th>Product information</th>
                              <th>Count</th>
                              <th>Unit price</th>
                              <th>Total order</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(printSheet.products || []).map((product) => (
                              <tr>
                                <td>
                                  <strong>Name</strong>
                                  <br /> {product.name} <br /> <br />
                                  <strong>SKU</strong>
                                  <br />
                                  {product.sku}
                                </td>
                                <td>{product.count}</td>
                                <td>
                                  <p>${product.price}</p>{" "}
                                  <p
                                    style={{ fontSize: "14px", color: "#ccc" }}
                                  >
                                    ${product.tax}
                                  </p>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                  <strong className="totalOrder">
                                    Item subtotal :
                                  </strong>
                                  <span>${product.price * product.count}</span>
                                  <br />
                                  <strong className="totalOrder">
                                    Tax subtotal :
                                  </strong>
                                  <span>${product.tax * product.count}</span>
                                  <br />
                                  <hr style={{ margin: 0 }} />
                                  <strong className="totalOrder">
                                    Total sum :
                                  </strong>
                                  <span>
                                    $
                                    {product.price * product.count +
                                      product.tax * product.count}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="total">
                        <p>
                          <strong>Total item :</strong>
                          <span> &nbsp;${printSheet.subTotal}</span>
                        </p>
                        <p>
                          <strong>Total tax :</strong>
                          <span> &nbsp;${printSheet.totalTax}</span>
                        </p>
                        <p>
                          <strong>Shipping price :</strong>
                          <span> &nbsp;${printSheet.shippingPrice}</span>
                        </p>
                        <hr style={{ margin: 0 }} />
                        <p>
                          <strong>Total amount :</strong>
                          <span> &nbsp;${printSheet.totalPrice}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <hr style={{ border: "2px solid #000" }} /> */}
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    printSheets: state.printSheets,
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(
  connect(mapStateToProps, {
    setOrdersPrint,
  })(StatusModal)
);
