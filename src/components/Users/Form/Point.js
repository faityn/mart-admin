import React from 'react';
import { CardContent, Grid, TextField } from '@material-ui/core';

class Point extends React.Component{
  render() {
    if (!this.props.isShowForm)
      return '';

    let point = this.props.user ? this.props.user : {};
    return <CardContent>
      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Reserve (available)</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic"
            label="Point"
            type="number"
            size="small"
            variant="outlined"
            name="reserveAvailable" 
            defaultValue={point.reserveAvailable}
          />
        </Grid>
      </Grid>

      <Grid container 
        spacing={3} 
        className="align-items-center"
      >
        <Grid item md={2} xs={12}>
          <h5>Reserve (use)</h5>
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField fullWidth
            id="name-basic"
            label="Point"
            type="number"
            size="small"
            variant="outlined"
            name="reserveUsed" 
            defaultValue={point.reserveUsed}
          />
        </Grid>
      </Grid>
    </CardContent>
  }
}

export default Point;