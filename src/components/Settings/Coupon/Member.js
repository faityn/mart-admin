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
  GET_USERS
} from "../../Queries/Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

/**
 * @summary Setting Coupon
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Setting/Coupon/Product
 */
class FindProduct extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      members: {
        list: []
      },
      search: {
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedMembers: ""
    }

    // Events
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
  }

  /**
   * @summary onBlurProductSearch
   * @param {String} e 
   */
  onBlurMemberSearch(e){
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

    let selectedMembers = this.state.selectedMembers;
    const index = selectedMembers.indexOf(id);

    if (index === -1) {
      this.setState({
        selectedMembers: id
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
   * @summary Load members
   */
  async loadMembers() {
    await this.props.apolloClient.httpClient.query({
      query: GET_USERS,
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
        members: result.data.getUsers
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching products.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.members !== null){
      this.loadMembers();
    }
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadMembers();
  }

  /**
   * @override
   */
  render(){

    return <React.Fragment>
      { 
        this.state.isFetching ? <div className="customPopup"><LinearProgress/></div> : 
          <CardContent>
            <input type="hidden" name="selectedMember" value={this.state.selectedMembers} />
            {/* Container */}
            <Grid container 
              spacing={3} 
              className="align-items-center"
            >
              {/* Title */}
              <Grid item md={2} xs={12}>
                <h5>Member email</h5>
              </Grid>

              {/* Email item */}
              <Grid item md={12} xs={12}>
                <TextField fullWidth
                  id="email-basic" 
                  label="Email is here"
                  size="small"
                  variant="outlined"
                  name="email"
                  onChange={this.onBlurMemberSearch.bind(this)}
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
                        <Checkbox
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Membership level</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created date</TableCell>
                      <TableCell>Visit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.members.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedMembers.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="productId"
                          />
                          <input name={item.id} value={item.firstName + " " + item.lastName} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.firstName} {item.lastName}
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.level}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.createdDate}</TableCell>
                        <TableCell>{item.visit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>

            {/* PaginationMaterial */}
            <Grid container className="mt-20">
              <Grid item xs={12} >
                <PaginationMaterial count={Math.ceil(this.state.members.totalElements / this.state.pagination.rowsPerPage)} page={this.state.pagination.pageNumber} onChange={this.handlePageNumber} color="primary" />
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

export default withSnackbar(connect(mapStateToProps, null)(FindProduct));
