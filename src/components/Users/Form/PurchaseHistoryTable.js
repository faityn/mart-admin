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
class PurchaseHistoryTable extends React.Component {
 
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
                      <TableCell>Date</TableCell>
                      <TableCell>Order Number</TableCell>
                      <TableCell>Order History</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.list || []).map(item => (
                      <TableRow  key={item.orderNumber}>
                        <TableCell>{item.registerDate}</TableCell>
                        <TableCell>{item.orderNumber}</TableCell>
                        <TableCell>
                          <h5>Payment</h5>
                          <p>{item.paymentMethod}</p>
                          <h5>Delivery</h5>
                          <p>{item.status}</p>
                          <h5>Total</h5>
                          <p>{item.totalPrice}</p>
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>
    
        {/* Pagination  */}
        {this.props.data.totalElements >  this.props.pagination.rowsPerPage ?
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial count={Math.ceil(this.props.data.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>
        : null }
      </React.Fragment>
    );
  }
};

export default PurchaseHistoryTable;

