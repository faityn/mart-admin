import React from "react";
import { GET_NOTICE, SAVE_NOTICE } from "../Queries";
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
 * @summary Notice form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class NoticeView extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      id: this.props.match.params.id,
      notice: {
        title: null,
        description: null,
        createdDate: null,
      },
      notices: this.props.location.state.items,
      prevNotice: null,
      nextNotice: null,
    };
  }

  /**
   * @summary Load notices
   */
  async loadNotice() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_NOTICE,
        variables: {
          id: this.state.id,
        },
      })
      .then((result) => {
        this.setState({
          notice: result.data.notice,
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
   * @summary Check mode
   */
  getPrevNext() {
    let prevNotice,
      nextNotice = null;

    this.state.notices.list.map((item, index, arr) => {
      // Find current item
      if (item.id === this.state.id) {
        // Check item is not first
        prevNotice = index > 0 ? arr[index - 1] : null;
        // Check item is not first
        nextNotice =
          index < this.state.notices.totalElements - 1 ? arr[index + 1] : null;
      }
    });

    this.setState({
      prevNotice: prevNotice,
      nextNotice: nextNotice,
    });
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Create or Edit
    this.getPrevNext();

    // Get notices
    this.loadNotice();
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
              menuName="Notice"
              title={"Notice view"}
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
                <TableCell>{this.state.notice.title}</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>
                  {moment(this.state.notice.createdDate).format("YYYY-MM-DD")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.notice.description,
                    }}
                  ></div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {this.state.prevNotice ? (
                    <Link
                      to={{
                        pathname:
                          "/settings-notice/view/" + this.state.prevNotice.id,
                        state: {
                          items: this.state.notices,
                        },
                      }}
                    >
                      <Button size="small" variant="contained" color="default">
                        Prev
                      </Button>
                    </Link>
                  ) : null}
                </TableCell>
                <TableCell colSpan={3}>
                  {this.state.prevNotice
                    ? this.state.prevNotice.title
                    : "This is the first notice"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {this.state.nextNotice ? (
                    <Link
                      to={{
                        pathname:
                          "/settings-notice/view/" + this.state.nextNotice.id,
                        state: {
                          items: this.state.notices,
                        },
                      }}
                    >
                      <Button size="small" variant="contained" color="default">
                        Next
                      </Button>
                    </Link>
                  ) : null}
                </TableCell>
                <TableCell colSpan={3}>
                  {this.state.nextNotice
                    ? this.state.nextNotice.title
                    : "This is the last notice"}
                </TableCell>
              </TableRow>
            </Table>

            <Grid container className="mt-20">
              <Grid item xs={12} className="text-right">
                <Link
                  to={{
                    pathname: "/settings-notice/form/" + this.state.notice.id,
                    state: {
                      items: this.state.notices,
                    },
                  }}
                >
                  <Button size="small" variant="contained" color="primary">
                    Edit
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

export default withSnackbar(connect(mapStateToProps, null)(NoticeView));
