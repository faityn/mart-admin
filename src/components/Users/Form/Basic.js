import React from 'react';
import {
  Grid, 
  TextField,  
  FormControlLabel, 
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControl,
  CardContent,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import CKEditor from 'ckeditor4-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { CHECK_MAIL } from '../Queries';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

/**
 * @summary Basic
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Basic extends React.Component {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);
    
    // Default state
    this.state = {
      description: "",
      shortDescription: "",
      isCheckEmailField: null,
      isValidEmail: null,
    }
  }

 /**
   * @summary Change description
   * @param {MouseEvent} editor 
   */
  onChangeDescription(event, editor) {
    this.setState({
      description: editor.getData()
    });
  };

  /**
   * @summary Change short description
   * @param {MouseEvent} editor
   */
  onChangeShortDescription(event, editor) {
    this.setState({
      shortDescription: editor.getData()
    });
  };

  /**
   * @summary Check the email is duplicated
   */ 
  async onBlur(event) {
    event.preventDefault();

    this.setState({
      isCheckEmailField: event.target.value
    });
    // Mutate
    await this.props.apolloClient.httpClient.mutate({
      mutation: CHECK_MAIL,
      variables: {
        email: event.target.value
      }
    }).then((result) => {
      if(result.data.checkEmail === "NOTDUPLICATED" && this.state.isCheckEmailField !== "") {
        this.setState({
          isValidEmail: true
        });
      }
      if(result.data.checkEmail === "DUPLICATED") {
        this.setState({
          isValidEmail: false
        });
      }
    }).catch((error) => {
      
    });
  }

  /**
   * @override
   */
  render() { 
    if (!this.props.isShowForm)
      return '';

    let info = this.props.user ? this.props.user : {};
    
    return <CardContent>
      <input type="hidden" value={info.status} name="status" />

      {/* Name container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Name</h5>
        </Grid>

        <Grid item md={3} xs={6}>
          <TextField fullWidth
            id="name-basic" 
            label="First name"
            size="small"
            variant="outlined"
            name="firstName" 
            error={this.props.hasError('firstName')}
            helperText={
              this.props.hasError('firstName') ? this.props.errors['firstName'][0] : null
            }
            defaultValue={info.firstName}
          />
        </Grid>

        {/* Show name */}
        <Grid item md={3} xs={6}>
          <TextField fullWidth
            id="name-basic" 
            label="Middle name"
            size="small"
            variant="outlined"
            name="middleName" 
            defaultValue={info.middleName}
          />
        </Grid>

        {/* Show name */}
        <Grid item md={3} xs={6}>
          <TextField fullWidth
            id="name-basic" 
            label="Last name"
            size="small"
            variant="outlined"
            name="lastName" 
            error={this.props.hasError('lastName')}
            helperText={
              this.props.hasError('lastName') ? this.props.errors['lastName'][0] : null
            }
            defaultValue={info.lastName}
          />
        </Grid>
      </Grid>

      {/* Email container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Email</h5>
        </Grid>

        <Grid item md={3} xs={6}>
        {this.props.id ? 
          <TextField fullWidth
            disabled
            id="name-basic" 
            label="Email is here"
            size="small"
            variant="outlined"
            name="email"
            defaultValue={info.email}
          />
        : 
          <TextField fullWidth
            id="name-basic" 
            label="Email is here"
            size="small"
            variant="outlined"
            name="email"
            onBlur={this.onBlur.bind(this)}
          />
        }
        </Grid>
        <Grid item md={3} xs={6}>
        {
          this.state.isValidEmail === true ? <CheckCircleOutlineIcon className="color-green"/> : null
        }
        {
          this.state.isValidEmail === false ? <HighlightOffIcon className="color-red"/> : null
        }
        </Grid>
      </Grid>

      {/* Password container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Password</h5>
        </Grid>

        {/* First name */}
        <Grid item md={3} xs={6}>
          <TextField fullWidth
            id="name-basic"
            type="password" 
            label="Password"
            size="small"
            variant="outlined"
            name="password" 
          />
        </Grid>

      </Grid>

      {/* Date of birth */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Date of birth</h5>
        </Grid>

        {/* date */}
        <Grid item md={6} xs={6}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            type="date"
            name="birthday"
            error={this.props.hasError('birthday')}
            helperText={
              this.props.hasError('birthday') ? this.props.errors['birthday'][0] : null
            }
            defaultValue={moment(info.birthday, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')}
          />
        </Grid>
      </Grid>
      
      {/* Container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Gender</h5>
        </Grid>

        {/* Gender */}
        <Grid item md={6} xs={12}>
          <RadioGroup row
            aria-label="gender" 
            name="gender"
            defaultValue={info.gender}
          >
            <FormControlLabel 
              value="M" 
              control={<Radio />} 
              label="Male" 
            />
            <FormControlLabel 
              value="F" 
              control={<Radio />} 
              label="Female" 
            />
            <FormControlLabel 
              value="X" 
              control={<Radio />} 
              label="Not revealing" 
            />
          </RadioGroup>
        </Grid>
      </Grid>

      {/* Container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Phone number</h5>
        </Grid>
        {/* Postal code */}
        <Grid item md={1} xs={6}>
          <TextField fullWidth
            id="name-basic"
            size="small"
            variant="outlined"
            name="postalCode" 
            defaultValue={info.postalCode}
          />
        </Grid>

        {/* Number */}
        <Grid item md={2} xs={6}>
          <TextField
            error={this.props.hasError("phoneNumber")}
            size="small"
            fullWidth
            helperText={
              this.props.hasError("phoneNumber")
                ? this.props.errors.phoneNumber[0]
                : null
            }
            label="Phone number"
            name="phoneNumber"
            type="text"
            variant="outlined"
            defaultValue={info.phoneNumber}
          />
        </Grid>
      </Grid>
      
      {/* Container */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={2} xs={12}>
          <h5>E-mail reception</h5>
        </Grid>

        {/* Reception */}
        <Grid item md={4} xs={12}>
          <FormControl  size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Month"
              name="emailVerify"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Y">Y</MenuItem>
              <MenuItem value="N">N</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Member's Special Notes */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Member's Special Notes</h5>
        </Grid>
        
        {/* Short description */}
        <Grid item md={10} xs={12}>
          <FormControl fullWidth>
            <textarea name="note" defaultValue={info.note} />
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  }
};

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default connect(mapStateToProps, null)(Basic);