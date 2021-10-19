import React from 'react';
import { 
  Grid, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  TextareaAutosize, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  RadioGroup,
  Radio 
} from '@material-ui/core';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import moment from 'moment';

class Basic extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);
  }



  render() {

    if(!this.props.user && this.props.id)
      return "";
    
    let data = this.props.user ? this.props.user : {};

    return <React.Fragment>
      <input type="hidden" name="id" value={this.props.id} />
      {/* if statement */}
      { this.props.id ? 
      <Grid container>
        <Grid item md={12} xs={12} className="text-right">
          <Button size="small" variant="contained" color="default">
            Login with member ID
          </Button>
          <Button size="small" variant="contained" color="default" className="ml-20">
            Point payment
          </Button>
          <Button size="small" variant="contained" color="default" className="ml-20">
            Coupon
          </Button>
        </Grid>
      </Grid> : null }

      <Grid container 
        spacing={3} 
        className="align-items-center mt-20"
      >
        <Grid item md={2} xs={12}>
          <h5>E-Mail</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic" 
            label="Email is here"
            size="small"
            variant="outlined"
            name="email"
            defaultValue={data.email}
            onFocusOut={this.onFocusOut}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <h5>PASSWORD</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic" 
            label="Password is here"
            size="small"
            variant="outlined"
            name="password"
          />
        </Grid>
      </Grid>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>NAME</h5>
        </Grid>
        <Grid item md={3} xs={4}>
          <TextField fullWidth
            id="name-basic" 
            label="First name"
            size="small"
            variant="outlined"
            name="firstName" 
            defaultValue={data.firstName}
          />
        </Grid>
        <Grid item md={3} xs={4}>
          <TextField fullWidth
            id="name-basic" 
            label="Middle name"
            size="small"
            variant="outlined"
            name="middleName" 
            defaultValue={data.middleName}
          />
        </Grid>
        <Grid item md={3} xs={4}>
          <TextField fullWidth
            id="name-basic" 
            label="Last name"
            size="small"
            variant="outlined"
            name="lastName" 
            defaultValue={data.lastName}
          />
        </Grid>
      </Grid>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>DATE OF BIRTH</h5>
        </Grid>
        <Grid item md={3} xs={4}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            type="date"
            name="birthday"
            defaultValue={moment(data.birthday, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DD')}
          />
        </Grid>
      </Grid>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>GENDER</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <RadioGroup row
            aria-label="gebder" 
            name="gender"
            defaultValue={data.gender}
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
        <Grid item md={2} xs={12}>
          <h5>PHONE NUMBER</h5>
        </Grid>
        <Grid item md={1} xs={4}>
          <TextField fullWidth
            id="name-basic"
            size="small"
            variant="outlined"
            name="postalCode" 
            defaultValue={data.postalCode}
          />
        </Grid>
        <Grid item md={3} xs={8}>
          <TextField fullWidth
            id="name-basic" 
            label="Number"
            size="small"
            variant="outlined"
            name="phoneNumber" 
            defaultValue={data.phoneNumber}
          />
        </Grid>
      </Grid>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>E-MAIL RECEPTION</h5>
        </Grid>
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
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>ADDRESS</h5>
        </Grid>          
        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid item md={3} xs={6}>
              <TextField 
                id="name-basic" 
                label="Nation"
                size="small"
                variant="outlined"
                name="nation" 
                defaultValue={data.nation}
              />
            </Grid>
            <Grid item md={9} xs={6}>
              <TextField 
                id="name-basic" 
                label="Zip code"
                size="small"
                variant="outlined"
                name="zipCode" 
                defaultValue={data.zipCode}
              />
            </Grid>
            <Grid item md={3} xs={6} className="mt-20">
              <TextField 
                id="name-basic" 
                label="City"
                size="small"
                variant="outlined"
                name="city" 
                defaultValue={data.city}
              />
            </Grid>
            <Grid item md={9} xs={6} className="mt-20">
              <TextField 
                id="name-basic" 
                label="State"
                size="small"
                variant="outlined"
                name="state" 
                defaultValue={data.state}
              />
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address1"
                size="small"
                variant="outlined"
                name="address1" 
                defaultValue={data.address1}
              />    
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address2"
                size="small"
                variant="outlined"
                name="address2" 
                defaultValue={data.address2}
              />          
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address3"
                size="small"
                variant="outlined"
                name="address3" 
                defaultValue={data.address3}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>RESERVE (available)</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic"
            label="Point"
            type="number"
            size="small"
            variant="outlined"
            name="reserveAvailable" 
            defaultValue={data.reserveAvailable}
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <h5>RESERVE (use)</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic"
            label="Point"
            type="number"
            size="small"
            variant="outlined"
            name="reserveUsed" 
            defaultValue={data.reserveUsed}
          />
        </Grid>
      </Grid>

      {/* if statement */}
      { this.props.id ? 
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Purchase history</h5>
        </Grid>
        <Grid item md={10} xs={12}>
          {/* <PurchaseHistoryTable data={this.props.product} /> */}
        </Grid>
      </Grid> : null }

      {/* Container */}
      <Grid container
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Member's Special Notes</h5>
        </Grid>
        <Grid item md={10} xs={12}>
          <FormControl fullWidth>
            <TextareaAutosize 
              aria-label="minimum height" 
              rowsMin={10} 
              placeholder="Minimum 3 rows" />
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Basic;