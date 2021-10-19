import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TOGGLE_USER } from "../Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText 
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import moment from 'moment';

/**
 * @summary Member list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class MemberTable extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = {
      id: null,
      isProcessing: false,
      open: false
    }

    // Bind event
    this.onProcessStart = this.onProcessStart.bind(this);
    this.onProcessEnd = this.onProcessEnd.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
  }

  /**
   * @summary Process start
   */
  onProcessStart() {
    this.setState({
      isProcessing: true
    });
  }

  /**
   * @summary Process end
   */
  handleClickOpen(e, id) {
    this.setState({
      open: true,
      id: id
    });
  }

  /**
   * @summary Process start
   */
  handleClose() {
    this.setState({
      open: false
    });
  }

  /**
   * @summary Process end
   */
  onProcessEnd() {
    this.setState({
      isProcessing: false
    });
  }

  /**
   * @summary toggleUser
   * @param {Boolean} toggleUser
   */
  async toggleUser(){

    if (this.state.isProcessing)
      return;

      // process false
    this.setState({
      open: false
    });


    // Process
    this.onProcessStart();

    this.props.enqueueSnackbar('The saving process is being started ...', {variant: 'info'});

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: TOGGLE_USER, 
      variables: { 
        id: this.state.id
      }
    }).then((result) => {
      const message = "User has been successfully added in leave list.";
      this.props.enqueueSnackbar(message, {variant: 'success'});
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
    });

    // process false
    this.setState({
      isProcessing: false,
      open: false
    });
  }
 
  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* Status */}
        <Grid container className="align-items-center">
          
          {/* Withdraw immediately */}
          <Grid item md={3} xs={12}>
            <h5>Member Status: Member</h5>
          </Grid>

          {/* Results */}
          <Grid item md={3} xs={12}>
            <h5>* Search results: <span className="text-red">00</span> people</h5>
          </Grid>

          {/* Results */}
          <Grid item md={3} xs={12}>
            <h5>* Total number of members: <span className="text-red">{this.props.data.getUsers.totalElements}</span></h5>
          </Grid>
        </Grid>

        {/* Save stick and price */}
        <Grid container>
          <Grid item xs={12} className="text-right">
            <Button 
              variant="contained" 
              color="primary" 
              size="small"  
              className="ml-20"
              startIcon={<SaveIcon/>}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        
        <Card className="customListTable mt-20">
          {/* Rows per page */}
          <CardActions >
            <Grid container>
              <Grid item xs={12} className="text-right">
                <span className="sort-by-product">Sort by product registration: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="sort-simple-select-label"
                    id="sort-simple-select"
                    onChange={this.props.handleOrderByProduct} 
                    value={this.props.orderBy}>
                    <MenuItem value="createdDate">Date</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="gender">Gender</MenuItem>
                  </Select>
                </FormControl>
                <span className="rows-per-page">Rows per page: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="rows-simple-select-label"
                    id="rows-simple-select"
                    onChange={this.props.handleRowsPerPage} 
                    value={this.props.pagination.rowsPerPage}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardActions>

          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          value="true"
                        />
                      </TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Membership Level</TableCell>
                      <TableCell>Joined</TableCell>
                      <TableCell>Number of visits</TableCell>
                      <TableCell>Total order amount</TableCell>
                      <TableCell>CRM</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getUsers.list || []).map(item => (
                      <TableRow  key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="true"
                          />
                        </TableCell>
                        <TableCell>{item.id}
                        </TableCell>
                        <TableCell>{item.firstName} {item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.type}
                        </TableCell>
                        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{item.visit}</TableCell>
                        <TableCell>{item.totalOrderAmount}</TableCell>
                        <TableCell>
                          <Link to={"/member/edit/" + item.id}>
                            <IconButton 
                              color="primary" 
                              aria-label="User modification" 
                              alt="User modification"
                              id={item.id}
                            >
                              <CreateIcon />
                            </IconButton>
                          </Link>
                          <IconButton 
                            color="primary" 
                            aria-label="User modification" 
                            alt="User modification"
                            onClick={(e) => this.handleClickOpen(e, item.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>           
                        </TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>
    
        {/* Pagination  */}
        {this.props.data.getUsers.totalElements >  this.props.pagination.rowsPerPage ?
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial count={Math.ceil(this.props.data.getUsers.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>
        : null }
        
        {/* Dialog */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Leave user"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to leave this member's record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.toggleUser} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
};

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(MemberTable));
