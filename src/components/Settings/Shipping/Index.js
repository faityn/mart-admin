import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import PageTitle from '../../../core/common/Partials/PageTitle';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { 
  Grid, 
  Divider,
  Tabs,
  Tab
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import DHL from './DHL';
import KPACKET from './KPACKET';

/**
 * @summary Shipping
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Shipping extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // state
    this.state = {
      tabIndex: 0,
    }

    // Events
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  /**
   * @summary Change tab
   * @param {MouseEvent} event 
   * @param {int} newValue 
   */
  onChangeTab(event, index) {
    event.stopPropagation();

    this.setState({
      tabIndex: index
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
    return <React.Fragment>
      {/* Title section */}
      <Grid container>
        <Grid item xs={6}>
          {/* Title */}
          <PageTitle 
            menuName="Shipping fare"
            title="Shipping fare" 
            icon={<LocalShippingIcon />} 
          />
        </Grid>
      </Grid>
      
      {/* Form section */}
      <div className="card mt-20">
        <form>          
          {/* Tabs */}
          <Tabs
            textColor="primary"
            value={this.state.tabIndex}
            onChange={this.onChangeTab}
            variant="fullWidth"
            indicatorColor="primary"
            scrollButtons="auto"
          >
            <Tab label="DHL" {...this.tabProps(0)} />
            <Tab label="K-Packet" {...this.tabProps(1)} />
          </Tabs>
        
          <Divider />

          {/* SwipeableViews */}
          <SwipeableViews
            index={this.state.tabIndex}
          > 
            {/* Basic content */}
            <div className="mt-20">
              <DHL />
            </div>

            {/* Price Reserve information content */}
            <div index={1} className="mt-20">
              <KPACKET />
            </div>
          </SwipeableViews>
        </form>
      </div>
      
    </React.Fragment>;
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(Shipping));