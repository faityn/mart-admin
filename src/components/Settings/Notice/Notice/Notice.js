import React from "react";
import { GET_NOTICES } from "../Queries";
import BaseList from "../../../../core/common/List";
import NoticeTable from "./NoticeTable";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class Notice extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {},
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
    });

    // Override
    this.query = GET_NOTICES;
    this.table = NoticeTable;

    // Event
    this.search = this.search.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenState){
    this.setState({
      search: {}
    }); 
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event){
    this.setState({
      search: {}
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
          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default Notice;
