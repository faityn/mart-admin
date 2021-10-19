import React from 'react';
import QnaSearch from './Search';
import { Grid, Switch, FormControlLabel, Button } from '@material-ui/core';

// Core
import BaseList from '../../../core/common/List';
import PageTitle from '../../../core/common/Partials/PageTitle';

// Icon
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ForumIcon from '@material-ui/icons/Forum';
import AddIcon from '@material-ui/icons/Add';

// Query
import { GET_QNAS } from '../../Queries/Queries';

// Table
import ConsultationTable from './Table';

/**
 * @summary Consultation list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Consultation
 */
class List extends BaseList {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
        title: "",
        categories: [],
        status: "",
        userName: "",
        startDate: null,
        endDate: null
      },
      orderBy: "createdDate",
      type: "DESC"
    }); 

    // Override
    this.query = GET_QNAS;
    this.table = ConsultationTable;

    // Events
    this.onReset = this.onReset.bind(this);
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenState){
    this.setState({
      search: {
        title: childrenState.title,
        categories: childrenState.categories,
        status: childrenState.status,
        userName: childrenState.userName,
        startDate: childrenState.startDate,
        endDate: childrenState.endDate
      }
    });
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event){
    this.setState({
      search: {
        title: "",
        categories: [],
        status: "",
        userName: "",
        startDate: null,
        endDate: null
      }
    });
  }

  /**
   * @override
   */
  render(){
    return <React.Fragment>
      <Grid container>
        {/* Title section */}
        <Grid item xs={6}>
          <PageTitle 
            menuName="Consult" 
            title="Consultation Management List" 
            icon={<ForumIcon />}
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
            onClick={this.toggleSearchPanel}>
              Search
          </Button>
        </Grid>
      </Grid>

      {/* List section */}
      <div className="mt-20">
        {/* Search div */}
        {this.state.isShowSearchPanel ? 
          <div className="card">
            <QnaSearch 
              search={this.search}
              onReset={this.onReset}
            />
          </div> : null}

        {/* List */}
        {this.executeQuery()}
      </div>
    </React.Fragment>;
  }
}

export default List;