import React from 'react';
import {
  Grid,
  LinearProgress,
  TextField,
}
from '@material-ui/core';

/**
 * @summary Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Member/Form
 */
class Form extends React.Component {

  /**
   * @override
   */
  render() {

    if(!this.props.data)
      return <LinearProgress />

    let data = this.props.data;

    return <React.Fragment>
      {/* hidden id's */}
      <input name="id1" type="hidden" value={data[0].id} />
      <input name="id2" type="hidden" value={data[1].id} />
      <input name="id3" type="hidden" value={data[2].id} />

      {/* Use coupon */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={3} xs={12}>
          <h5>Class name setting</h5>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="type1"
            defaultValue={data[0].type}
            error={this.props.hasError('type1')}
            helperText={
              this.props.hasError('type1') ? this.props.errors['type1'][0] : null
            }
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="type2"
            defaultValue={data[1].type}
            error={this.props.hasError('type2')}
            helperText={
              this.props.hasError('type2') ? this.props.errors['type2'][0] : null
            } 
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="type3"
            defaultValue={data[2].type}
            error={this.props.hasError('type3')}
            helperText={
              this.props.hasError('type3') ? this.props.errors['type3'][0] : null
            }
          />
        </Grid>
      </Grid>

      {/* Coupon name */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={3} xs={12}>
          <h5>Points earned by level</h5>
        </Grid>
        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="percent1"
            defaultValue={data[0].percent}
            error={this.props.hasError('percent1')}
            helperText={
              this.props.hasError('percent1') ? this.props.errors['percent1'][0] : null
            }
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="percent2"
            defaultValue={data[1].percent}
            error={this.props.hasError('percent2')}
            helperText={
              this.props.hasError('percent2') ? this.props.errors['percent2'][0] : null
            }
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <TextField fullWidth
            size="small"
            variant="outlined"
            name="percent3"
            defaultValue={data[2].percent}
            error={this.props.hasError('percent3')}
            helperText={
              this.props.hasError('percent3') ? this.props.errors['percent3'][0] : null
            }
          />
        </Grid>
      </Grid>

      {/* A */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={3} xs={12}>
          <h5>Level setting criteria A</h5>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Duration"
            size="small"
            variant="outlined"
            name="duration1"
            defaultValue={data[0].duration}
            error={this.props.hasError('duration1')}
            helperText={
              this.props.hasError('duration1') ? this.props.errors['duration1'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Frequency"
            size="small"
            variant="outlined"
            name="frequency1"
            defaultValue={data[0].frequency}
            error={this.props.hasError('frequency1')}
            helperText={
              this.props.hasError('frequency1') ? this.props.errors['frequency1'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Price"
            size="small"
            variant="outlined"
            name="price1"
            defaultValue={data[0].price}
            error={this.props.hasError('price1')}
            helperText={
              this.props.hasError('price1') ? this.props.errors['price1'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Cancel duration"
            size="small"
            variant="outlined"
            name="cancelDuration1"
            defaultValue={data[0].cancelDuration}
            error={this.props.hasError('cancelDuration1')}
            helperText={
              this.props.hasError('cancelDuration1') ? this.props.errors['cancelDuration1'][0] : null
            }
          />
        </Grid>
      </Grid>
      
      {/* B */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={3} xs={12}>
          <h5>Level setting criteria B</h5>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Duration"
            size="small"
            variant="outlined"
            name="duration2"
            defaultValue={data[1].duration}
            error={this.props.hasError('duration2')}
            helperText={
              this.props.hasError('duration2') ? this.props.errors['duration2'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Frequency"
            size="small"
            variant="outlined"
            name="frequency2"
            defaultValue={data[1].frequency}
            error={this.props.hasError('frequency2')}
            helperText={
              this.props.hasError('frequency2') ? this.props.errors['frequency2'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Price"
            size="small"
            variant="outlined"
            name="price2"
            defaultValue={data[1].price}
            error={this.props.hasError('price2')}
            helperText={
              this.props.hasError('price2') ? this.props.errors['price2'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Cancel duration"
            size="small"
            variant="outlined"
            name="cancelDuration2"
            defaultValue={data[1].cancelDuration}
            error={this.props.hasError('cancelDuration2')}
            helperText={
              this.props.hasError('cancelDuration2') ? this.props.errors['cancelDuration2'][0] : null
            }
          />
        </Grid>
      </Grid>

      {/* C */}
      <Grid container spacing={3} className="align-items-center">
        <Grid item md={3} xs={12}>
          <h5>Level setting criteria C</h5>
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Duration"
            size="small"
            variant="outlined"
            name="duration3"
            defaultValue={data[2].duration}
            error={this.props.hasError('duration3')}
            helperText={
              this.props.hasError('duration3') ? this.props.errors['duration3'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Frequency"
            size="small"
            variant="outlined"
            name="frequency3"
            defaultValue={data[2].frequency}
            error={this.props.hasError('frequency3')}
            helperText={
              this.props.hasError('frequency3') ? this.props.errors['frequency3'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Price"
            size="small"
            variant="outlined"
            name="price3"
            defaultValue={data[2].price}
            error={this.props.hasError('price3')}
            helperText={
              this.props.hasError('price3') ? this.props.errors['price3'][0] : null
            }
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <TextField fullWidth
            label="Cancel duration"
            size="small"
            variant="outlined"
            name="cancelDuration3"
            defaultValue={data[2].cancelDuration}
            error={this.props.hasError('cancelDuration3')}
            helperText={
              this.props.hasError('cancelDuration3') ? this.props.errors['cancelDuration3'][0] : null
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Form;