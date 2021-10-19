import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField 
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { SAVE_INVOICENUMBER_ORDER } from '../../Queries/Queries';

class InvoiceModal extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    let orderNumbers = this.props.orderNumbers ? this.props.orderNumbers : [];
    let status = this.props.status ? this.props.status : "";

    // Merge search states
    this.state = {
      status: status,
      orderNumbers: orderNumbers,
    }; 

    // Event
    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event 
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // invoiceInput
    let invoiceInput = [];

    // datas
    let invoiceNumbers = formData.getAll("invoiceNumber");
    let orderNumbers = formData.getAll("orderNumber");

    for (let i = 0; i < invoiceNumbers.length; i++) {

      invoiceInput.push({
        orderNumber: orderNumbers[i],
        invoiceNumber: invoiceNumbers[i],
      });
    }

    this.props.enqueueSnackbar('The saving process is being started ...', {variant: 'info'});

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: SAVE_INVOICENUMBER_ORDER, 
      variables: { 
        invoiceInput: invoiceInput
      }
    }).then((result) => {
      if (result.data.saveInvoiceNumber.statusCode === 200) {
        this.props.enqueueSnackbar("Order has been successfully updated.", {variant: 'success'});
        this.props.handleChangeLoad();
        this.props.handleCloseInvoiceModal();
      }
      else {
        this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
      }
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
    });

  }

  /**
   * @override
   */
  render() {
    
    return <Dialog open={this.props.open} onClose={this.props.handleCloseInvoiceModal} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Enter the invoice</DialogTitle>
    <DialogContent>
      <form id="my-form-id" onSubmit={this.onHandleSubmit}>
        <Table className="product-list">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Invoice Number</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(this.props.orderNumbers || []).map(item => (
              <TableRow  key={item}>
                <input type="hidden" name="orderNumber" value={item} />
                <TableCell padding="checkbox">{item}</TableCell>
                <TableCell>
                  <TextField fullWidth
                    id="invoiceNumber-basic" 
                    label="Enter invoice number"
                    size="small"
                    variant="outlined"
                    name="invoiceNumber"
                    defaultValue={(this.props.checkedOrders.find(f => f.orderNumber === item) || {}).invoiceNumber}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.props.handleCloseInvoiceModal} color="primary">
        Cancel
      </Button>
      <Button form="my-form-id" type="submit" color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
    </Dialog>
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(InvoiceModal));