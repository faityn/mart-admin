import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import { GET_EXHIBITIONS, DELETE_EXHIBITIONS } from "../../../Queries/Queries";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import {
  Button,
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
  Grid,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";

/**
 * @summary Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class ExhibitionTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      exhibitions: {
        list: [],
      },
      search: {
        type: "Ended",
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      checkedItems: [],
    };

    // Event
    this.deleteItems = this.deleteItems.bind(this);
  }

  /**
   * @summary Load exhibitions
   */
  async loadItems() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_EXHIBITIONS,
        variables: {
          search: this.state.search,
          page: {
            limit: this.state.pagination.rowsPerPage,
            pageNumber: this.state.pagination.pageNumber,
            orderBy: this.state.orderBy,
            type: this.state.type,
          },
        },
      })
      .then((result) => {
        this.setState({
          exhibitions: result.data.getExhibitions,
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
   * @summary deleteItem
   * @param {Boolean} deleteItem
   */
  async deleteItems() {
    this.props.enqueueSnackbar("The DELETE process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: DELETE_EXHIBITIONS,
        variables: {
          ids: this.state.checkedItems,
        },
      })
      .then((result) => {
        const message = "Selected exhibitions succesfully deleted.";
        this.props.enqueueSnackbar(message, { variant: "success" });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while deleting exhibitions.",
          { variant: "error" }
        );
      });

    // Update items
    this.loadItems();
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Get items
    this.loadItems();
  }

  /**
   * @summary Toggle exhibition selection
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
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Grid container>
                  {/* Title section */}
                  <Grid item xs={6}></Grid>

                  {/* Button section */}
                  <Grid item xs={6} className="text-right">
                    {/* Delete */}
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => this.deleteItems()}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>

                <Table className="mt-20">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={
                            this.state.checkedItems.length ===
                            this.props.data.getExhibitions.list.length
                          }
                          onChange={(e) =>
                            this.onSelectAll(
                              e,
                              this.props.data.getExhibitions.list
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      {/* <TableCell>Description</TableCell> */}
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.state.exhibitions.list || []).map((item) => (
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
                        <TableCell>
                          {item.imageUrl ? (
                            <img
                              src={
                                process.env.REACT_APP_CDN_URL +
                                "exhibition/" +
                                item.imageUrl
                              }
                              height="100px"
                            />
                          ) : (
                            "No Image"
                          )}
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        {/* <TableCell>{item.description}</TableCell> */}
                        <TableCell>{item.type}</TableCell>
                        <TableCell>
                          {item.active === true ? "Active" : "Inactive"}
                        </TableCell>
                        <TableCell>
                          {moment(item.startDate).format("YYYY-MM-DD")} ~{" "}
                          {moment(item.endDate).format("YYYY-MM-DD")}
                        </TableCell>
                        <TableCell>
                          <Link to={"/exhibition/edit/" + item.id}>
                            <IconButton
                              color="primary"
                              aria-label="exhibition modification"
                              alt="exhibition modification"
                              id={item.id}
                            >
                              <EditIcon />
                            </IconButton>
                          </Link>
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
                this.props.data.getExhibitions.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
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

export default withSnackbar(connect(mapStateToProps, null)(ExhibitionTable));
