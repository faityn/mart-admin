import React from "react";
import { GET_NOTICE, SAVE_NOTICE } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import validate from "validate.js";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import CKEditor from "ckeditor4-react";
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
class NoticeForm extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      id: this.props.match.params.id,
      notice: {
        createdDate: new Date(),
        title: "",
        description: "",
      },
      notices: this.props.location.state.items,
      mode: null,
      isProcessing: false,
      errors: null,
    };

    // Bind event
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
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
   * @override
   */
  async componentDidMount() {
    let id, mode;
    if (this.state.id === "new") {
      id = "";
      mode = "Create";
    } else {
      id = this.state.id;
      mode = "Edit";

      // Get notices
      this.loadNotice();
    }

    // Create or Edit
    this.setState({
      id: id,
      mode: mode,
    });
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      notice: Object.assign(this.state.notice, {
        description: editor.getData(),
      }),
    });
  }

  /**
   * @summary Validate formData
   * @param {Object} formData
   */
  onValidateForm(formData) {
    const schema = {
      description: {
        presence: {
          allowEmpty: false,
          message: "^Chat field is required.",
        },
      },

      title: {
        presence: {
          allowEmpty: false,
          message: "^Select chat is required.",
        },
      },
    };

    // Validate
    const errors = validate(formData, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let noticeData = {
      id: this.state.id,
      type: "notice",
      email: "",
      title: formData.get("title"),
      description: formData.get("description"),
    };

    // Validate
    if (this.onValidateForm(noticeData)) return;

    this.setState({
      isProcessing: true,
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_NOTICE,
        variables: {
          notice: noticeData,
        },
      })
      .then(async (result) => {
        if (result.data.saveNotice.statusCode === 200) {
          const message = "Successfully saved.";
          this.props.enqueueSnackbar(message, { variant: "success" });

          this.setState({
            notice: noticeData,
            alert: {
              message: "Successfully saved.",
              variant: "success",
            },
          });
        }
      });

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
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Notice"
              title={this.state.mode + " notice"}
              links={[{ name: "Notice management", href: "/settings-notice" }]}
              icon={<NotificationsIcon />}
            />
          </Grid>
        </Grid>

        {/* Form */}
        <Card className="mt-20">
          <CardContent>
            <form id="notice-form" noValidate onSubmit={this.onHandleSubmit}>
              <Table>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      size="small"
                      name="title"
                      multiline
                      rows={1}
                      id="notice-title"
                      defaultValue={this.state.notice.title}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>
                    {moment(this.state.notice.createdDate).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <CKEditor
                      type="classic"
                      name="description"
                      data={this.state.notice.description}
                      onChange={({ event, editor }) =>
                        this.onChangeDescription(event, editor)
                      }
                    />
                    <textarea
                      name="description"
                      value={this.state.notice.description}
                      style={{ display: "none" }}
                    />
                    {/* <TextField
                      fullWidth
                      size="small"
                      name="description"
                      id="notice-description"
                      defaultValue={this.state.notice.description}
                      multiline
                      rows={8}
                      variant="outlined"
                      style={{ display: "none" }}
                    /> */}
                  </TableCell>
                </TableRow>
              </Table>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-20">
          <CardContent>
            <Button
              size="small"
              variant="contained"
              color="primary"
              form="notice-form"
              type="submit"
            >
              {this.state.mode}
            </Button>
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

export default withSnackbar(connect(mapStateToProps, null)(NoticeForm));
