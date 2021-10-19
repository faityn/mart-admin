import React from "react";
import { GET_PRODUCTS } from "../../Queries";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import ProductTable from "./Table";
import ProductSearch from "./Search";
import BaseList from "../../../../core/common/List";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { Grid, Switch, FormControlLabel, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * @summary Product list
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
                sku: "",
                firstCategory: "",
                secondCategory: "",
                thirdCategory: "",
                isAdmin: true,
                status: ["APPROVED", "PENDING3"],
            },
            orderBy: "registerDate",
            type: "DESC",
        });

        // Override
        this.query = GET_PRODUCTS;
        this.table = ProductTable;

        // Bind
        this.handleCategory = this.handleCategory.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    /**
     * @summary Search
     * @param {String} childrenName
     * @param {String} childrenState
     */
    search(childrenName, childrenState) {
        this.setState({
            search: {
                name:
                    childrenState.searchWord === "name"
                        ? childrenState.search.name
                        : null,
                sku:
                    childrenState.searchWord === "sku"
                        ? childrenState.search.sku
                        : null,
                firstCategory: this.state.search.firstCategory,
                secondCategory: this.state.search.secondCategory,
                thirdCategory: this.state.search.thirdCategory,
                isAdmin: true,
                status: this.state.search.status,
            },
        });
    }

    /**
     * @summary SearchByStatus
     * @param {MouseEvent} event
     */
    handleStatus(event) {
        event.preventDefault();

        let status =
            event.target.value === ""
                ? ["PENDING3", "ACCEPTED"]
                : [event.target.value];

        this.setState({
            search: {
                name: this.state.search.name,
                sku: this.state.search.sku,
                firstCategory: this.state.search.firstCategory,
                secondCategory: this.state.search.secondCategory,
                thirdCategory: this.state.search.thirdCategory,
                isAdmin: true,
                status: status,
            },
        });
    }

    /**
     * @summary SearchByCategory
     * @param {MouseEvent} event
     */
    handleCategory(event, level) {
        event.preventDefault();

        if (level === 1) {
            if (event.target.value) {
                this.setState({
                    search: {
                        name: this.state.search.name,
                        sku: this.state.search.sku,
                        firstCategory: this.state.search.firstCategory,
                        secondCategory: event.target.value,
                        thirdCategory: this.state.search.thirdCategory,
                        isAdmin: true,
                        status: this.state.search.status,
                    },
                });
            } else {
                this.setState({
                    search: {
                        name: this.state.search.name,
                        sku: this.state.search.sku,
                        firstCategory: this.state.search.firstCategory,
                        secondCategory: null,
                        thirdCategory: null,
                        isAdmin: true,
                        status: this.state.search.status,
                    },
                });
            }
        } else if (level === 2) {
            this.setState({
                search: {
                    name: this.state.search.name,
                    sku: this.state.search.sku,
                    firstCategory: this.state.search.firstCategory,
                    secondCategory: this.state.search.secondCategory,
                    thirdCategory: event.target.value,
                    isAdmin: true,
                    status: this.state.search.status,
                },
            });
        } else {
            if (event.target.value) {
                this.setState({
                    search: {
                        name: this.state.search.name,
                        sku: this.state.search.sku,
                        firstCategory: event.target.value,
                        secondCategory: this.state.search.secondCategory,
                        thirdCategory: this.state.search.thirdCategory,
                        isAdmin: true,
                        status: this.state.search.status,
                    },
                });
            } else {
                this.setState({
                    search: {
                        name: this.state.search.name,
                        sku: this.state.search.sku,
                        firstCategory: null,
                        secondCategory: null,
                        thirdCategory: null,
                        isAdmin: true,
                        status: this.state.search.status,
                    },
                });
            }
        }
    }

    /**
     * @summary onReset
     * @param {MouseEvent} event
     */
    onReset(event) {
        this.setState({
            search: {
                name: "",
                sku: "",
                firstCategory: "",
                secondCategory: "",
                thirdCategory: "",
                isAdmin: true,
                status: ["PENDING3", "ACCEPTED"],
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
                            // menuName="Warehousing status"
                            menuName="창고 현황"
                            // title="Warehousing status"
                            title="창고 현황"
                            icon={<AvTimerIcon />}
                        />
                    </Grid>
                </Grid>

                {/* List section */}
                <div className="mt-20">
                    {/* Search */}
                    <div className="card">
                        <ProductSearch
                            search={this.state.search}
                            searchWord={this.search}
                            handleCategory={this.handleCategory}
                            handleStatus={this.handleStatus}
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
