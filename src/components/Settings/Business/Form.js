import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import BusinessIcon from "@material-ui/icons/Business";
import SaveIcon from "@material-ui/icons/Save";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import { GET_COMPANY, SAVE_COMPANY } from "../../Queries/Queries";

/**
 * @summary Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      isProcessing: false,
    };

    // Event
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_COMPANY,
        variables: {
          search: {
            name: "",
            representativeName: "",
            postalCode: "",
            zipCode: "",
            detailedAddress: "",
            businessType: "",
          },
          page: {
            limit: 10,
            pageNumber: 1,
            orderBy: "id",
            type: "ASC",
          },
        },
      })
      .then((result) => {
        this.setState({
          company: result.data.getCompanies.list,
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
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate company
   * @param {Object} company
   */
  onValidateSubmit(company) {
    const schema = {
      registrationNumber: {
        presence: {
          allowEmpty: false,
          message: "^Registration number field is required.",
        },
      },
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name field is required.",
        },
      },
      representativeName: {
        presence: {
          allowEmpty: false,
          message: "^Representative name field is required.",
        },
      },
      // postalCode: {
      //   presence: {
      //     allowEmpty: false,
      //     message: "^Postal code field is required.",
      //   },
      // },
      zipCode: {
        presence: {
          allowEmpty: false,
          message: "^Zip code field is required.",
        },
      },
      detailedAddress: {
        presence: {
          allowEmpty: false,
          message: "^Detailed address field is required.",
        },
      },
      // businessType: {
      //   presence: {
      //     allowEmpty: false,
      //     message: "^Business type field is required.",
      //   },
      // },
      event: {
        presence: {
          allowEmpty: false,
          message: "^Email field is required.",
        },
      },
    };

    // Validate
    const errors = validate(company, schema);

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
    let company = {
      id: formData.get("id"),
      registrationNumber: formData.get("registrationNumber"),
      name: formData.get("name"),
      representativeName: formData.get("representativeName"),
      postalCode: formData.get("postalCode"),
      zipCode: formData.get("zipCode"),
      detailedAddress: formData.get("detailedAddress"),
      businessType: formData.get("businessType"),
      event: formData.get("event"),
      instagramLink: formData.get("instagramLink"),
      instagramLinkIsHidden: formData.get("instagramLinkIsHidden") === "true",
      facebookLink: formData.get("facebookLink"),
      facebookLinkIsHidden: formData.get("facebookLinkIsHidden") === "true",
      twitterLink: formData.get("twitterLink"),
      twitterLinkIsHidden: formData.get("twitterLinkIsHidden") === "true",
      youtubeLink: formData.get("youtubeLink"),
      youtubeLinkIsHidden: formData.get("youtubeLinkIsHidden") === "true",
    };

    // Validate
    if (this.onValidateSubmit(company)) return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_COMPANY,
        variables: {
          company: company,
        },
      })
      .then((result) => {
        this.props.enqueueSnackbar(
          "Business information has been successfully updated.",
          { variant: "success" }
        );
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
    if (!this.state.company) 
      return "";

    let data = this.state.company ? this.state.company[0] : null;

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Business information"
              title="Business information setting"
              icon={<BusinessIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8} xs={12}>
            <div className="card mt-20">
              <form
                id="my-form-managemnt"
                onSubmit={this.onHandleSubmit.bind(this)}
              >
                {/* Company registration */}
                <Grid
                  container
                  spacing={2}
                  className="align-items-center"
                  key={data.id}
                >
                  <input type="hidden" name="id" value={data.id} />
                  <Grid item md={2} xs={12}>
                    <h5>Registration No.</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      fullWidth
                      label="Enter business number"
                      size="small"
                      variant="outlined"
                      name="registrationNumber"
                      defaultValue={data.registrationNumber}
                      error={this.hasError("registrationNumber")}
                      helperText={
                        this.hasError("registrationNumber")
                          ? this.state.errors["registrationNumber"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Company name */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Company name</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      fullWidth
                      label="Enter your business name (corporation)"
                      size="small"
                      variant="outlined"
                      name="name"
                      defaultValue={data.name}
                      error={this.hasError("name")}
                      helperText={
                        this.hasError("name")
                          ? this.state.errors["name"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Representative */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Representative</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      fullWidth
                      label="Enter the representative's name"
                      size="small"
                      variant="outlined"
                      name="representativeName"
                      defaultValue={data.representativeName}
                      error={this.hasError("representativeName")}
                      helperText={
                        this.hasError("representativeName")
                          ? this.state.errors["representativeName"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Business address */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Address</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <Grid container spacing={2} className="align-items-center">
                      {/* <Grid item md={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Enter postal code"
                          size="small"
                          variant="outlined"
                          name="postalCode"
                          defaultValue={data.postalCode}
                          error={this.hasError("postalCode")}
                          helperText={
                            this.hasError("postalCode")
                              ? this.state.errors["postalCode"][0]
                              : null
                          }
                        />
                      </Grid> */}
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Enter zip code"
                          size="small"
                          variant="outlined"
                          name="zipCode"
                          defaultValue={data.zipCode}
                          error={this.hasError("zipCode")}
                          helperText={
                            this.hasError("zipCode")
                              ? this.state.errors["zipCode"][0]
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="align-items-center">
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Enter detailed address"
                          size="small"
                          variant="outlined"
                          name="detailedAddress"
                          defaultValue={data.detailedAddress}
                          error={this.hasError("detailedAddress")}
                          helperText={
                            this.hasError("detailedAddress")
                              ? this.state.errors["detailedAddress"][0]
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Business condition */}
                {/* <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Business condition</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      fullWidth
                      label="Enter business type"
                      size="small"
                      variant="outlined"
                      name="businessType"
                      defaultValue={data.businessType}
                      error={this.hasError("businessType")}
                      helperText={
                        this.hasError("businessType")
                          ? this.state.errors["businessType"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid> */}

                {/* Event */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Email</h5>
                  </Grid>
                  <Grid item md={10} xs={12}>
                    <TextField
                      fullWidth
                      label="Enter email"
                      size="small"
                      variant="outlined"
                      name="event"
                      defaultValue={data.event}
                      error={this.hasError("event")}
                      helperText={
                        this.hasError("event")
                          ? this.state.errors["event"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Instagram link */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Instagram link</h5>
                  </Grid>
                  <Grid item md={6} xs={9}>
                    <TextField
                      fullWidth
                      label="URL"
                      size="small"
                      variant="outlined"
                      name="instagramLink"
                      defaultValue={data.instagramLink}
                    />
                  </Grid>

                  <Grid item md={3} xs={3}>
                    {/* Hide */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="instagramLinkIsHidden"
                          color="primary"
                          value={true}
                          defaultChecked={data.instagramLinkIsHidden}
                        />
                      }
                      label="Hidden"
                    />
                    {/* End Hide */}
                  </Grid>
                </Grid>

                {/* Facebook link */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Facebook link</h5>
                  </Grid>
                  <Grid item md={6} xs={9}>
                    <TextField
                      fullWidth
                      label="URL"
                      size="small"
                      variant="outlined"
                      name="facebookLink"
                      defaultValue={data.facebookLink}
                    />
                  </Grid>

                  <Grid item md={3} xs={3}>
                    {/* Hide */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="facebookLinkIsHidden"
                          color="primary"
                          value={true}
                          defaultChecked={data.facebookLinkIsHidden}
                        />
                      }
                      label="Hidden"
                    />
                    {/* End Hide */}
                  </Grid>
                </Grid>

                {/* Twitter link */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Twitter link</h5>
                  </Grid>
                  <Grid item md={6} xs={9}>
                    <TextField
                      fullWidth
                      label="URL"
                      size="small"
                      variant="outlined"
                      name="twitterLink"
                      defaultValue={data.twitterLink}
                    />
                  </Grid>

                  <Grid item md={3} xs={3}>
                    {/* Hide */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="twitterLinkIsHidden"
                          color="primary"
                          value={true}
                          defaultChecked={data.twitterLinkIsHidden}
                        />
                      }
                      label="Hidden"
                    />
                    {/* End Hide */}
                  </Grid>
                </Grid>

                {/* Youtube link */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>Youtube link</h5>
                  </Grid>
                  <Grid item md={6} xs={9}>
                    <TextField
                      fullWidth
                      label="URL"
                      size="small"
                      variant="outlined"
                      name="youtubeLink"
                      defaultValue={data.youtubeLink}
                    />
                  </Grid>

                  <Grid item md={3} xs={3}>
                    {/* Hide */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="youtubeLinkIsHidden"
                          color="primary"
                          value={true}
                          defaultChecked={data.youtubeLinkIsHidden}
                        />
                      }
                      label="Hidden"
                    />
                    {/* End Hide */}
                  </Grid>
                </Grid>
              </form>

              <Divider className="mt-20" />

              <Grid container spacing={2} className="mt-20">
                <Grid item>
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
