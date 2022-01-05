import React from 'react';
import MaterialLoginView from './theme/MaterialTheme';
import MartRegistrationView from "../../../components/SignIn/SignIn";
/**
 * @summary SignIn
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/core/Authentication/SignIn
 */
class SignIn extends React.Component {

  /**
   * @override
   */
  render() {
    return <MartRegistrationView />;
  }
}

export default SignIn;