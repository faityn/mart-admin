import React from 'react';
import { Grid } from '@material-ui/core';
/**
 * @summary Premium popup
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/Popup
 */
class Premium extends React.Component {

  /**
   * @override
   */
  render() {
    return <React.Fragment>
      <Grid container>
        <Grid item md={12} xs={12} className="customPopup">
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Premium;