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
    Button,
    Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";
import { GET_PRODUCTS, DELETE_SELLER } from "../Queries";
import { DeleteForever } from "@material-ui/icons";

/**
 * @summary Seller list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class SellerTable extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            selectedSeller: null,
            sellerRequestHistory: [],
            isOpenDetailModal: false,
        };

        // Events
        this.onOpenDetailModal = this.onOpenDetailModal.bind(this);
    }

    /**
     * @summary Open detail modal
     * @param {event}
     */
    async onOpenDetailModal(e, seller) {
        let sellerRequestHistory = [];

        // Mutate
        await this.props.apolloClient.httpClient
            .query({
                query: GET_PRODUCTS,
                variables: {
                    search: {
                        isAdmin: true,
                        sellerId: seller.id,
                    },
                    page: {
                        limit: 10,
                        pageNumber: 1,
                        orderBy: "registerDate",
                        type: "DESC",
                    },
                },
            })
            .then((result) => {
                if (result && result.data) {
                    sellerRequestHistory = result.data.getProducts.list;
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            selectedSeller: seller,
            sellerRequestHistory: sellerRequestHistory,
            isOpenDetailModal: true,
        });
    }

    /**
     * @summary Close detail modal
     * @param {event}
     */
    onDeleteSeller(e, id) {
        this.props.apolloClient.uploadClient
            .mutate({
                mutation: DELETE_SELLER,
                variables: { ids: [id] },
            })
            .then((result) => {
                if (result.data.deleteUser.statusCode === 200) {
                    this.props.enqueueSnackbar("성공 했습니다.", {
                        variant: "success",
                    });
                }

                this.props.refetch();
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while delete seller.",
                    { variant: "error" }
                );
            });
    }

    /**
     * @summary Close detail modal
     * @param {event}
     */
    onCloseDetailModal() {
        this.setState({ isOpenDetailModal: false });
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
                                <span className="sort-by-product">
                                    Sort by:{" "}
                                </span>
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        labelId="sort-simple-select-label"
                                        id="sort-simple-select"
                                        onChange={
                                            this.props.handleOrderByProduct
                                        }
                                        value={this.props.orderBy}
                                    >
                                        <MenuItem value="created_date">
                                            Created date
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
                                            <TableCell>회사 이름</TableCell>
                                            <TableCell>가입 날짜</TableCell>
                                            <TableCell>ID</TableCell>
                                            <TableCell>연락처</TableCell>
                                            <TableCell>브랜드</TableCell>
                                            <TableCell>E-mail</TableCell>
                                            <TableCell>정산 계좌</TableCell>
                                            <TableCell>삭제</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {(
                                            this.props.data.getSellerList
                                                .list || []
                                        ).map((item, index) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    {item.companyName}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(
                                                        item.createdDate,
                                                        "YYYY-MM-DDTHH:mm:ssZ"
                                                    ).format("YYYY-MM-DD")}
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        style={{
                                                            cursor: "pointer",
                                                            color: "#2196f3",
                                                        }}
                                                        onClick={(e) =>
                                                            this.onOpenDetailModal(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                    >
                                                        {item.username}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    {item.phoneNumber}
                                                </TableCell>
                                                <TableCell>
                                                    {item.brand}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    {item.bank === null
                                                        ? "No input"
                                                        : item.bank +
                                                          ": " +
                                                          item.accountNumber}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={(e) =>
                                                            this.onDeleteSeller(
                                                                e,
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteForever />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </PerfectScrollbar>
                    </CardContent>

                    {/* Buttons */}
                    <CardActions>
                        <Grid container>
                            <Grid item xs={12} className="text-right">
                                <Link to="/partner/settlement-management">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        className="ml-20"
                                    >
                                        정산 관리
                                    </Button>
                                </Link>
                                <Link to="/partner/policy-management">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        className="ml-20"
                                    >
                                       정책 관리
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>

                {/* Pagination  */}
                <Grid container className="mt-20">
                    <Grid item xs={12}>
                        <PaginationMaterial
                            count={Math.ceil(
                                this.props.data.getSellerList.totalElements /
                                    this.props.pagination.rowsPerPage
                            )}
                            page={this.props.pagination.pageNumber}
                            onChange={this.props.handlePageNumber}
                            color="primary"
                        />
                    </Grid>
                </Grid>

                {/* Detail popup */}
                <Dialog
                    open={this.state.isOpenDetailModal}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="lg"
                >
                    {/* Title */}
                    <DialogTitle id="responsive-dialog-title">
                        <h2>Seller information</h2>
                    </DialogTitle>
                    <Divider />

                    {/* Content */}
                    <DialogContent>
                        <Table className="product-list">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Seller name</TableCell>
                                    <TableCell>Seller ID</TableCell>
                                    <TableCell>Phone number</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Bank account</TableCell>
                                </TableRow>
                            </TableHead>
                            {this.state.selectedSeller ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {this.state.selectedSeller.name}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller.username}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                this.state.selectedSeller
                                                    .phoneNumber
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller.email}
                                        </TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller.bank +
                                                ": " +
                                                this.state.selectedSeller
                                                    .accountNumber}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : null}
                        </Table>

                        <br />
                        {/* Downloads */}
                        <Table>
                            {this.state.selectedSeller ? (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Contract</TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller
                                                .agentCertificate ? (
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state
                                                            .selectedSeller
                                                            .agentCertificate
                                                    }
                                                >
                                                    Download
                                                </a>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Business Registration
                                        </TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller
                                                .businessCopy ? (
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state
                                                            .selectedSeller
                                                            .businessCopy
                                                    }
                                                >
                                                    Download
                                                </a>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            A copy of the passbook
                                        </TableCell>
                                        <TableCell>
                                            {this.state.selectedSeller
                                                .passbookCopy ? (
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state
                                                            .selectedSeller
                                                            .passbookCopy
                                                    }
                                                >
                                                    Download
                                                </a>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : null}
                        </Table>
                        <br />

                        <Table className="product-list mt-20">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Request date</TableCell>
                                    <TableCell>SKU</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Weight</TableCell>
                                    <TableCell>Product cost</TableCell>
                                    <TableCell>Sale price</TableCell>
                                    <TableCell>Request count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.sellerRequestHistory || []).map(
                                    (history, index) => {
                                        let request = history.request || {};
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {request.createdDate
                                                        ? moment(
                                                              request.createdDate,
                                                              "YYYY-MM-DDTHH:mm:ssZ"
                                                          ).format("YYYY-MM-DD")
                                                        : null}
                                                </TableCell>
                                                <TableCell>
                                                    {history.sku}
                                                </TableCell>
                                                <TableCell>
                                                    {history.name}
                                                </TableCell>
                                                <TableCell>
                                                    {history.weight}
                                                </TableCell>
                                                <TableCell>
                                                    {request.tradePrice}
                                                </TableCell>
                                                <TableCell>
                                                    {request.price}
                                                </TableCell>
                                                <TableCell>
                                                    {request.count}
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
                            onClick={this.onCloseDetailModal.bind(this)}
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

export default withSnackbar(connect(mapStateToProps, null)(SellerTable));
