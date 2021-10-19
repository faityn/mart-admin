import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import {
    CardActions,
    CardContent,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    IconButton,
    Grid,
    Select,
    MenuItem,
    Button,
    TextField,
} from "@material-ui/core";
import moment from "moment";
import fileDownload from "js-file-download";
import OrderProducts from "../OrderProducts";
import StatusModal from "../StatusModal";
import InvoiceModal from "../InvoiceModal";
import PrintModal from "../PrintModal";

import StatusModalByOne from "../StatusModal";
import InvoiceModalByOne from "../InvoiceModal";
import PrintModalByOne from "../PrintModal";

// Icon
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ReceiptIcon from "@material-ui/icons/Receipt";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import PrintIcon from "@material-ui/icons/Print";

// Axios
import axios from "axios";

/**
 * @summary Order list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order
 */
class OrderTable extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            checkedOrder: [],
            checkedOrders: [],
            statusModal: false,
            printModal: false,
            invoiceModal: false,
            statusModalByOne: false,
            invoiceModalByOne: false,
            printModalByOne: false,
            productModal: false,
        };

        this.handleChangeLoad = this.handleChangeLoad.bind(this);
        this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    }

    // Change load
    handleChangeLoad() {
        this.setState({
            checkedOrders: [],
        });

        this.props.handleChangeLoad();
    }

    /**
     * @summary Toggle order selection
     * @param {MouseEvent} event
     * @param {Object} order
     */
    onSelect(event, order) {
        event.stopPropagation();

        let checkedOrders = this.state.checkedOrders;
        const index = checkedOrders.findIndex(
            (f) => f.orderNumber === order.orderNumber
        );

        if (index === -1) {
            checkedOrders.push(order);
        } else {
            checkedOrders.splice(index, 1);
        }

        this.setState({
            checkedOrders: checkedOrders,
        });
    }

    /**
     * @summary Toggle selections
     */
    onSelectAll(event, orders) {
        event.stopPropagation();

        let checkedOrders = this.state.checkedOrders;

        if (checkedOrders.length > 0) {
            checkedOrders = [];
        } else {
            (orders || []).map((item) => {
                checkedOrders.push(item);
            });
        }

        this.setState({
            checkedOrders: checkedOrders,
        });
    }

    /**
     * @summary handleOpenStatusModal
     * @param {MouseEvent} event
     */
    handleOpenStatusModal() {
        this.setState({
            statusModal: true,
        });
    }

    /**
     * @summary handleCloseStatusModal
     * @param {MouseEvent} event
     */
    handleCloseStatusModal() {
        this.setState({
            statusModal: false,
        });
    }

    /**
     * @summary handleOpenPrintModal
     * @param {MouseEvent} event
     */
    handleOpenPrintModal() {
        this.setState({
            printModal: true,
        });
    }

    /**
     * @summary handleClosePrintModal
     * @param {MouseEvent} event
     */
    handleClosePrintModal() {
        this.setState({
            printModal: false,
        });
    }

    /**
     * @summary handleOpenInvoiceModal
     * @param {MouseEvent} event
     */
    handleOpenInvoiceModal() {
        this.setState({
            invoiceModal: true,
        });
    }

    /**
     * @summary handleCloseInvoiceModal
     * @param {MouseEvent} event
     */
    handleCloseInvoiceModal() {
        this.setState({
            invoiceModal: false,
        });
    }

    /**
     * @summary Handle open status modal
     */
    handleOpenStatusModalByOne(e, order) {
        this.setState({
            checkedOrder: order,
            statusModalByOne: true,
        });
    }

    /**
     * @summary Handle close status modal
     */
    handleCloseStatusModalByOne() {
        this.setState({
            statusModalByOne: false,
        });
    }

    /**
     * @summary Handle open invoice modal
     */
    handleOpenInvoiceModalByOne(e, order) {
        this.setState({
            checkedOrder: order,
            invoiceModalByOne: true,
        });
    }

    /**
     * @summary Handle close invoice modal
     */
    handleCloseInvoiceModalByOne() {
        this.setState({
            invoiceModalByOne: false,
        });
    }

    /**
     * @summary Handle open print modal
     */
    handleOpenPrintModalByOne(e, order) {
        this.setState({
            checkedOrder: order,
            printModalByOne: true,
        });
    }

    /**
     * @summary Handle close print modal
     */
    handleClosePrintModalByOne() {
        this.setState({
            printModalByOne: false,
        });
    }

    /**
     * @summary Handle open print modal
     */
    handleOpenProductModal(e, order) {
        this.setState({
            checkedOrder: order,
            productModal: true,
        });
    }

    /**
     * @summary Handle close product modal
     */
    handleCloseProductModal() {
        this.setState({
            productModal: false,
        });
    }

    /**
     * @summary Downlaod Orders
     */
    async onDownloadExcelOrders() {
        const url = process.env.REACT_APP_DOMAIN + "/download/orders";

        let orderNumbers = this.state.checkedOrders.reduce(
            (accumulator, value) => accumulator.concat([value.orderNumber]),
            []
        );

        if (orderNumbers.length === 0) {
            var formData = new FormData();
            formData.append("ids", "");
            formData.append("type", this.props.status);

            await axios({
                headers: {
                    authorization: this.token ? `Bearer ${this.token}` : "",
                },
                method: "POST",
                url: url,
                responseType: "arraybuffer",
            }).then((response) => {
                fileDownload(response.data, "Orders.xlsx");
            });
        } else if (orderNumbers.length > 0) {
            var formData = new FormData();
            formData.append("ids", orderNumbers);
            formData.append("type", this.props.status);

            await axios({
                headers: {
                    authorization: this.token ? `Bearer ${this.token}` : "",
                },
                method: "POST",
                url: url,
                data: formData,
                responseType: "arraybuffer",
            }).then((response) => {
                fileDownload(response.data, "Orders.xlsx");
            });
        }
    }

    /**
     * @override
     */
    render() {
        if (!this.props.data || this.props.data.totalElements === 0)
            return (
                <Grid container spacing={2} className="text-center mt-20">
                    <Grid item md={12} xs={12}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<FlipCameraAndroidIcon />}
                            onClick={this.props.onChangeRefresh}
                        >
                            Refresh
                        </Button>
                        <div>There is no result</div>
                    </Grid>
                </Grid>
            );

        let orderNumbers = this.state.checkedOrders.reduce(
            (accumulator, value) => accumulator.concat([value.orderNumber]),
            []
        );

        return (
            <React.Fragment>
                {/* Action */}
                <Grid container className="align-items-center text-center">
                    <Grid item md={1} xs={2}>
                        <h5>Action</h5>
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<ImportExportIcon />}
                            onClick={this.onDownloadExcelOrders.bind(this)}
                        >
                            Excel
                        </Button>
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<FlipCameraAndroidIcon />}
                            // disabled={this.state.checkedOrders !== null ? true : false}
                            onClick={this.handleOpenStatusModal.bind(this)}
                        >
                            Status
                        </Button>
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<PrintIcon />}
                            // disabled={this.state.checkedOrders !== null ? true : false}
                            onClick={this.handleOpenPrintModal.bind(this)}
                        >
                            Print
                        </Button>
                    </Grid>
                    <Grid item md={4} xs={3}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<ReceiptIcon />}
                            // disabled={this.state.checkedOrders !== null ? true : false}
                            onClick={this.handleOpenInvoiceModal.bind(this)}
                        >
                           Enter the invoice
                        </Button>
                    </Grid>
                </Grid>
                {/* End Action */}

                {/* Order Number */}
                <Grid container spacing={2} className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            id="name-basic"
                            label="Search by order number..."
                            onChange={(e) =>
                                this.props.handleChange(e, "orderNumber")
                            }
                        />
                    </Grid>
                </Grid>
                {/* End Order Number */}

                {/* Rows per page */}
                <CardActions>
                    <Grid container>
                        <Grid item xs={12} className="text-right">
                            <span className="sort-by-product">Sort by: </span>
                            <FormControl size="small" variant="outlined">
                                <Select
                                    labelId="sort-simple-select-label"
                                    id="sort-simple-select"
                                    onChange={this.props.handleOrderByProduct}
                                    value={this.props.orderBy}
                                >
                                    <MenuItem value="orderNumber">
                                        Order
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <span className="rows-per-page">
                                Rows per page:{" "}
                            </span>
                            <FormControl size="small" variant="outlined">
                                <Select
                                    labelId="rows-simple-select-label"
                                    id="rows-simple-select"
                                    onChange={this.props.handleRowsPerPage}
                                    value={this.props.pagination.rowsPerPage}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardActions>

                {/* List */}
                <CardContent>
                    <PerfectScrollbar>
                        <div>
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                value="true"
                                                checked={
                                                    this.state.checkedOrders
                                                        .length ===
                                                    this.props.data.list.length
                                                }
                                                onChange={(e) =>
                                                    this.onSelectAll(
                                                        e,
                                                        this.props.data.list
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>Order date</TableCell>
                                        <TableCell>Order Number</TableCell>
                                        <TableCell>
                                            Amount of payment / Method
                                        </TableCell>
                                        <TableCell>
                                            Product information
                                        </TableCell>
                                        <TableCell>Shipping service</TableCell>
                                        <TableCell>Recipient</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell className="w5">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(this.props.data.list || []).map(
                                        (item) => (
                                            <TableRow key={item.orderNumber}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        value="true"
                                                        checked={
                                                            this.state.checkedOrders.findIndex(
                                                                (f) =>
                                                                    f.orderNumber ===
                                                                    item.orderNumber
                                                            ) !== -1
                                                        }
                                                        onChange={(e) =>
                                                            this.onSelect(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        item.registerDate
                                                    ).format(
                                                        "YYYY-MM-DD HH:mm:ss"
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {item.orderNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <p>$ {item.totalPrice}</p> (
                                                    {item.paymentMethod})
                                                </TableCell>
                                                {item.product.id !== null ||
                                                item.product.name !== null ? (
                                                    <TableCell>
                                                        <p>
                                                            {item.product.name}
                                                        </p>
                                                        <p>
                                                            SKU :{" "}
                                                            {item.product.sku}
                                                        </p>
                                                        <p>
                                                            Qty :{" "}
                                                            {item.product.count}
                                                        </p>
                                                        <p>
                                                            Subtotal : ${" "}
                                                            {item.product.price}
                                                        </p>
                                                        {item.hasManyProducts ? (
                                                            <p
                                                                className="view-more"
                                                                onClick={(e) =>
                                                                    this.handleOpenProductModal(
                                                                        e,
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                View more
                                                            </p>
                                                        ) : null}
                                                    </TableCell>
                                                ) : (
                                                    "None"
                                                )}

                                                <TableCell>
                                                    <p className="text-bold">
                                                        {item.shippingType}
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>
                                                        {item.postalCode
                                                            ? "(" +
                                                              item.postalCode +
                                                              ")"
                                                            : null}
                                                    </p>
                                                    <p>{item.address}</p>
                                                    <p>
                                                        ({item.city},{" "}
                                                        {item.country},{" "}
                                                        {item.state})
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    {item.status}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Order invoice"
                                                        alt="Order invoice"
                                                        onClick={(e) =>
                                                            this.handleOpenInvoiceModalByOne(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <ReceiptIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Change order status"
                                                        alt="Change order status"
                                                        onClick={(e) =>
                                                            this.handleOpenStatusModalByOne(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <FlipCameraAndroidIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="primary"
                                                        aria-label="Print form"
                                                        alt="Print form"
                                                        onClick={(e) =>
                                                            this.handleOpenPrintModalByOne(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <PrintIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>

                {/* Pagination  */}
                <Grid container className="mt-20">
                    <Grid item xs={12}>
                        <PaginationMaterial
                            count={Math.ceil(
                                this.props.data.totalElements /
                                    this.props.pagination.rowsPerPage
                            )}
                            page={this.props.pagination.pageNumber}
                            onChange={this.props.handlePageNumber}
                            onClick={this.props.handlePaging}
                            color="primary"
                        />
                    </Grid>
                </Grid>

                <StatusModal
                    open={this.state.statusModal}
                    handleCloseStatusModal={this.handleCloseStatusModal.bind(
                        this
                    )}
                    orderNumbers={orderNumbers}
                    handleChangeLoad={this.handleChangeLoad}
                />
                <StatusModalByOne
                    open={this.state.statusModalByOne}
                    handleCloseStatusModal={this.handleCloseStatusModalByOne.bind(
                        this
                    )}
                    orderNumbers={[this.state.checkedOrder.orderNumber]}
                    handleChangeLoad={this.handleChangeLoad}
                />
                <InvoiceModal
                    open={this.state.invoiceModal}
                    handleCloseInvoiceModal={this.handleCloseInvoiceModal.bind(
                        this
                    )}
                    orderNumbers={orderNumbers}
                    checkedOrders={this.state.checkedOrders}
                    handleChangeLoad={this.handleChangeLoad}
                />
                <InvoiceModalByOne
                    open={this.state.invoiceModalByOne}
                    handleCloseInvoiceModal={this.handleCloseInvoiceModalByOne.bind(
                        this
                    )}
                    orderNumbers={[this.state.checkedOrder.orderNumber]}
                    checkedOrders={[this.state.checkedOrder]}
                    handleChangeLoad={this.handleChangeLoad}
                />
                <PrintModal
                    open={this.state.printModal}
                    handleClosePrintModal={this.handleClosePrintModal.bind(
                        this
                    )}
                    orderNumbers={orderNumbers}
                />
                <PrintModalByOne
                    open={this.state.printModalByOne}
                    handleClosePrintModal={this.handleClosePrintModalByOne.bind(
                        this
                    )}
                    orderNumbers={[this.state.checkedOrder.orderNumber]}
                />
                <OrderProducts
                    open={this.state.productModal}
                    handleCloseProductModal={this.handleCloseProductModal.bind(
                        this
                    )}
                    orderNumber={[this.state.checkedOrder.orderNumber]}
                />
            </React.Fragment>
        );
    }
}

export default OrderTable;
