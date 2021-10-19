import React from 'react';
import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';


class UploadProduct extends React.Component {
 
  render() {
    return (
      <div>
        <div className="card">
          <Grid container spacing={3} className="grid-lineHeight">
            <Grid item xs={4}>
              <h4>PRODUCT REGISTRATION/MODIFICATION</h4>
            </Grid>
            <Grid item xs={8}>
              <Button size="small" variant="contained" color="primary">
                Download form
              </Button>
            </Grid>
            <Grid item xs={4}>
              <h4>UPLOAD</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Button size="small" variant="contained" color="primary">
                BROWSE
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className="card">
          <Grid container spacing={3} className="grid-lineHeight">
            <Grid item xs={4}>
              <h4>INVENTORY/PRICE MODIFICATION</h4>
            </Grid>
            <Grid item xs={8}>
              <Button size="small" variant="contained" color="primary">
                Download form
              </Button>
            </Grid>
            <Grid item xs={4}>
              <h4>UPLOAD</h4>
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <Button size="small" variant="contained" color="primary">
                BROWSE
              </Button>
            </Grid>
          </Grid>
        </div>

        <div className="card text-right">
          <Grid container spacing={3} className="grid-lineHeight">
            <Grid item xs={12}>
              <Button size="small" variant="contained" color="primary">
                SAVE
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
};

export default UploadProduct;
