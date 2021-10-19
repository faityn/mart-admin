import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  Button,
  Grid,
  CardContent,
  Badge,
  IconButton,
  Avatar,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { UPLOAD_FILE } from "../Queries";
import { connect } from "react-redux";

/**
 * @summary Attachments
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Attachments extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Default states
    this.state = {
      attachments:
        this.props.product && this.props.product.attachments
          ? this.props.product.attachments
          : [],
      isSellerPolicyMessage: false,
    };

    this._isMounted = false;
  }

  /**
   * @summary Close modal
   * @param {event}
   */
  onOpenModal() {
    this.setState({ isSellerPolicyMessage: true });
  }

  /**
   * @summary Close modal
   * @param {event}
   */
  onCloseModal() {
    this.setState({ isSellerPolicyMessage: false });
  }

  /**
   * @override
   */
  componentDidMount() {
    this._isMounted = true;
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

  /**
   * @summary Add attachment
   * @param {String} url
   */
  onAddAttachment(url) {
    this._isMounted &&
      this.setState((prevState) => ({
        attachments: prevState.attachments.concat([{ fileUrl: url }]),
      }));
  }

  /**
   * @summary Delete Image
   * @param {String} url
   */
  onClickDelete(event, index) {
    event.stopPropagation();

    let attachments = this.state.attachments;
    attachments.splice(index, 1);

    this.setState({
      attachments: attachments,
    });
  }

  /**
   * @summary Upload files
   * @param {!Array<Object>} files
   */
  async onDrop(files) {
    this.props.onProcessStart();
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let promises = await files.reduce(
      (accumulatorPromise, file) =>
        accumulatorPromise.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_FILE,
                  variables: { file },
                })
                .then((result) => {
                  if (result.data.uploadFile.statusCode === 200) {
                    this.onAddAttachment(result.data.uploadFile.data);
                    resolve([...prevResolve, ...[true]]);
                  } else {
                    this.props.enqueueSnackbar(
                      "Sorry, there is an error occurred while uploading file.",
                      { variant: "error" }
                    );
                    resolve([...prevResolve, ...[false]]);
                  }
                })
                .catch((error) => {
                  this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while uploading file.",
                    { variant: "error" }
                  );
                  resolve([...prevResolve, ...[false]]);
                });
            })
        ),
      Promise.resolve([])
    );

    let message = !promises.find((f) => f === false)
      ? "The uploading process has been completed successfully."
      : "The uploading process has been completed with errors.";
    let variant = !promises.find((f) => f === false) ? "success" : "warning";

    this.props.enqueueSnackbar(message, { variant: variant });
    this._isMounted && this.props.onProcessEnd();
  }

  /**
   * @override
   */
  render() {
    if (!this.props.isShowForm) return "";

    // ROLE SELLER
    const user = JSON.parse(
      localStorage.getItem(process.env.REACT_LOGGED_USER)
    );

    return (
      <CardContent>
        {/* Container */}
        <Grid container spacing={3} wrap="wrap">
          <Grid item xs={12} className="align-items-center">
            <h5>파일첨부 </h5>{" "}
            {user.roleName === "ROLE_SELLER" ? (
              <HelpOutlineIcon
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={this.onOpenModal.bind(this)}
              />
            ) : null}
          </Grid>

          {/* Dropzone area */}
          <Grid item xs={12}>
            <DropzoneArea
              maxFileSize={30000000}
              onDrop={this.onDrop.bind(this)}
              filesLimit={10}
              acceptedFiles={["application/pdf"]}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="align-items-center">
          <Grid item md={12}>
            {this.state.attachments.map((attachment, index) => {
              return (
                <React.Fragment key={index}>
                  {/* <Avatar src={url} variant="square" /> */}
                  <input
                    type="hidden"
                    name="attachments"
                    value={attachment.fileUrl}
                  />
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-20">
          {this.state.attachments.map((file, index) => {
            return (
              <Grid item md={2} key={index}>
                <input type="hidden" name="files" value={file.fileUrl} />

                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  badgeContent={
                    <IconButton
                      color="default"
                      onClick={(e) => this.onClickDelete(e, index)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  }
                >
                  <Avatar
                    variant="rounded"
                    alt="File"
                    src={
                      process.env.REACT_APP_CDN_URL + "static/admin/img/pdf.png"
                    }
                    className="custom-avatar"
                  />
                </Badge>
                <h6>{file.fileUrl}</h6>
              </Grid>
            );
          })}
        </Grid>

        {/* Seller policy popup */}
        <Dialog
          open={this.state.isSellerPolicyMessage}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Seller policy</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
          <div dangerouslySetInnerHTML={{__html: this.props.sellerPolicyMessage.description2}}></div>
          </DialogContent>

          <Divider />
          {/* Actions */}
          <DialogActions>
            <Button color="primary" onClick={this.onCloseModal.bind(this)}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default connect(mapStateToProps, null)(Attachments);
