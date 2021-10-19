import React from 'react';
import { GET_OPERATORS } from "../../Queries/Queries";
import AddIcon from '@material-ui/icons/Add';
import OperatorTable from './Table';
import BaseList from '../../../core/common/List';
import PhoneIcon from '@material-ui/icons/Phone';
import PageTitle from '../../../core/common/Partials/PageTitle';
import { 
  Grid, 
  Switch, 
  FormControlLabel, 
  Button 
} from '@material-ui/core';
import { Link } from 'react-router-dom';

/**
 * @summary Product list
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class List extends BaseList {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, { 
      search: {
      },
      orderBy: "operator_id",
      type: "ASC",
    }); 

    // Override
    this.query = GET_OPERATORS;
    this.table = OperatorTable;
  }

  /**
   * @summary Search
   * @param {String} childrenName 
   * @param {String} childrenState 
   */
  search(childrenName, childrenState){
    this.setState({
    }); 
  }



  /**
   * @override
   */
  render(){
    return <React.Fragment>
      <Grid container>
        {/* Title section */}
        <Grid item xs={6}>
          <PageTitle 
            menuName="Operators" 
            title="Operator list" 
            icon={<PhoneIcon />} 
          />
        </Grid>

        {/* Button section */}
        <Grid item xs={6} className="text-right">
          {/* Create */}
          <Link to="/operator/create">
          <Button 
            variant="contained" 
            color="primary" 
            size="small" 
            startIcon={<AddIcon />} 
            className="ml-20" 
            
          >
            Create
          </Button>
          </Link>
        </Grid>
      </Grid>

      {/* List section */}
      <div className="mt-20">
        {/* List */}
        {this.executeQuery()}
      </div>
    </React.Fragment>;
  }
}

export default List;