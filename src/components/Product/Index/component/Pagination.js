import React, { useState } from "react";

import PaginationMaterial from "@material-ui/lab/Pagination";
const Pagination = (props) => {
  return (
    <PaginationMaterial
      color="primary"
      count={Math.ceil(props.totalCount / props.rowsPerPage)}
      onChange={props.handlePagination}
    />
  );
};
export default Pagination;
