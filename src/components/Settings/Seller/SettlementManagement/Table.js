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
import RemoveIcon from '@material-ui/icons/Remove';
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
import FindProduct from "./FindProduct";
import SelectOne from "./SelectOne";
import CreateIcon from "@material-ui/icons/Create";

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
            totalPrice:0,
            totalCount:0,
        };

        // Events
        this.onOpenRequestModal = this.onOpenRequestModal.bind(this);

        this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
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
            this.props.enqueueSnackbar("상품을 선택해주세요.", {
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
            console.debug(this.state.checkedItems)
            let sum = 0;
            let centerWarehouseCount = 0;
            let insideWarehouseCount = 0;
            for (let i = 0; i < this.state.checkedItems.length; i++) {
                if (
                    this.state.checkedItems[0].sellerName !==
                    this.state.checkedItems[i].sellerName
                ) {
                    this.props.enqueueSnackbar("서로 다른 파트너끼리 정산을 할수 없습니다.", {
                        variant: "warning",
                    });
                    return;
                } else if (this.state.checkedItems[i].status === "Warehousing" || this.state.checkedItems[i].status === "WarehouseChanged") {
                    this.props.enqueueSnackbar("창고 이동은 정산 할수 없습니다.", {
                        variant: "warning",
                    });
                    return;
                }else if (this.state.checkedItems[i].paymentStatus === true) {
                    this.props.enqueueSnackbar("이미 정산이 진행 되어 있는 건이 존재합니다.", {
                        variant: "warning",
                    });
                    return;
                } else {
                    this.state.checkedItems[i].centerWarehouse === 0 ? sum += this.state.checkedItems[i].tradePrice *  -this.state.checkedItems[i].insideWarehouse : sum += this.state.checkedItems[i].tradePrice *  -this.state.checkedItems[i].centerWarehouse;
                    centerWarehouseCount += -this.state.checkedItems[i].centerWarehouse;
                    insideWarehouseCount += -this.state.checkedItems[i].insideWarehouse;
                }
            }
            this.setState({ 
                isOpenCalculationModal: true,
                totalPrice:sum,
                totalCount:centerWarehouseCount +insideWarehouseCount,
            });
        } else {
            this.props.enqueueSnackbar("상품을 선택해주세요.", {
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
                        message: "^필수 항목 입니다 입력 해주세요.",
                    },
                };
            } else if (key.substring(0, 5) == "price") {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^필수 항목 입니다 입력 해주세요.",
                    },
                    numericality: {
                        greaterThan: -1,
                        message: "^음수 보다 큰 값을 입력해주세요.",
                    },
                };
            } else {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^필수 항목 입니다. 입력 해주세요.",
                    },
                    format: {
                        pattern: "[0-9-]+",
                        message: "^숫자로만 입력 가능합니다.",
                    },
                    numericality: {
                        greaterThan: -1,
                        message: "^음수 보다 큰 값을 입력해주세요.",
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
                        "성공 했습니다.",
                        {
                            variant: "success",
                        }
                    );
                } else if (result.data.editHistory.statusCode === 300) {
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
                    this.props.enqueueSnackbar(
                        "성공 했습니다.",
                        {
                            variant: "success",
                        }
                    );
                    this.props.refetch();
                } else if (result.data.changeWarehouse.statusCode === 300) {
                    this.props.enqueueSnackbar("재고를 확인 해주세요.", {
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
                    this.props.enqueueSnackbar("재고를 확인 해주세요.", {
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
                        "성공 했습니다.",
                        {
                            variant: "success",
                        }
                    );
                }
                this.props.refetch();
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

            (productIds || []).map((id,index) => {
                numberList.splice(index, 1, {
                    productId: id,
                    sku: formData.get(id),
                    warehouse: "",
                    purpose: "",
                    count: 0,
                    tradePrice:formData.get(index),
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

            (productIds || []).map((id,index) => {
                // if (!warehouseList.find((f) => f.productId === id))
                warehouseList.push({
                    productId: id,
                    sku: formData.get(id),
                    warehouse: "",
                    purpose: "",
                    count: 0,
                    tradePrice:formData.get(index),
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

            (productIds || []).map((id,index) => {
                // if (!numberList.find((f) => f.productId === id))
                numberList.push({
                    productId: id,
                    sku: formData.get(id),
                    tradePrice:formData.get(index),
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
                                    Rows per page:{" "}
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
                                    Download
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
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    value="true"
                                                    checked={
                                                        this.state.checkedItems
                                                            .length ===
                                                        this.props.data
                                                            .getSellerProductHistory
                                                            .list.length
                                                    }
                                                    onChange={(e) =>
                                                        this.onSelectAll(
                                                            e,
                                                            this.props.data
                                                                .getSellerProductHistory
                                                                .list
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell align="center">날짜</TableCell>
                                            <TableCell align="center">파트너 명</TableCell>
                                            <TableCell align="center">브랜드</TableCell>
                                            <TableCell align="center">Sku</TableCell>
                                            <TableCell align="center">공급가 (￦)</TableCell>
                                            <TableCell align="center">상태</TableCell>
                                            <TableCell align="center">
                                               본사창고
                                            </TableCell>
                                            <TableCell align="center">
                                               기타창고
                                            </TableCell>
                                            <TableCell align="center">정산 날짜</TableCell>
                                            <TableCell  align="center">
                                                정산 여부
                                            </TableCell>
                                            <TableCell align="center">메모</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(
                                            this.props.data
                                                .getSellerProductHistory.list ||
                                            []
                                        ).map((item) => {
                                            remainBalance +=
                                                item.paymentStatus !== "DONE"
                                                    ? item.totalPrice
                                                    : 0;

                                            return (
                                                <TableRow key={item.id}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            value="true"
                                                            checked={
                                                                this.state.checkedItems.indexOf(
                                                                    item
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
                                                    <TableCell align="center">
                                                        {moment(
                                                            item.createdDate
                                                        ).format("YYYY-MM-DD")}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.sellerName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.brand}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.sku}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.tradePrice}원
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.status}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.centerWarehouse}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.insideWarehouse}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.paymentDate}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.paymentStatus ===
                                                        true ? (
                                                            <RadioButtonUncheckedIcon />
                                                        ) : item.status === "Warehousing" || item.status === "WarehouseChanged" ? (
                                                            <RemoveIcon/>
                                                        ) :(
                                                            <ClearIcon />
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.description}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                colSpan={9}
                                                align="right"
                                            >
                                                본사창고:{" "}
                                                {
                                                    this.props.data
                                                        .getSellerProductHistory
                                                        .centerTotal
                                                }
                                            </TableCell>
                                            <TableCell>
                                                기타창고:{" "}
                                                {
                                                    this.props.data
                                                        .getSellerProductHistory
                                                        .insideTotal
                                                }
                                            </TableCell>
                                            <TableCell>
                                                총:{" "}
                                                {
                                                    this.props.data
                                                        .getSellerProductHistory
                                                        .total
                                                }
                                            </TableCell>
                                            <TableCell>
                                                총 금액:{" "}
                                                {this.props.data
                                                    .getSellerProductHistory
                                                    .totalPayment
                                                    ? this.props.data
                                                          .getSellerProductHistory
                                                          .totalPayment
                                                    : 0}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12} className="text-right">
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="default"
                                    onClick={(e) =>
                                        this.onOpenWarehouseModal(e)
                                    }
                                >
                                    창고 이동
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="default"
                                    className="ml-20"
                                    onClick={(e) => this.onOpenCountModal(e)}
                                >
                                   수량 조정
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="default"
                                    className="ml-20"
                                    onClick={(e) => this.onOpenRequestModal(e)}
                                >
                                    내역 수정
                                </Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="default"
                                    className="ml-20"
                                    onClick={(e) =>
                                        this.onOpenCalculationModal(e)
                                    }
                                >
                                    정산 처리
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
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

                {/* Request popup */}
                <Dialog
                    open={this.state.isOpenRequestModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="seller-order-notes-form"
                        onSubmit={this.onHandleSubmit.bind(this)}
                    >
                        <DialogContent>
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>상태</TableCell>
                                        <TableCell>본사 창고</TableCell>
                                        <TableCell>기타 창고</TableCell>
                                        <TableCell>공급가 (￦)</TableCell>
                                        <TableCell>메모</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(this.state.checkedItems || []).map(
                                        (item, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <input
                                                            name="productId"
                                                            type="hidden"
                                                            value={item.id}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="sku"
                                                            value={item.sku}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.status}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="centerWarehouse"
                                                            defaultValue={
                                                                item.centerWarehouse
                                                            }
                                                            error={this.hasError(
                                                                "centerWarehouse" +
                                                                    index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "centerWarehouse" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "centerWarehouse" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="insideWarehouse"
                                                            defaultValue={
                                                                item.insideWarehouse
                                                            }
                                                            error={this.hasError(
                                                                "insideWarehouse" +
                                                                    index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "insideWarehouse" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "insideWarehouse" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="price"
                                                            defaultValue={
                                                                item.tradePrice
                                                            }
                                                            error={this.hasError(
                                                                "price" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "price" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "price" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="memo"
                                                            defaultValue={
                                                                item.description
                                                                    ? item.description
                                                                    : ""
                                                            }
                                                            error={this.hasError(
                                                                "memo" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "memo" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "memo" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseRequestModal.bind(this)}
                        >
                            취소
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="seller-order-notes-form"
                            type="submit"
                            size="small"
                        >
                            수정하기
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Warehouse popup */}
                <Dialog
                    open={this.state.isOpenWarehouseModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="seller-order-notes-form"
                        onSubmit={this.onHandleWarehouseSubmit.bind(this)}
                    >
                        <DialogContent>
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>출고 창고</TableCell>
                                        <TableCell>
                                           입고 창고
                                        </TableCell>
                                        <TableCell>개수</TableCell>
                                        <TableCell>메모</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(this.state.warehouseList || []).map(
                                        (item, index) => {
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <input
                                                            type="hidden"
                                                            name="productId"
                                                            value={
                                                                item.productId
                                                            }
                                                        />
                                                        <FormControl
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                        >
                                                            <OutlinedInput
                                                                name="sku"
                                                                readOnly={true}
                                                                value={item.sku}
                                                                error={this.hasError(
                                                                    "productId" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "productId" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
                                                                              .errors[
                                                                              "productId" +
                                                                                  index
                                                                          ][0]
                                                                        : null
                                                                }
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                this.onOpenProductModal(
                                                                                    e,
                                                                                    index,
                                                                                    "warehouse"
                                                                                )
                                                                            }
                                                                        >
                                                                            <CreateIcon />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl
                                                            component="fieldset"
                                                            error={this.hasError(
                                                                "outWarehouse" +
                                                                    index
                                                            )}
                                                        >
                                                            <RadioGroup
                                                                aria-label="outWarehouse"
                                                                name={
                                                                    "outWarehouse" +
                                                                    index
                                                                }
                                                                onClick={(e) =>
                                                                    this.onChangeWarehouse(
                                                                        e,
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value="CENTER"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="본사 창고"
                                                                />
                                                                <FormControlLabel
                                                                    value="INSIDE"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="기타 창고"
                                                                />
                                                            </RadioGroup>
                                                            <FormHelperText>
                                                                {this.hasError(
                                                                    "outWarehouse" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "outWarehouse" +
                                                                              index
                                                                      ][0]
                                                                    : null}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl
                                                            component="fieldset"
                                                            error={this.hasError(
                                                                "inWarehouse" +
                                                                    index
                                                            )}
                                                        >
                                                            <RadioGroup
                                                                aria-label="inWarehouse"
                                                                name={
                                                                    "inWarehouse" +
                                                                    index
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value="CENTER"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="본사 창고"
                                                                />
                                                                <FormControlLabel
                                                                    value="INSIDE"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="기타 창고"
                                                                />
                                                            </RadioGroup>
                                                            <FormHelperText>
                                                                {this.hasError(
                                                                    "inWarehouse" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "inWarehouse" +
                                                                              index
                                                                      ][0]
                                                                    : null}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="count"
                                                            error={this.hasError(
                                                                "count" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "count" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "count" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="memo"
                                                            defaultValue={
                                                                item.son
                                                                    ? item.son
                                                                          .memo
                                                                    : ""
                                                            }
                                                            error={this.hasError(
                                                                "memo" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "memo" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "memo" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={(e) =>
                                this.onOpenProductAllModal(e, "warehouse")
                            }
                        >
                           이동할 상품 추가하기
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="seller-order-notes-form"
                            type="submit"
                            size="small"
                        >
                            확인
                        </Button>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseWarehouseModal.bind(this)}
                        >
                            취소
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Count popup */}
                <Dialog
                    open={this.state.isOpenCountModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="seller-order-notes-form"
                        onSubmit={this.onHandleCountSubmit.bind(this)}
                    >
                        <DialogContent>
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>창고 선택</TableCell>
                                        <TableCell>사용 목적</TableCell>
                                        <TableCell>수량</TableCell>
                                        <TableCell>공급가 (￦)</TableCell>
                                        <TableCell>메모</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(this.state.numberList || []).map(
                                        (item, index) => {
                                            console.log(item)
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <input
                                                            type="hidden"
                                                            name="productId"
                                                            value={
                                                                item.productId
                                                            }
                                                        />
                                                        <FormControl
                                                            variant="outlined"
                                                            size="small"
                                                            fullWidth
                                                        >
                                                            <OutlinedInput
                                                                name="sku"
                                                                readOnly={true}
                                                                value={item.sku}
                                                                error={this.hasError(
                                                                    "productId" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "productId" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
                                                                              .errors[
                                                                              "productId" +
                                                                                  index
                                                                          ][0]
                                                                        : null
                                                                }
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                this.onOpenProductModal(
                                                                                    e,
                                                                                    index,
                                                                                    "count"
                                                                                )
                                                                            }
                                                                        >
                                                                            <CreateIcon />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl
                                                            component="fieldset"
                                                            error={this.hasError(
                                                                "warehouse" +
                                                                    index
                                                            )}
                                                        >
                                                            <RadioGroup
                                                                aria-label="warehouse"
                                                                name={
                                                                    "warehouse" +
                                                                    index
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value="CENTER"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="본사창고"
                                                                />
                                                                <FormControlLabel
                                                                    value="INSIDE"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="기타창고"
                                                                />
                                                            </RadioGroup>
                                                            <FormHelperText>
                                                                {this.hasError(
                                                                    "warehouse" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "warehouse" +
                                                                              index
                                                                      ][0]
                                                                    : null}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <FormControl
                                                            component="fieldset"
                                                            error={this.hasError(
                                                                "purpose" +
                                                                    index
                                                            )}
                                                        >
                                                            <RadioGroup
                                                                aria-label="purpose"
                                                                name={
                                                                    "purpose" +
                                                                    index
                                                                }
                                                            >
                                                                <FormControlLabel
                                                                    value="SALES"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="판매"
                                                                />
                                                                <FormControlLabel
                                                                    value="RETURN"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="반품"
                                                                />
                                                                <FormControlLabel
                                                                    value="MARKETING"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="마케팅"
                                                                />
                                                                <FormControlLabel
                                                                    value="DELETED"
                                                                    control={
                                                                        <Radio />
                                                                    }
                                                                    label="폐기"
                                                                />
                                                            </RadioGroup>
                                                            <FormHelperText>
                                                                {this.hasError(
                                                                    "purpose" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "purpose" +
                                                                              index
                                                                      ][0]
                                                                    : null}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="count"
                                                            error={this.hasError(
                                                                "count" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "count" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "count" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            defaultValue={item.tradePrice}
                                                            name="price"
                                                            error={this.hasError(
                                                                "price" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "price" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "price" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="description"
                                                            error={this.hasError(
                                                                "description" +
                                                                    index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "description" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "description" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={(e) =>
                                this.onOpenProductAllModal(e, "count")
                            }
                        >
                            상품 추가
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="seller-order-notes-form"
                            type="submit"
                            size="small"
                        >
                            완료
                        </Button>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseCountModal.bind(this)}
                        >
                            취소
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Calculation popup */}
                <Dialog
                    open={this.state.isOpenCalculationModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="seller-order-notes-form"
                        onSubmit={this.onHandleCalculationSubmit.bind(this)}
                    >
                        <DialogContent>
                            <Table className="product-list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>날짜</TableCell>
                                        <TableCell>
                                          정산금액
                                        </TableCell>
                                        <TableCell>
                                          개수
                                        </TableCell>
                                        <TableCell>
                                          총 정산금액
                                        </TableCell>
                                        <TableCell>메모</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {(this.state.checkedItems || []).map(
                                        (item, index) => {
                                            var date = new Date();
                                            console.log(item)
                                            return (
                                                <TableRow>
                                                    <TableCell>
                                                        <input
                                                            name="productId"
                                                            type="hidden"
                                                            value={item.id}
                                                        />
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="sku"
                                                            value={item.sku}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(date).format(
                                                            "YYYY-MM-DD"
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="tradePrice"
                                                            label="The amount is here"
                                                            defaultValue={
                                                                item.tradePrice
                                                           }
                                                            error={this.hasError(
                                                                "tradePrice" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "tradePrice" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "tradePrice" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="count"
                                                            label="The amount is here"
                                                            defaultValue={
                                                                item.centerWarehouse === 0 ? (
                                                                     -item.insideWarehouse
                                                                ) 
                                                           :(
                                                             -item.centerWarehouse
                                                           )}
                                                            error={this.hasError(
                                                                "tradePrice" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "tradePrice" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "tradePrice" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            name="price"
                                                            label="The amount is here"
                                                            defaultValue={
                                                                item.centerWarehouse === 0 ? (
                                                                    item.tradePrice * -item.insideWarehouse
                                                                ) 
                                                           :(
                                                            item.tradePrice * -item.centerWarehouse
                                                           )}
                                                            error={this.hasError(
                                                                "price" + index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "price" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "price" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            label="Memo is here"
                                                            name="description"
                                                            error={this.hasError(
                                                                "description" +
                                                                    index
                                                            )}
                                                            helperText={
                                                                this.hasError(
                                                                    "description" +
                                                                        index
                                                                )
                                                                    ? this.state
                                                                          .errors[
                                                                          "description" +
                                                                              index
                                                                      ][0]
                                                                    : null
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                    {/* <p>{this.state.totalPrice}</p>
                                    <p>{this.state.totalCount}</p> */}
                                </TableBody>
                                <TableHead>
                                        <TableRow>
                                            <TableCell
                                                colSpan={9}
                                                align="right"
                                            >
                                                <span style={{marginRight:'15px'}}>총 정산금액:{" "}
                                                {
                                                    (this.state.totalPrice).toLocaleString() + "원"
                                                }</span>
                                             <span>총 개수:{" "}
                                                {
                                                    this.state.totalCount
                                                }</span>
                                            </TableCell>
                                            <TableCell>

                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                            </Table>
                        </DialogContent>
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseCalculationModal.bind(this)}
                        >
                            취소
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="seller-order-notes-form"
                            size="small"
                            type="submit"
                        >
                            완료
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Product popup */}
                <Dialog
                    open={this.state.isOpenProductModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="product-form"
                        onSubmit={this.onHandleProductSubmit.bind(this)}
                    >
                        <SelectOne />
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseProductModal.bind(this)}
                        >
                           취소
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="product-form"
                            size="small"
                            type="submit"
                        >
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Product popup */}
                <Dialog
                    open={this.state.isOpenProductAllModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <form
                        id="product-form"
                        onSubmit={this.onHandleProductAllSubmit.bind(this)}
                    >
                        <FindProduct />
                    </form>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            size="small"
                            onClick={this.onCloseProductAllModal.bind(this)}
                        >
                            취소
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            form="product-form"
                            size="small"
                            type="submit"
                        >
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Product popup */}
                <Dialog
                    open={this.state.isOpenLeftOver}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Content */}
                    <DialogContent>
                        There are no leftovers in the selected warehouse. Please
                        select again after you check.
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.onCloseLeftOver.bind(this)}
                        >
                            No
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onYesLeftOver.bind(this)}
                        >
                            Yes
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

export default withSnackbar(connect(mapStateToProps, null)(ProductTable));
