import React from 'react';
import { 
  Grid, 
  CardContent, 
  TextField
  } from '@material-ui/core';

/**
 * @summary Option
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Form
 */
class Option extends React.Component {

  /**
   * @override
   */
  render(){
    if (!this.props.isShowForm)
      return '';
      
    return <CardContent>
      {/* Container */}
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Option 1</h5>
        </Grid>
        {/* End Title */}

        {/* TextField */}
        <Grid item md={3} xs={12}>
          <TextField fullWidth
            label="Option 1"
            size="small"
            variant="outlined"
            name="option1"
            disabled
          />
        </Grid>
        {/* End TextField */}
      </Grid>
      {/* End Container */}

      {/* Container */}
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Option 2</h5>
        </Grid>
        {/* End Title */}

        {/* TextField */}
        <Grid item md={3} xs={12}>
          <TextField fullWidth
            label="Option 2"
            size="small"
            variant="outlined"
            name="option2"
            disabled
          />
        </Grid>
        {/* End TextField */}
      </Grid>
      {/* End Container */}
    </CardContent>
  }
};

export default Option; 
