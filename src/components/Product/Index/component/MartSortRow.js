import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

const SortRow = (props) => {
  return (
    <Grid container spacing={3} md={12} xs={12} className="mt-10">
      <Grid item md={2} xs={12} className="align-items-center">
        <InputLabel>
          전체 자료 :{" "}
          <i style={{ color: "#ff0000", fontStyle: "normal" }}>
            <strong>{props.totalCount}</strong>
          </i>{" "}
          건
        </InputLabel>
      </Grid>

      <Grid item md={10} xs={12} className="align-items-center">
        <Grid container spacing={3} className="mt-20">
          <Grid item md={5}></Grid>
          <Grid item md={2} xs={12} className="align-items-center">
            <Button
              fullWidth
              size="medium"
              variant="contained"
              onClick={props.pChangePopup.bind(this)}
              style={{ backgroundColor: "#FF5733", color: "#fff" }}
            >
              상품 판매가 변경 요청
            </Button>
          </Grid>
          <Grid item md={2} xs={12} className="align-items-center">
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              onClick={props.updateProducts.bind(this)}
            >
              수정
            </Button>
          </Grid>
          <Grid item md={2} xs={12} className="align-items-center">
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel>상품등록일순</InputLabel>
              <Select onChange={props.handleChangeSort}>
                <MenuItem value="createdDate">상품등록일순</MenuItem>
                <MenuItem value="name">성품명 순</MenuItem>
                <MenuItem value="code">상품 번호 순</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
            className="align-items-center"
            style={{ paddingLeft: "10px" }}
          >
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel>{props.rowsPerPage}개</InputLabel>
              <Select onChange={props.handleChangeRowsPerPage}>
                <MenuItem value="30">30개</MenuItem>
                <MenuItem value="50">50개</MenuItem>
                <MenuItem value="100">100개</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SortRow;
