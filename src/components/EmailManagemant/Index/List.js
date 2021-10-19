import React from 'react';
import Table from './Table';
import mockData from './data';
import SearchFilter from './SearchFilter';
import {
  Grid,
  FormControlLabel,
  Radio,
  Button
}
from '@material-ui/core';

/**
 * @summary List
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/MemberManagement/Index
 */
class List extends React.Component {

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


  render () {
    return (
      <div>
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
        <div className="card">
          <Grid container spacing={3} className="grid-lineHeight">
            <Grid item xs={3}>
              <h4>MAIL HISTORY</h4>
            </Grid>
            <Grid item xs={9}>
              <h4>Search Result: <span className="text-danger">00</span></h4>
            </Grid>
          </Grid>
        </div>
        <div>
          <Table users={this.state.users}/>
        </div>
        <div className="text-right mt-20">
          <Button size="small" variant="contained" color="primary" href="/mail-management-create">
            ADD
          </Button>
        </div>
      </div>
    );
  };
};

export default List;
