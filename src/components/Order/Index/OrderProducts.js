import React from 'react';
import { ORDER_PRODUCTS } from '../Queries';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { 
  LinearProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogContent 
} from '@material-ui/core';
import moment from 'moment';

/**
 * @summary Order products
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order/Index
 */
class OrderProducts extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = { 
      products: null,
    }; 
  }

  /**
   * @summary Load order print sheet
   */
  async loadProducts() {
    let orderNumber = this.props.orderNumber ? this.props.orderNumber[0] : "";

    await this.props.apolloClient.httpClient.query({
      query: ORDER_PRODUCTS,
      variables: {
        orderNumber: orderNumber
      }
    }).then((result) => {
      this.setState({
        products: result.data.getOrderProducts
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
    });
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if (this.props.orderNumber.length > 0 && this.props.open === true && this.props.open !== prevProps.open) {
      this.loadProducts();
    }
  }

  render() {

    if(!this.state.products && !this.props.orderNumber)
      return <LinearProgress />; 

    return <Dialog open={this.props.open} onClose={this.props.handleCloseProductModal} aria-labelledby="form-dialog-title" maxWidth="lg">
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(this.state.products || []).map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(OrderProducts));