import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import PageTitle from "../../../../core/common/Partials/PageTitle";
// Icon
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { Query } from "react-apollo";
import Loading from "../../../../core/common/Partials/Loading";
import Error from "../../../../core/common/Partials/Error";
import Empty from "../../../../core/common/Partials/Empty";
import { GET_SELLER_PRODUCT_HISTORY } from "../Queries";
import Table from "./Table";
import Search from "./Search";
import { useSelector } from "react-redux";

const History = () => {
    const { loggedUser } = useSelector((state) => state);
    const [history, setHistory] = useState({
        search: {
            paymentStatus: true,
            sellerName:
                loggedUser.roleName === "ROLE_SELLER" ? loggedUser.email : null,
            centerWarehouse: false,
            insideWarehouse: false,
            status: null,
            sku: null,
            brand: null,
            description: null,
            startDate: null,
            endDate: null,
            price: null,
        },
        pagination: {
            rowsPerPage: 50,
            pageNumber: 1,
        },
        orderBy: "createdDate",
        type: "DESC",
        isShowSearchPanel: false,
    });

    const search = (childrenName, childrenState) => {
        setHistory({
            ...history,
            search: {
                paymentStatus: true,
                sellerName:
                    loggedUser.roleName === "ROLE_SELLER"
                        ? loggedUser.email
                        : childrenState.search.sellerName,
                centerWarehouse: childrenState.search.centerWarehouse
                    ? childrenState.search.centerWarehouse === true
                        ? true
                        : false
                    : false,
                insideWarehouse: childrenState.search.insideWarehouse
                    ? childrenState.search.insideWarehouse === true
                        ? true
                        : false
                    : false,
                status:
                    childrenState.search.chooseStatus.length > 0
                        ? childrenState.search.chooseStatus
                        : null,
                sku: childrenState.search.sku ? childrenState.search.sku : null,
                brand: childrenState.search.brand
                    ? childrenState.search.brand
                    : null,
                description: childrenState.search.description
                    ? childrenState.search.description
                    : null,
                startDate: childrenState.search.startDate
                    ? childrenState.search.startDate
                    : null,
                endDate: childrenState.search.endDate
                    ? childrenState.search.endDate
                    : null,
                price: childrenState.search.supplyPrice
                    ? childrenState.search.supplyPrice
                    : null,
            },
        });
    };

    const handlePageNumber = () => {
        setHistory({
            ...history,
            pagination: Object.assign(this.state.pagination, {
                pageNumber: pageNumber,
            }),
        });
    };

    const handleRowsPerPage = (e) => {
        setHistory({
            ...history,
            pagination: {
                rowsPerPage: e.target.value,
                pageNumber: 1,
            },
        });
    };

    const handleOrderByProduct = (e) => {
        setHistory({
            orderBy: e.target.value,
        });
    };
    return (
        <>
            <Grid container>
                {/* Title section */}
                <Grid item xs={6}>
                    <PageTitle
                        menuName="정산 목록"
                        title="정산 목록"
                        icon={<LocalAtmIcon />}
                    />
                </Grid>
            </Grid>
            {/* List section */}
            <div className="mt-20">
                {/* Search div */}
                <div className="card">
                    <Search
                        search={history.search}
                        searchWord={search}
                        // handleCategory={this.handleCategory}
                        // handleSticker={this.handleSticker}
                        // handleDisplay={this.handleDisplay}
                        // handleRegistrant={this.handleRegistrant}
                        // onReset={this.onReset}
                    />
                </div>
                <Query
                    query={GET_SELLER_PRODUCT_HISTORY}
                    variables={{
                        search: history.search,
                        page: {
                            limit: history.pagination.rowsPerPage,
                            pageNumber: history.pagination.pageNumber,
                            orderBy: history.orderBy,
                            type: history.type,
                        },
                    }}
                >
                    {({ data, loading, error, refetch, subscribeToMore }) => {
                        // Error
                        if (error) {
                            return <Error data={data} />;
                        }

                        // Loading
                        if (!data && loading) {
                            return <Loading />;
                        }

                        // Empty data
                        if (!data) {
                            return <Empty data={data} />;
                        }
                        if (data) {
                            let listData = data.getSellerProductHistory.list;
                            let paid_num = [];

                            listData.map((e, n) => {
                                let tempKey = "";

                                if (e.paidNumber === null) {
                                    tempKey = "null";
                                } else {
                                    tempKey = e.paidNumber;
                                }

                                if (
                                    paid_num.hasOwnProperty(tempKey) === false
                                ) {
                                    paid_num[tempKey] = new Array();
                                }

                                paid_num[tempKey].push(e);
                            });

                            return (
                                <Table
                                    data={data}
                                    calData={paid_num}
                                    search={search}
                                    searchVariables={history.search}
                                    pagination={history.pagination}
                                    orderBy={history.orderBy}
                                    type={history.type}
                                    handleRowsPerPage={handleRowsPerPage}
                                    handleOrderByProduct={handleOrderByProduct}
                                    refetch={refetch}
                                />
                            );
                        }
                    }}
                </Query>
            </div>
        </>
    );
};

export default History;
