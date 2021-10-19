import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import {
    Card,
    CardActions,
    CardContent,
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
    Grid,
    Select,
    MenuItem,
    Box,
    Avatar,
    Typography,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { withSnackbar } from "notistack";
import { GET_PRODUCT_HYSTORIES } from "../../Queries";

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
            return: false,
            premium: false,
            checkedProducts: [],
            reason: "",
            editProductId: null,
            isOpenModal: false,
            historyProduct: null,
            productRequestHistory: [],
            isOpenHistoryModal: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenHistoryModal = this.onOpenHistoryModal.bind(this);
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
     * @summary Close History modal
     * @param {event}
     */
    onCloseHistoryModal() {
        this.setState({ isOpenHistoryModal: false });
    }

    /**
     * @summary Toggle product selection
     * @param {MouseEvent} event
     * @param {String} productid
     */
    onSelect(event, productId) {
        event.stopPropagation();

        let checkedProducts = this.state.checkedProducts;
        const index = checkedProducts.indexOf(productId);

        if (index === -1) {
            checkedProducts.push(productId);
        } else {
            checkedProducts.splice(index, 1);
        }

        this.setState({
            checkedProducts: checkedProducts,
        });
    }

    /**
     * @summary Toggle selections
     */
    onSelectAll(event, products) {
        event.stopPropagation();

        let checkedProducts = this.state.checkedProducts;

        if (checkedProducts.length > 0) {
            checkedProducts = [];
        } else {
            (products || []).map((item) => {
                checkedProducts.push(item.id);
            });
        }

        this.setState({
            checkedProducts: checkedProducts,
        });
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <Card className="customListTable mt-20">
                    {/* Rows per page */}
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12} className="text-right">
                                <span className="sort-by-product">정렬: </span>
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        labelId="sort-simple-select-label"
                                        id="sort-simple-select"
                                        onChange={
                                            this.props.handleOrderByProduct
                                        }
                                        value={this.props.orderBy}
                                    >
                                        <MenuItem value="registerDate">
                                            날짜
                                        </MenuItem>
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                        <MenuItem value="inventory">
                                            재고
                                        </MenuItem>
                                    </Select>
                                </FormControl>
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
                                            <TableCell>SKU</TableCell>
                                            <TableCell>
                                                상품명 / 카테고리
                                            </TableCell>
                                            <TableCell>브랜드 명</TableCell>
                                            <TableCell>일시</TableCell>
                                            <TableCell>실 무게</TableCell>
                                            <TableCell>부피 무게</TableCell>
                                            <TableCell>
                                                소비자 금액($)
                                            </TableCell>
                                            <TableCell>개수</TableCell>
                                            <TableCell>상태</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(
                                            this.props.data.getProducts.list ||
                                            []
                                        ).map((item) => {
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
                                                <TableRow key={item.id}>
                                                    <TableCell>
                                                        {item.sku}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            alignItems="center"
                                                            display="flex"
                                                        >
                                                            <Avatar
                                                                src={imageUrl}
                                                                variant="square"
                                                            ></Avatar>
                                                            <Typography
                                                                color="textPrimary"
                                                                variant="body1"
                                                                className="item-title"
                                                            >
                                                                <span className="product-name">
                                                                    {item.status ===
                                                                    "DECLINED" ? (
                                                                        <Link
                                                                            to={
                                                                                "/product/edit/" +
                                                                                item.id
                                                                            }
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </Link>
                                                                    ) : (
                                                                        item.name
                                                                    )}
                                                                </span>
                                                                {item.category}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.brand}
                                                    </TableCell>
                                                    <TableCell>
                                                        {moment(
                                                            item.shipmentDate
                                                        ).format("YYYY-MM-DD")}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.weight}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.volume}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.price}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            style={{
                                                                cursor: "pointer",
                                                                color: "#2196f3",
                                                            }}
                                                            onClick={(e) =>
                                                                this.onOpenHistoryModal(
                                                                    e,
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            {item.reqCount}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.status ===
                                                        "DECLINED" ? (
                                                            <Typography
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color: "#2196f3",
                                                                }}
                                                                onClick={(e) =>
                                                                    this.onOpenModal(
                                                                        e,
                                                                        item.id,
                                                                        item.reason
                                                                    )
                                                                }
                                                            >
                                                                {item.status}
                                                            </Typography>
                                                        ) : (
                                                            <Typography>
                                                                {item.status}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
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
                                this.props.data.getProducts.totalElements /
                                    this.props.pagination.rowsPerPage
                            )}
                            page={this.props.pagination.pageNumber}
                            onChange={this.props.handlePageNumber}
                            color="primary"
                            boundaryCount={100}
                        />
                    </Grid>
                </Grid>

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
                        <Link to={"/product/edit/" + this.state.editProductId}>
                            <Button color="primary">Modify product</Button>
                        </Link>
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
                                    <TableCell>Registered date</TableCell>
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
                                        key={this.state.historyProduct.id}
                                    >
                                        <TableCell>
                                            {this.state.historyProduct.sku}
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
                                                            .historyProduct.name
                                                    }
                                                </span>
                                                {
                                                    this.state.historyProduct
                                                        .category
                                                }
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            {this.state.historyProduct.brand}
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                this.state.historyProduct
                                                    .registerDate
                                            ).format("YYYY-MM-DD")}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.historyProduct.weight}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.historyProduct.volume}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                this.state.historyProduct
                                                    .tradePrice
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {this.state.historyProduct.price}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.historyProduct.reqCount}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                this.state.historyProduct
                                                    .inventory
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {moment(
                                                this.state.historyProduct
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
                                {(this.state.productRequestHistory || []).map(
                                    (history, index) => {
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
                                    }
                                )}
                            </TableBody>
                        </Table>
                    </DialogContent>

                    <Divider />
                    {/* Actions */}
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={this.onCloseHistoryModal.bind(this)}
                        >
                            Close
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
