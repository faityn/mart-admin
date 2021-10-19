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

const List = ({ influence, applicant }) => {
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

  const [levelZeroPage, setLevelZeroPage] = useState(0);
  const [levelZeroRowsPerPage, setLevelZeroRowsPerPage] = useState(5);
  const handleLevelZeroChangePage = (event, newPage) => {
    setLevelZeroPage(newPage);
  };

  const handleChangeLevelZeroRowsPerPage = (event) => {
    setLevelZeroRowsPerPage(+event.target.value);
    setLevelZeroPage(0);
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
        <h2>LV 1 ~ 5</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">레벨</StyledTableCell>
                <StyledTableCell align="center">신청 일자</StyledTableCell>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">유튜브</StyledTableCell>
                <StyledTableCell align="center">유튜브 구독자</StyledTableCell>
                <StyledTableCell align="center">인스타그램</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {influence
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((Data) => (
                  <StyledTableRow key={Data.id}>
                    <StyledTableCell align="center">
                      {Data.level}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {moment(Data.createdDate).format("LLL")}
                    </StyledTableCell>
                    <Link to={"/docs/" + Data.id}>
                      <StyledTableCell align="center">
                        {Data.firstName + Data.middleName + Data.lastName}
                      </StyledTableCell>
                    </Link>
                    <StyledTableCell align="center">
                      {Data.youtubeInfo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.youtubeSubscriberAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.instagramInfo}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={influence.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </article>
      <article
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "2vw",
          boxSizing: "border-box",
        }}
      >
        <h2>LV 0</h2>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">레벨</StyledTableCell>
                <StyledTableCell align="center">신청 일자</StyledTableCell>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">유튜브</StyledTableCell>
                <StyledTableCell align="center">유튜브 구독자</StyledTableCell>
                <StyledTableCell align="center">인스타그램</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applicant
                .slice(levelZeroPage * levelZeroRowsPerPage, levelZeroPage * levelZeroRowsPerPage + levelZeroRowsPerPage)
                .map((Data) => (
                  <StyledTableRow key={Data.id}>
                    <StyledTableCell align="center">
                      {Data.level}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {moment(Data.createdDate).format("LLL")}
                    </StyledTableCell>
                    <Link to={"/docs/" + Data.id}>
                      <StyledTableCell align="center">
                        {Data.firstName + Data.middleName + Data.lastName}
                      </StyledTableCell>
                    </Link>
                    <StyledTableCell align="center">
                      {Data.youtubeInfo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.youtubeSubscriberAmount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {Data.instagramInfo}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={applicant.length}
          rowsPerPage={levelZeroRowsPerPage}
          page={levelZeroPage}
          onChangePage={handleLevelZeroChangePage}
          onChangeRowsPerPage={handleChangeLevelZeroRowsPerPage}
        />
      </article>
    </>
  );
};

export default List;
