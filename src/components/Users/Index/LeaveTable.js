import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { GET_LEAVE_USERS, DELETE_USER } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import moment from "moment";
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
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";

/**
 * @summary Dormant list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Users/index
 */
class DormantTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      users: {
        list: [],
      },
      isProcessing: false,
      isOpenModal: false,
      open: false,
      search: {
        status: "INACTIVE",
      },
      isDeletable: true,
      checkedItems: [],
    };

    // Bind event
    this.onProcessStart = this.onProcessStart.bind(this);
    this.onProcessEnd = this.onProcessEnd.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }

  /**
   * @summary Load items
   */
  async loadItems() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_LEAVE_USERS,
        variables: {
          search: this.state.search,
          page: {
            limit: 10,
            pageNumber: 1,
            orderBy: "createdDate",
            type: "DESC",
          },
        },
      })
      .then((result) => {
        this.setState({
          users: result.data.getWithdrawalUsers,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.setState({
      search: {
        status: this.props.searchVariables.status,
      },
      isDeletable:
        this.props.searchVariables.status === "INACTIVE" ? false : true,
    });
    this.loadItems();
  }

  /**
   * @override
   */
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        search: {
          status: this.props.searchVariables.status,
        },
        isDeletable:
          this.props.searchVariables.status === "INACTIVE" ? false : true,
      });
      this.loadItems();
    }
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal() {
    this.setState({ isOpenModal: true });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @summary Toggle product selection
   * @param {MouseEvent} event
   * @param {String} itemId
   */
  onSelect(event, itemId) {
    event.stopPropagation();

    let checkedItems = this.state.checkedItems;
    const index = checkedItems.indexOf(itemId);

    if (index === -1) {
      checkedItems.push(itemId);
    } else {
      checkedItems.splice(index, 1);
    }

    this.setState({
      checkedItems: checkedItems,
    });
  }

  /**
   * @summary Toggle selections
   */
  onSelectAll(event, items) {
    event.stopPropagation();

    let checkedItems = this.state.checkedItems;

    if (checkedItems.length > 0) {
      checkedItems = [];
    } else {
      (items || []).map((item) => {
        checkedItems.push(item.id);
      });
    }

    this.setState({
      checkedItems: checkedItems,
    });
  }

  /**
   * @summary deleteItem
   * @param {Boolean} deleteItem
   */
  async deleteItems() {
    // Process start
    this.onProcessStart();

    this.props.enqueueSnackbar("The DELETE process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: DELETE_USER,
        variables: {
          ids: this.state.checkedItems,
        },
      })
      .then((result) => {
        const message = "Selected users succesfully deleted.";
        this.props.enqueueSnackbar(message, { variant: "success" });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while deleting users.",
          { variant: "error" }
        );
      });

    // Process end
    this.onProcessEnd();

    this.loadItems();
  }

  /**
   * @summary Process start
   */
  onProcessStart() {
    this.setState({
      isOpenModal: false,
      isProcessing: true,
    });
  }

  /**
   * @summary Process end
   */
  onProcessEnd() {
    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* Save stick and price */}
        <Grid container>
          <Grid item xs={12} className="text-right">
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<DeleteForeverIcon />}
              disabled={this.state.isDeletable}
              onClick={() => this.onOpenModal()}
            >
              Delete
            </Button>
          </Grid>
        </Grid>

        <Card className="customListTable mt-20">
          {/* Rows per page */}
          <CardActions>
            {/* <Grid container>
              <Grid item xs={12} className="text-right">
                <span className="sort-by-product">Sort by: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="sort-simple-select-label"
                    id="sort-simple-select"
                    onChange={this.props.handleOrderByProduct} 
                    value={this.props.orderBy}>
                    <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="gender">Gender</MenuItem>
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
            </Grid> */}
          </CardActions>

          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={
                            this.state.checkedItems.length ===
                            this.state.users.list.length
                          }
                          onChange={(e) =>
                            this.onSelectAll(e, this.state.users.list)
                          }
                        />
                      </TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Nation</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Date of withdrawal</TableCell>
                      {/* <TableCell>Delete</TableCell> */}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.state.users.list || []).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="true"
                            checked={
                              this.state.checkedItems.indexOf(item.id) !== -1
                            }
                            onChange={(e) => this.onSelect(e, item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.nation}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>
                          {moment(item.withdrawalDate).format("YYYY-MM-DD")}
                        </TableCell>
                        {/* <TableCell>
                          <IconButton 
                            color="primary" 
                            aria-label="Recover modification" 
                            alt="Recover modification"
                            disabled={this.state.isDeletable}
                            onClick={(e) => this.handleClickOpen(e, item.id)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>  
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        {this.props.data.getWithdrawalUsers.totalElements >
        this.props.pagination.rowsPerPage ? (
          <Grid container className="mt-20">
            <Grid item xs={12}>
              <PaginationMaterial
                count={Math.ceil(
                  this.props.data.getWithdrawalUsers.totalElements /
                    this.props.pagination.rowsPerPage
                )}
                page={this.props.pagination.pageNumber}
                onChange={this.props.handlePageNumber}
                color="primary"
              />
            </Grid>
          </Grid>
        ) : null}

        {/* Dialog */}
        <Dialog
          open={this.state.isOpenModal}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently delete this user(s)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseModal.bind(this)} color="primary">
              No
            </Button>
            <Button color="primary" onClick={() => this.deleteItems()}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(DormantTable));
