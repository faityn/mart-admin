import React from "react";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import moment from "moment";
import { UPDATE_QNA_ANSWER_STATUS } from "../Queries";
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

/**
 * @summary Consult list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package ConsultationManagement
 */
class QnaTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      items: this.props.data.getQnaOnlys,
      checkedItems: [],
      isProcessing: false,
      search: {
        title: this.props.searchVariables.title,
        answerYn: this.props.searchVariables.answerYn,
      },
    };
  }

  /**
   * @override
   */
  // async componentDidMount() {
  //   // Get items
  //   this.setState({
  //     items: this.props.data.getQnaOnlys,
  //   });
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
   * @summary Change status
   * @param {Boolean} status
   */
  async changeStatus(status) {
    let items = this.state.items;
    let checkedItems = this.state.checkedItems;

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: UPDATE_QNA_ANSWER_STATUS,
        variables: {
          ids: checkedItems,
          answerYn: status,
        },
      })
      .then((result) => {
        if (result.data.updateQnaOnlyAnswer.statusCode === 200) {
          (checkedItems || []).map((id) => {
            let index = items.list.findIndex((f) => f.id === id);
            items.list[index].answerYn = status;
          });
        }

        this.setState({
          items: items,
        });

        const message = "Selected question status successfully updated.";
        this.props.enqueueSnackbar(message, { variant: "success" });
      })
      .catch((error) => {
        this.props.enqueueSnackbar("Sorry, there is an error occurred.", {
          variant: "error",
        });
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
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          color="primary"
                          value="true"
                          checked={
                            this.state.checkedItems.length ===
                            this.state.items.list.length
                          }
                          onChange={(e) =>
                            this.onSelectAll(e, this.state.items.list)
                          }
                        />
                      </TableCell>
                      <TableCell>Writer</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Answering</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getQnaOnlys.list || []).map(
                      (item, index) => (
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
                          <TableCell>{item.mailTo}</TableCell>
                          <TableCell>
                            <Link
                              to={{
                                pathname: "/settings-notice/qa/" + item.id,
                                state: {
                                  items: this.state.items,
                                },
                              }}
                            >
                              {item.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {moment(item.createdDate).format("YYYY-MM-DD")}
                          </TableCell>
                          <TableCell>{item.answerYn ? "O" : "X"}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>

                <Grid container>
                  <Grid item xs={12} className="text-right mt-20">
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: "10px" }}
                      onClick={() => this.changeStatus(true)}
                    >
                      Answered
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => this.changeStatus(false)}
                    >
                      Not answered
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getQnaOnlys.totalElements /
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

export default withSnackbar(connect(mapStateToProps, null)(QnaTable));
