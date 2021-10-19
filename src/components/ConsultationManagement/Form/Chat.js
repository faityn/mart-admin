import React from "react";
import {
  SAVE_QNA,
  GET_USER_QNAS,
  GET_USER_QNAS_BY_ID,
  GET_QNA_CHATS,
  SAVE_QNA_CHAT,
  UPLOAD_QNA_ATTACH,
  GET_ORDER_NUMBER,
} from "../../Queries/Queries";
import { cdnUrl } from "../../../core/common/variables";
import {
  Grid,
  Button,
  CircularProgress,
  LinearProgress,
  Fade,
  Tabs,
  Tab,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormHelperText,
  Card,
  CardHeader,
  CardContent,
  Alert,
} from "@material-ui/core";
import { date, dateTime } from "../../../core/common/date";
import FormControl from "@material-ui/core/FormControl";
import PageTitle from "../../../core/common/Partials/PageTitle";
import SwipeableViews from "react-swipeable-views";
import ForumIcon from "@material-ui/icons/Forum";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { withSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import { isNullableType } from "graphql";
import { connect } from "react-redux";
import validate from "validate.js";
import { Link } from "react-router-dom";

class Chat extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: null,
      category: "",
      title: "",
      orderNumber: null,
      userQnas: [],
      qnaChats: [],
      isProcessing: false,
      errors: null,
      alert: {},
      open: false,
      slide: true,
      photo: null,
      isOpenModal: false,
      attach: "",
    };

    // Events
    this.onHandleSubmitChat = this.onHandleSubmitChat.bind(this);
    this.hasError = this.hasError.bind(this);
    this.onClickId = this.onClickId.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    await this.loadMaindata();
  }

  async loadMaindata() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_USER_QNAS_BY_ID,
        variables: { id: this.props.match.params.id },
      })
      .then((response) => {
        if (response.data.getUserQnasById.length >= 1) {
          response.data.getUserQnasById.map((item, index) => {
            if (this.props.match.params.id === item.id) {
              this.setState({
                userQnas: response.data.getUserQnasById,
                id: response.data.getUserQnasById[index].id,
                category: response.data.getUserQnasById[index].category,
                title: response.data.getUserQnasById[index].title,
              });
            }
          });
        } else {
          this.setState({
            userQnas: [],
          });
        }
      });

    await this.props.apolloClient.httpClient
      .query({
        query: GET_ORDER_NUMBER,
        variables: {
          search: {
            status: "",
          },
          page: {
            limit: 5,
            pageNumber: 1,
            orderBy: "orderNumber",
            type: "DESC",
          },
        },
      })
      .then((response) => {
        this.setState({
          orderNumber: response.data.getOrders,
        });
      });
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.loadData();
    }
  }

  /**
   * @summary Load data
   */
  async loadData() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_QNA_CHATS,
        variables: { id: this.state.id },
      })
      .then((result) => {
        if (result.data.getQnaChats.length >= 1) {
          let helpText = {
            date: result.data.getQnaChats[0].date,
            chats: [
              {
                writer: "ADMIN",
                description: "How can we help you?",
              },
            ],
          };
          this.setState({
            qnaChats: [helpText, ...result.data.getQnaChats],
          });
        } else {
          let helpText = {
            date: date(new Date()),
            chats: [
              {
                writer: "ADMIN",
                description: "How can we help you?",
              },
            ],
          };
          this.setState({
            qnaChats: [helpText],
          });
        }
      });
  }

  /**
   * @summary Change id
   * @param {MouseEvent} id
   */
  onClickId(e, id, category, title) {
    this.setState({
      id: id,
      category: category,
      title: title,
    });
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, index) {
    this.setState({
      isOpenModal: true,
    });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isOpenModal: false });
  }

  /**
   * @summary Add attach
   * @param {String} url
   */
  onAddAttachToState(url) {
    this.setState({
      attach: url,
    });
  }

  /**
   * @summary Delete attach
   * @param {String} url
   */
  onClickDeleteAttach(event) {
    event.stopPropagation();

    this.setState({
      attach: "",
    });
  }

  /**
   * @summary Upload attach
   * @param {!Array<Object>} images
   */
  async onAttachUpload(event) {
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let file = event.target.files[0];

    this.props.apolloClient.uploadClient
      .mutate({
        mutation: UPLOAD_QNA_ATTACH,
        variables: { file },
      })
      .then((result) => {
        if (result.data.uploadQnaImage.statusCode === 200) {
          this.onAddAttachToState(result.data.uploadQnaImage.data);
          this.props.enqueueSnackbar(
            "The uploading process has been completed successfully.",
            { variant: "success" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while uploading image.",
          { variant: "error" }
        );
      });
  }

  /**
   * @summary Validate qnaChat
   * @param {Object} qnaChat
   */
  onValidateSubmitChat(qnaChat) {
    const schema = {
      description: {
        presence: {
          allowEmpty: false,
          message: "^Chat field is required.",
        },
      },

      qnaId: {
        presence: {
          allowEmpty: false,
          message: "^Select chat is required.",
        },
      },
    };

    // Validate
    const errors = validate(qnaChat, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Handle submit form chat
   * @param {MouseEvent} event
   */
  async onHandleSubmitChat(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let qnaChat = {
      qnaId: this.state.id,
      attachUrl: this.state.attach,
      writer: "ADMIN",
      description: formData.get("description"),
    };

    // Validate
    if (this.onValidateSubmitChat(qnaChat)) return;

    this.setState({
      isProcessing: true,
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_QNA_CHAT,
        variables: {
          qnaChat: qnaChat,
        },
      })
      .then(async (result) => {
        if (result.data.saveQnaChat.statusCode === 200) {
          let userQnasArray = this.state.userQnas;
          userQnasArray.map((item, index) => {
            item.id === this.state.id
              ? (item.status = "ANSWERED")
              : (item.status = "ANSWERING");
          });
          this.setState({
            userQnas: userQnasArray,
            alert: {
              message: "Your chat has been successfully sent.",
              variant: "success",
            },
          });

          await this.loadData();

          setTimeout(() => {
            this.setState({
              alert: {},
            });
          }, 1500);
        }
      });

    this.setState({
      isProcessing: false,
      isOpenModal: false,
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
              menuName="Consultation"
              title="Consultation Management List"
              links={[
                { name: "Consult management", href: "/consult-management" },
              ]}
              icon={<ForumIcon />}
            />
          </Grid>
          {this.state.id ? (
            <Grid item xs={6} className="text-right"></Grid>
          ) : null}
        </Grid>

        <Grid container className="consult-container">
          <Grid item md={3}>
            <div className="chatLeftSide">
              <h5 className="chat-header">1:1 Care Board</h5>
              {this.state.userQnas.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) =>
                      this.onClickId(e, item.id, item.category, item.title)
                    }
                  >
                    <div
                      className={
                        this.state.id === item.id
                          ? "chat-content chatActive"
                          : "chat-content"
                      }
                    >
                      <span>{item.category}</span>
                      <h6>{item.title}</h6>
                      <p>{item.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
          <Grid item md={9}>
            <div className="chatRightSide">
              <div className="text-header">
                <p>{this.state.category}</p>
                <h6>{this.state.title}</h6>
              </div>

              <div className="chat-main">
                {this.state.qnaChats.map((item, index) => {
                  return (
                    <div>
                      <div className="chatDate">
                        <h6>{item.date}</h6>
                      </div>
                      {item.chats.map((chat, index) => {
                        return (
                          <div className="text-left containerChat">
                            <div
                              className={
                                chat.writer === "USER"
                                  ? "text-contentRight"
                                  : "text-contentLeft"
                              }
                            >
                              {chat.description}
                              {chat.attachUrl ? (
                                <a
                                  href={cdnUrl + "qna/" + chat.attachUrl}
                                  target="_blank"
                                >
                                  <IconButton
                                    aria-label="attachment"
                                    component="span"
                                  >
                                    <AttachFileIcon />
                                  </IconButton>
                                </a>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="chatReplyContainer">
              <ForumIcon onClick={(e) => this.onOpenModal(e)} />
            </div>
          </Grid>
        </Grid>

        {/* Write Q&A Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Write Q&A</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form id="reply-form" noValidate onSubmit={this.onHandleSubmitChat}>
              <Grid container spacing={3} className="align-items-center">
                <Grid item md={3}>
                  Title
                </Grid>
                <Grid item md={9}>
                  {this.state.title}
                </Grid>
                <Grid item md={3}>
                  Attachment
                </Grid>
                <Grid item md={9}>
                  {this.state.attach ? (
                    <Card>
                      <CardHeader
                        action={
                          <IconButton
                            color="primary"
                            onClick={(e) => this.onClickDeleteAttach(e)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        }
                        title={
                          <span
                            style={{ fontSize: "14px", fontWeight: "normal" }}
                          >
                            {this.state.attach}
                          </span>
                        }
                      />
                    </Card>
                  ) : (
                    <div>
                      <input
                        type="file"
                        onChange={this.onAttachUpload.bind(this)}
                        accept="image/*"
                        id="icon-button-file"
                        className="displayNone"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                      <FormHelperText>Max file size: 5mb</FormHelperText>
                    </div>
                  )}
                </Grid>
                <Grid item md={3}>
                  Answer
                </Grid>
                <Grid item md={9}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    name="description"
                    multiline
                    rows={8}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>

          <Divider />
          {/* Actions */}
          <DialogActions>
            <Button
              autoFocus
              onClick={this.onCloseModal.bind(this)}
              color="primary"
            >
              Cancel
            </Button>
            <Button autoFocus form="reply-form" type="submit" color="primary">
              Submit
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

export default withSnackbar(connect(mapStateToProps, null)(Chat));
