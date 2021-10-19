import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import SearchFilter from "./SearchFilter";
import Table from "./Table";
import mockData from './data';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import {
  ButtonGroup,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

// GET_USERS
const GET_PRODUCTS = gql`
  query {
    getProducts {
        id,
        category,
        code,
        name,
        nameEng,
        sku,
        price,
        inventory,
        weight
    }
  }
`;


class ProductList extends React.Component {
  // const classes = useStyles();


  // const [users] = useState(mockData);

  // /**
  //  * @inheritdoc
  //  */
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     users: mockData
  //   }
  // }

  state = {
    isActive: false,
    users: mockData
  };

  handleShow = () => {
    this.setState({isActive: true});
  };

  handleHide = () => {
    this.setState({isActive: false});
  };

  render() {
    return <div>
      <div className="text-right">
        {this.state.isActive ?(
          <Button size="small" variant="contained" color="primary" onClick={this.handleHide}>
          FILTER
          </Button>
        ) : (
          <Button size="small" variant="contained" color="primary" onClick={this.handleShow}>
          FILTER
          </Button>
        )}
      </div>
      {this.state.isActive && <div className="card"><SearchFilter /></div>}
      <div>
        <Query query={GET_PRODUCTS}>
          {({ data, loading, error }) => {
            if (!data) {
              return null;
            }
            if (loading) {
              return <span>Loading ...</span>;
            }
            if (error) { 
              return <p>Sorry! Something went wrong.</p>;
            }

            return <Table products={this.state.users} />;
          }}
        </Query>
      </div>
      <div className="list-button text-right">
        <a href="/product-create">
          <Button size="small" variant="contained" color="primary">
            DOWNLOAD
          </Button>
        </a>
      </div>
    </div>;
  }
};

export default ProductList;
