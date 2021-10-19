import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl, 
  Select, 
  MenuItem,
} from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { UPDATE_ORDER_STATUS } from '../../Queries/Queries';

class StatusModal extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

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

    // Form data to object
    let status = {
      "status": formData.get('status'),
      "orderNumbers": this.props.orderNumbers,
    }

    this.props.enqueueSnackbar('The saving process is being started ...', {variant: 'info'});

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: UPDATE_ORDER_STATUS, 
      variables: { 
        status: status
      }
    }).then((result) => {
      if (result.data.updateStatus.statusCode === 200) {
        this.props.enqueueSnackbar("Order has been successfully updated.", {variant: 'success'});
        
        this.props.handleChangeLoad();
        this.props.handleCloseStatusModal();
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

    
    return <Dialog open={this.props.open} onClose={this.props.handleCloseStatusModal} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Select state of order</DialogTitle>
    <DialogContent>
      <form id="my-form-id" onSubmit={this.onHandleSubmit}>
        <FormControl 
          size="small" 
          fullWidth 
          variant="outlined"
        >
          <Select
            name="status"
            defaultValue="select"
          >
            <MenuItem value="select">
              <em>Select status</em>
            </MenuItem>
            <MenuItem value="PENDING">
              <em>Pending</em>
            </MenuItem>
            <MenuItem value="UNSHIPPED">
              <em>Unshipped</em>
            </MenuItem>
            <MenuItem value="READY">
              <em>Ready</em>
            </MenuItem>
            <MenuItem value="SHIPPED">
              <em>Shipped</em>
            </MenuItem>
            <MenuItem value="CANCELLED">
              <em>Cancelled</em>
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.props.handleCloseStatusModal} color="primary">
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

export default withSnackbar(connect(mapStateToProps, null)(StatusModal));