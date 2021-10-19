import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Subscription } from 'react-apollo';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TableContainer
} from '@material-ui/core';

/**
 * @summary DataTable
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Index
 */
export default class DataTable extends React.Component {
    // componentDidMount() {
    //   this.props.subscribeToMore({
    //     document: USER_CREATED,
    //     updateQuery: (prev, { subscriptionData }) => {
    //       if (!subscriptionData.data) return prev;
    //       return {
    //         allUsers: [
    //           subscriptionData.data.userCreated,
    //           ...prev.allUsers
    //         ],
    //       };
    //     },
    //   });
    // }
    
    /**
     * @override
     */
    render() {
      return (
        <Card>
          <CardContent>
            <PerfectScrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.products.map(product => {
                    return (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.id}</TableCell>
                      {/* <Subscription subscription={USER_UPDATED}
                                      variables={{ id: user.id }}>
                                      {() => {return null;}}
                        </Subscription> */}
                    </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
            </PerfectScrollbar>
          </CardContent>
        </Card>
      );
    }
  }

DataTable.propTypes={ 
  products: PropTypes.array.isRequired,
  // subscribeToMore: PropTypes.func.isRequired
};

// // Query userCreated
// const USER_CREATED = gql`
// subscription {
//   userCreated {
//     id
//     username
//     email
//   }
// }`;

// // Query userUpdated
// const USER_UPDATED = gql`
// subscription userUpdated($id: Int!){
//   userUpdated(id:$id) { 
//     id
//     username
//     email
//   }
// }`;