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

class AffiliatePaymentTable extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* Rows per page */}
          <CardActions >
            <Grid container>
              <Grid item xs={12} className="text-right">
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
                      <TableCell>First category</TableCell>
                      <TableCell>Second category</TableCell>
                      <TableCell>Third category</TableCell>
                      <TableCell>Settlement percentage</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getAffiliatePolicyList.list || []).map(item => (
                      <TableRow key={`${item.category1}-${item.category2}-${item.category3}`}>
                        <TableCell>{item.category1}</TableCell>
                        <TableCell>{item.category2}</TableCell>
                        <TableCell>{item.category3}</TableCell>
                        <TableCell>{item.percentage}%</TableCell>
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
            <PaginationMaterial count={Math.ceil(this.props.data.getAffiliatePolicyList.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>

      </React.Fragment>
    );
  }
};

export default withSnackbar(AffiliatePaymentTable);
