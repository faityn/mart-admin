import React from 'react';
import { Fade, LinearProgress  } from '@material-ui/core';

/**
 * @summary Error
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Core
 */
export default class Error extends React.Component {

  /*
   * Props
   * Error: Object
   */

  /**
   * @override
   */
  render(){
    return <React.Fragment>
      {/* Title section */}
      <Fade
        in={!this.props.data}
        style={{
          transitionDelay: '0ms',
        }}
        unmountOnExit
      >
        <LinearProgress />
      </Fade>
    </React.Fragment>
  }
}