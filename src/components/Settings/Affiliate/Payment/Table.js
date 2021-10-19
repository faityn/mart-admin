import React from 'react';
import { connect } from "react-redux";
import PerfectScrollbar from 'react-perfect-scrollbar';
import PaginationMaterial from '@material-ui/lab/Pagination';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { withSnackbar } from 'notistack';
import { DECIDE_AFFILIATE_PAYMENT_REQUEST } from "../../../Queries/Affiliate";

class AffiliatePaymentTable extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      isShowingModal: false,
      editingId: '',
      editingStatusCompleted: false,
      radioValue: '',
      isProcessing: false,
    }

    this.onClickOk = this.onClickOk.bind(this);
  }

  onClickOk() {
    if (this.state.radioValue === '') {
      this.props.enqueueSnackbar(
        "Please select option for the request",
        { variant: "info" }
      );
      return;
    }

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.mutate({
        mutation: DECIDE_AFFILIATE_PAYMENT_REQUEST,
        variables: {
          affiliatePayment: {
            id: this.state.editingId,
            status: this.state.editingStatusCompleted === true ? 'COMPLETED' : 'DECLINED',
          },
        },
      })
      .then((result) => {
        if (result.data.decideAffiliatePaymentAdmin.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Payment request has been successfully processed.",
            { variant: "success" }
          );
          this.setState({
            editingId: '', editingStatusCompleted: false, radioValue: '', isShowingModal: false, isProcessing: false,
          });
          // this.loadData();
          this.props.refetch();
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
          this.setState({
            isProcessing: false,
          });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
        this.setState({
          isProcessing: false,
        });
      });
    });
  }
 
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
                    <MenuItem value="created_date">Date</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="type">Method</MenuItem>
                    <MenuItem value="amount">Requested amount</MenuItem>
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
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Affiliate name</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell>Requested date</TableCell>
                      <TableCell>Paypal account</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Requested amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Processed date</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getAffiliatePaymentList.list || []).map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.affiliateName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.createdDate !== null ? moment(item.createdDate).format('YYYY-MM-DD') : ''}</TableCell>
                        <TableCell>{item.type === 'CASH' ? item.paypalAccount : ''}</TableCell>
                        <TableCell>{item.balance} $</TableCell>
                        <TableCell>{item.amount} $</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.processedDate !== null ? moment(item.processedDate).format('YYYY-MM-DD') : ''}</TableCell>
                        <TableCell>
                          {item.status === 'PENDING' && (
                            <IconButton 
                              color="primary"
                              aria-label="Payment decision" 
                              alt="Payment decision"
                              onClick={() => this.setState({ isShowingModal: true, editingId: item.id, editingStatusCompleted: false, radioValue: '' })}
                            >
                              <EditIcon/>
                            </IconButton>
                          )}
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
            <PaginationMaterial count={Math.ceil(this.props.data.getAffiliatePaymentList.totalElements / this.props.pagination.rowsPerPage)} page={this.props.pagination.pageNumber} onChange={this.props.handlePageNumber} color="primary" />
          </Grid>
        </Grid>

        <Dialog
          open={this.state.isShowingModal}
          onClose={() => this.setState({ isShowingModal: false })}
        >
          <DialogTitle>{"Payment request"}</DialogTitle>
          <DialogContent style={{ minWidth: 300 }}>
            <RadioGroup row value={this.state.radioValue} onChange={e => this.setState({ radioValue: e.target.value, editingStatusCompleted: e.target.value === 'true' })}>
              <FormControlLabel value="true" control={<Radio />} label="ACCEPT" />
              <FormControlLabel value="false" control={<Radio />} label="DECLINE" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => this.setState({ editingId: '', editingStatusCompleted: false, radioValue: '', isShowingModal: false })}
              disabled={this.props.isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={this.onClickOk}
              color="primary"
              autoFocus
              disabled={this.props.isProcessing}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(AffiliatePaymentTable));
