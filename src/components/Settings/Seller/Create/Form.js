import React from "react";

import PageTitle from "../../../../core/common/Partials/PageTitle";

import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/Save";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLoggedUser } from "../../../../core/redux/Redux";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { SAVE_SELLER, UPLOAD_CERTIFICATE, CHECK_MAIL } from "../Queries";

/**
 * @summary Seller Info
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      certificate: null,
      draft: "",
      processing: "",
      alert: {},
      validEmail: false,
      validEmailMessage: null,
      id: ""
    };

    // Event
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

  validateEmail(email) {
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }

  /**
   * @summary Check the email is duplicated
   */
   async onBlurEmail(event) {
    event.preventDefault();

    let email = event.target.value.replaceAll(/\s/g,'')

    
    if (this.validateEmail(email)) {

      // Mutate
      this.props.apolloClient.httpClient
        .mutate({
          mutation: CHECK_MAIL,
          variables: {
            email: email,
          },
        })
        .then((result) => {
          if (result.data.checkEmail === "NOTDUPLICATED") {
            this.setState({
              validEmail: false,
              validEmailMessage: null,
            });
          }
          if (result.data.checkEmail === "DUPLICATED") {
            this.setState({
              validEmail: true,
              validEmailMessage: "This email is already taken",
            });
          }
        })
        .catch((error) => {});
    } 
  }

  /**
   * @summary Validate user
   * @param {Object} user
   */
  onValidateSubmit(user) {
    const schema = {
      password: {
        length: {
          minimum: 8,
          maximum: 20,
          message: "^Password length should be 8-20 characters.",
        },
        format: {
          pattern: "[A-Za-z0-9`~$&+,:;=?@#|'<>.^*()%!-/ ]+",
          message: "^Should be alphanumeric only.",
        },
      },
      repeatPassword: {
        length: {
          minimum: 8,
          maximum: 20,
          message: "^Password length should be 8-20 characters.",
        },
        format: {
          pattern: "[A-Za-z0-9`~$&+,:;=?@#|'<>.^*()%!-/ ]+",
          message: "^Should be alphanumeric only.",
        },
      },
      firstName: {
        presence: {
          allowEmpty: false,
          message: "^Firstname field is required.",
        },
        length: {
          maximum: 64,
          message: "^Maximum length should be 64.",
        },
        format: {
          pattern: "[A-Za-z0-9]+",
          message: "^Only allow English characters for text input.",
        },
      },
      lastName: {
        presence: {
          allowEmpty: false,
          message: "^Lastname field is required.",
        },
        length: {
          maximum: 64,
          message: "^Maximum length should be 64.",
        },
        format: {
          pattern: "[A-Za-z0-9]+",
          message: "^Only allow English characters for text input.",
        },
      },
      phoneNumber: {
        presence: {
          allowEmpty: false,
          message: "^Phone number field is required.",
        },
        length: {
          maximum: 20,
          message: "^Maximum length should be 20.",
        },
        format: {
          pattern: "[0-9]+",
          message: "^Only allow numbers for this input.",
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
      // agentNumber: {
      //   presence: { allowEmpty: false, message: "is required" },
      //   length: {
      //     maximum: 64,
      //   },
      //   format: {
      //     pattern: "[0-9]+",
      //     message: '^Only allow numbers.'
      //   },
      // },
      accountNumber: {
        presence: { allowEmpty: false, message: "is required" },
        length: {
          maximum: 20,
        },
        format: {
          pattern: "[0-9]+",
          message: '^Only allow numbers.'
        },
      },
      // companyName: {
      //   presence: { allowEmpty: false, message: "is required" },
      //   length: {
      //     maximum: 64,
      //   },
      // },
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
      id: this.state.id,
      email: formData.get("email"),
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
      firstName: formData.get("firstName"),
      middleName: formData.get("middleName"),
      lastName: formData.get("lastName"),
      role: "ROLE_SELLER",
      birthday: "2021-01-01",
      gender: "",
      nation: "",
      nationCode: "",
      city: "",
      state: "",
      address1: formData.get("address1"),
      address2: formData.get("address2"),
      address3: formData.get("address3"),
      postalCode: formData.get("postalCode"),
      phoneNumber: formData.get("phoneNumber"),
      status: "ACTIVE",
      referrerCode: null,
      allowMarketingMail: null,
      companyName: formData.get("companyName"),
      agentNumber: formData.get("agentNumber"),
      bank: formData.get("bank"),
      accountNumber: formData.get("accountNumber"),
      agentCertificate: "",
      agreement: "",
    };

  
    // Validate
    if (this.onValidateSubmit(user)) return;

    if (user.password !== user.repeatPassword) {
      this.setState({
        errors: {
          repeatPassword: ["Password and confirm password does not match"],
        },
      });

      return;
    }

    if (user.password === null && user.oldPassword === null) {
      delete user.password;
      delete user.oldPassword;
    }

    delete user.repeatPassword;
    
    // Process
    this.setState({
      processing: "submit",
    });
    
     
    await this.props.apolloClient.uploadClient.mutate({ 
      mutation: SAVE_SELLER, 
      variables: { user: user }
    }).then((result) => {
      if(result.data.saveUser.statusCode === 200) {
        if (result && result.data && result.data.saveUser.statusCode === 200) {
          this.props.enqueueSnackbar("Sucessfully updated.", {
            variant: "success",
          });

          this.setState({
            id: result.data.saveUser.data
          });
        }
        if (result.data.saveUser.data === "NOTMATCH") {
          this.props.enqueueSnackbar("Your old password doesnt match.", {
            variant: "error",
          });
        }
        if (result.data.saveUser.statusCode === 403) {
          this.props.enqueueSnackbar("This email is already taken", {
            variant: "error",
          });
        }
      }
      
    }).catch((error) => {
      console.log(error)
      this.props.enqueueSnackbar('Sorry, there is an error occurred while seller.', {variant: 'error'});
    });

    this.setState({
      processing: ""
    });
  }

  /**
   * @summary Download
   */
  async onDownload() {
    if (this.state.processing === "download") return;

    this.setState({
      processing: "download",
    });

    const url = process.env.REACT_APP_DOMAIN + "/download/deliverConfig";

    // await axios({
    //   headers: {
    //     authorization: this.token ? `Bearer ${this.token}` : "",
    //   },
    //   method: "GET",
    //   url: url,
    //   responseType: "arraybuffer",
    // })
    //   .then((response) => {
    //     fileDownload(response.data, "DeliveryStatus.xlsx");
    //   })
    //   .catch((error) => {
    //     this._isMounted &&
    //       this.props.enqueueSnackbar(
    //         "Sorry, there is an error occurred while downloading.",
    //         { variant: "error" }
    //       );
    //   });

    this._isMounted &&
      this.setState({
        processing: "",
      });
  }

  /**
   * @summary Upload files
   * @param {!Array<Object>} files
   */
  async onDropFile(files, type) {
    let promises = await files.reduce(
      (accumulatorPromise, file) =>
        accumulatorPromise.then(
          (prevResolve) =>
            new Promise((resolve) => {
              this.props.apolloClient.uploadClient
                .mutate({
                  mutation: UPLOAD_CERTIFICATE,
                  variables: { file },
                })
                .then((result) => {
                  if (result.data.uploadAgentCertificate.statusCode === 200) {

                    switch (type) {
                      case 'certificate':
                        this.setState({
                          certificate: result.data.uploadAgentCertificate.data,
                        });
                        break;
                      case 'business':
                        this.setState({
                          business: result.data.uploadAgentCertificate.data,
                        });
                        break;
                      case 'passbook':
                        this.setState({
                          passbook: result.data.uploadAgentCertificate.data,
                        });
                        break;
                    }

                    resolve([...prevResolve, ...[true]]);
                  } else {
                    resolve([...prevResolve, ...[false]]);
                  }
                })
                .catch((error) => {
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
              menuName="Seller information"
              title="Seller information setting"
              icon={<PersonIcon />}
              links={[{
                href: "/sellers",
                name: "Seller list"
              }]}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8} xs={12}>
            <div className="card mt-20">
              <form
                id="seller-info-form"
                onSubmit={this.onHandleSubmit.bind(this)}
              >

                {/* Company name */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Company name</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Company name"
                      size="small"
                      variant="outlined"
                      type="text"
                      name="companyName"
                      error={this.hasError("companyName")}
                      helperText={
                        this.hasError("companyName")
                          ? this.state.errors["companyName"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* New Password */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>New password</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="New password"
                      size="small"
                      variant="outlined"
                      type="password"
                      name="password"
                      error={this.hasError("password")}
                      helperText={
                        this.hasError("password")
                          ? this.state.errors["password"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Repeat Password */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Repeat password</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Repeat password"
                      size="small"
                      variant="outlined"
                      type="password"
                      name="repeatPassword"
                      error={this.hasError("repeatPassword")}
                      helperText={
                        this.hasError("repeatPassword")
                          ? this.state.errors["repeatPassword"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Bank account */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Bank account <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControl size="small" fullWidth>
                      <Select
                        variant="outlined"
                        name="bank"
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
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Bank account"
                      size="small"
                      variant="outlined"
                      name="accountNumber"
                      error={this.hasError("accountNumber")}
                      helperText={
                        this.hasError("accountNumber")
                          ? this.state.errors["accountNumber"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                <Divider />

                {/* Seller name */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Seller name <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="First name"
                      size="small"
                      variant="outlined"
                      name="firstName"
                      error={this.hasError("firstName")}
                      helperText={
                        this.hasError("firstName")
                          ? this.state.errors["firstName"][0]
                          : null
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="Middle name"
                      size="small"
                      variant="outlined"
                      name="middleName"
                      error={this.hasError("middleName")}
                      helperText={
                        this.hasError("middleName")
                          ? this.state.errors["middleName"][0]
                          : null
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      label="Last name"
                      size="small"
                      variant="outlined"
                      name="lastName"
                      error={this.hasError("lastName")}
                      helperText={
                        this.hasError("lastName")
                          ? this.state.errors["lastName"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Email */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Email <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      error={this.state.validEmail}
                      onBlur={this.onBlurEmail.bind(this)}
                      size="small"
                      fullWidth
                      helperText={
                        this.state.validEmailMessage
                      }
                      label="E-mail"
                      name="email"
                      type="text"
                      variant="outlined"
                      inputProps={{
                        autoComplete: 'email',
                        autoFocus: false                       
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Postal code */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Postal code <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Postal code"
                      size="small"
                      variant="outlined"
                      name="postalCode"
                      error={this.hasError("postalCode")}
                      helperText={
                        this.hasError("postalCode")
                          ? this.state.errors["postalCode"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Address 1 */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Address 1 <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Address 1"
                      size="small"
                      variant="outlined"
                      name="address1"
                      error={this.hasError("address1")}
                      helperText={
                        this.hasError("address1")
                          ? this.state.errors["address1"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Address 2 */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Address 2</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Address 2"
                      size="small"
                      variant="outlined"
                      name="address2"
                      error={this.hasError("address2")}
                      helperText={
                        this.hasError("address2")
                          ? this.state.errors["address2"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Address 3 */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>Address 3</h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Address 3"
                      size="small"
                      variant="outlined"
                      name="address3"
                      error={this.hasError("address3")}
                      helperText={
                        this.hasError("address3")
                          ? this.state.errors["address3"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                {/* Phone number */}
                <Grid container spacing={1} className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>
                      Phone number <span className="text-red">*</span>
                    </h5>
                  </Grid>
                  <Grid item md={9} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone number"
                      size="small"
                      variant="outlined"
                      name="phoneNumber"
                      error={this.hasError("phoneNumber")}
                      helperText={
                        this.hasError("phoneNumber")
                          ? this.state.errors["phoneNumber"][0]
                          : null
                      }
                    />
                  </Grid>
                </Grid>
              </form>

              <Divider className="mt-20" />

              <Grid container spacing={1} className="mt-20">
                <Grid item>
                  <Button
                    form="seller-info-form"
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                    disabled={this.state.processing !== "" ? true : false}
                    startIcon={
                      this.state.processing === "submit" ? (
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
    loggedUser: state.loggedUser,
  };
};

export default withSnackbar(
  connect(mapStateToProps, { setLoggedUser })(PersonalInfo)
);