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
import StatusModal from "../StatusModal";

import StatusModalByOne from "../StatusModal";

// Icon
import ImportExportIcon from "@material-ui/icons/ImportExport";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";

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
            statusModalByOne: false,
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
     * @summary Handle open status modal
     */
    handleOpenStatusModalByOne(e, order) {
        this.setState({
            checkedOrder: order,
            statusModalByOne: true,
        });
    }

    /**
     * @summary Handle close product modal
     */
    handleCloseStatusModalByOne() {
        this.setState({
            statusModalByOne: false,
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
                            color="primary"
                            onClick={this.props.handlePaging}
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
            </React.Fragment>
        );
    }
}

export default OrderTable;
