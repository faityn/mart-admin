import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-boost';
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import axios from 'axios';
import { Observable } from 'apollo-link';
import { store, setToken } from '../redux/Redux';

const promiseToObservable = (promise) =>
  new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      err => subscriber.error(err)
    );
    return subscriber; 
  });

const newToken = async () => {
  let bodyFormData = new FormData();
      bodyFormData.set('grant_type', 'refresh_token');
      bodyFormData.set('refresh_token', localStorage.getItem(process.env.REACT_REFRESH_TOKEN_NAME));

  let promise = await new Promise(resolve => { 
    new axios({
      baseURL: process.env.REACT_APP_DOMAIN + '/oauth/token',
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: process.env.REACT_APP_OAUTH_ID,
        password: process.env.REACT_APP_OAUTH_PASS
      },
      data: bodyFormData,
      method: 'POST'
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      resolve(null);
    });
  });

  return promise;
}

/**
 * @summary Create apollo client
 */
export const createApolloClient = () => {
  // Token
  const token = store.getState().token.accessToken ? store.getState().token.accessToken : "";

  // WS link
  // const wsLink = new WebSocketLink({
  //   uri: process.env.REACT_APP_WS_URL,
  //   options: {
  //     reconnect: false,
  //     connectionParams: {
  //       authToken: token ? `Bearer ${token}` : "",
  //     },
  //   }
  // });

  // API link
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    }
  });

  // Error link
  const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
      if (networkError.statusCode === 401) {
        
        return promiseToObservable(newToken()).flatMap((response) => {
          const oldHeaders = operation.getContext().headers;
          
          if (response && response.status === 200 && response.data && response.data.access_token && response.data.refresh_token) {
            store.dispatch(setToken({
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token
            }));
            localStorage.setItem(process.env.REACT_ACCESS_TOKEN_NAME, response.data.access_token);
            localStorage.setItem(process.env.REACT_REFRESH_TOKEN_NAME, response.data.refresh_token);
    
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${response.data.access_token}`,
              },
            });
          
            return forward(operation)
          }
          else {
            localStorage.removeItem(process.env.REACT_ACCESS_TOKEN_NAME);
            localStorage.removeItem(process.env.REACT_REFRESH_TOKEN_NAME);
            window.location.pathname = "/";
          }
        });
      }
    }

    return forward(operation);
  });

  // Http client
  const httpClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      errorLink,
      split(
        ({query}) => { 
          const definition = getMainDefinition(query);
          
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        httpLink
      )
    ]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  });

  // Upload client
  const uploadClient = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: Upload file error.`));
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),
      new createUploadLink({ 
        uri: process.env.REACT_APP_API_URL,
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      })
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      }
    }
  });

  return { 
    httpClient, 
    uploadClient 
  };
}