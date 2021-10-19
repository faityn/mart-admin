import React from 'react';
import { 
  Grid, 
  CardContent, 
  Checkbox,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress
} from '@material-ui/core';
import PaginationMaterial from '@material-ui/lab/Pagination';
import {
  GET_COUPONS
} from "../../Queries/Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import moment from 'moment';

/**
 * @summary Find coupon
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Find coupon
 */
class FindCoupon extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      coupons: {
        list: []
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "code",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedCoupons: []
    }

    // Events
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
  }

  /**
   * @summary onSelectId
   * @param {int} id 
   */
  onSelectId(event, id){
    event.stopPropagation();

    let selectedCoupons = this.state.selectedCoupons;
    const index = selectedCoupons.indexOf(id);

    if (index === -1) {
      selectedCoupons.push(id);
    }
    else {
      selectedCoupons.splice(index, 1);
    }

    this.setState({
      selectedCoupons: selectedCoupons
    });
    
  }

  /**
   * @summary Change page number
   * @param {int} pageNumber 
   */
  handlePageNumber(event, pageNumber) {
    this.setState({
      pagination: Object.assign(this.state.pagination, {pageNumber: pageNumber})
    });
  }

  /**
   * @summary Load coupons
   */
  async loadCoupons() {
    await this.props.apolloClient.httpClient.query({
      query: GET_COUPONS,
      variables: { 
        search: {
        },
        page: { 
          limit: this.state.pagination.rowsPerPage,
          pageNumber: this.state.pagination.pageNumber,
          orderBy: this.state.orderBy,
          type: this.state.type
        }
      }
    }).then((result) => {
      this.setState({
        isFetching: false,
        coupons: result.data.getCoupons
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching coupons.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.coupons !== null){
      this.loadCoupons();
    }
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadCoupons();
  }

  /**
   * @override
   */
  render(){

    return <React.Fragment>
      { 
        this.state.isFetching ? <div className="customPopup"><LinearProgress/></div> : 
          <CardContent>
            {/* Container */}
            <Grid container 
              spacing={3} 
            >
              {/* Item */}
              <Grid item 
                md={12} 
                xs={12} 
              >
                {/* Container table */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Discount / Amount</TableCell>
                      <TableCell>Term</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.coupons.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedCoupons.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="couponId"
                          />
                          <input name={item.id} value={item.name} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.code}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.discountType}</TableCell>
                        <TableCell>{moment(item.startDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')} ~ {moment(item.endDate, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>

            {/* PaginationMaterial */}
            <Grid container className="mt-20">
              <Grid item xs={12} >
                <PaginationMaterial count={Math.ceil(this.state.coupons.totalElements / this.state.pagination.rowsPerPage)} page={this.state.pagination.pageNumber} onChange={this.handlePageNumber} color="primary" />
              </Grid>
            </Grid>
          </CardContent> 
      }
    </React.Fragment>
  }
};


// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(FindCoupon));