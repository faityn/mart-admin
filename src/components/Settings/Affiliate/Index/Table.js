import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';
import moment from 'moment';
import { withSnackbar } from 'notistack';

class AffiliateTable extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* Rows per page */}
          <CardActions >
            <Grid container>
              <Grid item xs={12} className="text-right">
                <span className="sort-by-product">Sort by: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="sort-simple-select-label"
                    id="sort-simple-select"
                    onChange={this.props.handleOrderByProduct} 
                    value={this.props.orderBy}>
                    <MenuItem value="created_date">Date</MenuItem>
                    <MenuItem value="affiliate_name">Affiliate name</MenuItem>
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

          {/* List for affiliate */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Affiliate name</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>E-mail</TableCell>
                      <TableCell>Paypal account</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getAffiliateList.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.affiliateName}
                        </TableCell>
                        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.paypalAccount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
    
        <Grid container className="mt-20">
          <Grid item xs={12} >
            <PaginationMaterial count={Math.ceil(this.props.data.getAffiliateList.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default withSnackbar(AffiliateTable);
