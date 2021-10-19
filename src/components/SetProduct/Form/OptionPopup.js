import React from 'react';
import { 
  Grid,
  Button,
  Dialog,
  TextField
} from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { GET_PRODUCTS } from '../../Queries/Queries';
import SelectOne from './SelectOne';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

/**
 * @summary Product option
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package ProductManagement/Form
 */
class Option extends React.Component {

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
      selectedOptionId: "",
      selectedChildId: "",
      option1: [],
      option2: [],
    }

    // Bind
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.onHandleClose = this.onHandleClose.bind(this);
    this.onSubmitOptionForm = this.onSubmitOptionForm.bind(this);
    this.onSubmitChildForm = this.onSubmitChildForm.bind(this);
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
   * @summary Search
   * @param {String} childrenState 
   */
  search(childrenState){
    this.setState({
      search: {
        code: childrenState.search.code,
      },
      selectedIDs: []
    }); 
  }

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
  onHandleClose() {
    this.setState({open: false});
  };

  /**
   * @summary Input
   * @param {Event}
   */
  appendOption1() {
    var newOption1 = `product-${this.state.option1.length}`;
    this.setState(prevState => ({ option1: prevState.option1.concat([newOption1]) }));
  }

  /**
   * @summary Input
   * @param {Event}
   */
  appendOption2() {
    var newOption2 = `product-${this.state.option2.length}`;
    this.setState(prevState => ({ option2: prevState.option2.concat([newOption2]) }));
  }

  /**
   * @summary Product list form submit
   */
  onSubmitOptionForm(event, id) {

    
  }

  /**
   * @summary Product list form submit
   */
  onSubmitChildForm(event) {
    event.preventDefault();

    
  }

  /**
   * @override
   */
  render() {
    return <React.Fragment>
      {/* Title section */}
      <Grid container className="text-right">
        <Grid item md={12} xs={12}>
          {/* Buttons */}
          <Button 
            size="small" 
            variant="contained" 
            color="default" 
            onClick={ () => this.appendOption1() }
          >
            Add option 1
          </Button>
        </Grid>
      </Grid>

      {/* Create form */}
      <div className="mt-5 customPopup">
        {/* Option 1 */}
        <Grid container className="align-items-center">
          <Grid item 
            md={2} 
            xs={12}
            >
            <h5>Option 1</h5>
            <TextField fullWidth
              id="name-basic" 
              label="Name"
              size="small"
              variant="outlined"
            />
          </Grid>

          <Grid item 
            md={10} 
            xs={12}
          >
            {/* Option 1 container */}

            {this.state.option1.map((input, index) =>
              <div>
                <Grid container>
                  <Grid item 
                    md={10} 
                    xs={12} 
                    className="py-10"
                  >
                    <Button fullWidth 
                      size="small" 
                      variant="contained" 
                      color="default" 
                      onClick={this.handleClickOpen}
                    >
                      {this.state.option1 ? this.state.option1.productName : "Product code" }
                    </Button>
                  </Grid>
                  <Grid item 
                    md={2} 
                    xs={12} 
                    className="py-10"
                  >
                    <Button fullWidth 
                      size="small" 
                      variant="contained" 
                      color="primary"
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item 
                    md={5} 
                    xs={5} 
                    className="py-10"
                  >
                    <TextField fullWidth
                      id="name-basic" 
                      label="Option 2 name"
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item 
                    md={7} 
                    xs={7}
                    >
                      {this.state.option2.map(input =>
                        <Grid container>
                          <Grid item 
                            md={9} 
                            xs={8} 
                            className="py-10"
                          >
                            <Button fullWidth 
                              size="small" 
                              variant="contained" 
                              color="default" 
                              onClick={this.handleClickOpen}
                            >
                              Child Code
                            </Button>
                          </Grid>
                          <Grid item 
                            md={3} 
                            xs={4} 
                            className="py-10"
                          >
                            <Button fullWidth 
                              size="small" 
                              variant="contained" 
                              color="primary"
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                  </Grid>
                      
                  <Grid container>
                    <Grid item 
                      md={12} 
                      xs={12} 
                      className="text-right py-10"
                    >
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="primary"
                        onClick={ () => this.appendOption2() }
                      >
                        Add option 2
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>

      {/* Option */}
      <Dialog
        open={this.state.open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">{"Add option set"}</DialogTitle>
        <DialogContent>
          <SelectOne 
            data={this.state.product} 
            pagination={this.state.pagination} 
            orderBy={this.state.orderBy} 
            selectedOptionId={this.state.selectedOptionId}
            handleRowsPerPage={this.handleRowsPerPage} 
            handlePageNumber={this.handlePageNumber} 
            onSubmitOptionForm={this.onSubmitOptionForm}
          />
        </DialogContent>
      </Dialog>

      {/* Child */}
      <Dialog
        open={this.state.open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">{"Add child set"}</DialogTitle>
        <DialogContent>
          <SelectOne 
            data={this.state.product} 
            pagination={this.state.pagination} 
            orderBy={this.state.orderBy} 
            handleRowsPerPage={this.handleRowsPerPage} 
            handlePageNumber={this.handlePageNumber} 
            handleOrderByProduct={this.handleOrderByProduct}
            onSubmitChildForm={this.onSubmitChildForm}
          />
        </DialogContent>
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

export default withSnackbar(connect(mapStateToProps, null)(Option));
