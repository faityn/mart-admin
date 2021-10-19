import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Dialog,
    IconButton,
    DialogContent,
    DialogActions,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    FormControl,
    TextField,
    Grid,
    Select,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormHelperText,
    OutlinedInput,
    InputAdornment,
} from "@material-ui/core";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import moment from "moment";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import validate from "validate.js";
import fileDownload from "js-file-download";
import axios from "axios";
import {
    SELLER_ORDER_NOTES,
    UPDATE_PAYMENT,
    UPDATE_WAREHOUSE,
    UPDATE_COUNT,
    UPDATE_HISTORY,
} from "../Queries";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
import CreateIcon from "@material-ui/icons/Create";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProductItem from "./ProductItem";

/**
 * @summary Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class ProductTable extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            checkedItems: [],
            isOpenRequestModal: false,
            isOpenWarehouseModal: false,
            isOpenCountModal: false,
            isOpenCalculationModal: false,
            errors: null,
            warehouseList: [],
            numberList: [],
            isOpenProduct: false,
            chosenProductIndex: "",
            chosenProduct: "",
            isOpenProductAllModal: false,
            isOpenLeftOver: false,
            warehouseValue: [],
            calProduct: [],
            calData: [],
        };

        // Events
        this.onOpenRequestModal = this.onOpenRequestModal.bind(this);

        this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    }

    componentDidMount() {
        // console.log("componentDidMount: ", this.props.calData);
        // console.log(this.props.data.getSellerProductHistory.list);
        // let paid_num = [];
        // this.props.data.getSellerProductHistory.list.map((e, n) => {
        //     paid_num[e.paidNumber].push(e);
        // });
        // console.debug(paid_num);
        // this.setState({ calData: this.props.calData });
    }

    /**
     * @override
     */
    // componentDidUpdate(prevProps) {
    //   if (this.props.pagination.pageNumber != prevProps.pagination.pageNumber) {
    //     this.setState({
    //       productSoldList: this.props.data.getSellerProductHistory.list
    //     });
    //   }
    // }

    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate: ", this.state.calData);
        // let paid_num = [];
        // if (prevProps.getSellerProductHistory.list.length !== 0) {
        //     this.props.data.getSellerProductHistory.list.map((e, n) => {
        //         paid_num[e.paidNumber].push(e);
        //     });
        // }
        // console.debug(paid_num);
        // console.debug(this.props.data.getSellerProductHistory.list);
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    /**
     * @summary Open request modal
     * @param {event}
     */
    onOpenRequestModal(e) {
        if (this.state.checkedItems.length !== 0) {
            this.setState({ isOpenRequestModal: true });
        } else {
            this.props.enqueueSnackbar("Please select one product", {
                variant: "warning",
            });
        }
    }

    /**
     * @summary Close request modal
     * @param {event}
     */
    onCloseRequestModal() {
        this.setState({ isOpenRequestModal: false });
    }

    /**
     * @summary Open warehouse modal
     * @param {event}
     */
    onOpenWarehouseModal(e) {
        this.setState({ isOpenWarehouseModal: true });
    }

    /**
     * @summary Close warehouse modal
     * @param {event}
     */
    onCloseWarehouseModal() {
        this.setState({ isOpenWarehouseModal: false, warehouseList: [] });
    }

    /**
     * @summary Open Count modal
     * @param {event}
     */
    onOpenCountModal(e) {
        this.setState({ isOpenCountModal: true });
    }

    /**
     * @summary Close Count modal
     * @param {event}
     */
    onCloseCountModal() {
        this.setState({ isOpenCountModal: false, numberList: [] });
    }

    /**
     * @summary Open product modal
     * @param {event}
     */
    onOpenProductModal(e, index, type) {
        this.setState({
            isOpenProductModal: true,
            chosenProductIndex: index,
            chosenProduct: type,
        });
    }

    /**
     * @summary Close Product modal
     * @param {event}
     */
    onCloseProductModal() {
        this.setState({
            isOpenProductModal: false,
            chosenProduct: "",
        });
    }

    /**
     * @summary Open product modal
     * @param {event}
     */
    onOpenProductModal(e, index, type) {
        this.setState({
            isOpenProductModal: true,
            chosenProductIndex: index,
            chosenProduct: type,
        });
    }

    /**
     * @summary Close Product modal
     * @param {event}
     */
    onCloseProductModal() {
        this.setState({
            isOpenProductModal: false,
            chosenProductIndex: null,
            chosenProduct: "",
        });
    }

    /**
     * @summary Open product modal
     * @param {event}
     */
    onOpenProductAllModal(e, type) {
        this.setState({
            isOpenProductAllModal: true,
            chosenProduct: type,
        });
    }

    /**
     * @summary Close Product modal
     * @param {event}
     */
    onCloseProductAllModal() {
        this.setState({
            isOpenProductAllModal: false,
            chosenProduct: "",
        });
    }

    /**
     * @summary Open Count modal
     * @param {event}
     */
    onOpenCalculationModal(e) {
        if (this.state.checkedItems.length !== 0) {
            this.setState({ isOpenCalculationModal: true });
        } else {
            this.props.enqueueSnackbar("Please select one product", {
                variant: "warning",
            });
        }
    }

    /**
     * @summary Close Calculation modal
     * @param {event}
     */
    onCloseCalculationModal() {
        this.setState({ isOpenCalculationModal: false, checkedItems: [] });
    }

    /**
     * @summary Toggle exhibition selection
     * @param {MouseEvent} event
     * @param {String} item
     */
    onSelect(event, item) {
        event.stopPropagation();

        let checkedItems = this.state.checkedItems;
        const index = checkedItems.indexOf(item);

        if (index === -1) {
            checkedItems.push(item);
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
    onSelectAll(event, items) {
        event.stopPropagation();

        let checkedItems = this.state.checkedItems;

        if (checkedItems.length > 0) {
            checkedItems = [];
        } else {
            (items || []).map((item) => {
                checkedItems.push(item);
            });
        }

        this.setState({
            checkedItems: checkedItems,
        });
    }

    /**
     * @summary Validate data
     * @param {Array} products
     */
    onValidateSubmit(validationData) {
        let schema = {};

        Object.keys(validationData).map((key) => {
            if (key.substring(0, 12) == "shipmentDate") {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^날짜를 선택해주세요.",
                    },
                };
            } else if (key.substring(0, 5) == "price") {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^금액을 입력해주세요.",
                    },
                    numericality: {
                        greaterThan: -1,
                        message: "^0 이상 입력해주세요.",
                    },
                };
            } else {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^필수 항목입니다.",
                    },
                    format: {
                        pattern: "[0-9-]+",
                        message: "^숫자만 입력해주세요.",
                    },
                    numericality: {
                        greaterThan: -1,
                        message: "^0 이상 입력해주세요.",
                    },
                };
            }
        });

        // Validate
        const errors = validate(validationData, schema);

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
        let validationData = [];

        // Form data
        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let centerWarehouses = formData.getAll("centerWarehouse");
        let insideWarehouses = formData.getAll("insideWarehouse");
        let prices = formData.getAll("price");
        let descriptions = formData.getAll("memo");
        let sku = formData.getAll("sku");

        for (let i = 0; i < prices.length; i++) {
            // Validation data
            validationData["price" + i] = prices[i];
        }

        // Validate
        if (this.onValidateSubmit(validationData)) return;

        let dtos = [];

        for (let i = 0; i < productIds.length; i++) {
            dtos.push({
                sku: sku[i],
                id: productIds[i],
                price: prices[i],
                centerWarehouse: centerWarehouses[i],
                insideWarehouse: insideWarehouses[i],
                description: descriptions[i],
            });
        }

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: UPDATE_HISTORY,
                variables: {
                    dtos: dtos,
                },
            })
            .then((result) => {
                if (result.data.editHistory.statusCode === 200) {
                    this.props.enqueueSnackbar(
                        "Successfully updated warehouse.",
                        {
                            variant: "success",
                        }
                    );
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            isOpenRequestModal: false,
            checkedItems: [],
        });
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleWarehouseSubmit(event) {
        event.preventDefault();
        let validationData = [];

        // Form data
        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let counts = formData.getAll("count");
        let descriptions = formData.getAll("memo");

        for (let i = 0; i < counts.length; i++) {
            // Validation data
            validationData["count" + i] = counts[i];
            formData.getAll("outWarehouse" + i);
        }

        // Validate
        if (this.onValidateSubmit(validationData)) return;

        let dtos = [];

        for (let i = 0; i < productIds.length; i++) {
            dtos.push({
                productId: productIds[i],
                outWarehouse: formData.get("outWarehouse" + i),
                inWarehouse: formData.get("inWarehouse" + i),
                count: counts[i],
                description: descriptions[i],
            });
        }

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: UPDATE_WAREHOUSE,
                variables: {
                    dtos: dtos,
                },
            })
            .then((result) => {
                if (result.data.changeWarehouse.statusCode === 200) {
                    this.props.enqueueSnackbar("성공했습니다.", {
                        variant: "success",
                    });
                    this.props.refetch();
                } else if (result.data.changeWarehouse.statusCode === 300) {
                    this.props.enqueueSnackbar("재고를 확인해주세요.", {
                        variant: "error",
                    });
                } else {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            isOpenWarehouseModal: false,
            checkedItems: [],
            warehouseList: [],
        });
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleCountSubmit(event) {
        event.preventDefault();
        let validationData = [];

        // Form data
        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let counts = formData.getAll("count");
        let prices = formData.getAll("price");
        let descriptions = formData.getAll("description");

        for (let i = 0; i < prices.length; i++) {
            // Validation data
            validationData["price" + i] = prices[i];
            validationData["count" + i] = counts[i];
        }

        // Validate
        if (this.onValidateSubmit(validationData)) return;

        let dtos = [];

        for (let i = 0; i < productIds.length; i++) {
            dtos.push({
                productId: productIds[i],
                warehouse: formData.get("warehouse" + i),
                purpose: formData.get("purpose" + i),
                count: counts[i],
                price: prices[i],
                description: descriptions[i],
            });
        }

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: UPDATE_COUNT,
                variables: {
                    dtos: dtos,
                },
            })
            .then((result) => {
                if (result.data.changeCount.statusCode === 200) {
                    this.props.enqueueSnackbar("성공 했습니다.", {
                        variant: "success",
                    });

                    this.props.refetch();
                } else if (result.data.changeCount.statusCode === 300) {
                    this.props.enqueueSnackbar("재고를 확인해주세요.", {
                        variant: "error",
                    });
                } else {
                    this.props.enqueueSnackbar("Error occured!", {
                        variant: "error",
                    });

                    this.props.refetch();
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            isOpenCountModal: false,
            checkedItems: [],
            numberList: [],
        });
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleCalculationSubmit(event) {
        event.preventDefault();
        let validationData = [];

        // Form data
        const formData = new FormData(event.target);
        let productIds = formData.getAll("productId");
        let prices = formData.getAll("price");
        let descriptions = formData.getAll("description");

        for (let i = 0; i < prices.length; i++) {
            // Validation data
            validationData["prices" + i] = prices[i];
        }

        // Validate
        if (this.onValidateSubmit(validationData)) return;

        let dtos = [];

        for (let i = 0; i < productIds.length; i++) {
            dtos.push({
                id: productIds[i],
                paymentPrice: prices[i],
                description: descriptions[i],
            });
        }

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: UPDATE_PAYMENT,
                variables: {
                    dtos: dtos,
                },
            })
            .then((result) => {
                if (result.data.sellerPayment.statusCode === 200) {
                    this.props.enqueueSnackbar(
                        "Successfully updated calculation payment.",
                        {
                            variant: "success",
                        }
                    );
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            isOpenCalculationModal: false,
            checkedItems: [],
        });
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleProductSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productId = formData.get("productId");
        let productIds = formData.getAll("productId");

        if (this.state.chosenProduct === "warehouse") {
            let warehouseList = this.state.warehouseList;
            let index = this.state.chosenProductIndex;

            (productIds || []).map((id) => {
                warehouseList.splice(index, 1, {
                    productId: id,
                    sku: formData.get(id),
                    outWarehouse: "",
                    inWarehouse: "",
                    count: 0,
                    description: "",
                });
            });

            this.setState({
                warehouseList: warehouseList,
                isOpenProductModal: false,
            });
        }

        if (this.state.chosenProduct === "count") {
            let numberList = this.state.numberList;
            let index = this.state.chosenProductIndex;

            (productIds || []).map((id) => {
                numberList.splice(index, 1, {
                    productId: id,
                    sku: formData.get(id),
                    warehouse: "",
                    purpose: "",
                    count: 0,
                    price: 0,
                    description: "",
                });
            });

            this.setState({
                numberList: numberList,
                isOpenProductModal: false,
            });
        }
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleProductAllSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        let productId = formData.get("productId");
        let productIds = formData.getAll("productId");

        if (this.state.chosenProduct === "warehouse") {
            let warehouseList = this.state.warehouseList;

            (productIds || []).map((id) => {
                if (!warehouseList.find((f) => f.productId === id))
                    warehouseList.push({
                        productId: id,
                        sku: formData.get(id),
                        warehouse: "",
                        purpose: "",
                        count: 0,
                        price: 0,
                        description: "",
                    });
            });

            this.setState({
                warehouseList: warehouseList,
                isOpenProductAllModal: false,
            });
        }

        if (this.state.chosenProduct === "count") {
            let numberList = this.state.numberList;

            (productIds || []).map((id) => {
                if (!numberList.find((f) => f.productId === id))
                    numberList.push({
                        productId: id,
                        sku: formData.get(id),
                        warehouse: "",
                        purpose: "",
                        count: 0,
                        price: 0,
                        description: "",
                    });
            });

            this.setState({
                numberList: numberList,
                isOpenProductAllModal: false,
            });
        }
    }

    /**
     * @summary Export
     * @param {MouseEvent} event
     */
    async onExport() {
        const url = process.env.REACT_APP_DOMAIN + "/download/soldProducts";
        var formData = new FormData();
        formData.append("search", "");

        await axios({
            headers: {
                authorization: this.token ? `Bearer ${this.token}` : "",
            },
            method: "POST",
            url: url,
            data: JSON.stringify({ search: {} }),
            dataType: "json",
            responseType: "arraybuffer",
        })
            .then((response) => {
                fileDownload(response.data, "SalesStatus.xlsx");
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
    }

    onChangeWarehouse(e, index) {
        if (e.target.value === "CENTER") {
            let warehouseValue = this.state.warehouseValue;

            warehouseValue.splice(index, 1, "INSIDE");

            this.setState({
                warehouseValue: warehouseValue,
            });
        } else if (e.target.value === "INSIDE") {
            let warehouseValue = this.state.warehouseValue;

            warehouseValue.splice(index, 1, "CENTER");

            this.setState({
                warehouseValue: warehouseValue,
            });
        }
    }

    onYesLeftOver(e) {
        this.setState({
            isOpenLeftOver: false,
        });
    }

    onCloseLeftOver(e) {
        this.setState({
            isOpenLeftOver: false,
        });
    }

    /**
     * @override
     */
    render() {
        let remainBalance = 0;

        return (
            <React.Fragment>
                <Card className="customListTable mt-20">
                    {/* Rows per page */}
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12} className="text-right">
                                <span className="rows-per-page">
                                    페이지당 상품 갯수:{" "}
                                </span>
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        labelId="rows-simple-select-label"
                                        id="rows-simple-select"
                                        onChange={this.props.handleRowsPerPage}
                                        value={
                                            this.props.pagination.rowsPerPage
                                        }
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="outlined"
                                    color="default"
                                    size="small"
                                    className="ml-20"
                                    onClick={this.onExport.bind(this)}
                                >
                                    다운로드
                                </Button>
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
                                            {/* <TableCell align="center">
                                                Date
                                            </TableCell>
                                            <TableCell align="center">
                                                Seller name
                                            </TableCell>
                                            <TableCell align="center">
                                                Price
                                            </TableCell>
                                            <TableCell align="center">
                                                Memo
                                            </TableCell> */}
                                            <TableCell align="center">
                                                정산 목록
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        <ProductItem
                                            calData={this.props.calData}
                                        />

                                        {/* {this.props.calData.map((item) => {
                                            // remainBalance +=
                                            //     item.paymentStatus !== "DONE"
                                            //         ? item.totalPrice
                                            //         : 0;
                                            console.log("item: ", item);
                                            return (
                                                <></>
                                                // <TableRow key={item.id}>
                                                //     <TableCell align="center">
                                                //         {moment(
                                                //             item.createdDate
                                                //         ).format("YYYY-MM-DD")}
                                                //     </TableCell>
                                                //     <TableCell align="center">
                                                //         {item.sellerName}
                                                //     </TableCell>
                                                //     <TableCell align="center">
                                                //         {item.price}
                                                //     </TableCell>
                                                //     <TableCell align="center">
                                                //         {item.description}
                                                //     </TableCell>
                                                // </TableRow>
                                            );
                                        })} */}
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
                                this.props.data.getSellerProductHistory
                                    .totalElements /
                                    this.props.pagination.rowsPerPage
                            )}
                            page={this.props.pagination.pageNumber}
                            onChange={this.props.handlePageNumber}
                            color="primary"
                            boundaryCount={100}
                        />
                    </Grid>
                </Grid>

                <Divider />
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

export default withSnackbar(connect(mapStateToProps, null)(ProductTable));
