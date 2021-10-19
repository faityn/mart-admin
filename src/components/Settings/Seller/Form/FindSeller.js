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
  GET_SELLERS
} from "../../../Queries/Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import moment from 'moment';

/**
 * @summary Find seller
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Find seller
 */
class FindSeller extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      sellers: {
        list: []
      },
      search: {
        email: null
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "seller_id",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedSellers: []
    }

    // Events
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
  }

  /**
   * @summary onBlurSellerSearch
   * @param {String} e 
   */
  onBlurSellerSearch(e){
    this.setState({
      search: { 
        email: e.target.value 
      }
    })
  }

  /**
   * @summary onSelectId
   * @param {int} id 
   */
  onSelectId(event, id){
    event.stopPropagation();

    let selectedSellers = this.state.selectedSellers;
    const index = selectedSellers.indexOf(id);

    if (index === -1) {
      this.setState({
        selectedSellers: id
      });
    }
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
   * @summary Load sellerss
   */
  async loadSellers() {
    await this.props.apolloClient.httpClient.query({
      query: GET_SELLERS,
      variables: { 
        search: this.state.search,
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
        sellers: result.data.getSellerList
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching sellers.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.sellers !== null){
      this.loadSellers();
    }
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadSellers();
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
              className="align-items-center"
            >
              {/* Title */}
              <Grid item md={2} xs={12}>
                <h5>Seller email</h5>
              </Grid>

              {/* Code item */}
              <Grid item md={12} xs={12}>
                <TextField fullWidth
                  id="email-basic" 
                  label="Email is here"
                  size="small"
                  variant="outlined"
                  name="email"
                  onChange={this.onBlurSellerSearch.bind(this)}
                />
              </Grid>
            </Grid>
          
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
                      <TableCell>Seller id</TableCell>
                      <TableCell>Join date</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>paypalAccount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.sellers.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedSellers.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="sellerId"
                          />
                          <input name={item.id} value={item.sellerId} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.sellerId}
                        </TableCell>
                        <TableCell>{moment(item.joinedDate,"YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD")}</TableCell>
                        <TableCell>{item.contact}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.paypalAccount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>

            {/* PaginationMaterial */}
            <Grid container className="mt-20">
              <Grid item xs={12} >
                <PaginationMaterial count={Math.ceil(this.state.sellers.totalElements / this.state.pagination.rowsPerPage)} page={this.state.pagination.pageNumber} onChange={this.handlePageNumber} color="primary" />
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

export default withSnackbar(connect(mapStateToProps, null)(FindSeller));