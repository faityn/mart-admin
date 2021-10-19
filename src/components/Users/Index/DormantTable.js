import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateIcon from '@material-ui/icons/Create';
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
  Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import moment from 'moment';

/**
 * @summary Dormant list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class DormantTable extends React.Component {
 
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
            <h5>Member Status: Dormancy</h5>
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
            >
              Wake up dormancy
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
                      <TableCell>Processing time</TableCell>
                      <TableCell>Manager note</TableCell>
                      <TableCell>Wake up</TableCell>
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
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.firstName} {item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{item.note}</TableCell>
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
      </React.Fragment>
    );
  }
};

export default DormantTable;
