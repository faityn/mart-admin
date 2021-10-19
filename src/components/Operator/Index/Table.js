import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
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
  TextField,
  Grid,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { withSnackbar } from 'notistack';

/**
 * @summary Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class OperatorTable extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
  
    // Merge search states
    this.state = {
      checkedProducts: []
    }
  }
 
  /**
   * @summary Toggle product selection
   * @param {MouseEvent} event 
   * @param {String} productid 
   */
  onSelect(event, productId) {
    event.stopPropagation();

    let checkedProducts = this.state.checkedProducts;
    const index = checkedProducts.indexOf(productId);

    if (index === -1) {
      checkedProducts.push(productId);
    }
    else {
      checkedProducts.splice(index, 1);
    }

    this.setState({
      checkedProducts: checkedProducts
    });
  }

  /**
   * @summary Toggle selections
   */
  onSelectAll(event, products) {
    event.stopPropagation();

    let checkedProducts = this.state.checkedProducts;

    if (checkedProducts.length > 0) {
      checkedProducts = [];
    }
    else {
      (products || []).map((item) => {
        checkedProducts.push(item.id);
      })
    }

    this.setState({
      checkedProducts: checkedProducts
    });
  }
  
  /**
   * @override
   */
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
                    <MenuItem value="operator_id">Operator</MenuItem>
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
                <Table className="product-list">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={this.state.checkedProducts.length === this.props.data.getOperators.list.length}
                          onChange={(e)=>this.onSelectAll(e, this.props.data.getOperators.list)}
                        />
                      </TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Access login</TableCell>
                      <TableCell>Remark</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getOperators.list || []).map(item => (
                      <TableRow  key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="true"
                            checked={this.state.checkedProducts.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelect(e, item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.realname}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.contact}</TableCell>
                        <TableCell>{item.allowLogin === true ? "YES" : "NO"}</TableCell>
                        <TableCell>{item.remark}</TableCell>
                        <TableCell>
                          <Link to={"/operator/edit/" + item.id}>
                            <IconButton 
                              color="primary" 
                              aria-label="Operator modification" 
                              alt="Operator modification"
                              id={item.id}
                            >
                              <CreateIcon />
                            </IconButton>  
                          </Link>
                          
                          <IconButton 
                            color="primary" 
                            aria-label="Operator modification" 
                            alt="Operator modification"
                          >
                            <DeleteIcon />
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
        <Grid container className="mt-20">
          <Grid item xs={12} >
            <PaginationMaterial count={Math.ceil(this.props.data.getOperators.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>

      </React.Fragment>
    );
  }
};

export default withSnackbar(OperatorTable);
