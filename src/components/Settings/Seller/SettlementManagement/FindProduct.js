import React from 'react';
import { 
  Grid, 
  CardContent, 
  Checkbox,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress
} from '@material-ui/core';
import PaginationMaterial from '@material-ui/lab/Pagination';
import {
  GET_SELLER_PRODUCT
} from "../Queries";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

/**
 * @summary Find product
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Find product
 */
class FindProduct extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      products: {
        list: []
      },
      sku: null,
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedProducts: [],
    }

    // Events
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.onSelectId = this.onSelectId.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
  }

  /**
   * @summary onBlurProductSearch
   * @param {String} e 
   */
  onBlurProductSearch(e){
    this.setState({
      sku: e.target.value 
    })
  }

  /**
   * @summary onSelectId
   * @param {int} id 
   */
  onSelectId(event, id){
    event.stopPropagation();

    let selectedProducts = this.state.selectedProducts;
    const index = selectedProducts.indexOf(id);

    if (index === -1) {
      selectedProducts.push(id);
    }
    else {
      selectedProducts.splice(index, 1);
    }

    this.setState({
      selectedProducts: selectedProducts
    });
    
  }

  /**
   * @summary Toggle selections
   */
  onSelectAll(event, products) {
    event.stopPropagation();

    let selectedProducts = this.state.selectedProducts;

    if (selectedProducts.length > 0) {
      selectedProducts = [];
    }
    else {
      (products || []).map((item) => {
        selectedProducts.push(item.id);
      })
    }

    this.setState({
      selectedProducts: selectedProducts
    });
  }

  /**
   * @summary Change page number
   * @param {int} pageNumber 
   */
  handlePageNumber(event, pageNumber) {
    this.setState({
      pagination: Object.assign(this.state.pagination, {pageNumber: pageNumber})
    });
  }

  /**
   * @summary Load products
   */
  async loadProducts() {
    await this.props.apolloClient.httpClient.query({
      query: GET_SELLER_PRODUCT,
      variables: { 
        sku: this.state.sku,
        page: { 
          limit: this.state.pagination.rowsPerPage,
          pageNumber: this.state.pagination.pageNumber,
          orderBy: this.state.orderBy,
          type: this.state.type
        }
      }
    }).then((result) => {
      this.setState({
        isFetching: false,
        products: result.data.getSellerProduct
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching products.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.sku !== this.state.sku){
      this.loadProducts();
    }
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadProducts();
  }

  /**
   * @override
   */
  render(){

    return <React.Fragment>
      { 
        this.state.isFetching ? <div className="customPopup"><LinearProgress/></div> : 
          <CardContent>
            {/* Container */}
            <Grid container 
              spacing={3} 
              className="align-items-center"
            >
              {/* Title */}
              <Grid item md={12} xs={12}>
                <h5>파트너 상품 목록</h5>
              </Grid>

              {/* Code item */}
              <Grid item md={12} xs={12}>
                <TextField fullWidth
                  id="code-basic" 
                  label="Sku is here"
                  size="small"
                  variant="outlined"
                  name="sku"
                  onChange={this.onBlurProductSearch.bind(this)}
                />
              </Grid>
            </Grid>
          
            {/* Container */}
            <Grid container 
              spacing={3} 
            >
              {/* Item */}
              <Grid item 
                md={12} 
                xs={12} 
              >
                {/* Container table */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={this.state.selectedProducts.length === this.state.products.list.length}
                          onChange={(e)=>this.onSelectAll(e, this.state.products.list)}
                        />
                      </TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>공급가 (￦)</TableCell>
                      <TableCell>본사 창고</TableCell>
                      <TableCell>기타 창고</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.products.list || []).map((item,index) => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedProducts.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="productId"
                          />
                          <input name={item.id} value={item.sku} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.sku}
                        </TableCell>
                        <TableCell name={index} value={item.tradePrice}>
                          <input name={index} value={item.tradePrice} type="hidden"/>
                          {item.tradePrice}원</TableCell>
                        <TableCell>{item.centerWarehouse}</TableCell>
                        <TableCell>{item.insideWarehouse}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                       본사 창고: {this.state.products.centerTotal}
                      </TableCell>
                      <TableCell>
                       기타 창고: {this.state.products.insideTotal}
                      </TableCell>
                      <TableCell>
                        총: {this.state.products.total}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Grid>
            </Grid>

            {/* PaginationMaterial */}
            <Grid container className="mt-20">
              <Grid item xs={12} >
                <PaginationMaterial count={Math.ceil(this.state.products.totalElements / this.state.pagination.rowsPerPage)} page={this.state.pagination.pageNumber} onChange={this.handlePageNumber} color="primary" />
              </Grid>
            </Grid>
          </CardContent> 
      }
    </React.Fragment>
  }
};


// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(FindProduct));