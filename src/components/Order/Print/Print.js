import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
import { withRouter } from "react-router";

const Print = ({ history }) => {
  const { printSheets } = useSelector((state) => state);
  console.log(printSheets);
  if (printSheets.length === 0) {
    history.push("/orders");
  }
  return (
    <>
      {printSheets.map((printSheet, index) => {
        return (
          <div className="page" key={index}>
            <div className="customPopup subpage" key={index}>
              <div className="Deviver">
                <div className="head">
                  <div className="userInformation">
                    <p>Ship to :</p>
                    <h3 className="username">
                      {printSheet.firstName}
                      {printSheet.lastName}
                    </h3>
                    <h3 className="address">{printSheet.address.address}</h3>
                    <h3 className="city">{printSheet.address.city}</h3>
                    <h3 className="state">
                      {printSheet.address.state}
                      &nbsp;
                      {printSheet.address.postalCode}
                    </h3>
                    <h3 className="country">{printSheet.address.country}</h3>
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
                        <Button
                          fullWidth
                          variant="outlined"
                          color="default"
                          size="small"
                          onClick={() => window.print()}
                          startIcon={<PrintIcon />}
                        >
                          Print
                        </Button>

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
                        {moment(printSheet.registerDate).format("MMM Do YY")}
                      </p>
                      <p className="shippingService">
                        <strong>Shipping service</strong>
                        <br />
                        {printSheet.shippingType}
                      </p>
                      <p className="sellerName">
                        <strong>Seller name</strong>
                        <br /> Khandid
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
                              <p style={{ fontSize: "14px", color: "#ccc" }}>
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
    </>
  );
};

export default withRouter(Print);
