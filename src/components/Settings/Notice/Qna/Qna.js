import React from "react";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BaseList from '../../../../core/common/List';

import {
  CHECK_QNA_RECEPTION_STATUS,
  UPDATE_QNA_RECEPTION_STATUS,
  GET_QNA_ONLYS,
} from "../Queries";
import QnaSearch from './Search';
import QnaTable from './Table';

import Paper from "@material-ui/core/Paper";
import { Button, Grid } from "@material-ui/core";

/**
 * @summary Q&A
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class Qna extends BaseList {
  /**
   * @constructor
   */
  constructor() {
    super();

    // State
    this.state = {
      showList: false,
      receptionStatus: false,
      search: {
        title: "",
        answerYn: null,
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
      orderBy: "createdDate",
      type: "DESC",
    };

    // Override
    this.query = GET_QNA_ONLYS;
    this.table = QnaTable;

    // Events
    this.toggleReceptionStatus = this.toggleReceptionStatus.bind(this);
    this.showQnalist = this.showQnalist.bind(this);

    this.onReset = this.onReset.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Check list to show
    this.setState({
      showList: this.props.showList,
    });

    // Check q&a reception status
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: CHECK_QNA_RECEPTION_STATUS,
      })
      .then((result) => {
        this.setState({
          receptionStatus: result.data.checkQnaPowerStatus,
        });
      })
      .catch((error) => {});
  }

  /**
   * @summary deleteItem
   * @param {Boolean} deleteItem
   */
  async toggleReceptionStatus() {
    let receptionStatus = !this.state.receptionStatus;

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: UPDATE_QNA_RECEPTION_STATUS,
        variables: {
          powerStatus: receptionStatus,
        },
      })
      .then((result) => {
        const message = "Q&A reception status changed.";
        this.props.enqueueSnackbar(message, { variant: "success" });

        this.setState({
          receptionStatus: receptionStatus,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar("Sorry, there is an error occurred.", {
          variant: "error",
        });
      });
  }

  /**
   * @summary Show q&a list
   */
  showQnalist() {
    this.setState({
      showList: true,
    });
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenState) {
    this.setState({
      search: {
        title: childrenState.title,
        answerYn: childrenState.answerYn,
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
    });
  }

  /**
   * @summary onReset
   * @param {MouseEvent} event
   */
  onReset(event) {
    this.setState({
      search: {
        title: "",
        answerYn: null,
      },
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1
      },
    });
  }

  /**
   * @override
   */
  render() {
    let receptionStatus = this.state.receptionStatus ? "On" : "Off";

    return !this.state.showList ? (
      <React.Fragment>
        <Paper style={{ margin: "auto 0", padding: "180px" }}>
          사용자 페이지의 Q&A Reception 버튼의 On/Off를 원하시면 Q&A Reception
          버튼을 클릭해주세요.
        </Paper>
        <Grid container>
          <Grid item xs={12} className="text-center mt-20">
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ width: "160px", marginRight: "10px" }}
              onClick={() => this.toggleReceptionStatus()}
            >
              Q&A Reception - {receptionStatus}
            </Button>
            <Link to={"/consult-management"}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                style={{ width: "160px", marginRight: "10px" }}
              >
                1:1 Care
              </Button>
            </Link>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ width: "160px", marginRight: "10px" }}
              onClick={() => this.showQnalist()}
            >
              List
            </Button>
          </Grid>
          {/* <Grid item xs={12} className="text-right mt-20">
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              List
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid> */}
        </Grid>
      </React.Fragment>
    ) : (
      <React.Fragment>
        {/* Search */}
        <div className="card">
          <QnaSearch search={this.search} onReset={this.onReset} />
        </div>

        {/* List */}
        {this.executeQuery()}
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

export default withSnackbar(connect(mapStateToProps, null)(Qna));
