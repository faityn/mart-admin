import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  Avatar,
  Grid,
  Button,
  TextField,
  Badge,
  Card,
  CardHeader,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import CKEditor from "ckeditor4-react";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import {
  GET_ABOUTUS,
  SAVE_ABOUTUS,
  UPLOAD_IMAGE_ABOUTUS,
} from "../../Queries/Queries";

/**
 * @summary About us
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class AboutUs extends React.Component {
  constructor(props) {
    super(props);

    let images = [
      {
        fileUrl: "",
        description: "",
        fileOrder: "",
      },
    ];

    this.state = {
      isProcessing: false,
      aboutUs: null,
      files: [],
      images: images,
    };

    // Event
    this.onAddImage = this.onAddImage.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_ABOUTUS,
        variables: { id: "" },
      })
      .then((result) => {
        this.setState({
          aboutUs: result.data.about,
          images: result.data.about.aboutFiles ? result.data.about.aboutFiles : this.state.images,
          description: result.data.about.description,
          youtubeUrl: result.data.about.youtubeUrl,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  /**
   * @summary Change description
   * @param {MouseEvent} editor
   */
  onChangeDescription(event, editor) {
    this.setState({
      description: editor.getData(),
    });
  }

  /**
   * @summary Add image
   * @param {String} url
   */
  onAddImageToState(url, index) {
    this.state.images.splice(index, 1);

    this.setState((prevState) => ({
      images: prevState.images.concat([{ fileUrl: url }]),
    }));
  }

  /**
   * @summary Delete Image
   * @param {String} url
   */
  onClickDelete(event, index) {
    event.stopPropagation();

    let images = this.state.images;
    images.splice(index, 1);

    this.setState({
      images: images,
    });
  }

  /**
   * @summary Upload images
   * @param {!Array<Object>} images
   */
  async onDropImage(images, index) {
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let promises = await images.reduce(
      (accumulatorPromise, file) =>
        accumulatorPromise.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_IMAGE_ABOUTUS,
                  variables: { file },
                })
                .then((result) => {
                  if (result.data.uploadFileAboutUs.statusCode === 200) {
                    this.onAddImageToState(
                      result.data.uploadFileAboutUs.data,
                      index
                    );

                    resolve([...prevResolve, ...[true]]);
                  } else {
                    this.props.enqueueSnackbar(
                      "Sorry, there is an error occurred while uploading image.",
                      { variant: "error" }
                    );
                    resolve([...prevResolve, ...[false]]);
                  }
                })
                .catch((error) => {
                  this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while uploading image.",
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
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();
    // Form data
    const formData = new FormData(event.target);

    // file
    let fileData = formData.getAll("fileUrl");
    let files = [];
    let url = formData.getAll("url");
    let description = formData.getAll("subDescription");

    (fileData || []).map((file, index) => {
      // if (!file) return true;

      files.push({
        fileUrl: file,
        url: url[index],
        description: description[index],
      });
      return true;
    });

    // Form data to object
    let about = {
      id: formData.get("id"),
      description: formData.get("description"),
      youtubeUrl: formData.get("youtubeUrl"),
      aboutFiles: files,
    };

    // Validate
    // if (this.onValidateSubmit(nplus))
    //   return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_ABOUTUS,
        variables: {
          about: about,
        },
      })
      .then((result) => {
        if (result.data.saveAbout.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Main banner has been successfully updated.",
            { variant: "success" }
          );
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this.setState({ isProcessing: false });
  }

  /**
   * @summary Detail
   * @param {Event} childrenName
   */
  onAddImage() {
    this.setState((prevState) => ({
      images: prevState.images.concat([
        {
          fileUrl: "",
          description: "",
          fileOrder: "",
        },
      ]),
    }));
  }

  /**
   * @override
   */
  render() {
    if (!this.state.aboutUs) return "";

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="About us setting"
              title="About us setting"
              icon={<InfoIcon />}
            />
          </Grid>
          <Grid item xs={6} className="text-right"></Grid>
        </Grid>

        <Grid container>
          <Grid item md={8} xs={12}>
            <form
              id="my-form-managemnt"
              onSubmit={this.onHandleSubmit.bind(this)}
            >
              <div className="card mt-20">
                <input type="hidden" name="id" value={this.state.aboutUs.id} />
                {/* Upload Video */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Upload a video</h5>
                  </Grid>
                  <Grid item md={9} xs={12} className="mt-20">
                    <TextField
                      fullWidth
                      id="name-basic"
                      label="Youtube url is here"
                      size="small"
                      variant="outlined"
                      name="youtubeUrl"
                      defaultValue={this.state.youtubeUrl}
                    />
                  </Grid>
                </Grid>

                {/* Description */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Description</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <CKEditor
                      type="classic"
                      name="description"
                      data={this.state.description}
                      onChange={({ event, editor }) =>
                        this.onChangeDescription(event, editor)
                      }
                    />
                    <textarea
                      name="description"
                      value={this.state.description}
                      style={{ display: "none" }}
                    />
                  </Grid>
                </Grid>
              </div>

              {(this.state.images || []).map((image, index) => (
                <div className="card mt-20">
                  {/* Image */}
                  <Grid
                    container
                    spacing={2}
                    className="align-items-center mt-20"
                  >
                    <Grid item md={2} xs={12}>
                      <h5>Upload Image</h5>
                    </Grid>
                    <Grid item md={10} xs={12}>
                      <Grid container>
                        <Grid item xs={12} className="text-right">
                          <IconButton
                            color="primary"
                            onClick={(e) => this.onClickDelete(e, index)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          key={index}
                          className={index !== 0 ? "mt-20" : null}
                        >
                          {image.fileUrl ? (
                            <Card>
                              <CardHeader
                                title={
                                  <img
                                    src={
                                      process.env.REACT_APP_CDN_URL +
                                      "aboutus/" +
                                      image.fileUrl
                                    }
                                    width="100%"
                                  />
                                }
                              />
                            </Card>
                          ) : (
                            <DropzoneArea
                              maxFileSize={30000000}
                              filesLimit={1}
                              onDrop={(e) => this.onDropImage(e, index)}
                            />
                          )}
                        </Grid>
                        <input
                          type="hidden"
                          name="fileUrl"
                          value={image.fileUrl}
                        />

                        <Grid item md={12} xs={12} className="mt-20">
                          <TextField
                            fullWidth
                            id="name-basic"
                            label="Url is here"
                            size="small"
                            variant="outlined"
                            name="url"
                            defaultValue={image.url}
                          />
                        </Grid>

                        <Grid item md={12} xs={12} className="mt-20">
                          <TextField
                            fullWidth
                            id="name-basic"
                            label="SubDescription is here"
                            size="small"
                            variant="outlined"
                            name="subDescription"
                            defaultValue={image.description}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </form>

            <div className="card mt-20">
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Button
                    form="my-form-managemnt"
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={this.state.isProcessing}
                    startIcon={
                      this.state.isProcessing ? (
                        <CircularProgress color="white" size="1rem" />
                      ) : (
                        <SaveIcon fontSize="small" className="mr-10" />
                      )
                    }
                  >
                    Save
                  </Button>
                  {/* Add */}
                  <Button
                    className="ml-20 bordered"
                    variant="contained"
                    size="small"
                    color="default"
                    onClick={this.onAddImage}
                    startIcon={<AddIcon />}
                  >
                    New Image
                  </Button>
                </Grid>
              </Grid>
            </div>
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

export default withSnackbar(connect(mapStateToProps, null)(AboutUs));
