import React from 'react';
import { FormControlLabel, TextField, Button, Grid, Checkbox } from '@material-ui/core';


class UsersToolbar extends React.Component {
  
  render() {
    return (
      <Grid container spacing={3} className="grid-lineHeight">
        <Grid item xs={2}>
          <h4>MEMBERSHIP LEVEL</h4>
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="ALL MEMBERS"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="CLASS A"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="CLASS B"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="CLASS C"
          />
        </Grid>
        <Grid item xs={2}>
          <h4>CONSENT TO RECEIVEL</h4>
        </Grid>
        <Grid item xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="AGREE TO RECIEVE E-MAIL"
          />
        </Grid>
        <Grid item xs={2}>
          <h4>SEARCH KEYWORD</h4>
        </Grid>
        <Grid item xs={10}>
          <TextField id="standard-basic" fullWidth/>
        </Grid>
        
        <Grid item xs={12} className="text-right">
          <Button size="small" variant="contained" color="primary">
            SEARCH
          </Button>
        </Grid>
      </Grid>
    );
  }
  
};


export default UsersToolbar;
