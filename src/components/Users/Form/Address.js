import React from 'react';
import {
  CardContent,
  Grid,
  TextField
} from '@material-ui/core';

class Address extends React.Component{
  render() {
    if (!this.props.isShowForm)
      return '';

    let address = this.props.user ? this.props.user : {};

    return <CardContent>
      {/* Name container */}
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={1} xs={12}>
          <h5>Address *</h5>
        </Grid>

        {/* Fields */}
        <Grid item md={11} xs={12}>
          <Grid container>
            <Grid item md={3} xs={6}>
              <TextField 
                id="name-basic" 
                label="Nation"
                size="small"
                variant="outlined"
                name="nation" 
                defaultValue={address.nation}
              />
            </Grid>
            <Grid item md={9} xs={6}>
              <TextField 
                id="name-basic" 
                label="Zip code"
                size="small"
                variant="outlined"
                name="zipCode" 
                defaultValue={address.zipCode}
              />
            </Grid>
            <Grid item md={3} xs={6} className="mt-20">
              <TextField 
                id="name-basic" 
                label="City"
                size="small"
                variant="outlined"
                name="city" 
                defaultValue={address.city}
              />
            </Grid>
            <Grid item md={9} xs={6} className="mt-20">
              <TextField 
                id="name-basic" 
                label="State"
                size="small"
                variant="outlined"
                name="state" 
                defaultValue={address.state}
              />
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address1"
                size="small"
                variant="outlined"
                name="address1" 
                defaultValue={address.address1}
              />    
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address2"
                size="small"
                variant="outlined"
                name="address2" 
                defaultValue={address.address2}
              />          
            </Grid>
            <Grid item md={3} xs={4} className="mt-20">
              <TextField
                id="name-basic" 
                label="Address3"
                size="small"
                variant="outlined"
                name="address3" 
                defaultValue={address.address3}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  }
}

export default Address;