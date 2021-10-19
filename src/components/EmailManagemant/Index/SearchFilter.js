import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';


class UsersToolbar extends React.Component {
  
  render() {
    return (
      <Grid container spacing={3} className="grid-lineHeight">
        <Grid item xs={2}>
          <h4>MAIL FORM IN TITLE</h4>
        </Grid>
        <Grid item xs={10}>
          <TextField id="standard-basic" />
        </Grid>
        <Grid item xs={2}>
          <h4>MAIL TITLE</h4>
        </Grid>
        <Grid item xs={10}>
          <TextField id="standard-basic" />
        </Grid>
        <Grid item xs={12} className="text-right">
          <Button size="small" variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    );
  }
  
};


export default UsersToolbar;
