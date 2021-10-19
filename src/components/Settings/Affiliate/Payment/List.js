import React from 'react';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import AddIcon from '@material-ui/icons/Add';
import AffiliateTable from './Table';
import BaseList from '../../../../core/common/List';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PageTitle from '../../../../core/common/Partials/PageTitle';
import { 
  Grid,
  Button 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { GET_AFFILIATE_PAYMENT_LIST } from "../../../Queries/Affiliate";
import PaymentSearch from './Search';

/**
 * @summary Affiliate list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Affiliate
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
      },
      orderBy: "created_date",
      type: "DESC",
    }); 

    // Override
    this.query = GET_AFFILIATE_PAYMENT_LIST;
    this.table = AffiliateTable;

    this.search = this.search.bind(this);
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
        ...(childrenState.affiliateName.length > 0 ? { affiliateName: childrenState.affiliateName } : {}),
        ...(childrenState.pendingChecked === true ? { status: 'PENDING' } : {}),
      },
      pagination: {
        ...this.state.pagination,
        pageNumber: 1,
      },
    }); 
  }

  onReset(event) {
    this.setState({
      search: {},
      pagination: {
        ...this.state.pagination,
        pageNumber: 1,
      },
    });
  }


  /**
   * @override
   */
  render() {
    return <React.Fragment>
      <Grid container>
        {/* Title section */}
        <Grid item xs={6}>
          <PageTitle 
            menuName="Affiliate payment" 
            title="Affiliate payment" 
            icon={<PhotoAlbumIcon />} 
          />
        </Grid>

        {/* Button section */}
        <Grid item xs={6} className="text-right">
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
            <PaymentSearch 
              search={this.state.search} 
              searchWord={this.search} 
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