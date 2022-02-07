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

const KeywordFilter = (props) => {
  return (
    <Grid container spacing={3} md={12} xs={12}>
      <Grid item md={2} xs={12}>
        <h5>검색</h5>
      </Grid>

      <Grid item md={10} xs={12} className="align-items-center">
        <Grid container>
          <Grid item md={2} xs={12} className="align-items-center">
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel>
                {props.type === "name"
                  ? "상품명"
                  : props.type === "code"
                  ? "상품번호"
                  : props.type === "barcode"
                  ? "상품 바코드"
                  : props.type === "brand"
                  ? "브랜드명"
                  : "전체"}
              </InputLabel>
              <Select onChange={props.selectFilterType} name="keywordType">
                <MenuItem value="">전체</MenuItem>
                <MenuItem value="name">상품명</MenuItem>
                <MenuItem value="code">상품번호</MenuItem>
                <MenuItem value="barcode">상품 바코드</MenuItem>
                <MenuItem value="brand">브랜드명</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            className="align-items-center text-center"
            style={{ marginLeft: "5px" }}
          >
            <TextField
              fullWidth
              name="keywords"
              size="small"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default KeywordFilter;
