import React from 'react';

/**
 * @summary ForgetPassword
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/core/Authentication/ForgetPassword
 */
class ForgetPassword extends React.Component {
  
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      theme: null
    }
  }

  /**
   * @override
   */
  componentDidMount() {
    this.getTheme();
  }

  /**
   * @summary
   * @return {Object}
   */
  async getTheme() {
    let theme;

    switch('MATERIAL'){
      case 'MATERIAL':
        theme = await import('./theme/MaterialTheme.js');
      break;
      default:
        theme = null;
    }

    this.setState({
      theme: theme ? theme.default : null
    });
  } 

  /**
   * @override
   */
  render() {
    let { theme: Component } = this.state;

    return Component && <Component />;
  }
}

export default ForgetPassword;


