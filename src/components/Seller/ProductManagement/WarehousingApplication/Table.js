import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import {
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Dialog,
    DialogTitle,
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
    Box,
    Avatar,
    Typography,
    Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import validate from "validate.js";
import { withSnackbar } from "notistack";
import { SELLER_PRODUCTS_REQUEST, GET_PRODUCT_HYSTORIES } from "../../Queries";

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
            items: this.props.data.getProducts.list,
            checkedItems: [],
            reason: "",
            historyProduct: null,
            productRequestHistory: [],
            isOpenRequestModal: false,
            isOpenHistoryModal: false,
            errors: null,
        };

        // Events
        this.onOpenRequestModal = this.onOpenRequestModal.bind(this);
        this.onOpenHistoryModal = this.onOpenHistoryModal.bind(this);
        this.hasError = this.hasError.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
    }

    /**
     * @summary Open modal
     * @param {event}
     */
    onOpenModal(e, productId, reason) {
        this.setState({
            reason: reason,
            editProductId: productId,
            isOpenModal: true,
        });
    }

    /**
     * @summary Close modal
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
     * @summary Open request modal
     * @param {event}
     */
    onOpenRequestModal(e) {
        if (this.state.checkedItems.length > 0) {
            this.setState({ isOpenRequestModal: true });
        } else {
            this.props.enqueueSnackbar("상품을 선택해주세요.", {
                variant: "warning",
            });
        }
    }

    /**
     * @summary Close History modal
     * @param {event}
     */
    onCloseHistoryModal() {
        this.setState({ isOpenHistoryModal: false });
    }

    /**
     * @summary Open History modal
     * @param {event}
     */
    async onOpenHistoryModal(e, item) {
        let productRequestHistory = [];

        // Mutate
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: GET_PRODUCT_HYSTORIES,
                variables: {
                    productId: item.id,
                },
            })
            .then((result) => {
                if (result && result.data) {
                    productRequestHistory = result.data.getSellerProductHistory;
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            historyProduct: item,
            productRequestHistory: productRequestHistory,
            isOpenHistoryModal: true,
        });
    }

    /**
     * @summary Close request modal
     * @param {event}
     */
    onCloseRequestModal() {
        this.setState({ isOpenRequestModal: false });
    }

    /**
     * @summary Approve modal
     * @param {event}
     */
    onApproveModal() {
        this.setState({ isOpenRequestModal: false });
    }

    /**
     * @summary Toggle selections
     * @param {MouseEvent} event
     * @param {Object} item
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
     * @summary Toggle all selections
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
    onValidateSubmit(productsForValidation) {
        let schema = {};

        Object.keys(productsForValidation).map((key) => {
            if (key.substring(0, 12) == "shipmentDate") {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^This field is required.",
                    },
                };
            } else {
                schema[key] = {
                    presence: {
                        allowEmpty: false,
                        message: "^This field is required.",
                    },
                    numericality: {
                        greaterThan: 0,
                        message: "^Should be greater than zero.",
                    },
                };
            }
        });

        // Validate
        const errors = validate(productsForValidation, schema);

        this.setState({
            errors: errors,
        });

        return errors;
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    onHandleSubmit(event) {
        event.preventDefault();

        let items = this.state.items;
        let productsForValidation = [];

        // Form data
        const formData = new FormData(event.target);
        let productIds = formData.getAll("id");
        let inventorys = formData.getAll("inventory");
        let tradePrices = formData.getAll("tradePrice");
        let prices = formData.getAll("price");
        let shipmentDates = formData.getAll("shipmentDate");

        for (let i = 0; i < productIds.length; i++) {
            // Update items
            items.map((item) => {
                if (productIds[i] === item.id) {
                    item.inventory = inventorys[i];
                    item.tradePrice = tradePrices[i];
                    item.price = prices[i];
                    item.shipmentDate = shipmentDates[i];
                }
            });

            // Validation data
            productsForValidation["inventory" + i] = inventorys[i];
            productsForValidation["tradePrice" + i] = tradePrices[i];
            productsForValidation["price" + i] = prices[i];
            productsForValidation["shipmentDate" + i] = shipmentDates[i];
        }

        // Validate
        if (this.onValidateSubmit(productsForValidation)) return;

        this.setState({
            items: items,
            isOpenRequestModal: false,
        });
    }

    /**
     * @summary Seller product request
     * @param {event}
     */
    async sendRequest(e) {
        // Product checked
        if (this.state.checkedItems.length > 0) {
            let checkedItems = this.state.checkedItems;
            let products = [];

            checkedItems.map((checkedItem) => {
                products.push({
                    productId: checkedItem.id,
                    price: checkedItem.price || checkedItem.request,
                    tradePrice:
                        checkedItem.tradePrice ||
                        checkedItem.request.tradePrice,
                    count: checkedItem.inventory || checkedItem.request.count,
                    shipmentDate: checkedItem.shipmentDate,
                });
            });

            // Mutate
            await this.props.apolloClient.httpClient
                .mutate({
                    mutation: SELLER_PRODUCTS_REQUEST,
                    variables: {
                        products: products,
                    },
                })
                .then((result) => {
                    if (
                        result &&
                        result.data &&
                        result.data.requestProduct.statusCode === 200
                    ) {
                        this.props.enqueueSnackbar(
                            "Request successfully sent.",
                            {
                                variant: "success",
                            }
                        );

                        // Reload list
                        setTimeout(
                            function () {
                                const search = {
                                    search: {
                                        name: "",
                                        sku: "",
                                    },
                                    categories: {
                                        first: [],
                                        second: [],
                                        third: [],
                                    },
                                    searchWord: "name",
                                    status: [
                                        "ACCEPTED",
                                        "ACCEPTED2",
                                        "PENDING2",
                                        "DECLINED2",
                                    ],
                                };

                                this.props.search("firstChildsState", search);
                            }.bind(this),
                            3000
                        );
                    }
                })
                .catch((error) => {
                    this.props.enqueueSnackbar(
                        "문제가 발생했습니다. 잠시후 시도 해주세요.",
                        {
                            variant: "error",
                        }
                    );
                });
        } else {
            // Not select product
            this.props.enqueueSnackbar("상품을 선택해주세요.", {
                variant: "warning",
            });
        }
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                {this.state.items.length > 0 ? (
                    <React.Fragment>
                        <Card className="customListTable mt-20">
                            {/* Rows per page */}
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={12} className="text-right">
                                        <span className="sort-by-product">
                                            Sort by:{" "}
                                        </span>
                                        <FormControl
                                            size="small"
                                            variant="outlined"
                                        >
                                            <Select
                                                labelId="sort-simple-select-label"
                                                id="sort-simple-select"
                                                onChange={
                                                    this.props
                                                        .handleOrderByProduct
                                                }
                                                value={this.props.orderBy}
                                            >
                                                <MenuItem value="registerDate">
                                                    Date
                                                </MenuItem>
                                                <MenuItem value="name">
                                                    Name
                                                </MenuItem>
                                                <MenuItem value="price">
                                                    Price
                                                </MenuItem>
                                                <MenuItem value="inventory">
                                                    Inventory
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <span className="rows-per-page">
                                            Rows per page:{" "}
                                        </span>
                                        <FormControl
                                            size="small"
                                            variant="outlined"
                                        >
                                            <Select
                                                labelId="rows-simple-select-label"
                                                id="rows-simple-select"
                                                onChange={
                                                    this.props.handleRowsPerPage
                                                }
                                                value={
                                                    this.props.pagination
                                                        .rowsPerPage
                                                }
                                            >
                                                <MenuItem value={10}>
                                                    10
                                                </MenuItem>
                                                <MenuItem value={20}>
                                                    20
                                                </MenuItem>
                                                <MenuItem value={50}>
                                                    50
                                                </MenuItem>
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
                                                                this.state
                                                                    .checkedItems
                                                                    .length ===
                                                                this.state.items
                                                                    .length
                                                            }
                                                            onChange={(e) =>
                                                                this.onSelectAll(
                                                                    e,
                                                                    this.state
                                                                        .items
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>SKU</TableCell>
                                                    <TableCell>
                                                        상품명 / 카테고리
                                                    </TableCell>
                                                    <TableCell>
                                                        브랜드
                                                    </TableCell>
                                                    <TableCell>
                                                        등록일
                                                    </TableCell>
                                                    <TableCell>
                                                        실무게
                                                    </TableCell>
                                                    <TableCell>
                                                        부피무게
                                                    </TableCell>
                                                    <TableCell>
                                                        공급가
                                                    </TableCell>
                                                    <TableCell>
                                                        소비자가
                                                    </TableCell>
                                                    <TableCell>
                                                        입고 회차
                                                    </TableCell>
                                                    <TableCell>
                                                        상품 개수
                                                    </TableCell>
                                                    <TableCell>
                                                        센터 배송일자
                                                    </TableCell>
                                                    <TableCell>상태</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {(this.state.items || []).map(
                                                    (item) => {
                                                        let status = "";

                                                        switch (item.status) {
                                                            case "ACCEPTED":
                                                                status =
                                                                    "ACCEPTED";
                                                                break;
                                                            case "ACCEPTED2":
                                                                status =
                                                                    "ACCEPTED";
                                                                break;
                                                            case "PENDING2":
                                                                status =
                                                                    "PENDING";
                                                                break;
                                                            case "DECLINED2":
                                                                status =
                                                                    "DECLINED";
                                                                break;
                                                        }

                                                        let imageUrl =
                                                            item.imageUrl &&
                                                            item.imageUrl.substring(
                                                                0,
                                                                4
                                                            ) !== "http"
                                                                ? process.env
                                                                      .REACT_APP_CDN_URL +
                                                                  "product/medium/" +
                                                                  item.imageUrl
                                                                : item.imageUrl;
                                                        return (
                                                            <TableRow
                                                                key={item.id}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox
                                                                        color="primary"
                                                                        value="true"
                                                                        disabled={
                                                                            item.status ===
                                                                                "PENDING2" ||
                                                                            item.status ===
                                                                                "ACCEPTED2"
                                                                        }
                                                                        checked={
                                                                            this.state.checkedItems.indexOf(
                                                                                item
                                                                            ) !==
                                                                            -1
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            this.onSelect(
                                                                                e,
                                                                                item
                                                                            )
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.sku}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Box
                                                                        alignItems="center"
                                                                        display="flex"
                                                                    >
                                                                        <Avatar
                                                                            src={
                                                                                imageUrl
                                                                            }
                                                                            variant="square"
                                                                        ></Avatar>
                                                                        <Typography
                                                                            color="textPrimary"
                                                                            variant="body1"
                                                                            className="item-title"
                                                                        >
                                                                            <span className="product-name">
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </span>
                                                                            {
                                                                                item.category
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item.brand}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {moment(
                                                                        item.registerDate
                                                                    ).format(
                                                                        "YYYY-MM-DD"
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        item.weight
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        item.volume
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        (
                                                                            item.request ||
                                                                            {}
                                                                        )
                                                                            .tradePrice
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        (
                                                                            item.request ||
                                                                            {}
                                                                        ).price
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    <Typography
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            color: "#2196f3",
                                                                        }}
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            this.onOpenHistoryModal(
                                                                                e,
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            item.reqCount
                                                                        }
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        (
                                                                            item.request ||
                                                                            {}
                                                                        ).count
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {(
                                                                        item.request ||
                                                                        {}
                                                                    )
                                                                        .shipmentDate
                                                                        ? moment(
                                                                              (
                                                                                  item.request ||
                                                                                  {}
                                                                              )
                                                                                  .shipmentDate
                                                                          ).format(
                                                                              "YYYY-MM-DD"
                                                                          )
                                                                        : null}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {status ===
                                                                    "DECLINED" ? (
                                                                        <Typography
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                color: "#2196f3",
                                                                            }}
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                this.onOpenModal(
                                                                                    e,
                                                                                    item.id,
                                                                                    item.reason
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                status
                                                                            }
                                                                        </Typography>
                                                                    ) : (
                                                                        <Typography>
                                                                            {
                                                                                status
                                                                            }
                                                                        </Typography>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </PerfectScrollbar>
                            </CardContent>

                            {/* Actions */}
                            <CardActions>
                                <Grid container>
                                    <Grid item xs={12} className="text-right">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="default"
                                            onClick={(e) =>
                                                this.onOpenRequestModal(e)
                                            }
                                        >
                                            {/* Product info */}
                                            상품정보 입력하기
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="default"
                                            className="ml-20"
                                            onClick={(e) => this.sendRequest(e)}
                                        >
                                            {/* Send request */}
                                            요청하기
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
                                        this.props.data.getProducts
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
                            {/* Title */}
                            <DialogTitle id="responsive-dialog-title">
                                <h2>상품 정보 입력</h2>
                            </DialogTitle>
                            <Divider />

                            {/* Content */}
                            <form
                                id="seller-products-request-form"
                                onSubmit={this.onHandleSubmit.bind(this)}
                            >
                                <DialogContent>
                                    <Table className="product-list">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SKU</TableCell>
                                                <TableCell>상품 개수</TableCell>
                                                <TableCell>
                                                    공급가(원, 부가세포함)
                                                </TableCell>
                                                <TableCell>소비자가</TableCell>
                                                <TableCell>
                                                    센터 배송일자
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {(
                                                this.state.checkedItems || []
                                            ).map((item, index) => {
                                                return (
                                                    <TableRow key={item.id}>
                                                        <input
                                                            name="id"
                                                            type="hidden"
                                                            value={item.id}
                                                        />
                                                        <TableCell>
                                                            {item.sku}
                                                        </TableCell>
                                                        <TableCell>
                                                            <TextField
                                                                fullWidth
                                                                size="small"
                                                                variant="outlined"
                                                                name="inventory"
                                                                defaultValue={
                                                                    item.inventory
                                                                }
                                                                error={this.hasError(
                                                                    "inventory" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "inventory" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
                                                                              .errors[
                                                                              "inventory" +
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
                                                                name="tradePrice"
                                                                defaultValue={
                                                                    item.tradePrice
                                                                }
                                                                error={this.hasError(
                                                                    "tradePrice" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "tradePrice" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
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
                                                                defaultValue={
                                                                    item.price
                                                                }
                                                                error={this.hasError(
                                                                    "price" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "price" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
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
                                                                type="date"
                                                                variant="outlined"
                                                                name="shipmentDate"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                defaultValue={moment(
                                                                    item.registerDate,
                                                                    "YYYY-MM-DDTHH:mm:ssZ"
                                                                ).format(
                                                                    "YYYY-MM-DD"
                                                                )}
                                                                error={this.hasError(
                                                                    "shipmentDate" +
                                                                        index
                                                                )}
                                                                helperText={
                                                                    this.hasError(
                                                                        "shipmentDate" +
                                                                            index
                                                                    )
                                                                        ? this
                                                                              .state
                                                                              .errors[
                                                                              "shipmentDate" +
                                                                                  index
                                                                          ][0]
                                                                        : null
                                                                }
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </DialogContent>
                            </form>

                            <Divider />
                            {/* Actions */}
                            <DialogActions>
                                <Button
                                    color="primary"
                                    onClick={this.onCloseRequestModal.bind(
                                        this
                                    )}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    form="seller-products-request-form"
                                    type="submit"
                                >
                                    Modify
                                </Button>
                            </DialogActions>
                        </Dialog>

                        {/* History popup */}
                        <Dialog
                            open={this.state.isOpenHistoryModal}
                            aria-labelledby="responsive-dialog-title"
                            maxWidth="lg"
                        >
                            {/* Title */}
                            <DialogTitle id="responsive-dialog-title">
                                <h2>Product request history</h2>
                            </DialogTitle>
                            <Divider />

                            {/* Content */}
                            <DialogContent>
                                <Table className="product-list">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SKU</TableCell>
                                            <TableCell>
                                                Product Name / Category
                                            </TableCell>
                                            <TableCell>Brand</TableCell>
                                            <TableCell>
                                                Registered date
                                            </TableCell>
                                            <TableCell>Weigth</TableCell>
                                            <TableCell>Volume</TableCell>
                                            <TableCell>Product cost</TableCell>
                                            <TableCell>Sell price</TableCell>
                                            <TableCell>Request Count</TableCell>
                                            <TableCell>Product count</TableCell>
                                            <TableCell>Ship date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {this.state.historyProduct ? (
                                        <TableBody>
                                            <TableRow
                                                key={
                                                    this.state.historyProduct.id
                                                }
                                            >
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct.sku
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="body1"
                                                        className="item-title"
                                                    >
                                                        <span className="product-name">
                                                            {
                                                                this.state
                                                                    .historyProduct
                                                                    .name
                                                            }
                                                        </span>
                                                        {
                                                            this.state
                                                                .historyProduct
                                                                .category
                                                        }
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .brand
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        this.state
                                                            .historyProduct
                                                            .registerDate
                                                    ).format("YYYY-MM-DD")}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .weight
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .volume
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .tradePrice
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .price
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .reqCount
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        this.state
                                                            .historyProduct
                                                            .inventory
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        this.state
                                                            .historyProduct
                                                            .shipmentDate
                                                    ).format("YYYY-MM-DD")}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) : null}
                                </Table>

                                <Table className="product-list mt-20">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Request count</TableCell>
                                            <TableCell>Product cost</TableCell>
                                            <TableCell>Sale price</TableCell>
                                            <TableCell>Request date</TableCell>
                                            <TableCell>Product count</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(
                                            this.state.productRequestHistory ||
                                            []
                                        ).map((history, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {history.tradePrice}
                                                    </TableCell>
                                                    <TableCell>
                                                        {history.price}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(
                                                            history.createdDate,
                                                            "YYYY-MM-DDTHH:mm:ssZ"
                                                        ).format("YYYY-MM-DD")}
                                                    </TableCell>
                                                    <TableCell>
                                                        {history.count}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </DialogContent>

                            <Divider />
                            {/* Actions */}
                            <DialogActions>
                                <Button
                                    color="primary"
                                    onClick={this.onCloseHistoryModal.bind(
                                        this
                                    )}
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </React.Fragment>
                ) : (
                    <Card className="customListTable mt-20">
                        <CardContent>
                            <Typography>Not products to show</Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Reason popup */}
                <Dialog
                    open={this.state.isOpenModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Title */}
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Reasons for cancellation</h2>
                    </DialogTitle>
                    <Divider />

                    {/* Content */}
                    <DialogContent>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.state.reason,
                            }}
                        ></div>
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.onCloseModal.bind(this)}
                        >
                            Ok
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
