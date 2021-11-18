import React from "react";
import {
  Grid,
  CardContent,
  FormControlLabel,
  FormControl,
  InputLabel,
  Checkbox,
  Select,
  MenuItem,
  Button,
  TextField,
  LinearProgress,
  Card,
  CardHeader,
  IconButton,
  FormHelperText
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ImageIcon from '@material-ui/icons/Image';
import { DropzoneArea } from "material-ui-dropzone";
import { UPLOAD_IMAGE, UPLOAD_IMAGE_ICON } from "../Queries";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

/**
 * @summary Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Category/Form
 */
class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    let images = [
      {
        imageUrl: "",
        url: "",
      },
      {
        imageUrl: "",
        url: "",
      },
      {
        imageUrl: "",
        url: "",
      },
      
    ];

    // Default state
    this.state = {
      images: images,
      icon: "",
      selectedCategories: {
        firstId: this.props.category ? this.props.category.parentId : "",
      },
    };

    // Events
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onAddImage = this.onAddImage.bind(this);
    this.onChangePicture = this.onChangePicture.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      // Set default links
      let images = [];
      let icon = "";

      if (
        this.props.category &&
        this.props.category.images &&
        this.props.category.images.length > 0
      ) {
        images = this.props.category.images;
      }

      if (
        this.props.category &&
        this.props.category.icon &&
        this.props.category.icon.length > 0
      ) {
        icon = this.props.category.icon;
      }

      this.setState({
        images: images,
        icon: icon,
      });
    }
  }

  /**
   * @summary On change category
   * @param {MouseEvent} event
   */
  onChangeCategory(event) {
    event.preventDefault();

    this.setState({
      selectedCategories: {
        firstId: event.target.value,
      },
    });
  }

  /**
   * @summary Detail
   * @param {Event} childrenName
   */
  onAddImage() {
    this.setState((prevState) => ({
      images: prevState.images.concat([
        {
          imageUrl: "",
          url: "",
        },
      ]),
    }));
  }

  /**
   * @summary Add image
   * @param {String} url
   */
  onAddIconToState(url) {
    this.setState({
      icon: url,
    });
  }

  /**
   * @summary Delete Image icon
   * @param {String} url
   */
  onClickDeleteIcon(event) {
    event.stopPropagation();

    this.setState({
      icon: "",
    });
  }


  /**
   * @summary Add image
   * @param {String} url
   */
  onAddImageToState(url, index) {
    let image = {
      imageUrl: url,
      url: "",
    };

    let images = this.state.images;
    images.splice(index, 1, image);

    this.setState({
      images: images,
    });
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
                  mutation: UPLOAD_IMAGE,
                  variables: { image },
                })
                .then((result) => {
                  if (result.data.uploadImageCategory.statusCode === 200) {
                    this.onAddImageToState(
                      result.data.uploadImageCategory.data,
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
   * @summary Upload images icon
   * @param {!Array<Object>} images
   */
  async onIconUpload(event) {
    this.props.enqueueSnackbar("The uploading process is being started ...", {
      variant: "info",
    });

    let image = event.target.files[0];

    this.props.apolloClient.uploadClient
      .mutate({
        mutation: UPLOAD_IMAGE_ICON,
        variables: { image },
      })
      .then((result) => {
        if (result.data.uploadIconCategory.statusCode === 200) {
          this.onAddIconToState(result.data.uploadIconCategory.data);
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
   * @summary Upload change picture
   * @param {!Array<Object>} images
   */
  async onChangePicture(event, index) {
    this.props.enqueueSnackbar("The changing process is being started ...", {
      variant: "info",
    });

    let image = event.target.files[0];

    this.props.apolloClient.uploadClient
      .mutate({
        mutation: UPLOAD_IMAGE,
        variables: { image },
      })
      .then((result) => {
        if (result.data.uploadImageCategory.statusCode === 200) {
          this.onAddImageToState(
            result.data.uploadImageCategory.data,
            index
          );
          this.props.enqueueSnackbar(
            "The changing process has been completed successfully.",
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


  render() {
    if (!this.props.category && this.props.id && !this.props.categories)
      return <LinearProgress />;

    let data = this.props.category ? this.props.category : {};
    let categories = this.props.categories ? this.props.categories : {};

    return (
      <CardContent key={data.id}>
        <input type="hidden" name="id" value={data.id} />
        <input type="hidden" name="image" value={data.imageUrl} />
        <Grid container spacing={1} className="align-items-center">
          <Grid item md={2} xs={12}>
            <h5>카테고리명</h5>
          </Grid>
          <Grid item md={7} xs={12}>
            <TextField
              fullWidth
              id="name-basic"
              placeholder="카테고리명"
              size="small"
              variant="outlined"
              name="name"
              defaultValue={data.name}
              error={this.props.hasError("name")}
              helperText={
                this.props.hasError("name")
                  ? this.props.errors["name"][0]
                  : null
              }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  color="primary"
                  value={false}
                  defaultChecked={data.active === true ? false : true}
                />
              }
              label="카테고리 숨김"
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} className="align-items-center">
          <Grid item md={2} xs={12}>
            <h5>카테고리 위치</h5>
          </Grid>
          
          <Grid container md={10} xs={12}>
            <Grid item md={4} xs={12}>
                <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel>1차 카테고리</InputLabel>
                    <Select label="1차 카테고리" name="firstCategory">
                        <MenuItem value="">...</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item md={4} xs={12} style={{paddingLeft: "10px"}}>
                <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel>2차 카테고리</InputLabel>
                    <Select label="2차 카테고리" name="secondCategory">
                        <MenuItem value="">...</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item md={4} xs={12} style={{paddingLeft: "10px"}}>
                <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel>3차 카테고리</InputLabel>
                    <Select label="3차 카테고리" name="thirdCategory">
                        <MenuItem value="">...</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={1} className="align-items-center">
          <Grid item md={2} xs={12}>
            <h5>페이지 주소(외부)</h5>
          </Grid>
          <Grid item md={7} xs={12}>
            <InputLabel>http://www.naver.co.kr/?pn=product.list&cuid=206 </InputLabel>
          </Grid>
        </Grid>

        <Grid container className="mt-20 align-items-center">
          <input type="hidden" name="icon" value={this.state.icon} />
          <Grid item md={2} xs={12}>
            <h5>아이콘</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            <Grid container>
              {this.state.icon ? (
                <Grid item md={3} xs={3}>
                  <Card>
                    <CardHeader
                      action={
                        <IconButton
                          color="primary"
                          onClick={(e) => this.onClickDeleteIcon(e)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      }
                      title={
                        <img
                          src={
                            process.env.REACT_APP_CDN_URL +
                            "category/icon/" +
                            this.state.icon
                          }
                          width="100%"
                        />
                      }
                    />
                  </Card>
                </Grid>
              ) : (
                <Grid item md={8} xs={8}>
                  <input
                    type="file"
                    onChange={this.onIconUpload.bind(this)}
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
                      <PhotoLibraryIcon />
                    </IconButton>
                  </label>
                  <FormHelperText>Size: 60x60 px</FormHelperText>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/*
        {this.state.images.map((image, index) => (
          <Grid container className="mt-20 align-items-center">
            <Grid item md={2} xs={12}>
              <h5>
                {index === 0 ? "Menu Image" : null}
                {index === 1 ? "Top Image" : null}
                {index !== 0 && index !== 1 ? "Slider Image" : null}
              </h5>
            </Grid>
            <Grid item md={10} xs={12}>
              {index === 0 ? (
                <FormHelperText>Size: 375x570px</FormHelperText>
              ) : null}
              {index === 1 ? (
                <FormHelperText>Size: 1980x163px</FormHelperText>
              ) : null}
              {index !== 0 && index !== 1 ? (
                <FormHelperText>Size: 250x250px</FormHelperText>
              ) : null}
              <Grid container>
                <Grid item md={12} xs={12} key={index}>
                  {image.imageUrl ? (
                    <Card>
                      <CardHeader
                        action={
                          <React.Fragment>
                            <input
                              type="file"
                              onChange={(e) => this.onChangePicture(e, index)}
                              accept="image/*"
                              id="icon-button-file"
                              className="displayNone"
                            />
                            <label htmlFor="icon-button-file">
                              <IconButton
                                color="primary"
                                aria-label="change picture"
                                component="span"
                              >
                                <ImageIcon />
                              </IconButton>
                            </label>
                            <IconButton
                              color="primary"
                              onClick={(e) => this.onClickDelete(e, index)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </React.Fragment>
                        }
                        title={
                          <img
                            src={
                              process.env.REACT_APP_CDN_URL +
                              "category/" +
                              image.imageUrl
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
              <input type="hidden" name="images" value={image.imageUrl} />
              <Grid container className="mt-20">
                <Grid item md={12} xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
        ))}

        <Grid container>
          <Grid item md={12} xs={12} className="text-right mt-20">
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={this.onAddImage}
            >
              Add Image
            </Button>
          </Grid>
        </Grid> */}
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
