import React from 'react';
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
  TableContainer,
  Button
} from '@material-ui/core';

/**
 * @summary Users Table
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package Users
 */
class DataTable extends React.Component {
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
      <div>xx</div>
    );
  }
}

export default DataTable;