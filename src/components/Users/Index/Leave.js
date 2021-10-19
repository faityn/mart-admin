import React from "react";
import { GET_LEAVE_USERS } from "../Queries";
import LeaveTable from "./LeaveTable";
import LeaveSearch from "./LeaveSearch";
import BaseList from "../../../core/common/List";
import { Grid, FormControlLabel, Radio } from "@material-ui/core";
import { tr } from "date-fns/locale";

/**
 * @summary Leave list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class LeaveList extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
        "status": "INACTIVE",
        "memberType": null,
        "age": null,
        "gender": null,
        "agreeEmail": false,
        "nation": null,
        "keyword": null
      },
      orderBy: "createdDate",
    });

    // Override
    this.query = GET_LEAVE_USERS;
    this.table = LeaveTable;

    // Events
    this.search = this.search.bind(this);
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenState) {
    this.setState({
      search: {
        status: childrenState.status,
      },
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* List section */}
        <div className="mt-20">
          <div className="card">
            <LeaveSearch search={this.search} />
          </div>
          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default LeaveList;
