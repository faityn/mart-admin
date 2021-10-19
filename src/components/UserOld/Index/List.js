import React from 'react';
import { GET_PRODUCTS } from "../Queries";
import BaseList from '../../../core/common/List';
import UserTable from "./Table";
import PageTitle from '../../../core/common/Partials/PageTitle';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AddIcon from '@material-ui/icons/Add';
import ProductSearch from './SearchFilter';
import {
  Grid, 
  Switch, 
  FormControlLabel, 
  Button
} from '@material-ui/core';


class ProductList extends BaseList {
  
  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, { 
      search: {
        category: "",
        code: ""
      }
    }); 

    // Override
    this.query = GET_PRODUCTS;
    this.table = UserTable;
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenName, childrenState){
    this.setState({
      search: {
        category: childrenState.search.category,
        code: childrenState.search.code,
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
            menuName="Users" 
            title="Users list" 
            icon={<GroupAddIcon />} 
          />
        </Grid>

        {/* Button section */}
        <Grid item xs={6} className="text-right">
          {/* Display on/off */}
          <FormControlLabel 
            control={
              <Switch name="checkedB" color="primary" />
            } 
            label="Display On/Off" 
          />

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

          {/* Create */}
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            startIcon={<AddIcon />} 
            className="ml-20" 
            href="/users/create"
          >
            Create
          </Button>
        </Grid>
      </Grid>

      {/* List section */}
      <div className="mt-20">
        {/* Search div */}
        {this.state.isShowSearchPanel ? <div className="card"><ProductSearch search={this.search} /></div> : null}
        
        {/* List */}
        {this.executeQuery()}
      </div>
    </React.Fragment>;
  }
};

export default ProductList;
