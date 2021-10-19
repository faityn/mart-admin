import React from 'react';
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  Button,
  CircularProgress,
  Checkbox,
  TextField,
  FormControlLabel
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";

// Icon
import PhoneIcon from '@material-ui/icons/Phone';
import SaveIcon from "@material-ui/icons/Save";

// Queries
import { GET_OPERATOR, SAVE_OPERATOR } from '../../Queries/Queries'

class Operator extends React.Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: this.props.match.params.id,
      operator: null,
      isProcessing: false,
      errors: null,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    if (this.state.id) {
      await this.props.apolloClient.httpClient.query({
        query: GET_OPERATOR,
        variables: { id: this.state.id }
      }).then((result) => {
        this.setState({
          operator: result.data.getOperatorById
        });
      }).catch((error) => {
        this.props.enqueueSnackbar('Sorry, there is an error occurred while fetching data.', {variant: 'error'});
      });
    }
  }


  /**
   * @summary Check errors
   * @param {String} field 
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate operator
   * @param {Object} operator 
   */
  onValidateSubmit(operator) {
    const schema = {
      "operatorId": {
        presence: {
          allowEmpty: false,
          message: '^Operator id field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^ID input (enter within 8-20 characters including English and numbers)'
        },
      },
      "password": {
        presence: {
          allowEmpty: false,
          message: '^Password field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^Password length should be 8-20 characters.'
        },
        format: {
          pattern: "^[ A-Za-z0-9_]*$",
          message: '^Should be alphanumeric only.'
        }
      },
      "repeatPassword": {
        presence: {
          allowEmpty: false,
          message: '^Password field is required.'
        },
        length: {
          minimum: 8,
          maximum: 20,
          message: '^Password length should be 8-20 characters.'
        },
        format: {
          pattern: "^[ A-Za-z0-9_]*$",
          message: '^Should be alphanumeric only.'
        }
      },
      "firstName": {
        presence: {
          allowEmpty: false,
          message: '^Firstname field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "firstName": {
        presence: {
          allowEmpty: false,
          message: '^First name field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "realName": {
        presence: {
          allowEmpty: false,
          message: '^Real name field is required.'
        },
        length: {
          maximum: 64,
          message: '^Maximum length should be 64.'
        }
      },
      "email": {
        presence: {
          allowEmpty: false,
          message: '^Email field is required.'
        }
      },
      "contact": {
        presence: {
          allowEmpty: false,
          message: '^Contact field is required.'
        }
      },
      "remark": {
        presence: {
          allowEmpty: false,
          message: '^Remark field is required.'
        }
      }
    }

    // Validate
    const errors = validate(operator, schema);

    this.setState({
      errors: errors
    });

    return errors;
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
    let operator = {
      operatorId: formData.get("operatorId"),
      password: formData.get("password"),
      repeatPassword: formData.get("repeatPassword"),
      firstname: formData.get("firstName"),
      realname: formData.get("realName"),
      email: formData.get("email"),
      contact: formData.get("contact"),
      allowLogin: formData.get('allowLogin') === 'true',
      personalInformationManager: formData.get('personalInformationManager') === 'true',
      remark: formData.get("remark"),
      menuAccess : [
        {
          menuId: "1",
          menuName: "Basic setting",
          hasAccess: formData.get('basic') === 'true'
        },
        {
          menuId: "2",
          menuName: "Product management",
          hasAccess: formData.get('product') === 'true'
        },
        {
          menuId: "3",
          menuName: "Order management",
          hasAccess: formData.get('order') === 'true'
        },
        {
          menuId: "4",
          menuName: "Member management",
          hasAccess: formData.get('member') === 'true'
        },
        {
          menuId: "5",
          menuName: "Statistics management",
          hasAccess: formData.get('statistics') === 'true'
        },
        {
          menuId: "6",
          menuName: "Promotion",
          hasAccess: formData.get('promotion') === 'true'
        }
      ]
    };

    // // Validate
    // if (this.onValidateSubmit(operator)) return;

    if (operator.password !== operator.repeatPassword) {
      this.setState({
        errors: {
          repeatPassword: ['Password and confirm password does not match']
        }
      })

      return;
    }

    delete operator.repeatPassword;

    this.setState({
      isProcessing: true
    });

    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: SAVE_OPERATOR, 
      variables: { 
        operator: operator
      }
    }).then((result) => {
      if (result.data.saveOperator.statusCode === 200) {
        const message = id ? 
          "Operator has been successfully updated." : 
          "Operator has been successfully created."
        ;

        this.props.enqueueSnackbar(message, {variant: 'success'});
      }
    }).catch((error) => {
      this.props.enqueueSnackbar('Sorry, there is an error occurred while saving data.', {variant: 'error'});
    });

    this._isMounted && this.setState({
      isProcessing: false,
    });
  }

  /**
   * @override
   */
  render() {

    let isShowForm = !this.state.id || this.state.operator;

    if(!isShowForm)
      return '';

    let data = this.state.operator ? this.state.operator : {};
    let menus = this.state.operator ? this.state.operator.menuAccess : "";

    return <React.Fragment>
    {/* Title section */}
    <Grid container>
      <Grid item xs={6}>
        {/* Title */}
        <PageTitle
          menuName="Operator form"
          title="Operator form"
          icon={<PhoneIcon />}
        />
      </Grid>
      <Grid item xs={6} className="text-right">
        <Button
          form="my-form"
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

    <div className="card mt-20">
      <form id="my-form" onSubmit={this.onHandleSubmit}>
        {/* Operator ID */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Operator ID</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="operatorId-basic" 
              label="ID input (enter within 8-20 characters including English and numbers)"
              size="small"
              variant="outlined"
              name="operatorId"
              type="operatorId"
              defaultValue={data.operatorId}
              error={this.hasError('operatorId')}
              helperText={
                this.hasError('operatorId') ? this.state.errors['operatorId'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* Password */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Password</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="password-basic" 
              label="Enter password (enter within 8~20 characters)"
              size="small"
              variant="outlined"
              name="password"
              type="password"
              error={this.hasError('password')}
              helperText={
                this.hasError('password') ? this.state.errors['password'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* Repeat password */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Repeat password</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="repeatPassword-basic" 
              label="Confirm password (enter within 8~20 characters)"
              size="small"
              variant="outlined"
              name="repeatPassword"
              type="password"
              error={this.hasError('repeatPassword')}
              helperText={
                this.hasError('repeatPassword') ? this.state.errors['repeatPassword'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* First name (pen name) */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>First name (pen name)</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="firstname-basic" 
              label="Please enter your pen name"
              size="small"
              variant="outlined"
              name="firstname"
              defaultValue={data.firstname}
              error={this.hasError('firstname')}
              helperText={
                this.hasError('firstname') ? this.state.errors['firstname'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* Name (Real name) */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Name (Real name)</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="realName-basic" 
              label="Please enter your real name"
              size="small"
              variant="outlined"
              name="realname"
              defaultValue={data.realname}
              error={this.hasError('realname')}
              helperText={
                this.hasError('realname') ? this.state.errors['realname'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* E-mail */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>E-mail</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="email-basic" 
              label="Please enter your email"
              size="small"
              variant="outlined"
              name="email"
              defaultValue={data.email}
              error={this.hasError('email')}
              helperText={
                this.hasError('email') ? this.state.errors['email'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* Contact */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Contact</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="contact-basic" 
              label="Please enter your contact information"
              size="small"
              variant="outlined"
              name="contact"
              defaultValue={data.contact}
              error={this.hasError('contact')}
              helperText={
                this.hasError('contact') ? this.state.errors['contact'][0] : null
              }
            />
          </Grid>
        </Grid>

        {/* Allow login */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Access login</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <FormControlLabel
              control={
                <Checkbox name="allowLogin" 
                  value={true}
                  defaultChecked={data.allowLogin !== undefined ? data.allowLogin : false} />
                }
              label="Access login (whether to access the administrator page)"
            />
          </Grid>
        </Grid>

        {/* Setting menu access rights */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Setting up menu access rights</h5>
          </Grid>

          {/* Checkbox */}
          <Grid item md={10} xs={12}>
            <Grid container 
              spacing={2}
            >
              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="basic" 
                      value={true}
                      defaultChecked={menus[0] ? menus[0].hasAccess : false} />
                  }
                  label="Basic setting"
                />
              </Grid>
              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="product" 
                      value={true}
                      defaultChecked={menus[1] ? menus[1].hasAccess : false} />
                  }
                  label="Product management"
                />
              </Grid>
              
              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="order" 
                      value={true}
                      defaultChecked={menus[2] ? menus[2].hasAccess : false} />
                  }
                  label="Order management"
                />
              </Grid>
              
              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="member" 
                      value={true}
                      defaultChecked={menus[3] ? menus[3].hasAccess : false} />
                  }
                  label="Member management"
                />
              </Grid>
              
              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="statistics" 
                      value={true}
                      defaultChecked={menus[4] ? menus[4].hasAccess : false} />
                  }
                  label="Statistics management"
                />
              </Grid>

              <Grid item md={12} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox name="promotion" 
                      value={true}
                      defaultChecked={menus[5] ? menus[5].hasAccess : false} />
                  }
                  label="Promotion"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Personal Information Manager */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Personal Information Manager</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            <FormControlLabel
              control={
                <Checkbox name="personalInformationManager" 
                  value={true}
                  defaultChecked={data.personalInformationManager !== undefined ? data.personalInformationManager : false } />
              }
              label="Designated as personal information manager"
            />
          </Grid>
        </Grid>

        {/* Remark */}
        <Grid container 
          spacing={3} 
          className="align-items-center"
        >
          <Grid item md={2} xs={12}>
            <h5>Remark</h5>
          </Grid>

          {/* Input */}
          <Grid item md={10} xs={12}>
            <TextField fullWidth
              id="remark-basic" 
              label="Please enter other details"
              size="small"
              variant="outlined"
              name="remark"
              defaultValue={data.remark}
              error={this.hasError('remark')}
              helperText={
                this.hasError('remark') ? this.state.errors['remark'][0] : null
              }
            />
          </Grid>
        </Grid>

      </form>
    </div>
  </React.Fragment>
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(Operator));
