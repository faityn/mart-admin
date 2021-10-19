import React from 'react';
import { Grid, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';

class ProductList extends React.Component {

  render() {
    return (
      <div>
        <div className="card text-right">
          <Button size="small" variant="contained" color="primary" className="coupon-btn">
            Coupon
          </Button>
          <Button size="small" variant="contained" color="primary">
            Save
          </Button>
        </div>
        <div className="card">
          <Grid container spacing={3} className="grid-lineHeight">
            <Grid item xs={2}>
              <h4>E-Mail</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="email" id="standard-basic" label="Email here" />
            </Grid>
            <Grid item xs={2}>
              <h4>PASSWORD</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="password" id="standard-basic" label="Password here" />
            </Grid>
            <Grid item xs={2}>
              <h4>NAME</h4>
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="password" id="standard-basic" label="FirstName" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="password" id="standard-basic" label="MiddleName" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="password" id="standard-basic" label="LastName" />
            </Grid>
            <Grid item xs={2}>
              <h4>DATE OF BIRTH</h4>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <h4>GENDER</h4>
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel fullWidth
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Female"
              />
              <FormControlLabel fullWidth
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Not revealing"
              />
              <FormControlLabel fullWidth
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Male"
              />
            </Grid>
            <Grid item xs={2}>
              <h4>PHONE NUMBER</h4>
            </Grid>
            <Grid item xs={1}>
              <TextField fullWidth id="standard-basic" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth id="standard-basic" />
            </Grid>
            <Grid item xs={2}>
              <h4>E-MAIL</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="email" id="standard-basic" />
            </Grid>
            <Grid item xs={2}>
              <h4>E-MAIL RECEPTION</h4>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <h4>ADDRESS</h4>
            </Grid>
            <Grid item xs={1}>
              <TextField fullWidth type="number" id="standard-basic" label="Zip Code" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="text" id="standard-basic" label="Address1" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="text" id="standard-basic" label="Address2" />
            </Grid>
            <Grid item xs={3}>
              <TextField fullWidth type="text" id="standard-basic" label="Address3" />
            </Grid>
            <Grid item xs={2}>
              <h4>RESERVE (available)</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="number" id="standard-basic" label="P" />
            </Grid>
            <Grid item xs={2}>
              <h4>RESERVE (use)</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth type="number" id="standard-basic" label="P" />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

export default ProductList;
