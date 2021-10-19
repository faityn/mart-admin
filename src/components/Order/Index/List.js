import React from "react";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Pending from "./Pending/Pending";
import Unshipped from "./Unshipped/Unshipped";
import Ready from "./Ready/Ready";
import Shipped from "./Shipped/Shipped";
import Cancelled from "./Cancelled/Cancelled";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { GET_ORDERS, GET_CATEGORIES } from "../../Queries/Queries";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

// function TabPanel
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

// function a11yprops
function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

/**
 * @summary Order list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order
 */
class List extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            value: 0,
            orders: null,
            categories: {
                first: [],
                second: [],
                third: [],
            },
            search: {
                status: "PENDING",
                orderNumber: "",
                category: "",
                qrVerification: null,
                shippingCountry: "",
                shippingType: "",
            },
            pagination: {
                rowsPerPage: 10,
                pageNumber: 1,
            },
            orderBy: "createdDate",
            type: "DESC",
            load: false,
        };

        // Bind
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIndex = this.handleChangeIndex.bind(this);
        this.handlePageNumber = this.handlePageNumber.bind(this);
        this.handleRowsPerPage = this.handleRowsPerPage.bind(this);
        this.handleOrderByProduct = this.handleOrderByProduct.bind(this);
    }

    /**
     * @summary Load products
     */
    async loadOrders() {
        await this.props.apolloClient.httpClient
            .query({
                query: GET_ORDERS,
                variables: {
                    search: this.state.search,
                    page: {
                        limit: this.state.pagination.rowsPerPage,
                        pageNumber: this.state.pagination.pageNumber,
                        orderBy: this.state.orderBy,
                        type: this.state.type,
                    },
                },
            })
            .then((result) => {
                this.setState({
                    orders: result.data.getOrders,
                });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
    }

    /**
     * @summary Load categories
     */
    async loadCategories() {
        await this.props.apolloClient.httpClient
            .query({
                query: GET_CATEGORIES,
            })
            .then((result) => {
                this.setState({
                    categories: result.data.categories,
                });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
    }

    /**
     * @override
     */
    async componentDidUpdate(prevProps, prevState) {
        console.log(this.state.pagination.pageNumber);
        console.log(
            "prevState.pagination.pageNumber",
            prevState.pagination.pageNumber
        );
        if (prevState.search !== this.state.search) {
            this.loadOrders();
        }

        if (prevState.load !== this.state.load) {
            this.loadOrders();

            this.setState({
                load: false,
            });
        }
    }

    /**
     * @override
     */
    async componentDidMount() {
        // Orders function
        this.loadOrders();

        // Category function
        this.loadCategories();
    }

    /**
     * @summary Search
     * @param {String} childrenName
     * @param {String} childrenState
     */
    search(childrenState) {
        this.setState({
            search: {
                status: this.state.search.status,
                orderNumber: childrenState.orderNumber
                    ? childrenState.orderNumber
                    : this.state.search.orderNumber,
                category: childrenState.firstCategory
                    ? childrenState.firstCategory
                    : this.state.search.category,
                qrVerification: childrenState.qrVertifcation
                    ? childrenState.qrVertifcation
                    : this.state.search.qrVertifcation,
                shippingCountry: childrenState.shippingCountry
                    ? childrenState.shippingCountry
                    : this.state.search.shippingCountry,
                shippingType: childrenState.shippingOptions
                    ? childrenState.shippingOptions
                    : this.state.search.shippingType,
            },
        });
    }

    /**
     * @summary handleChange
     * @param {int} newValue
     */
    handleChange(event, newValue) {
        this.setState({
            value: newValue,
            pagination: {
                ...this.state.pagination,
                pageNumber: 1,
            },
        });

        if (newValue === 0) {
            this.setState({
                search: { status: "PENDING" },
            });
        } else if (newValue === 1) {
            this.setState({
                search: { status: "UNSHIPPED" },
            });
        } else if (newValue === 2) {
            this.setState({
                search: { status: "READY" },
            });
        } else if (newValue === 3) {
            this.setState({
                search: { status: "SHIPPED" },
            });
        } else if (newValue === 4) {
            this.setState({
                search: { status: "CANCELLED" },
            });
        }
    }

    onChangeRefresh() {
        this.setState({
            search: {
                status: this.state.search.status,
                orderNumber: "",
                category: "",
                qrVerification: false,
                shippingCountry: "",
                shippingType: "",
            },
        });
    }

    /**
     * @summary handleChangeIndex
     * @param {int} index
     */
    handleChangeIndex(index) {
        this.setState({
            value: index,
        });
    }

    /**
     * @summary Change page number
     * @param {int} pageNumber
     */
    handlePageNumber(event, pageNumber) {
        this.setState({
            pagination: Object.assign(this.state.pagination, {
                pageNumber: pageNumber,
            }),
        });
    }

    /**
     * @summary Change rows per page
     * @param {MouseEvent} event
     */
    handleRowsPerPage(event) {
        this.setState({
            pagination: {
                rowsPerPage: event.target.value,
                pageNumber: 1,
            },
        });
    }

    /**
     * @summary Change product sort
     * @param {MouseEvent} event
     */
    handleOrderByProduct(event) {
        this.setState({
            orderBy: event.target.value,
        });
    }

    /**
     * @summary Change product sort
     * @param {MouseEvent} event
     */
    handleChangeLoad() {
        this.setState({
            load: true,
        });
    }

    /**
     * @override
     */
    render() {
        let isShowForm = this.state.orders || this.state.categories;

        if (!this.state.orders) return <LinearProgress />;

        // Form
        return (
            <React.Fragment>
                {/* Title section */}
                <Grid container>
                    <Grid item xs={6}>
                        {/* Title */}
                        <PageTitle
                            menuName="Orders"
                            title="Orders list"
                            icon={<StorefrontIcon />}
                        />
                    </Grid>
                </Grid>
                {/* End Title section */}

                {/* Tabs */}
                <div className="card mt-20">
                    <Paper>
                        <Tabs
                            textColor="primary"
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="fullWidth"
                        >
                            <Tab label="Pending" {...a11yProps(0)} />
                            <Tab label="Unshipped" {...a11yProps(1)} />
                            <Tab label="Ready" {...a11yProps(2)} />
                            <Tab label="Shipped" {...a11yProps(3)} />
                            <Tab label="Cancelled" {...a11yProps(4)} />
                        </Tabs>
                    </Paper>
                    {/* SwipeableViews */}
                    <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        {/* Pending content */}
                        <div value={this.state.value} index={0}>
                            <Pending
                                isShowForm={isShowForm}
                                search={this.search}
                                status={this.state.search.status}
                                categories={this.state.categories}
                                data={this.state.orders}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                onChangeRefresh={this.onChangeRefresh.bind(
                                    this
                                )}
                                handleChangeLoad={this.handleChangeLoad.bind(
                                    this
                                )}
                                handlePaging={this.loadOrders.bind(this)}
                            />
                        </div>
                        {/* End Pending content */}

                        {/* Unshipped information content */}
                        <div value={this.state.value} index={1}>
                            <Unshipped
                                isShowForm={isShowForm}
                                search={this.search}
                                status={this.state.search.status}
                                categories={this.state.categories}
                                data={this.state.orders}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                onChangeRefresh={this.onChangeRefresh.bind(
                                    this
                                )}
                                handleChangeLoad={this.handleChangeLoad.bind(
                                    this
                                )}
                                handlePaging={this.loadOrders.bind(this)}
                            />
                        </div>
                        {/* End Unshipped information content */}

                        {/* Ready content */}
                        <div value={this.state.value} index={2}>
                            <Ready
                                isShowForm={isShowForm}
                                search={this.search}
                                status={this.state.search.status}
                                categories={this.state.categories}
                                data={this.state.orders}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                onChangeRefresh={this.onChangeRefresh.bind(
                                    this
                                )}
                                handleChangeLoad={this.handleChangeLoad.bind(
                                    this
                                )}
                                handlePaging={this.loadOrders.bind(this)}
                            />
                        </div>
                        {/* End Ready content */}

                        {/* Shipped content */}
                        <div value={this.state.value} index={3}>
                            <Shipped
                                isShowForm={isShowForm}
                                search={this.search}
                                status={this.state.search.status}
                                categories={this.state.categories}
                                data={this.state.orders}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                onChangeRefresh={this.onChangeRefresh.bind(
                                    this
                                )}
                                handleChangeLoad={this.handleChangeLoad.bind(
                                    this
                                )}
                                handlePaging={this.loadOrders.bind(this)}
                            />
                        </div>
                        {/* End Shipped content */}

                        {/* Cancelled content */}
                        <div value={this.state.value} index={4}>
                            <Cancelled
                                isShowForm={isShowForm}
                                search={this.search}
                                status={this.state.search.status}
                                categories={this.state.categories}
                                data={this.state.orders}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                onChangeRefresh={this.onChangeRefresh.bind(
                                    this
                                )}
                                handleChangeLoad={this.handleChangeLoad.bind(
                                    this
                                )}
                                handlePaging={this.loadOrders.bind(this)}
                            />
                        </div>
                        {/* End Cancelled content */}
                    </SwipeableViews>
                    {/* End SwipeableViews */}
                </div>
                {/* End Tabs */}
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

export default withSnackbar(connect(mapStateToProps, null)(List));
