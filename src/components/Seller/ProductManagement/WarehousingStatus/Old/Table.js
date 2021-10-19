import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import ReceiptIcon from '@material-ui/icons/Receipt';
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
} from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import fileDownload from 'js-file-download';
import axios from 'axios';

/**
 * @summary Seller Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Application
 */
class ProductTable extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
  
    // Merge search states
    this.state = {
      return: false,
      premium: false,
      checkedProducts: []
    }

    this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);

    // Bind
    this.handleClickOpenReturn = this.handleClickOpenReturn.bind(this);
    this.handleCloseReturn = this.handleCloseReturn.bind(this);
    this.handleClickOpenPremium = this.handleClickOpenPremium.bind(this);
    this.handleClosePremium = this.handleClosePremium.bind(this);
  }

  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpenReturn() {
    this.setState({return: true});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleCloseReturn() {
    this.setState({return: false});
  };

  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpenPremium() {
    this.setState({premium: true});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleClosePremium() {
    this.setState({premium: false});
  };
 
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
   * @summary Export
   * @param {MouseEvent} event 
   */
  async onExport() {
    if(this.state.checkedProducts.length !== 0){
      const url = process.env.REACT_APP_DOMAIN + "/download/products";

      await axios({
        headers: {
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
        method: 'GET',
        url: url,
        responseType: 'stream'
      }).then(response => {
        fileDownload(response.data, "Products.xlsx")         
      }).catch(error => {
        this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
      });
    } else {
      this.props.enqueueSnackbar('You should select product', {variant: 'info'});
    }
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
                      <TableCell>SKU</TableCell>
                      <TableCell>Product Name / Category</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>Volume</TableCell>
                      <TableCell>Enter quantity</TableCell>
                      <TableCell>Supply price</TableCell>
                      <TableCell>Hope</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Round</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>Shipping date</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.list || []).map(item => {
                      let imageUrl = item.imageUrl && item.imageUrl.substring(0, 4) !== "http" ?
                        process.env.REACT_APP_CDN_URL + "product/medium/" + item.imageUrl :
                        item.imageUrl 
                      ;
                      return <TableRow  key={item.id}>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>
                          <Box
                            alignItems="center"
                            display="flex"
                          >
                            <Avatar
                              src={imageUrl}
                              variant="square"
                            >
                            </Avatar>
                            <Typography
                              color="textPrimary"
                              variant="body1"
                              className="item-title"
                            >
                              <span className="product-name">{item.name}</span> 
                              {item.category}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{moment(item.registerDate).format('YYYY-MM-DD')}</TableCell>
                        <TableCell className="text-center">
                          <TextField value={item.inventory} variant="outlined"/>
                          <div className="mt-12">
                            <Button size="small" variant="contained" className="btn-check-receipt">Check</Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <TextField value={item.price} variant="outlined"  /> 
                          <div className="mt-16">
                            <span>{item.price}</span>
                          </div>
                        </TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Bla2</TableCell>
                        <TableCell>Bla2</TableCell>
                        <TableCell>Bla2</TableCell>
                        <TableCell>Bla2</TableCell>
                        <TableCell>Bla2</TableCell>
                        <TableCell>
                          <Link to={"/product/edit/" + item.id}>
                            <IconButton 
                              color="primary" 
                              aria-label="Product modification" 
                              alt="Product modification"
                              id={item.id}
                            >
                              <ReceiptIcon />
                            </IconButton>  
                          </Link>
                        </TableCell>
                      </TableRow>
                    })}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        <Grid container className="mt-20">
          <Grid item xs={12} >
            <PaginationMaterial 
              count={Math.ceil(this.props.data.totalElements / this.props.pagination.rowsPerPage)} 
              page={this.props.pagination.pageNumber} 
              onChange={this.props.handlePageNumber} 
              color="primary" 
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

export default withSnackbar(ProductTable);