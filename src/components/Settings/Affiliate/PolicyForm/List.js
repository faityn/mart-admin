import React from 'react';
import AffiliateTable from './Table';
import BaseList from '../../../../core/common/List';
import { 
  Grid,
} from '@material-ui/core';
import { GET_AFFILIATE_POLICY_LIST } from "../../../Queries/Affiliate";

let counter = 0;

class List extends BaseList {

  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
      },
      orderBy: "created_date",
      type: "DESC",
    });

    // Override
    this.query = GET_AFFILIATE_POLICY_LIST;
    this.table = AffiliateTable;

    this.search = this.search.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.shouldUpdateList === true) {
      this.setState({
        search: {
          dummy: counter,
        },
      });
      counter += 1;
      props.onUpdatedList();
    }
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenName, childrenState) {
    this.setState({
      search: {
        ...(childrenState.affiliateName.length > 0 ? { affiliateName: childrenState.affiliateName } : {}),
        ...(childrenState.pendingChecked === true ? { status: 'PENDING' } : {}),
      },
      pagination: {
        ...this.state.pagination,
        pageNumber: 1,
      },
    }); 
  }

  onReset(event) {
    this.setState({
      search: {},
      pagination: {
        ...this.state.pagination,
        pageNumber: 1,
      },
    });
  }


  /**
   * @override
   */
  render() {
    return <React.Fragment>
      <div className="card mt-20">
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={12} xs={12}>
            {this.executeQuery()}
          </Grid>
        </Grid>
      </div>
    </React.Fragment>;
  }
}

export default List;