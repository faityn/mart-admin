import React from 'react';
import {
  Grid,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  Checkbox,
  Button
} from '@material-ui/core';



class Settings extends React.Component {

  render() {
    return (
      <div className="card">
        <Grid container spacing={3} className="grid-lineHeight">
          <Grid item xs={3}>
            <h4>JOIN</h4>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Used"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Not Used"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <h4>DORMANT NOTIFICATION</h4>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Used"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Not Used"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <h4>PURCHASE NOTIFICATION</h4>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Used"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Not Used"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <h4>PRODUCT DISPATCH NOTIFICATION</h4>
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Used"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color="primary"
                />
              }
              label="Not Used"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} className="text-right">
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default Settings;
