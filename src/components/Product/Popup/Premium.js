import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@material-ui/core';
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
  render() {console.log(this.props.services);
    return <React.Fragment>
      <Grid container>
        <Grid item md={12} xs={12} className="customPopup">
          <List>
            {(this.props.services || []).map((service, index)=>{
              return <ListItem key={index}>
                <ListItemText primary={service} />
              </ListItem>
            })}
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  }
}

export default Premium;