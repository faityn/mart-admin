import React from "react";
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
} from "@material-ui/core";
import PageTitle from "../../../core/common/Partials/PageTitle";
import SwipeableViews from "react-swipeable-views";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { FIND_USER, SAVE_USER } from "../Queries";
import { withSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import { isNullableType } from "graphql";
import { connect } from "react-redux";
import validate from "validate.js";
import { Link } from "react-router-dom";
import Basic from "./Basic";
import Address from "./Address";
import Point from "./Point";
import Purchase from "./Purchase";
import CouponTable from "./CouponTable";

class MemberForm extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: this.props.match.params.id,
      tabIndex: 0,
      isProcessing: false,
      user: null,
      errors: null,
      files: [],
      openCoupon: false,
      openPoint: false,
    };

    // Events
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onProcessStart = this.onProcessStart.bind(this);
    this.onProcessEnd = this.onProcessEnd.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  /**
   * @summary Change tab
   * @param {MouseEvent} event
   * @param {int} newValue
   */
  onChangeTab(event, index) {
    event.stopPropagation();

    this.setState({
      tabIndex: index,
    });
  }

  /**
   * @summary Tab attributes
   * @param {int} index
   */
  tabProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  /**
   * @override
   */
  async componentDidMount() {
    const { data } = await this.props.apolloClient.httpClient.query({
      query: FIND_USER,
      variables: { id: this.props.match.params.id },
    });

    if (data) {
      this.setState({
        user: data.user,
      });
    }
  }

  /**
   * @summary Process start
   */
  onProcessStart() {
    this.setState({
      isProcessing: true,
    });
  }

  /**
   * @summary Process end
   */
  onProcessEnd() {
    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @summary Open coupon popup
   */
  onHandleOpenCoupon() {
    this.setState({
      openCoupon: true,
    });
  }

  /**
   * @summary Close coupon popup
   */
  onHandleCloseCoupon() {
    this.setState({
      openCoupon: false,
    });
  }

  /**
   * @summary Open point popup
   */
  onHandleOpenPoint() {
    this.setState({
      openPoint: true,
    });
  }

  /**
   * @summary Close point popup
   */
  onHandleClosePoint() {
    this.setState({
      openPoint: false,
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
   * @summary Validate product
   * @param {Object} product
   */
  onValidateSubmit(user) {
    const schema = {
      email: {
        presence: { allowEmpty: false, message: "is required" },
        email: true,
        length: {
          maximum: 64,
        },
      },
      phoneNumber: {
        presence: {
          allowEmpty: false,
          message: "^Phone number field is required.",
        },
      },
    };

    // Validate
    const errors = validate(user, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Render Point Payment
   */
  renderPointPayment() {
    return (
      <Dialog
        open={this.state.openPoint}
        onClose={this.onHandleClosePoint.bind(this)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Point payment</DialogTitle>
        <DialogContent>
          <form id="my-form-id" onSubmit={this.onHandleSubmit}>
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={4} xs={12}>
                <h5>Payment details</h5>
              </Grid>

              {/* Payment details */}
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  id="details-basic"
                  label="Detail"
                  size="small"
                  variant="outlined"
                  name="details"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={4} xs={12}>
                <h5>Reserves</h5>
              </Grid>

              {/* Reserves */}
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  id="reserves-basic"
                  label="Reserves"
                  size="small"
                  variant="outlined"
                  name="reserves"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onHandleClosePoint.bind(this)} color="primary">
            Cancel
          </Button>
          <Button form="my-form-id" type="submit" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * @summary Render Point Payment
   */
  renderPointPayment() {
    return (
      <Dialog
        open={this.state.openPoint}
        maxWidth="lg"
        onClose={this.onHandleClosePoint.bind(this)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Point payment</DialogTitle>
        <DialogContent>
          <form id="my-form-id" onSubmit={this.onHandleSubmit}>
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={4} xs={12}>
                <h5>Payment details</h5>
              </Grid>

              {/* Payment details */}
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  id="details-basic"
                  label="Detail"
                  size="small"
                  variant="outlined"
                  name="details"
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={4} xs={12}>
                <h5>Reserves</h5>
              </Grid>

              {/* Reserves */}
              <Grid item md={8} xs={12}>
                <TextField
                  fullWidth
                  id="reserves-basic"
                  label="Reserves"
                  size="small"
                  variant="outlined"
                  name="reserves"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onHandleClosePoint.bind(this)} color="primary">
            Cancel
          </Button>
          <Button form="my-form-id" type="submit" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * @summary Render coupon Payment
   */
  renderCounponPayment() {
    return (
      <Dialog
        open={this.state.openCoupon}
        onClose={this.onHandleCloseCoupon.bind(this)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Coupon list</DialogTitle>
        <DialogContent>
          <form id="my-form-id" onSubmit={this.onHandleSubmit}>
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={12} xs={12} className="text-right">
                <Button size="small" color="primary" autoFocus>
                  Add
                </Button>
                <Button size="small" color="primary" autoFocus>
                  Delete
                </Button>
              </Grid>
            </Grid>

            <Grid container spacing={3} className="align-items-center">
              <Grid item md={12} xs={12}>
                <CouponTable data={this.state.user} />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onHandleCloseCoupon.bind(this)} color="primary">
            Cancel
          </Button>
          <Button form="my-form-id" type="submit" color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
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

    // Form data to object
    let user = {
      id: formData.get("id"),
      email: formData.get("email"),
      password: formData.get("password") ? formData.get("password") : null,
      lastName: formData.get("lastName"),
      middleName: formData.get("middleName")
        ? formData.get("middleName")
        : "MiddleName",
      firstName: formData.get("firstName"),
      birthday: formData.get("birthday"),
      gender: formData.get("gender"),
      nation: formData.get("nation"),
      // zipCode: formData.get("zipCode"),
      role: this.state.user.roleName,
      city: formData.get("city"),
      state: formData.get("state"),
      address1: formData.get("address1"),
      address2: formData.get("address1"),
      address3: formData.get("address1"),
      postalCode: formData.get("postalCode"),
      phoneNumber: formData.get("phoneNumber"),
      status: formData.get("status") ? formData.get("status") : "ACTIVE",
      note: formData.get("note"),
    };
    

    // Validate
    // if (this.onValidateSubmit(user)) return;
    this.onProcessStart();

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    let id = formData.get("id");

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_USER,
        variables: {
          user: user,
        },
      })
      .then((result) => {
        if (result.data.saveUser.statusCode === 200) {
          const message = id
            ? "User has been successfully updated."
            : "User has been successfully created.";
          this.props.enqueueSnackbar(message, { variant: "success" });

          if (!id) {
            id = result.data.id;
          }
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

    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @override
   */
  render() {
    let isShowForm = !this.state.id || this.state.user;

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Member"
              title="Member create"
              links={[
                { name: "Member management", href: "/member-management" },
              ]}
              icon={<GroupAddIcon />}
            />
          </Grid>
          {this.state.id ? (
            <Grid item xs={6} className="text-right">
              <Button size="small" variant="contained" color="default">
                Login with member ID
              </Button>
              <Button
                size="small"
                variant="contained"
                color="default"
                className="ml-20"
                onClick={this.onHandleOpenPoint.bind(this)}
              >
                Point payment
              </Button>
              <Button
                size="small"
                variant="contained"
                color="default"
                className="ml-20"
                onClick={this.onHandleOpenCoupon.bind(this)}
              >
                Coupon
              </Button>
            </Grid>
          ) : null}
        </Grid>

        {/* Loading */}
        <Fade
          in={this.state.id && !this.state.user}
          style={{
            transitionDelay: "0ms",
          }}
          unmountOnExit
        >
          <LinearProgress />
        </Fade>

        {/* Form section */}
        <Fade
          in={isShowForm}
          style={{
            transitionDelay: this.state.user ? "400ms" : "0ms",
          }}
          unmountOnExit
        >
          <div className="card mt-20">
            <form onSubmit={this.onHandleSubmit}>
              <input type="hidden" name="id" value={this.state.id} />

              {/* Tabs */}
              <Tabs
                textColor="primary"
                value={this.state.tabIndex}
                onChange={this.onChangeTab}
                variant="scrollable"
                indicatorColor="primary"
                scrollButtons="auto"
              >
                <Tab label="Basic Info" {...this.tabProps(0)} />
                <Tab label="Address" {...this.tabProps(1)} />
                <Tab label="Point" {...this.tabProps(2)} />
                <Tab label="Purchase" {...this.tabProps(3)} />
              </Tabs>

              <Divider />

              {/* SwipeableViews */}
              <SwipeableViews index={this.state.tabIndex}>
                {/* Basic content */}
                <div index={0} className="mt-20">
                  <Basic
                    id={this.state.id}
                    isShowForm={isShowForm}
                    user={this.state.user}
                    onChangeSpecialNotes={this.onChangeSpecialNotes}
                    hasError={this.hasError}
                    errors={this.state.errors}
                  />
                </div>

                {/* Price Reserve information content */}
                <div index={1} className="mt-20">
                  <Address
                    isShowForm={isShowForm}
                    user={this.state.user}
                    hasError={this.hasError}
                    errors={this.state.errors}
                  />
                </div>

                {/* Option content */}
                <div index={2} className="mt-20">
                  <Point i isShowForm={isShowForm} user={this.state.user} />
                </div>

                {/* Detail content */}
                <div index={3} className="mt-20">
                  <Purchase
                    id={this.state.id}
                    isShowForm={isShowForm}
                    user={this.state.user}
                  />
                </div>
              </SwipeableViews>

              {/* Button section */}
              <Divider />

              <Grid container wrap="wrap" className="mt-20">
                <Grid item md={4}>
                  <Button
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
                    {this.state.id ? "UPDATE" : "CREATE"}
                  </Button>

                  <Link to="/member-management">
                    <Button
                      variant="contained"
                      size="small"
                      color="default"
                      className="ml-20"
                    >
                      CANCEL
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Fade>

        {this.renderPointPayment()}
        {this.renderCounponPayment()}
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

export default withSnackbar(connect(mapStateToProps, null)(MemberForm));
