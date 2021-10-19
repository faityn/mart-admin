import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import List from "./Index/List";
import Chart from "./Chart/Chart";

import PageTitle from '../../../core/common/Partials/PageTitle';


/**
 * @summary Seller dashboard
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Seller
 */
class Dashboard extends React.Component {

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* <List /> */}

        <Chart />
      </React.Fragment>
    );
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(Dashboard));