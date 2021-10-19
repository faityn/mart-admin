import React from 'react';
import MaterialRegisterView from './theme/MaterialTheme';
/**
 * @summary SignUp
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/core/Authentication/SingUp
 */
class SingUp extends React.Component {

  /**
   * @override
   */
  render() {
    const { token } = this.props.match.params;
    return <MaterialRegisterView token={token} />;
  }
}

export default SingUp;