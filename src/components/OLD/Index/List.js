import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import DataTable from './Table/DataTable';

// make style
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

// GET_USERS
const GET_USERS = gql`
  query {
    allUsers {
      id,
      username, 
      email
    }
  }
`;

/**
 * @summary List
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Index
 */
const List = () => {
  const classes = useStyles();

  /**
   * @override
   */
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Query query={GET_USERS}>
          {({ data, loading, error, subscribeToMore }) => {
            if (!data) {
              return null;
            }
            if (loading) {
              return <span>Loading ...</span>;
            }
            if (error) { 
              return <p>Sorry! Something went wrong.</p>;
            }
      
            return (
              <DataTable
                users={data.allUsers}
                subscribeToMore={subscribeToMore}
              />);
          }}
        </Query>
      </div>
    </div>
  );
};

export default List;
