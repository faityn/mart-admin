import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import moment from 'moment';

// Pagination
import PaginationMaterial from '@material-ui/lab/Pagination';

// Icon
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

/**
 * @summary Member list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class CouponTable extends React.Component {
 
  /**
   * @override
   */
  render() {
    if(!this.props.data)
      return '';

    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Number</TableCell>
                      <TableCell>Coupon name</TableCell>
                      <TableCell>Coupon information</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.list || []).map(item => (
                      <TableRow  key={item.number}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.information}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>
    
        {/* Pagination  */}
        {/* {this.props.data.totalElements >  this.props.pagination.rowsPerPage ?
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial count={Math.ceil(this.props.data.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>
        : null } */}
      </React.Fragment>
    );
  }
};

export default CouponTable;

