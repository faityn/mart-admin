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
  GET_PRODUCTS
} from "../../Queries/Queries";
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
        list: [],
      },
      search: {
        sku: null,
        isAdmin: true,
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      isProcessing: false,
      isFetching: true,
      selectedProducts: [],
    };

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
      search: { 
        name: e.target.value 
      }
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
      query: GET_PRODUCTS,
      variables: { 
        search: this.state.search,
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
        products: result.data.getProducts
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching products.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if(prevState.products !== null){
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
              <Grid item md={2} xs={12}>
                <h5>Product code</h5>
              </Grid>

              {/* Code item */}
              <Grid item md={12} xs={12}>
                <TextField fullWidth
                  id="code-basic" 
                  label="Code is here"
                  size="small"
                  variant="outlined"
                  name="code"
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
                      <TableCell>Product name</TableCell>
                      <TableCell>Brand</TableCell>
                      <TableCell>Release date</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Registrant</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(this.state.products.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={this.state.selectedProducts.indexOf(item.id) !== -1}
                            onChange={(e) => this.onSelectId(e, item.id)}
                            value={item.id}
                            name="productId"
                          />
                          <input name={item.id} value={item.name} type="hidden" />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{item.registerDate}</TableCell>
                        <TableCell>{item.inventory}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>Admin</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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