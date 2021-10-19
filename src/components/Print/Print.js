import React from "react";
import {
    Grid,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,
} from "@material-ui/core";
import moment from "moment";
import { withSnackbar } from "notistack";
import QRCode from "qrcode.react";
import { connect } from "react-redux";
import { setToken } from "../../core/redux/Redux";

// Axios
import axios from "axios";

// Query
import {
    GET_ORDER_PRINT_SHEET,
    UPDATE_ORDER_QR,
    UPLOAD_IMAGE_ORDER_QR,
} from "../Queries/Queries";

// Icon
import PrintIcon from "@material-ui/icons/Print";

class Print extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            printSheet: null,
        };

        this._isMounted = false;
        this.onQrUpload = this.onQrUpload.bind(this);
    }

    /**
     * @summary Load order print sheet
     */
    async loadOrderPrint() {
        var bodyFormData = new FormData();
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("username", process.env.REACT_ANONYMOUS_USERNAME);
        bodyFormData.append("password", process.env.REACT_ANONYMOUS_PASSWORD);

        await new Promise((resolve) => {
            new axios({
                baseURL: process.env.REACT_APP_DOMAIN + "/oauth/token",
                headers: {
                    "Content-Type": "application/json",
                },
                auth: {
                    username: process.env.REACT_APP_OAUTH_ID,
                    password: process.env.REACT_APP_OAUTH_PASS,
                },
                data: bodyFormData,
                method: "POST",
            })
                .then((response) => {
                    if (
                        response.data &&
                        response.data.access_token &&
                        response.data.refresh_token
                    ) {
                        this.props.setToken({
                            accessToken: response.data.access_token,
                            refreshToken: response.data.refresh_token,
                        });
                        // this.props.setApolloClient(createApolloClient(response.data.access_token));
                        // let apolloClient = createApolloClient(response.data.access_token);
                        // Mutate
                        this.props.apolloClient.httpClient
                            .mutate({
                                mutation: GET_ORDER_PRINT_SHEET,
                                variables: {
                                    orderNumber: this.props.match.params
                                        .orderNumber,
                                },
                            })
                            .then((result) => {
                                this.setState({
                                    printSheet: result.data.orderPrintSheet,
                                });
                            })
                            .catch((error) => {
                                this.props.enqueueSnackbar(
                                    "Sorry, there is an error occurred while saving data.",
                                    { variant: "error" }
                                );
                            });
                    }
                    resolve(true);
                })
                .catch((error) => {
                    resolve(true);
                });
        });
    }

    async onQrUpload(event, orderNumber) {
        this.props.enqueueSnackbar(
            "The changing process is being started ...",
            {
                variant: "info",
            }
        );

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
                            if (
                                result1.data.updateQrVerification.statusCode ===
                                200
                            ) {
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
    componentDidMount() {
        this._isMounted = true;
        // Orders function
        this.loadOrderPrint();
    }

    /**
     * @override
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.printSheet === null) return null;

        let data = this.state.printSheet ? this.state.printSheet : null;

        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={4}>
                        <h5>Delivery :</h5>
                        <p>
                            {data.firstName} {data.lastName}
                        </p>
                        <p>
                            ({data.address.postalCode}) {data.address.state}{" "}
                            {data.address.address}
                        </p>
                        <p>{data.address.city}</p>
                        <p>{data.address.country}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <QRCode
                            value={
                                window.location.protocol +
                                "//" +
                                window.location.hostname +
                                "/print/" +
                                data.orderNumber
                            }
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Box displayPrint="none">
                            {/* <Button
                                variant="contained"
                                color="default"
                                size="small"
                                onClick={() => print()}
                                startIcon={<PrintIcon />}
                            >
                                Print
                            </Button> */}
                            <input
                                type="file"
                                onChange={(e) =>
                                    this.onQrUpload(e, data.orderNumber)
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
                                    background: "#fff",
                                    border: "none",
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
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        {data.qrImageUrl ? (
                            <>
                                <h5>QrImage</h5>
                                <img
                                    src={
                                        process.env.REACT_APP_CDN_URL +
                                        "order/" +
                                        data.qrImageUrl
                                    }
                                    width="100%"
                                    style={{ maxWidth: "300px" }}
                                />
                            </>
                        ) : null}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <h5>
                            Order Number (Order time) : {data.orderNumber} (
                            {moment(data.registerDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )}
                            )
                        </h5>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {/* Order */}
                    <Grid item md={4} xs={12}>
                        <h5 className="mt-20">Order</h5>
                        <Table size="small" className="customTableQrTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">
                                        {data.firstName} {data.lastName}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">
                                        {data.address.phoneCode}{" "}
                                        {data.address.phoneNumber}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">E-Mail</TableCell>
                                    <TableCell align="center">
                                        {data.email}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <Table
                            size="small"
                            className="customTableQrTable mt-20"
                        >
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        Delivery
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.shippingType}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                    {/* Deliver */}
                    <Grid item md={8} xs={12}>
                        <h5 className="mt-20">Deliver</h5>
                        <Table size="small" className="customTableQrTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">
                                        {data.firstName} {data.lastName}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">
                                        {data.address.phoneCode}{" "}
                                        {data.address.phoneNumber}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">
                                        Address
                                    </TableCell>
                                    <TableCell align="center">
                                        ({data.address.postalCode}){" "}
                                        {data.address.address} (
                                        {data.address.state})
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">City</TableCell>
                                    <TableCell align="center">
                                        {data.address.city}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">
                                        Country
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.address.country}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {(data.products || []).map((item) => (
                            <Table
                                size="small"
                                className="customTableQrTable mt-20"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            SKU
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.sku}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">
                                            Item Name
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.name}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Qty
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.count}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Unit Price
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.price}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Discount
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.discount}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Subtotal
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.price * item.count}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Invoice No
                                        </TableCell>
                                        <TableCell align="center">
                                            {data.invoiceNumber}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">
                                            Status
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.status}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ))}
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table
                            size="small"
                            className="customTableQrTable mt-20"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        Subtotal
                                    </TableCell>
                                    <TableCell align="center">
                                        Discount
                                    </TableCell>
                                    <TableCell align="center">
                                        Refund/Exchange
                                    </TableCell>
                                    <TableCell align="center">
                                        Delivery
                                    </TableCell>
                                    <TableCell align="center">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">
                                        {data.subTotal}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.totalDiscount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.refundAmount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.shippingPrice}
                                    </TableCell>
                                    <TableCell align="center" rowSpan={3}>
                                        {data.totalPrice}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell
                                        align="center"
                                        className="table-print-color"
                                    >
                                        Payment Method
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="table-print-color"
                                    >
                                        Payment Date
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="table-print-color"
                                    >
                                        Confirm Date
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        className="table-print-color"
                                    >
                                        Point
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">
                                        {data.paymentMethod}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.paymentDate
                                            ? moment(data.paymentDate).format(
                                                  "YYYY-MM-DD HH:mm:ss"
                                              )
                                            : "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.confirmDate
                                            ? moment(data.confirmDate).format(
                                                  "YYYY-MM-DD HH:mm:ss"
                                              )
                                            : "-"}
                                    </TableCell>
                                    <TableCell align="center">
                                        {data.totalPoint}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
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

export default withSnackbar(
    connect(mapStateToProps, {
        setToken,
    })(Print)
);
