import React from "react";

import { Alert } from "@material-ui/lab";
import { Link as RouterLink, withRouter } from "react-router-dom";
import validate from "validate.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import { connect } from "react-redux";
import { createApolloClient } from "../../../apollo/apolloSetup";
import { FORGET_PASSWORD } from "../../../../components/Seller/Queries";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  formControl: {
    paddingTop: 15,
    paddingRight: 5,
    minWidth: 140,
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url(" + process.env.REACT_APP_CDN_URL + "static/admin/img/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "0px",
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
});

class ForgetPassword extends React.Component {
  /**
   * @constructor
   */

  constructor(props) {
    super(props);

    // Default state
    this.state = {
      messageType: "",
      errors: {},
    };

    // Events
    this.hasError = this.hasError.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  /**
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate data
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
        presence: { allowEmpty: false, message: "is required" },
        length: {
          maximum: 64,
        },
        format: {
          pattern: "[0-9]+",
          message: '^Only allow numbers.'
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
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let user = {
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
    };

    // Validate
    if (this.onValidateSubmit(user)) return;

    // Mutate
    let promise = await new Promise((resolve) =>
      this.props.apolloClient.httpClient
        .mutate({
          mutation: FORGET_PASSWORD,
          variables: {
            input: {
              phoneNumber: user.phoneNumber,
              email: user.email,
            },
          },
        })
        .then((result) => {
          if (
            result &&
            result.data &&
            result.data.forgetPassword.statusCode === 200
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          resolve(false);
        })
    );

    if (promise) {
      this.setState({
        messageType: "success",
      });
    } else {
      this.setState({
        messageType: "error",
      });
    }
  }

  /**
   * @override
   */
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteContainer} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Forget password
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentBody}>
                {this.state.messageType === "success" ? (
                  <form className={classes.form}>
                    <Alert variant="outlined" severity="success">
                      Temporary password has been sent to your email. Please check email.
                    </Alert>
                    <Link component={RouterLink} to="/signin">
                      <Button
                        className={classes.signUpButton}
                        color="primary"
                        fullWidth
                        size="large"
                        type="button"
                        variant="contained"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </form>
                ) : (
                  <form
                    id="password-forget-form"
                    className={classes.form}
                    onSubmit={this.onHandleSubmit}
                  >
                    {this.state.messageType === "error" ? (
                      <Alert variant="outlined" severity="error">
                        Email and phone number doesn't match
                      </Alert>
                    ) : null}
                    <Typography className={classes.title} variant="h2">
                      Forget password
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Use your email, phone number to reset password
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={this.hasError("email")}
                      size="small"
                      fullWidth
                      helperText={
                        this.hasError("email")
                          ? this.state.errors.email[0]
                          : null
                      }
                      label="E-mail"
                      name="email"
                      type="text"
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      error={this.hasError("phoneNumber")}
                      size="small"
                      fullWidth
                      helperText={
                        this.hasError("phoneNumber")
                          ? this.state.errors.phoneNumber[0]
                          : null
                      }
                      label="Phone number"
                      name="phoneNumber"
                      type="text"
                      variant="outlined"
                    />

                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      fullWidth
                      size="large"
                      form="password-forget-form"
                      type="submit"
                      variant="contained"
                    >
                      Reset password
                    </Button>
                    <Typography color="textSecondary" variant="body1">
                      Have an account?{" "}
                      <Link component={RouterLink} to="/signin" variant="h6">
                        Sign in
                      </Link>
                    </Typography>
                  </form>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

ForgetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(ForgetPassword));
