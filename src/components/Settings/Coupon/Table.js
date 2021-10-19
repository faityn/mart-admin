import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
  DialogContentText,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * @summary Coupon list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Coupon
 */
class CouponTable extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
  
    // Merge search states
    this.state = {
      open: false,
      checkedProducts: [],
      active: true,
      notActive: true,
    }

    // Bind
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * @summary Open modal
   * @param {event} event
   */
  handleOpen() {
    this.setState({open: true});
  };

  /**
   * @summary Close modal
   * @param {event} event
   */
  handleClose() {
    this.setState({open: false});
  };

  /**
   * @summary Delete coupon
   * @param {event} event
   */
  onDeleteCoupon() {
    this.setState({open: false});
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
                    <MenuItem value="createdDate">Date</MenuItem>
                    <MenuItem value="code">Code</MenuItem>
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
                          checked={this.state.checkedProducts.length === this.props.data.getCoupons.list.length}
                          onChange={(e)=>this.onSelectAll(e, this.props.data.getCoupons.list)}
                        />
                      </TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Discount Amount</TableCell>
                      <TableCell>Term</TableCell>
                      <TableCell>Payment target</TableCell>
                      <TableCell>Coupon use/issuance</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getCoupons.list || []).map(item => (
                      <TableRow  key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="true"
                            checked={this.state.checkedProducts.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelect(e, item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {item.discountType === "Price" ? item.discount + "$ sale" : null}
                          {item.discountType === "Percent" ? item.discount + "% sale" : null}
                          {item.discountType === "Free" ? "Free Shipping" : null}
                        </TableCell>
                        <TableCell>{moment(item.startDate).format('YYYY-MM-DD')} ~ {moment(item.endDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell>{null}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>
                          <Link to={"/settings/operation/coupon/edit/" + item.id}>
                            <IconButton 
                              color="primary" 
                              aria-label="Product modification" 
                              alt="Product modification"
                              id={item.id}
                            >
                              <VisibilityIcon />
                            </IconButton>  
                          </Link>
                          {/* <IconButton 
                            color="primary" 
                            aria-label="User modification" 
                            alt="User modification"
                            onClick={(e) => this.handleOpen(e, item.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>   */}
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
        {this.props.data.getCoupons.totalElements >  this.props.pagination.rowsPerPage ?
          <Grid container className="mt-20">
            <Grid item xs={12} >
              <PaginationMaterial count={Math.ceil(this.props.data.getCoupons.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
            </Grid>
          </Grid>
        : null }

        {/* Dialog */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Delete coupon"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delte this coupon record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.onDeleteCoupon.bind(this)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

      </React.Fragment>
    );
  }
};

export default CouponTable;
