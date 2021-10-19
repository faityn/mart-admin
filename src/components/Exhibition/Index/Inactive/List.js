import React from "react";
import { GET_EXHIBITIONS } from "../../../Queries/Queries";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import ExhibitionTable from "./Table";
import BaseList from "../../../../core/common/List";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * @summary Exhibition
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Exhibition
 */
class Exhibition extends BaseList {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = Object.assign(this.state, {
      search: {
        type: "Ended"
      },
      orderBy: "createdDate",
      type: "DESC",
    });

    // Override
    this.query = GET_EXHIBITIONS;
    this.table = ExhibitionTable;
  }

  /**
   * @summary Search
   * @param {String} childrenName
   * @param {String} childrenState
   */
  search(childrenName, childrenState) {
    this.setState({
      search: {
        name: childrenState.search.code ? childrenState.search.code : null,
      },
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>

        {/* List section */}
        <div className="mt-20">
          {/* List */}
          {this.executeQuery()}
        </div>
      </React.Fragment>
    );
  }
}

export default Exhibition;
