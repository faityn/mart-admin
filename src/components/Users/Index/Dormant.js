import React from 'react';
import { GET_USERS } from "../Queries";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import DormantSearch from './DormantSearch';
import DormantTable from './DormantTable';
import BaseList from '../../../core/common/List';
import { Grid, Button } from '@material-ui/core';

/**
 * @summary Dormant list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class DormantList extends BaseList {

  /**
   * @constructor
   */
  constructor(props){
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
      orderBy: "status"
    }); 

    // Override
    this.query = GET_USERS;
    this.table = DormantTable;
  }

  /**
     * @summary Search
     * @param {String} childrenName
     * @param {String} childrenState
     */
   search(childrenState) {
    this.setState({
        search: {
            "status": this.state.search.status,
            "memberType": childrenState.memberType.length > 0 ? childrenState.memberType : null,
            "age": childrenState.age.length > 0 ? childrenState.age : null,
            "gender": childrenState.gender.length > 0 ? childrenState.gender : null,
            "agreeEmail": childrenState.agreeEmail,
            "nation": childrenState.nation ? childrenState.nation : null,
            "keyword": childrenState.name ? childrenState.name : null
        },
    });
  }

  /**
   * @override
   */
  render(){
    return <React.Fragment>
      <Grid container>

        {/* Button section */}
        <Grid item xs={12} className="text-right">
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
        {/* Search */}
        {this.state.isShowSearchPanel ? <div className="card"><DormantSearch search={this.search} /></div> : null}

        {/* List */}
        {this.executeQuery()}
      </div>
    </React.Fragment>;
  }
}

export default DormantList;