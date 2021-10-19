import React from "react";
import Search from "./Search";
import { Grid, Button } from "@material-ui/core";

// Core
import BaseList from "../../../core/common/List";
import PageTitle from "../../../core/common/Partials/PageTitle";

// Icon
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// Query
import { GET_ORDER_REFUNDS } from "./Queries";

// Table
import OrderRefund from "./Table";
import moment from "moment";

/**
 * @summary Order Refund list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order Refund
 */
class List extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      isShowSearchPanel: false,
      search: {
        searchForm: null,
        keyword: "",
        type: "",
        status: "",
        startDate: null,
        endDate: null,
      },
      orderBy: "createdDate",
      type: "DESC"
    });

    // Override
    this.query = GET_ORDER_REFUNDS;
    this.table = OrderRefund;

    // Events
    this.onReset = this.onReset.bind(this);
  }

  /**
   * @summary Search
   * @param {Object} formData
   */
  search(formData) {
    this.setState({
      search: {
        searchForm: formData.get('searchForm'),
        keyword: formData.get('keyword'),
        type: formData.get('type'),
        status: formData.get('status'),
        startDate: formData.get('startDate') ? moment(formData.get('startDate'), "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD") : null,
        endDate: formData.get('endDate') ? moment(formData.get('endDate'), "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD") : null
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
        searchForm: null,
        keyword: "",
        type: "",
        status: "",
        startDate: null,
        endDate: null,
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
              menuName="Refund"
              title="Refund list"
              icon={<ArrowBackIcon />}
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
          </Grid>
        </Grid>

        {/* List section */}
        <div className="mt-20">
          {/* Search div */}
          {this.state.isShowSearchPanel ? (
            <div className="card">
              <Search search={this.search} onReset={this.onReset} />
            </div>
          ) : null}

          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default List;
