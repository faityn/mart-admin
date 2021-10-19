import React from 'react';
import BaseList from '../../../core/common/List';
import {
  GET_COUPONS
}
from '../../Queries/Queries';
import CouponTable from './Table';
import AddIcon from '@material-ui/icons/Add';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PageTitle from '../../../core/common/Partials/PageTitle';
import { 
  Grid,
  Button,
  FormControlLabel ,
  RadioGroup,
  Radio,
  Card,
  CardContent
} from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 * @summary Coupon list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Coupon
 */
class CouponList extends BaseList {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, { 
      search: {
        "status": ""
      },
      orderBy: "code",
      type: "DESC",
      active: true,
      notActive: false,
    }); 

    // Override
    this.query = GET_COUPONS;
    this.table = CouponTable;
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenName, childrenState){
    this.setState({
      search: {
      }
    }); 
  }

  onChangeActive(event) {
    this.setState({
      active: event.target.value
    });

    if(event.target.value === "") {
      this.setState({
        search: {
          "status": null
        }
      });
    } else {
      this.setState({
        search: {
          "status": event.target.value
        }
      });
    }
  }


  render() {
    return <React.Fragment>
      <Grid container>
        {/* Title section */}
        <Grid item xs={6}>
          <PageTitle 
            menuName="Coupons" 
            title="Coupon list" 
            icon={<ConfirmationNumberIcon />} 
          />
        </Grid>

        {/* Button section */}
        <Grid item xs={6} className="text-right">
          {/* Create */}
          <Link to="/settings/operation/coupon/create">
            <Button 
              variant="contained" 
              color="primary" 
              size="small" 
              startIcon={<AddIcon />} 
              className="ml-20"
            >
              Create
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <RadioGroup aria-label="gender" name="gender1" value={this.state.active} onChange={this.onChangeActive.bind(this)}>
                <FormControlLabel value="" control={<Radio />} label="All" />
                <FormControlLabel value="ACTIVE" control={<Radio />} label="Active" />
                <FormControlLabel value="NOTACTIVE" control={<Radio />} label="Not active" />
              </RadioGroup>
            </CardContent>
          </Card>
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

export default CouponList;