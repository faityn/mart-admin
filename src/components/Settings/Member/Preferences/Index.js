import React from "react";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { Grid, Button, CircularProgress, Divider } from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import SaveIcon from "@material-ui/icons/Save";
import { GET_USERS_TYPE, SAVE_MEMBER_TYPE } from "../../../Queries/Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import MemberForm from "./Form";
import validate from "validate.js";

/**
 * @summary Preferences
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Member/Preferences
 */
class Preferences extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: "402880f175264a270175264a57f40000",
      point: null,
      isProcessing: false,
      errors: null,
      memberType: null,
      errors: null,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate memberType
   * @param {Object} memberType
   */
  onValidateSubmit(memberType) {

    const schema = 
    {
      "type1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "percent1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "duration1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "frequency1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "price1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "cancelDuration1": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },

      "type2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "percent2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "duration2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "frequency2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "price2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "cancelDuration2": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },

      "type3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "percent3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "duration3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "frequency3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "price3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
      "cancelDuration3": {
        presence: {
          allowEmpty: false,
          message: "^Type field is required.",
        },
      },
    }
    

    // Validate
    const errors = validate(memberType, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_USERS_TYPE,
      })
      .then((result) => {
        this.setState({
          memberType: result.data.getMemberType,
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
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    let id = this.state.id ? this.state.id : null;

    let memberTypeValidation = 
      {
        id1: formData.get("id1"),
        type1: formData.get("type1"),
        percent1: formData.get("percent1"),
        duration1: formData.get("duration1"),
        frequency1: formData.get("frequency1"),
        price1: formData.get("price1"),
        cancelDuration1: formData.get("cancelDuration1"),
        id2: formData.get("id2"),
        type2: formData.get("type2"),
        percent2: formData.get("percent2"),
        duration2: formData.get("duration2"),
        frequency2: formData.get("frequency2"),
        price2: formData.get("price2"),
        cancelDuration2: formData.get("cancelDuration2"),
        id3: formData.get("id3"),
        type3: formData.get("type3"),
        percent3: formData.get("percent3"),
        duration3: formData.get("duration3"),
        frequency3: formData.get("frequency3"),
        price3: formData.get("price3"),
        cancelDuration3: formData.get("cancelDuration3"),
      }
    ;

    // Form data to object
    let memberType = [
      {
        id: formData.get("id1"),
        type: formData.get("type1"),
        percent: formData.get("percent1"),
        duration: formData.get("duration1"),
        frequency: formData.get("frequency1"),
        price: formData.get("price1"),
        cancelDuration: formData.get("cancelDuration1"),
      },
      {
        id: formData.get("id2"),
        type: formData.get("type2"),
        percent: formData.get("percent2"),
        duration: formData.get("duration2"),
        frequency: formData.get("frequency2"),
        price: formData.get("price2"),
        cancelDuration: formData.get("cancelDuration2"),
      },
      {
        id: formData.get("id3"),
        type: formData.get("type3"),
        percent: formData.get("percent3"),
        duration: formData.get("duration3"),
        frequency: formData.get("frequency3"),
        price: formData.get("price3"),
        cancelDuration: formData.get("cancelDuration3"),
      },
    ];

    // Validate
    if (this.onValidateSubmit(memberTypeValidation)) return;

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_MEMBER_TYPE,
        variables: {
          memberType: memberType,
        },
      })
      .then((result) => {
        if (result.data.saveMemberType.statusCode === 200) {
          const message = id
            ? "Membership preferences has been successfully updated."
            : "Membership preferences has been successfully created.";
          this.props.enqueueSnackbar(message, { variant: "success" });
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

    this._isMounted &&
      this.setState({
        isProcessing: false,
        id: id,
      });
  }

  /**
   * @override
   */
  render() {

    console.log(this.state.errors)
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Membership preferences"
              title="Membership preferences"
              icon={<RecentActorsIcon />}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={8}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
                <MemberForm
                  data={this.state.memberType}
                  hasError={this.hasError}
                  errors={this.state.errors}
                />

                <Divider className="mt-20" />
                <Grid container spacing={3} className="mt-20">
                  <Grid item md={12} xs={12}>
                    {/* Save */}
                    <Button
                      form="form-submit"
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
                  </Grid>
                </Grid>
              </form>
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

export default withSnackbar(connect(mapStateToProps, null)(Preferences));
