import React from "react";
import { GET_SELLER_PRODUCT_HISTORY } from "../Queries";
import EqualizerIcon from "@material-ui/icons/Equalizer";
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
      "search": {
        "paymentStatus": null,
        "sellerName": null,
        "centerWarehouse": false,
        "insideWarehouse": false,
        "status": null,
        "sku": null,
        "brand": null,
        "description": null,
        "startDate": null,
        "endDate": null,
        "price": null
      },
      orderBy: "createdDate",
      type: "DESC",
    });

    // Override
    this.query = GET_SELLER_PRODUCT_HISTORY;
    this.table = ProductTable;
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenName, childrenState) {
 
    this.setState({
      search: {
        "paymentStatus": childrenState.search.paymentStatus ? (childrenState.search.paymentStatus === "true" ? true : false) : null,
        "sellerName": childrenState.search.sellerName ? childrenState.search.sellerName : null,
        "centerWarehouse": childrenState.search.centerWarehouse ? (childrenState.search.centerWarehouse === true ? true : false) : false,
        "insideWarehouse": childrenState.search.insideWarehouse ? (childrenState.search.insideWarehouse === true ? true : false) : false,
        "status": childrenState.search.chooseStatus.length > 0 ? childrenState.search.chooseStatus : null,
        "sku": childrenState.search.sku ? childrenState.search.sku : null,
        "brand": childrenState.search.brand ? childrenState.search.brand : null,
        "description": childrenState.search.description ? childrenState.search.description : null,
        "startDate": childrenState.search.startDate ? childrenState.search.startDate : null,
        "endDate": childrenState.search.endDate ? childrenState.search.endDate : null,
        "price": childrenState.search.supplyPrice ? childrenState.search.supplyPrice : null
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
              menuName="Sales status and settlement"
              title="Sales status and settlement list"
              icon={<EqualizerIcon />}
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
