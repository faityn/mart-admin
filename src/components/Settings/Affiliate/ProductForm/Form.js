import React from "react";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import PhotoAlbumIcon from "@material-ui/icons/PhotoAlbum";
import {
  Grid,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import {
  SAVE_AFFILIATE
} from "../../../Queries/Queries";

// Icon
import SaveIcon from "@material-ui/icons/Save";

// Find Member
import FindMember from './FindMember';

class Form extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      id: this.props.match.params.id ? this.props.match.params.id : "",
      isProcessing: false,
      errors: null,
      isOpenModal: false,
      affiliate: {
        userId: []
      }
    };

    // Events
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate exhibition
   * @param {Object} exhibition
   */
  onValidateSubmit(exhibition) {
    const schema = {
      userId: {
        presence: {
          allowEmpty: false,
          message: "^Select user field is required.",
        },
      },
      affiliateName: {
        presence: {
          allowEmpty: false,
          message: "^Affiliate name field is required.",
        },
      },
      contact: {
        presence: {
          allowEmpty: false,
          message: "^Contact field is required.",
        },
      },
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name field is required.",
        },
      },
      email: {
        email: true,
        presence: {
          allowEmpty: false,
          message: "^Email field is required.",
        },
      },
      paypalAccount: {
        presence: {
          allowEmpty: false,
          message: "^PayPal account field is required.",
        },
      },
      joinedDate: {
        presence: {
          allowEmpty: false,
          message: "^Join date field is required.",
        },
      },
    };

    // Validate
    const errors = validate(exhibition, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e) {
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
   * @summary Member list form submit
   */
  onSubmitMemberForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let memberIds = formData.getAll("memberId");
    let affiliate = this.state.affiliate;

    (memberIds || []).map((id) => {
      if (!affiliate.userId.find((f) => f.id === id))
        affiliate.userId.push({
          userId: id,
          name: formData.get(id),
        });
    });

    this.setState({
      affiliate: affiliate,
      isOpenModal: false,
    });
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
    let affiliate = {
      "userId": formData.get("userId"),
      "affiliateName": formData.get("affiliateName"),
      "contact": formData.get("contact"),
      "name": formData.get("name"),
      "email": formData.get("email"),
      "paypalAccount": formData.get("paypalAccount"),
      "joinedDate": formData.get("joinedDate")
    };

    // Validate
    if (this.onValidateSubmit(affiliate)) return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_AFFILIATE,
        variables: {
          affiliate: affiliate,
        },
      })
      .then((result) => {
        if (result.data.saveAffiliate.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Affiliate has been successfully updated.",
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
    let data = this.state.affiliate ? this.state.affiliate : { userId: [] };

    return (
      <React.Fragment>
        <Grid container>
          {/* Title section */}
          <Grid item>
            <PageTitle
              menuName="Affiliate management"
              title="Affiliate management create"
              icon={<PhotoAlbumIcon />}
            />
          </Grid>
        </Grid>

        <div className="card mt-20">
          <form
            id="my-form-affiliate"
            onSubmit={this.onHandleSubmit.bind(this)}
          >
            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>User</h5>
              </Grid>

              <input type="hidden" name="userId" value={this.state.affiliate.userId[0] ? this.state.affiliate.userId[0].userId : null} />
              {/* Select user */}
              <Grid item md={10} xs={12}>
                <List>
                  <ListItem>
                    <ListItemText
                      onClick={this.onOpenModal.bind(this)}
                      primary={this.state.affiliate.userId[0] ? this.state.affiliate.userId[0].name : "SELECT USER"}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Affiliate name</h5>
              </Grid>

              {/* Affiliate name */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="affiliateName"
                  label="Affiliate name"
                  error={this.hasError('name')}
                  helperText={
                    this.hasError('name') ? this.state.errors['name'][0] : null
                  }
                />
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Contact</h5>
              </Grid>

              {/* Contact */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="contact"
                  label="Contact"
                  error={this.hasError('contact')}
                  helperText={
                    this.hasError('contact') ? this.state.errors['contact'][0] : null
                  }
                />
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Name</h5>
              </Grid>

              {/* Contact */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="name"
                  label="Name"
                  error={this.hasError('name')}
                  helperText={
                    this.hasError('name') ? this.state.errors['name'][0] : null
                  }
                />
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Email</h5>
              </Grid>

              {/* Email */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="email"
                  label="Email"
                  error={this.hasError('email')}
                  helperText={
                    this.hasError('email') ? this.state.errors['email'][0] : null
                  }
                />
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Paypal account</h5>
              </Grid>

              {/* Paypal account */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="text"
                  name="paypalAccount"
                  label="Paypal Account"
                  error={this.hasError('paypalAccount')}
                  helperText={
                    this.hasError('paypalAccount') ? this.state.errors['paypalAccount'][0] : null
                  }
                />
              </Grid>
            </Grid>

            {/* Container */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Join date</h5>
              </Grid>

              {/* Join date */}
              <Grid item md={10} xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="date"
                  name="joinedDate"
                  error={this.hasError('joinedDate')}
                  helperText={
                    this.hasError('joinedDate') ? this.state.errors['joinedDate'][0] : null
                  }
                />
              </Grid>
            </Grid>
          </form>

          <Divider className="mt-20" />

          <Grid container className="mt-20">
            <Grid item>
              <Button
                form="my-form-affiliate"
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
        </div>

        {/* Find member Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Find member</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form
              id="member-form"
              onSubmit={this.onSubmitMemberForm.bind(this)}
            >
              <FindMember />
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
            <Button autoFocus form="member-form" type="submit" color="primary">
              Confirm
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
