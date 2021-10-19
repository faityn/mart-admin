import React from "react";
import { Query } from "react-apollo";
import Loading from "./Partials/Loading";
import Error from "./Partials/Error";
import Empty from "./Partials/Empty";

/**
 * @summary Base list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Core
 */
class List extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Default states
        this.state = {
            search: {},
            pagination: {
                rowsPerPage: 50,
                pageNumber: 1,
            },
            orderBy: "createdDate",
            type: "DESC",
            isShowSearchPanel: false,
        };

        // Events
        this.search = this.search.bind(this);
        this.handlePageNumber = this.handlePageNumber.bind(this);
        this.handleRowsPerPage = this.handleRowsPerPage.bind(this);
        this.handleOrderByProduct = this.handleOrderByProduct.bind(this);
        this.toggleSearchPanel = this.toggleSearchPanel.bind(this);

        // Query and table for list
        this.query = null;
        this.table = null;
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
     * @summary Toogle search panel
     */
    toggleSearchPanel() {
        this.setState({
            isShowSearchPanel: !this.state.isShowSearchPanel,
        });
    }

    /**
     * @summary Query for list
     */
    executeQuery(query, ListTable) {
        return (
            <Query
                query={this.query}
                variables={{
                    search: this.state.search,
                    page: {
                        limit: this.state.pagination.rowsPerPage,
                        pageNumber: this.state.pagination.pageNumber,
                        orderBy: this.state.orderBy,
                        type: this.state.type,
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

                    // List
                    return this.table ? (
                        <React.Fragment>
                            {data && loading ? <Loading /> : null}
                            <this.table
                                data={data}
                                search={this.search}
                                searchVariables={this.state.search}
                                pagination={this.state.pagination}
                                orderBy={this.state.orderBy}
                                type={this.state.type}
                                handleRowsPerPage={this.handleRowsPerPage}
                                handlePageNumber={this.handlePageNumber}
                                handleOrderByProduct={this.handleOrderByProduct}
                                refetch={refetch}
                            />
                        </React.Fragment>
                    ) : (
                        ""
                    );
                }}
            </Query>
        );
    }
}

export default List;
