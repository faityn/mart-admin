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
                    value={this.props.search.orderBy}>
                    <MenuItem value="Clicks">Clicks</MenuItem>
                    <MenuItem value="Orders">Orders</MenuItem>
                    <MenuItem value="Revenue">Ordered revenue</MenuItem>
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
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardActions>

          {/* List for affiliate product */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Affiliate name</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Link</TableCell>
                      <TableCell>Clicks</TableCell>
                      <TableCell>Orders</TableCell>
                      <TableCell>Ordered revenue</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getAffiliateProductList.list || []).map(item => (
                      <TableRow  key={item.id}>
                        <TableCell>{item.affiliateName}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.link}</TableCell>
                        <TableCell>{item.clicks}</TableCell>
                        <TableCell>{item.orders}</TableCell>
                        <TableCell>{item.orderedRevenue}</TableCell>
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
            <PaginationMaterial count={Math.ceil(this.props.data.getAffiliateProductList.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default withSnackbar(AffiliateTable);
