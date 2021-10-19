import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Member from './Member';
import Dormant from './Dormant';
import Leave from './Leave';
import PageTitle from '../../../core/common/Partials/PageTitle';
import GroupIcon from '@material-ui/icons/Group';
import { 
  Grid, 
} from '@material-ui/core';

/**
 * @summary User List
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package User
 */
export default class List extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // state
    this.state = {
      value: 0,
    }

    // Events
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  /**
   * @summary Handle tabs on change
   * @param {int} newValue 
   */
  handleChangeTab(event, newValue) {
    this.setState({
      value: newValue
    });
  };

  /**
   * @summary Tab attributes
   * @param {int} index 
   */
  tabProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  /**
   * @override
   */
  render() {
    // Form
    return <React.Fragment>
      {/* Title section */}
      <Grid container>
        <Grid item xs={6}>
          {/* Title */}
          <PageTitle 
            menuName="Member"  
            title="Member Management" 
            icon={<GroupIcon />} 
          />
        </Grid>
      </Grid>

      {/* Form section */}
      {/* Tabs */}
      <div className="card mt-20">
        <Paper>
          <Tabs
            textColor="primary"
            value={this.state.value}
            onChange={this.handleChangeTab}
            variant="fullWidth"
          >
            <Tab label="Member" {...this.tabProps(0)} />
            <Tab label="Dormant member" {...this.tabProps(1)} />
            <Tab label="Member withdrawal" {...this.tabProps(2)} />
          </Tabs> 
        </Paper>

        {/* SwipeableViews */}
        <SwipeableViews
          index={this.state.value}
        > 
          {/* Basic content */}
          <div value={this.state.value} index={0} className="mt-20">
            <Member />
          </div>

          {/* Price Reserve information content */}
          <div value={this.state.value} index={1} className="mt-20">
            <Dormant />
          </div>

          {/* Option content */}
          <div value={this.state.value} index={2} className="mt-20">
            <Leave />
          </div>

        </SwipeableViews>
      </div>
    </React.Fragment>;
  }
}