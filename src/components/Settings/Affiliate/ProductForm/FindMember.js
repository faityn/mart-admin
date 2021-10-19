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
} from "../../../Queries/Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

/**
 * @summary Find Member
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Find Member
 */
class FindMember extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      users: {
        list: []
      },
      search: {
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "status",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedUsers: []
    }

    // Events
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
  }

  /**
   * @summary onBlurUserSearch
   * @param {String} e 
   */
  onBlurUserSearch(e){
    this.setState({
      search: { 
      }
    })
  }

  /**
   * @summary onSelectId
   * @param {int} id 
   */
  onSelectId(event, id){
    event.stopPropagation();

    let selectedUsers = this.state.selectedUsers;
    const index = selectedUsers.indexOf(id);

    if (index === -1) {
      selectedUsers.push(id);
    }
    else {
      selectedUsers.splice(index, 1);
    }

    this.setState({
      selectedUsers: selectedUsers
    });
    
  }

  /**
   * @summary Toggle selections
   */
  onSelectAll(event, users) {
    event.stopPropagation();

    let selectedUsers = this.state.selectedUsers;

    if (selectedUsers.length > 0) {
      selectedUsers = [];
    }
    else {
      (users || []).map((item) => {
        selectedUsers.push(item.id);
      })
    }

    this.setState({
      selectedUsers: selectedUsers
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
   * @summary Load users
   */
  async loadUsers() {
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
        users: result.data.getUsers
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching users.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.users !== null){
      this.loadUsers();
    }
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadUsers();
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
                        <Checkbox
                          color="primary"
                          checked={this.state.selectedUsers.length === this.state.users.list.length}
                          onChange={(e)=>this.onSelectAll(e, this.state.users.list)}
                        />
                      </TableCell>
                      <TableCell>First name</TableCell>
                      <TableCell>Last name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Visit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.users.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedUsers.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="memberId"
                          />
                          <input name={item.id} value={item.firstName} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.firstName}
                        </TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.date}</TableCell>
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
                <PaginationMaterial count={Math.ceil(this.state.users.totalElements / this.state.pagination.rowsPerPage)} page={this.state.pagination.pageNumber} onChange={this.handlePageNumber} color="primary" />
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

export default withSnackbar(connect(mapStateToProps, null)(FindMember));