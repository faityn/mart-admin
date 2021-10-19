import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import { createApolloClient } from "../../../apollo/apolloSetup";
import { SAVE_SELLER } from "../../../../components/Seller/Queries";

const schema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
  repeatPassword: {
    presence: { allowEmpty: false, message: "is required" },
    equality: "password",
    length: {
      maximum: 128,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  address1: {
    presence: { allowEmpty: false, message: "is required" },
  },
  agentNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  bank: {
    presence: { allowEmpty: false, message: "is required" },
  },
  accountNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 20,
    },
  },
  // policy: {
  //   presence: { allowEmpty: false, message: "is required" },
  //   checked: true,
  // },
};

const useStyles = makeStyles((theme) => ({
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
}));

const SignUp = (props) => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBack = () => {
    // history.goBack();
  };

  /**
   * @summary On sign up
   * @param {MouseEvent} event
   */
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Form data to object
    let user = {
      id: "2c9fa6bd778779b401778b21aa710005",
      email: formState.values.email,
      password: formState.values.password,
      repeatPassword: formState.values.repeatPassword,
      firstName: "",
      middleName: "",
      lastName: "",
      role: "ROLE_SELLER",
      birthday: "2021-01-01",
      gender: "",
      nation: "",
      nationCode: "",
      city: "",
      state: "",
      address1: formState.values.address1,
      address2: formState.values.address2,
      address3: "",
      postalCode: formState.values.postalCode,
      phoneNumber: formState.values.phoneNumber,
      status: "INACTIVE",
      referrerCode: null,
      allowMarketingMail: null,
      companyName: formState.values.companyName,
      agentNumber: "",
      bank: formState.values.bank,
      accountNumber: formState.values.accountNumber,
      agentCertificate: "",
      agreement: "",
    };

    delete user.repeatPassword;

    let test = {
      id: "2c9fa6bd778779b401778b21aa710005",
      email: "seller1@gmail.com",
      password: "123456789",
      firstName: "",
      middleName: "",
      lastName: "",
      role: "ROLE_SELLER",
      birthday: "2021-01-01",
      gender: "",
      nation: "",
      nationCode: "",
      city: "",
      state: "",
      address1: "202, Sain construction, 1st khoroo, Bayanzurkh",
      address2: "",
      address3: "",
      postalCode: "",
      phoneNumber: "95022070",
      status: "INACTIVE",
      referrerCode: null,
      allowMarketingMail: null,
      companyName: "Seller company",
      agentNumber: "",
      bank: "Woori bank",
      accountNumber: "123456789",
      agentCertificate: "",
      agreement: "",
    };

    let apolloClient = createApolloClient();

    // Mutate
    await apolloClient.httpClient
      .mutate({
        mutation: SAVE_SELLER,
        variables: {
          user: test,
        },
      })
      .then((result) => {
        if (result && result.data && result.data.saveUser.statusCode === 200) {
          // handleClickOpen;
        }
        console.log(result.data);
      })
      .catch((error) => {
        // handleClose;
        console.log("ERROR");
      });

    return;
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? false : false;

  // Dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                SIGN UP
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Create new account
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Use your email to create new account
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError("companyName")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("companyName")
                      ? formState.errors.companyName[0]
                      : null
                  }
                  label="Company name"
                  name="companyName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.companyName || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("password")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("repeatPassword")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("repeatPassword")
                      ? formState.errors.repeatPassword[0]
                      : null
                  }
                  label="Confirm password"
                  name="repeatPassword"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.repeatPassword || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  label="E-mail"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("postalCode")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("postalCode")
                      ? formState.errors.postalCode[0]
                      : null
                  }
                  label="Zip code"
                  name="postalCode"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.postalCode || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("address1")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("address1") ? formState.errors.address1[0] : null
                  }
                  label="Address 1"
                  name="address1"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.address1 || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("address2")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("address2") ? formState.errors.address2[0] : null
                  }
                  label="Address 2"
                  name="address2"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.address2 || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("agentNumber")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("agentNumber")
                      ? formState.errors.agentNumber[0]
                      : null
                  }
                  label="Business place number"
                  name="agentNumber"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.agentNumber || ""}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError("phoneNumber")}
                  size="small"
                  fullWidth
                  helperText={
                    hasError("phoneNumber")
                      ? formState.errors.phoneNumber[0]
                      : null
                  }
                  label="Phone number"
                  name="phoneNumber"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.phoneNumber || ""}
                  variant="outlined"
                />
                <div className={classes.policy}>
                  <FormControl className={classes.formControl} size="small">
                    <Select
                      onChange={handleChange}
                      variant="outlined"
                      name="bank"
                      defaultValue="Select bank"
                    >
                      <MenuItem value="Select bank">Select bank</MenuItem>
                      <MenuItem value="KB Kookmin bank">
                        KB Kookmin bank
                      </MenuItem>
                      <MenuItem value="Shinhan bank">Shinhan bank</MenuItem>
                      <MenuItem value="Woori bank">Woori bank</MenuItem>
                      <MenuItem value="Hana bank">Hana bank</MenuItem>
                      <MenuItem value="Kbank">Kbank</MenuItem>
                      <MenuItem value="Kakao bank">Kakao bank</MenuItem>
                      <MenuItem value="KDB Korea Development bank">
                        KDB Korea Development bank
                      </MenuItem>
                      <MenuItem value="IBK Industrial bank of Korea">
                        IBK Industrial bank of Korea
                      </MenuItem>
                      <MenuItem value="NH NongHyup, Suhyeop">
                        NH NongHyup, Suhyeop
                      </MenuItem>
                      <MenuItem value="Daegu bank">Daegu bank</MenuItem>
                      <MenuItem value="Busan bank">Busan bank</MenuItem>
                      <MenuItem value="Kyungnam bank">Kyungnam bank</MenuItem>
                      <MenuItem value="Guangju bank">Guangju bank</MenuItem>
                      <MenuItem value="Jongbuk bank">Jongbuk bank</MenuItem>
                      <MenuItem value="Jeju bank, KFCC">
                        Jeju bank, KFCC
                      </MenuItem>
                      <MenuItem value="Shinhyeop">Shinhyeop</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    className={classes.textField}
                    error={hasError("accountNumber")}
                    size="small"
                    fullWidth
                    helperText={
                      hasError("accountNumber")
                        ? formState.errors.accountNumber[0]
                        : null
                    }
                    label="Account Number"
                    name="accountNumber"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.accountNumber || ""}
                    variant="outlined"
                  />
                </div>
                {/* <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{" "}
                    <Link
                      color="primary"
                      // component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {hasError("policy") && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )} */}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/signin" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for choosing Khandid."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Khandid 세계를 만나세요!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Link to="/signin">
            <Button color="primary">
              Go to Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default connect(mapStateToProps, null)(SignUp);
