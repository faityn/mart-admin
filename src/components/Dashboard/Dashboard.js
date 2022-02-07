import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Orders from './components/Orders/Orders';
import Message from './components/Message/Message';
import Sales from './components/Sales/Sales';
import Affiliate from './components/Affiliate/Affiliate';
import Seller from './components/Seller/Seller';
import Promotion from './components/Promotion/Promotion';
import { gql } from "apollo-boost";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}));

/**
 * @const Dashboard
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard
 */
 class Dashboard extends React.Component {
  
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      dashboard: {}
    };
  }

  async componentDidMount() {
    console.log('load dashboard');
    // await this.props.apolloClient.httpClient
    //   .query({
    //     query: gql`query getDashboard {
    //       getDashboard {
    //             orderUnshipped
    //             orderReady
    //             orderCancel
    //             msgMembership
    //             msgItem
    //             msgCancel
    //             msgOthers
    //             coupons
    //             sellerNew
    //             sellerRequest
    //             sellerWarehousing
    //             exhibition
    //             affliateRequest
    //             affliateClicks
    //             affliateOrders
    //             timedealStartDate
    //             timedealEndDate
    //        }
    //    }`
    //   })
    //   .then((result) => {
    //     this.setState({
    //       dashboard: result.data.getDashboard,
    //     });
    //   })
    //   .catch((error) => {
    //     this.props.enqueueSnackbar(
    //       "Sorry, there is an error occurred while fetching data.",
    //       { variant: "error" }
    //     );
    //   });
  }


  /**
   * @override
   */
  render () {
    return <div >
      <Grid
        container
        spacing={4}
      >
        <Grid item md={6} xs={12}>
          <Orders dashboard={this.state.dashboard} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Message dashboard={this.state.dashboard} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Sales dashboard={this.state.dashboard} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Affiliate dashboard={this.state.dashboard} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Seller dashboard={this.state.dashboard} />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12}>
          <Promotion dashboard={this.state.dashboard} />
        </Grid>
      </Grid>
    </div>
  };
};

// Redux state to props
const mapStateToProps = (state) => {
	return {
		apolloClient: state.apolloClient,
	};
};

export default withSnackbar(connect(mapStateToProps, null)(Dashboard));
