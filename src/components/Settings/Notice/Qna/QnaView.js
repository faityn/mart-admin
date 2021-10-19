import React from "react";
import { GET_QNA_ONLY, GET_QNA_ONLY_ALL } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Grid,
} from "@material-ui/core";

/**
 * @summary Qna view
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class QnaView extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      id: this.props.match.params.id,
      qna: {
        title: null,
        mailTo: null,
        question: null,
        createdDate: null,
      },
      qnaAll: null,
      qnas: this.props.location.state.items,
      prevItem: null,
      nextItem: null,
      buttonActive: false,
    };
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Get notices
    this.loadQna();

    // Get qna all
    this.loadQnaAll();
  }

  /**
   * @override
   */
   componentDidUpdate(prevState) {
    if (prevState.id !== this.state.id && this.state.buttonActive === true) {
      this.loadQna();

      this.setState({
        buttonActive: false,
      });
    }
  }

  /**
   * @summary Load qnas
   */
   async loadQnaAll(props) {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_QNA_ONLY_ALL,
        variables: {
          page: {
            "limit": 0,
            "pageNumber": 1,
            "orderBy": "createdDate",
            "type": "DESC"
          }
        },
      })
      .then((result) => {
        this.setState({
          qnaAll: result.data.getQnaOnlyList,
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
   * @summary Load qnas
   */
  async loadQna() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_QNA_ONLY,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => {
        this.setState({
          qna: result.data.getQnaOnly,
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
   * @summary next qna
   */
  nextQna() {
    
    let qnaAll = this.state.qnaAll ? this.state.qnaAll : "";
    let getIndex = null;
    
    if(qnaAll) {
      (qnaAll || []).map((qna, index) => {

        if(this.state.id === qna.id){
          getIndex = index + 1;
        }
      });

      console.log(qnaAll[getIndex].id)

      this.setState({
        id: qnaAll[getIndex].id,
        buttonActive: true
      });
    }
  }

  /**
   * @summary prev qna
   */
  prevQna() {

    let qnaAll = this.state.qnaAll ? this.state.qnaAll : "";
    let getIndex = null;
    
    if(qnaAll) {
      (qnaAll || []).map((qna, index) => {

        if(this.state.id === qna.id){
          getIndex = index - 1;
        }
      });

      console.log(qnaAll[getIndex].id)

      this.setState({
        id: qnaAll[getIndex].id,
        buttonActive: true
      });
    }
    
  }

  /**
   * @override
   */
  render() {
    
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Q&A"
              title={"Q&A view"}
              links={[{ name: "Notice management", href: "/settings-notice" }]}
              icon={<NotificationsIcon />}
            />
          </Grid>
        </Grid>

        <Card className="mt-20">
          <CardContent>
            <Table>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>{this.state.qna.title}</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>
                  {moment(this.state.qna.createdDate).format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>E-mail</TableCell>
                <TableCell colSpan={3}>{this.state.qna.mailTo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.qna.question,
                    }}
                  ></div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button size="small" variant="contained" color="default" onClick={this.prevQna.bind(this)}>
                    Prev
                  </Button>
                </TableCell>
                <TableCell>
                  <Button size="small" variant="contained" color="default" onClick={this.nextQna.bind(this)}>
                    Next
                  </Button>
                </TableCell>
              </TableRow>
            </Table>

            <Grid container className="mt-20">
              <Grid item xs={12} className="text-right">
                <Link
                  to={{
                    pathname: "/settings-membership-management",
                    state: {
                      item: this.state.qna,
                    },
                  }}
                >
                  <Button size="small" variant="contained" color="primary">
                    Reply
                  </Button>
                </Link>
                <Link to={"/settings-notice"}>
                  <Button size="small" variant="contained" color="default">
                    List
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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

export default withSnackbar(connect(mapStateToProps, null)(QnaView));
