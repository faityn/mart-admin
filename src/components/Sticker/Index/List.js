import React from 'react';
import { GET_STICKERS, SAVE_STICKER } from "../Queries";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StickerTable from './Table';
import BaseList from '../../../core/common/List';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import PageTitle from '../../../core/common/Partials/PageTitle';
import { 
  Grid, 
  Button,
} from '@material-ui/core';
import StickerForm from '../Form/Form';

/**
 * @summary Product list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class List extends BaseList {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, { 
      open: false,
      dropzone: false
    }); 

    // Override
    this.query = GET_STICKERS;
    this.table = StickerTable;

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenName, childrenState){
  }


  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpen() {
    this.setState({open: true});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleClose() {
    this.setState({open: false});
  };

  /**
   * @override
   */
  render(){

    return <React.Fragment>
      <Grid container>
        {/* Title section */}
        <Grid item xs={6}>
          <PageTitle 
            menuName="Stickers" 
            title="Sticker list" 
            icon={<LoyaltyIcon />} 
          />
        </Grid>

        {/* Button section */}
        <Grid item xs={6} className="text-right">

          {/* Create */}
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            startIcon={this.state.open === true ? <RemoveIcon/> : <AddIcon />} 
            className="ml-20" 
            onClick={this.handleClickOpen}
          >
            Create sticker
          </Button>
        </Grid>
      </Grid>

      {/* List section */}
      <div className="mt-20">        
        {/* List */}
        {this.executeQuery()}
      </div>

      <StickerForm open={this.state.open} handleClose={this.handleClose} />
    </React.Fragment>;
  }
}

export default List;