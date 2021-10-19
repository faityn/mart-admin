import React from 'react';
import { Grid, CardContent } from '@material-ui/core';

// Notifcation
import { withSnackbar } from 'notistack';

// Query
import { GET_ORDERS_BY_USER } from '../../Queries/Queries';

// Redux
import { connect } from 'react-redux';

// Table
import PurchaseHistoryTable from './PurchaseHistoryTable';

class Purchase extends React.Component{

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      userOrders: null,
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
    };

    // Events
    this._isMounted = false;
  }

  async loadUserOrders() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_ORDERS_BY_USER,
        variables: {
          id: this.state.id ? this.state.id : "",
          page: { 
            limit: this.state.pagination.rowsPerPage,
            pageNumber: this.state.pagination.pageNumber,
            orderBy: this.state.orderBy,
            type: this.state.type
          }
        }
      })
      .then((result) => {
        this.setState({
          userOrders: result.data.getUserOrdersById,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    this.loadUserOrders();
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;

    if (prevState.id !== this.state.id) {
      this.loadUserOrders();
    }
  }

  render() {
    if (!this.props.isShowForm)
      return '';

    return <CardContent>
      {/* if statement */}
      { this.props.id || this.state.userOrders ? 
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={12} xs={12}>
            <PurchaseHistoryTable 
              data={this.state.userOrders}
              pagination={this.state.pagination}
            />
          </Grid>
        </Grid> 
      : 
        null 
      }
    </CardContent>
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(Purchase));