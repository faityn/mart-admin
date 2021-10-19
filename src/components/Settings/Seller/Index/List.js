import React from "react";
import { GET_SELLERS } from "../Queries";
import BaseList from "../../../../core/common/List";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { Grid } from "@material-ui/core";
import Search from "./Search";

// Icon
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

// Table
import SellerTable from "./Table";

/**
 * @summary Seller list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Seller
 */
class List extends BaseList {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = Object.assign(this.state, {
            search: {
                name: "",
            },
            orderBy: "created_date",
            type: "DESC",
        });

        // Override
        this.query = GET_SELLERS;
        this.table = SellerTable;
    }

    /**
     * @summary Search
     * @param {String} childrenName
     * @param {String} childrenState
     */
    search(childrenName, childrenState) {
        this.setState({
            search: {
                name: childrenState.search.name
                    ? childrenState.search.name
                    : null,
                brand: childrenState.search.brand
                    ? childrenState.search.brand
                    : null,
                dateFrom: childrenState.search.dateFrom
                    ? childrenState.search.dateFrom
                    : null,
                dateTo: childrenState.search.dateTo
                    ? childrenState.search.dateTo
                    : null,
            },
        });
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <Grid container>
                    {/* Title section */}
                    <Grid item xs={6}>
                        <PageTitle
                            menuName="Partners"
                            title="Partner list"
                            icon={<LocalAtmIcon />}
                        />
                    </Grid>
                </Grid>

                {/* List section */}
                <div className="mt-20">
                    {/* Search div */}
                    <div className="card">
                        <Search
                            search={this.state.search}
                            searchWord={this.search}
                            handleCategory={this.handleCategory}
                            handleSticker={this.handleSticker}
                            handleDisplay={this.handleDisplay}
                            handleRegistrant={this.handleRegistrant}
                            onReset={this.onReset}
                        />
                    </div>

                    {/* List */}
                    {this.executeQuery()}
                </div>
            </React.Fragment>
        );
    }
}

export default List;
