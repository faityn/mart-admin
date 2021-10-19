import React from "react";
import { GET_NOTICES, TOGGLE_NOTICES, DELETE_NOTICES } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { cdnUrl } from "../../../../core/common/variables";
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
  TextField,
  Grid,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * @summary Notice list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class NoticeTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      notices: {
        list: [],
      },
      search: {},
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      checkedItems: [],
      isProcessing: false,
    };

    // Bind event
    this.onProcessStart = this.onProcessStart.bind(this);
    this.onProcessEnd = this.onProcessEnd.bind(this);
    this.toggleItems = this.toggleItems.bind(this);
    this.deleteItems = this.deleteItems.bind(this);
  }

  /**
   * @summary Load notices
   */
  // async loadNotices() {
  //   await this.props.apolloClient.httpClient
  //     .query({
  //       query: GET_NOTICES,
  //       variables: {
  //         search: this.state.search,
  //         page: {
  //           limit: this.state.pagination.rowsPerPage,
  //           pageNumber: this.state.pagination.pageNumber,
  //           orderBy: this.state.orderBy,
  //           type: this.state.type,
  //         },
  //       },
  //     })
  //     .then((result) => {
  //       console.debug(result.data.getNotices)
  //       this.setState({
  //         notices: result.data.getNotices,
  //       });
  //     })
  //     .catch((error) => {
  //       this.props.enqueueSnackbar(
  //         "Sorry, there is an error occurred while fetching data.",
  //         { variant: "error" }
  //       );
  //     });
  // }

  /**
   * @override
   */
  // async componentDidMount() {
  //   // Get notices
  //   this.loadNotices();
  // }

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
   * @summary Process start
   */
  onProcessStart() {
    this.setState({
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
   * @summary toggleItem
   * @param {Boolean} toggleItem
   */
  async toggleItems(status) {
    // Process start
    this.onProcessStart();

    this.props.enqueueSnackbar(
      "The " + status + " process is being started ...",
      {
        variant: "info",
      }
    );

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: TOGGLE_NOTICES,
        variables: {
          ids: this.state.checkedItems,
          status: status,
        },
      })
      .then((result) => {
        const message = "Operation successfully.";
        this.props.enqueueSnackbar(message, { variant: "success" });
        this.props.refetch();
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    // Process end
    this.onProcessEnd();

    // Update notices
    this.loadNotices();
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
        mutation: DELETE_NOTICES,
        variables: {
          ids: this.state.checkedItems,
        },
      })
      .then((result) => {
        const message = "Selected notices succesfully deleted.";
        this.props.enqueueSnackbar(message, { variant: "success" });
        this.props.refetch();
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while deleting notices.",
          { variant: "error" }
        );
      });

    // Process end
    this.onProcessEnd();

    // Update notices
    this.loadNotices();
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Card className="mt-20">
          {/* List */}
          <CardContent>
            <Grid container>
              {/* Button section */}
              <Grid item xs={12} className="text-right">
                {/* InActive */}
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  onClick={() => this.toggleItems("INACTIVE")}
                  startIcon={<VisibilityOffIcon />}
                >
                  Inactive
                </Button>

                {/* Active */}
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  onClick={() => this.toggleItems("ACTIVE")}
                  startIcon={<VisibilityIcon />}
                >
                  Active
                </Button>

                {/* Delete */}
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  onClick={() => this.deleteItems()}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>

                {/* Create */}
                <Link
                  to={{
                    pathname: "/settings-notice/form/new",
                    state: {
                      items: [],
                    },
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    className="ml-20"
                  >
                    New Notice
                  </Button>
                </Link>
              </Grid>
            </Grid>

            <PerfectScrollbar>
              <div className="customListTable mt-20">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={
                            this.state.checkedItems.length ===
                            this.props.data.getNotices.list.length
                          }
                          onChange={(e) =>
                            this.onSelectAll(e, this.props.data.getNotices.list)
                          }
                        />
                      </TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getNotices.list || []).map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            value="true"
                            checked={
                              this.state.checkedItems.indexOf(item.id) !== -1
                            }


                            onChange={(e) => this.onSelect(e, item.id)}
                          />
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          <Link
                            to={{
                              pathname: "/settings-notice/view/" + item.id,
                              state: {
                                items: this.state.notices,
                              },
                            }}
                          >
                            {item.title}
                          </Link>
                        </TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          {moment(item.createdDate).format(
                            "YYYY-MM-DD HH:mm:ss"
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
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getNotices.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
              boundaryCount={100}
            />
          </Grid>
        </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(NoticeTable));
