import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './core/redux/Redux'
import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>, 
  document.getElementById('root')
);
