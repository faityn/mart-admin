import React from 'react';
import {
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import CreateIcon  from '@material-ui/icons/Create';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GET_PRODUCTS } from '../../Queries/Queries';
import SelectOne from './SelectOne';
import OptionPopup from './OptionPopup';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

class SetNewProduct extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
  
    // Merge search states
    this.state = {
      open: false,
      openMain: false,
      isSetPanel: false,
      option: null,
      product: "",
      search: {
        name: ""
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
    }

    // Bind
    this.handleClickOpenMain = this.handleClickOpenMain.bind(this);
    this.handleCloseMain = this.handleCloseMain.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.handleRowsPerPage = this.handleRowsPerPage.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() { 
    await this.props.apolloClient.httpClient.query({
      query: GET_PRODUCTS,
      variables: { 
        search: {
          name: this.state.name
        },
        page: {
          limit: this.state.pagination.rowsPerPage,
          pageNumber: this.state.pagination.pageNumber,
          orderBy: this.state.orderBy,
          type: this.state.type
        }
      }
    }).then((result) => {
      this.setState({
        product: result.data.getProducts
      });
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
    });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitMainProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let productIds = formData.getAll('productId');
    let option = this.state.option;

    (productIds || []).map((id) => {
      this.setState({
        option: {
          id: id,
          productName: formData.get(id)
        },
      })
    });
  }

  /**
   * @summary Product list form submit
   */
  onSubmitOptionForm(event) {
    event.preventDefault();

  }

  onSubmitOptionProductForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
  }

  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpenMain() {
    this.setState({openMain: true});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleCloseMain() {
    this.setState({openMain: false});
  };

  /**
   * @summary Open box
   * @param {event} 
   */
  handleClickOpen() {
    this.setState({open: true});
  };

  /**
   * @summary Close box
   * @param {event} 
   */
  handleClose() {
    this.setState({open: false});
  };

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
   * @summary Change rows per page
   * @param {MouseEvent} event 
   */
  handleRowsPerPage(event) {
    this.setState({
      pagination: {
        rowsPerPage: event.target.value,
        pageNumber: 1
      }
    });
  }

  /**
   * @summary Change product sort
   * @param {MouseEvent} event 
   */
  handleOrderByProduct(event) {
    this.setState({
      orderBy: event.target.value,
    });
  }

  render() {

    return <React.Fragment>
      <div className="card customListTable">
        <CardContent>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Variations </TableCell>
                  <TableCell>
                    <TextField fullWidth
                      id="name-basic"
                      size="small"
                      variant="outlined"
                      value={this.state.option ? this.state.option.productName : "" }
                      onClick={ this.handleClickOpenMain }
                    />
                  </TableCell>
                  <TableCell>Option</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody >
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell rowSpan="0">
                    <IconButton 
                      color="primary" 
                      aria-label="Product modification" 
                      alt="Product modification"
                      onClick={this.handleClickOpen}
                    >
                      <CreateIcon />
                    </IconButton>         
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PerfectScrollbar>
        </CardContent>
      </div>

      {/* Main */}
      <Dialog
        open={this.state.openMain}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">{"Select main product"}</DialogTitle>
        <DialogContent>
          <form id="main-product-form" onSubmit={this.onSubmitMainProductForm.bind(this)}>
            <SelectOne 
              data={this.state.product} 
              pagination={this.state.pagination} 
              orderBy={this.state.orderBy} 
              handleRowsPerPage={this.handleRowsPerPage} 
              handlePageNumber={this.handlePageNumber} 
              handleOrderByProduct={this.handleOrderByProduct}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleCloseMain} color="primary">
            Cancel
          </Button>
          <Button autoFocus
            form="main-product-form"
            type="submit" 
            color="primary" 
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit dailog */}
      <Dialog
        open={this.state.open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">{"Add option set"}</DialogTitle>
        <DialogContent>
          <form id="main-option-form" onSubmit={this.onSubmitOptionForm.bind(this)}>
            <OptionPopup />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus
            form="main-option-form"
            type="submit" 
            color="primary" 
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  }
}

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default withSnackbar(connect(mapStateToProps, null)(SetNewProduct));