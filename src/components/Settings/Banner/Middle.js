import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import {
  Grid,
  Button,
  TextField,
  IconButton,
  Card,
  CardHeader,
  CircularProgress,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import {
  GET_BANNERS,
  SAVE_BANNER,
  UPLOAD_IMAGE_BANNER,
} from "../../Queries/Queries";

/**
 * @summary Middle banner
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class MiddleBanner extends React.Component {
  constructor(props) {
    super(props);

    let images = [
      {
        imageUrl: "",
        url: "",
      },
    ];

    this.state = {
      isProcessing: false,
      banners: [],
      files: [],
      images: images,
    };

    // Event
    this.onAddImage = this.onAddImage.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_BANNERS,
        variables: { type: "MIDDLE" },
      })
      .then((result) => {
        this.setState({
          banners: result.data.getBanner,
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
   * @summary Add image
   * @param {Event} more image
   */
  onAddImage() {
    this.setState((prevState) => ({
      banners: prevState.banners.concat([
        {
          id: "",
          imageUrl: "",
          url: "",
          type: "MIDDLE",
        },
      ]),
    }));
  }

  /**
   * @summary Add image
   * @param {String} url
   */
  onAddImageToState(url, index) {
    this.state.banners.splice(index, 1);

    this.setState((prevState) => ({
      banners: prevState.banners.concat([{ imageUrl: url }]),
    }));
  }

  /**
   * @summary Delete Image
   * @param {String} url
   */
  onClickDelete(event, index) {
    event.stopPropagation();

    let banners = this.state.banners;
    banners.splice(index, 1);

    this.setState({
      banners: banners,
    });
  }

  /**
   * @summary Upload images
   * @param {!Array<Object>} images
   */
  async onDrop(images, index) {
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let promises = await images.reduce(
      (accumulatorPromise, image) =>
        accumulatorPromise.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_IMAGE_BANNER,
                  variables: { image },
                })
                .then((result) => {
                  if (result.data.uploadImageBanner.statusCode === 200) {
                    this.onAddImageToState(
                      result.data.uploadImageBanner.data,
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

    // Main banner
    let banner = [];

    // datas
    let ids = formData.getAll("id");
    let urls = formData.getAll("url");

    for (let i = 0; i < ids.length; i++) {
      let imageUrls = this.state.banners[i].imageUrl
        ? this.state.banners[i].imageUrl
        : null;

      banner.push({
        id: ids[i],
        url: urls[i],
        imageUrl: imageUrls,
        type: "MIDDLE",
      });
    }

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
        mutation: SAVE_BANNER,
        variables: {
          banner: banner,
        },
      })
      .then((result) => {
        if (result.data.saveBanner.statusCode === 200) {
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
              menuName="Middle banner"
              title="Middle banner setting"
              icon={<ViewCarouselIcon />}
            />
          </Grid>
        </Grid>

        {/* Content */}

        <form id="my-form-managemnt" onSubmit={this.onHandleSubmit.bind(this)}>
          {this.state.banners.map((banner, index) => (
            <div className="card mt-20">
              <Grid container className="mt-20 align-items-center">
                <input type="hidden" name="id" value={banner.id} />
                <Grid item md={2} xs={12}>
                  <h5>Middle banner {index + 1}</h5>
                </Grid>
                <Grid item md={10} xs={12}>
                  <Grid container>
                    <Grid item md={12} xs={12} key={index}>
                      {banner.imageUrl ? (
                        <Card>
                          <CardHeader
                            action={
                              <IconButton
                                color="primary"
                                onClick={(e) => this.onClickDelete(e, index)}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            }
                            title={
                              <img
                                src={
                                  process.env.REACT_APP_CDN_URL +
                                  "ads/banner/" +
                                  banner.imageUrl
                                }
                                width="100%"
                              />
                            }
                          />
                        </Card>
                      ) : (
                        <DropzoneArea
                          maxFileSize={30000000}
                          acceptedFiles={["image/jpeg", "image/png"]}
                          filesLimit={1}
                          onDrop={(e) => this.onDrop(e, index)}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid container className="mt-20">
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        id="name-basic"
                        label="Url is here"
                        size="small"
                        variant="outlined"
                        name="url"
                        defaultValue={banner.url}
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
                SAVE
              </Button>
              {/* Add */}
              <Button
                className="ml-20 bordered"
                variant="contained"
                size="small"
                color="default"
                onClick={this.onAddImage}
                startIcon={
                  <NoteAddIcon />
                }
              >
                NEW BANNER
              </Button>
            </Grid>
          </Grid>
        </div>
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

export default withSnackbar(connect(mapStateToProps, null)(MiddleBanner));
