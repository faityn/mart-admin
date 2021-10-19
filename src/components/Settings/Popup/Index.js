import React from 'react';
import PageTitle from "../../../core/common/Partials/PageTitle";
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Grid
}
from '@material-ui/core';
import { GET_POPUPS } from "./Queries";
import BaseList from "../../../core/common/List";
import Table from "./Table";

class Popup extends BaseList {

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
    this.query = GET_POPUPS;
    this.table = Table;

    // Event
    this.search = this.search.bind(this);
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

  
  render() {
    return <React.Fragment>
      {/* Title section */}
      <Grid container>
        <Grid item>
          {/* Title */}
          <PageTitle
            menuName="Popup list"
            title="Popup list setting"
            icon={<SettingsIcon />}
          />
        </Grid>
      </Grid>

      
      {/* List section */}
      <div className="mt-20">
        {/* List */}
        {this.executeQuery()}
      </div>

    </React.Fragment>
  }
}

export default Popup;