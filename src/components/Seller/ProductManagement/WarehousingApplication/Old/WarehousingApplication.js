import React from "react";
import { GET_PRODUCTS } from "../../Queries";
import AppsIcon from "@material-ui/icons/Apps";
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
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
        sticker: null,
        isDisplay: null,
        isAdmin: true,
        status: ["CREATED"],
      },
      orderBy: "name",
      type: "ASC",
    });

    // Override
    this.query = GET_PRODUCTS;
    this.table = ProductTable;

    // Bind
    this.handleCategory = this.handleCategory.bind(this);
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
        name: childrenState.search.name ? childrenState.search.name : null,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
        isDisplay: null,
        isAdmin: true,
        status: ["CREATED"],
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
            firstCategory: this.state.search.firstCategory,
            secondCategory: event.target.value,
            thirdCategory: this.state.search.thirdCategory,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            status: ["CREATED"],
          },
        });
      } else {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: this.state.search.firstCategory,
            secondCategory: null,
            thirdCategory: null,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            status: ["CREATED"],
          },
        });
      }
    } else if (level === 2) {
      this.setState({
        search: {
          name: this.state.search.name,
          firstCategory: this.state.search.firstCategory,
          secondCategory: this.state.search.secondCategory,
          thirdCategory: event.target.value,
          sticker: this.state.search.sticker,
          isDisplay: this.state.search.isDisplay,
          isAdmin: true,
          status: ["CREATED"],
        },
      });
    } else {
      if (event.target.value) {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: event.target.value,
            secondCategory: this.state.search.secondCategory,
            thirdCategory: this.state.search.thirdCategory,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            status: ["CREATED"],
          },
        });
      } else {
        this.setState({
          search: {
            name: this.state.search.name,
            firstCategory: null,
            secondCategory: null,
            thirdCategory: null,
            sticker: this.state.search.sticker,
            isDisplay: this.state.search.isDisplay,
            isAdmin: true,
            status: ["CREATED"],
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
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
        sticker: null,
        isDisplay: null,
        isAdmin: true,
        status: ["CREATED"],
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
              menuName="Warehousing application"
              title="Warehousing application"
              icon={<AppsIcon />}
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
