import React, { Component } from "react";
import "@babel/polyfill";
import { ThemeProvider } from "@material-ui/core/styles";
import validate from "validate.js";
import theme from "./core/theme/index";
import Routes from "./core/routes/Routes";
import validators from "./core/common/validators";
import { SnackbarProvider } from "notistack";
import "./assets/css/sazaxa.css";
import { connect } from "react-redux";
import { setApolloClient, setLoggedUser, setToken } from "./core/redux/Redux";
import { ApolloProvider } from "react-apollo";
import { withRouter } from "react-router-dom";
import { createApolloClient } from "./core/apollo/apolloSetup";

validate.validators = {
  ...validate.validators,
  ...validators,
};

/**
 * @summary App
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src
 */
class App extends Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      isAppMounted: false,
    };
  }

  /**
   * @override
   */
  async componentDidMount() {
    //console.log("BEFORE");
    //this.props.setApolloClient(createApolloClient());
    //console.log("BEFORE2");
    if (
      location.pathname === "/signup" ||
      location.pathname.substring(0,11) === "/activation" ||
      location.pathname.substring(0, 6) === "/print"
    ) {
      this.props.setApolloClient(createApolloClient());
      this.setState({
        isAppMounted: true,
      });
      return;
    }

    // Get token if no exists
    const token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);
    
    if (!token) {
      this.setState({
        isAppMounted: true,
      });

      this.props.setApolloClient(createApolloClient());

      this.props.history.push("/signin");
    } else {
      this.props.setToken({
        accessToken: localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME),
        
      });

      const userid = localStorage.getItem(process.env.REACT_LOGGED_USER_ID);
      const marketid = localStorage.getItem(process.env.REACT_LOGGED_MARKET_ID);
      const roleName = localStorage.getItem(process.env.REACT_LOGGED_USER_ROLE);
      var user = {
        userid: userid,
        marketid: marketid,
        roleName: roleName
      };
      this.setState({
        isAppMounted: true,
      });

      if (user) {
        this.props.setLoggedUser(user);
      } else {
        this.props.history.push("/signin");
      }
    }
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps) {
    if ((prevProps.token || {}).accessToken !== this.props.token.accessToken) {
      this.props.setApolloClient(createApolloClient());
    }
  }

  /**
   * @override
   */
  render() {
    return this.state.isAppMounted && this.props.apolloClient ? (
      <ApolloProvider client={this.props.apolloClient.httpClient}>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          autoHideDuration={5000}
        >
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </SnackbarProvider>
      </ApolloProvider>
    ) : (
      ""
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
    token: state.token,
  };
};

// Connected component
export default withRouter(
  connect(mapStateToProps, {
    setApolloClient,
    setLoggedUser,
    setToken,
  })(App)
);
