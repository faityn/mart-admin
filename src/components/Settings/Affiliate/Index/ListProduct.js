import React from 'react';
import { Query } from 'react-apollo';

import Loading from '../../../../core/common/Partials/Loading';
import Error from '../../../../core/common/Partials/Error';
import Empty from '../../../../core/common/Partials/Empty';

import AffiliateProductTable from './TableProduct';
import { GET_AFFILIATE_PRODUCTS } from "../../../Queries/Affiliate";

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: {
        orderBy: "Clicks"
      },
      pagination: {
        rowsPerPage: props.rowsPerPage,
        pageNumber: props.pageNumber,
      },
      orderBy: "affiliate_name",
      type: "DESC",
    }; 

    // Override
    this.query = GET_AFFILIATE_PRODUCTS;
    this.table = AffiliateProductTable;

    this.handlePageNumber = this.handlePageNumber.bind(this);
    this.handleRowsPerPage = this.handleRowsPerPage.bind(this);
    this.handleOrderByProduct = this.handleOrderByProduct.bind(this);
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNumber: props.pageNumber,
      },
    });
  }

  handlePageNumber(event, pageNumber) {
    this.setState({
      pagination: Object.assign(this.state.pagination, {pageNumber: pageNumber})
    });
  }

  handleRowsPerPage(event) {
    this.setState({
      pagination: {
        rowsPerPage: event.target.value,
        pageNumber: 1
      }
    });
  }

  handleOrderByProduct(event) {
    this.setState({
      search: {
        orderBy: event.target.value,
      }
    });
  }

  render() {
    return <React.Fragment>
      <div className="mt-20">
        <Query 
          query={this.query} 
          variables={{
            search: this.state.search,
            page: {
              limit: this.state.pagination.rowsPerPage,
              pageNumber: this.state.pagination.pageNumber,
              orderBy: this.state.orderBy,
              type: this.state.type
            }
          }}>

          {({ data, loading, error, refetch, subscribeToMore }) => {

            // Error
            if (error) { 
              return <Error data={data} />;
            }

            // Loading
            if (!data && loading) {
              return <Loading />;
            }

            // Empty data
            if (!data) {
              return <Empty data={data} />;
            }

            // List
            return this.table ? <React.Fragment>
              {data && loading ? <Loading /> : null}
              <this.table
                data={data}
                search={this.state.search}
                searchVariables={this.props.search}
                pagination={this.state.pagination}
                orderBy={this.state.orderBy}
                type={this.state.type}
                handleRowsPerPage={this.handleRowsPerPage}
                handlePageNumber={this.handlePageNumber}
                handleOrderByProduct={this.handleOrderByProduct}
                refetch={refetch}
              /> 
              </React.Fragment> : '';
          }}
        </Query>
      </div>
    </React.Fragment>;
  }
}

export default List;