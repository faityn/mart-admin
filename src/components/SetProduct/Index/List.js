import React from "react";
import BaseList from "../../../core/common/List";
import { GET_SET_PRODUCTS } from "../Queries";
import SetProductTable from "./Table";
import SetProductSearch from "./Search";
import PageTitle from "../../../core/common/Partials/PageTitle";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import CategoryIcon from "@material-ui/icons/Category";
import { Grid, Button } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Form from "../Form/Form";
import { Link } from "react-router-dom";

/**
 * @summary Set Product list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Set Product
 */
class SetProductList extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      product: "",
      search: {
        sku: "",
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "sku",
      type: "DESC",
      selectedProduct: "",
      isShowCreatePanel: false,
    });

    // Override
    this.query = GET_SET_PRODUCTS;
    this.table = SetProductTable;

    // Events
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
        // name: childrenState.search.name ? childrenState.search.name : null,
        sku: childrenState.search.sku ? childrenState.search.sku : null,
        firstCategory: this.state.search.firstCategory,
        secondCategory: this.state.search.secondCategory,
        thirdCategory: this.state.search.thirdCategory,
      },
    });
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event) {
    this.setState({
      search: {
        sku: "",
        firstCategory: "",
        secondCategory: "",
        thirdCategory: "",
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
            sku: this.state.search.sku,
            firstCategory: this.state.search.firstCategory,
            secondCategory: event.target.value,
            thirdCategory: this.state.search.thirdCategory,
          },
        });
      } else {
        this.setState({
          search: {
            sku: this.state.search.sku,
            firstCategory: this.state.search.firstCategory,
            secondCategory: null,
            thirdCategory: null,
          },
        });
      }
    } else if (level === 2) {
      this.setState({
        search: {
          sku: this.state.search.sku,
          firstCategory: this.state.search.firstCategory,
          secondCategory: this.state.search.secondCategory,
          thirdCategory: event.target.value,
        },
      });
    } else {
      if (event.target.value) {
        this.setState({
          search: {
            sku: this.state.search.sku,
            firstCategory: event.target.value,
            secondCategory: this.state.search.secondCategory,
            thirdCategory: this.state.search.thirdCategory,
          },
        });
      } else {
        this.setState({
          search: {
            sku: this.state.search.sku,
            firstCategory: null,
            secondCategory: null,
            thirdCategory: null,
          },
        });
      }
    }
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
              menuName="Set Product"
              title="Set Product list"
              icon={<CategoryIcon />}
            />
          </Grid>

          {/* Button section */}
          <Grid item xs={6} className="text-right">
            {/* Search */}
            <Button
              variant="contained"
              color="default"
              size="small"
              startIcon={
                this.state.isShowSearchPanel ? <ZoomOutIcon /> : <ZoomInIcon />
              }
              onClick={this.toggleSearchPanel}
            >
              Search
            </Button>

            {/* Create */}
            <Link to={"/setproduct/form/new"}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<AddIcon />}
                className="ml-20"
              >
                Create Set Product
              </Button>
            </Link>
          </Grid>
        </Grid>

        {/* List section */}
        <div className="mt-20">
          {/* {this.state.isShowCreatePanel ? 
          <Form />
         : null} */}

          {/* Search div */}
          {this.state.isShowSearchPanel ? (
            <div className="card">
              <SetProductSearch
                search={this.state.search}
                searchWord={this.search}
                handleCategory={this.handleCategory}
                onReset={this.onReset}
              />
            </div>
          ) : null}

          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default withSnackbar(SetProductList);
