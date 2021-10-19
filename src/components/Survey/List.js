import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { TableFooter, TablePagination } from "@material-ui/core";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2196f3",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const List = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <article
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "2vw",
          boxSizing: "border-box",
          marginBottom: "1vw",
        }}
      >
        <h2>Survey 통계</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">사사사 ID</StyledTableCell>
                <StyledTableCell align="center">국가</StyledTableCell>
                <StyledTableCell align="center">점수</StyledTableCell>
                <StyledTableCell align="center">방문경로</StyledTableCell>
                <StyledTableCell align="center">
                  구매한 카테고리
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: "300px" }}>
                  하고 싶은말
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Data) => (
                  <StyledTableRow key={Data.id}>
                    <StyledTableCell align="center">
                      {Data.sazaxaId}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.country}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {+Data.score}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.visitRoute}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.surveyCategory.map((category) => (
                        <p>{category}</p>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.anythingElse}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </article>
    </>
  );
};

export default List;
