import React from "react";

import PageTitle from "../../../../core/common/Partials/PageTitle";

import PersonIcon from "@material-ui/icons/Person";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AttachmentIcon from "@material-ui/icons/Attachment";

import {
  Card,
  CardHeader,
  FormControl,
  IconButton,
  FormHelperText,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLoggedUser } from "../../../../core/redux/Redux";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import {
  GET_PREMIUM_SERVICE,
  SAVE_PREMIUM_SERVICE,
  UPLOAD_IMAGE_ICON,
  SAVE_SELLER_POLICY,
  GET_SELLER_POLICY,
  UPLOAD_POLICY_DRAFT,
} from "../Queries";
import { Link } from "react-router-dom";

import CKEditor from "ckeditor4-react";

/**
 * @summary Seller Info
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class PolicyManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: null,
      processing: "",
      alert: {},
      description1: "",
      description2: "",
      premiumServices: [],
    };

    // Event
    this.hasError = this.hasError.bind(this);
    this.savePremiumService = this.savePremiumService.bind(this);
    this.onChangeDescription1 = this.onChangeDescription1.bind(this);
    this.onChangeDescription2 = this.onChangeDescription2.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    // Policy
    await this.props.apolloClient.httpClient
      .query({
        query: GET_SELLER_POLICY,
      })
      .then((result) => {
        this.setState({
          icon: result.data.getSellerPolicy.file,
          description1: result.data.getSellerPolicy.description,
          description2: result.data.getSellerPolicy.description2,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });

    // Premium service
    await this.props.apolloClient.httpClient
      .query({
        query: GET_PREMIUM_SERVICE,
      })
      .then((result) => {
        let premiumServices = [];
        result.data.getSellerPremiumServiceList.map((item) => {
          let service = {};
          service["field1"] = item.field1;
          service["field2"] = item.field2;
          premiumServices.push(service);
        });
        this.setState({ premiumServices });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
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
   * @summary onChange
   * @param {String} editor
   */
  onChangeDescription1(event, editor) {
    this.setState({
      description1: editor.getData(),
    });
  }

  /**
   * @summary onChange
   * @param {String} editor
   */
  onChangeDescription2(event, editor) {
    this.setState({
      description2: editor.getData(),
    });
  }

  /**
   * @summary Save policy
   * @param {MouseEvent} event
   */
  async savePolicy(event) {
    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_SELLER_POLICY,
        variables: {
          sellerPolicy: {
            file: this.state.icon,
            description: this.state.description1,
            description2: this.state.description2,
          },
        },
      })
      .then((result) => {
        if (result.data.saveSellerPolicy.statusCode === 200) {
          this.props.enqueueSnackbar("Successfully updated", {
            variant: "success",
          });
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
  }

  /**
   * @summary Add service
   * @param {MouseEvent} event
   */
  async addPremiumService(event) {
    let premiumServices = this.state.premiumServices;
    premiumServices.push({ field1: "" });

    this.setState({ premiumServices });
  }

  /**
   * @summary Export
   * @param {MouseEvent} event
   */
  async savePremiumService(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Images
    let field1Values = formData.getAll("field1");
    let filed2Values = formData.getAll("field2");

    let premiumServices = [];
    for(let i=0; i<field1Values.length; i++){
      premiumServices.push({
        field1 : field1Values[i],
        field2 : filed2Values[i]
      })
    }

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_PREMIUM_SERVICE,
        variables: {
          sellerPolicy: premiumServices,
        },
      })
      .then((result) => {
        if (result.data.saveSellerPremiumService.statusCode === 200) {
          this.props.enqueueSnackbar("Successfully updated", {
            variant: "success",
          });
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
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Seller policy management"
              title="Seller policy management"
              icon={<PersonIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8} xs={12}>
            {/* Policy */}
            <div className="card mt-20">
              {/* Contract draft */}
              <Grid container spacing={1} className="align-items-center">
                <Grid item md={2} xs={12}>
                  <h5>
                    Contract draft <span className="text-red">*</span>
                  </h5>
                </Grid>
                <Grid item md={10} xs={12}>
                  <Grid container>
                    {this.state.icon ? (
                      <Grid item xs={12}>
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
                              <a
                                target="_blank"
                                href={
                                  process.env.REACT_APP_CDN_URL +
                                  "category/icon/" +
                                  this.state.icon
                                }
                              >
                                {this.state.icon}
                              </a>
                            }
                          />
                        </Card>
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <input
                          type="file"
                          onChange={this.onIconUpload.bind(this)}
                          accept="*"
                          id="icon-button-file"
                          className="displayNone"
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <AttachmentIcon />
                          </IconButton>
                        </label>
                        {/* <FormHelperText>Size: 60x60 px</FormHelperText> */}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              {/* Description 1 */}
              <Grid container spacing={1} className="align-items-center">
                <Grid item md={2} xs={12}>
                  <h5>
                    Description 1 <span className="text-red">*</span>
                  </h5>
                </Grid>
                <Grid item md={10} xs={12}>
                  <FormControl fullWidth>
                    <CKEditor
                      type="classic"
                      name="description1"
                      data={this.state.description1}
                      onChange={({ event, editor }) =>
                        this.onChangeDescription1(event, editor)
                      }
                    />
                    <textarea
                      name="description1"
                      value={this.state.description1}
                      style={{ display: "none" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              {/* Description 2 */}
              <Grid container spacing={1} className="align-items-center">
                <Grid item md={2} xs={12}>
                  <h5>
                    Description 2 <span className="text-red">*</span>
                  </h5>
                </Grid>
                <Grid item md={10} xs={12}>
                  <FormControl fullWidth>
                    <CKEditor
                      type="classic"
                      name="description2"
                      data={this.state.description2}
                      onChange={({ event, editor }) =>
                        this.onChangeDescription2(event, editor)
                      }
                    />
                    <textarea
                      name="description2"
                      value={this.state.description2}
                      style={{ display: "none" }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={1} className="align-items-center">
                <Grid item xs={12} className="text-right mt-20">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={(e) => this.savePolicy(e)}
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </div>

            {/* Premium service */}
            <div className="card mt-20">
              <form
                id="premium-service-form"
                onSubmit={this.savePremiumService}
              >
                <Grid container spacing={1} className="align-items-center">
                  <Grid item xs={12}>
                    <h5>
                      Premium service <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  {this.state.premiumServices.map((item, index) => {
                    return (
                      <Grid container spacing={1}>
                      <Grid item xs={4} >
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          name="field1"
                          defaultValue={item.field1}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          name="field2"
                          defaultValue={item.field2}
                        />
                      </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </form>

              <Grid container spacing={1} className="align-items-center">
                <Grid item xs={12} className="text-right mt-20">
                  <Button
                    variant="outlined"
                    size="small"
                    color="default"
                    onClick={(e) => this.addPremiumService(e)}
                  >
                    Add
                  </Button>
                  <Button
                    form="premium-service-form"
                    type="submit"
                    variant="contained"
                    size="small"
                    color="primary"
                    className="ml-20"
                  >
                    SAVE
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
    loggedUser: state.loggedUser,
  };
};

export default withSnackbar(
  connect(mapStateToProps, { setLoggedUser })(PolicyManagement)
);
