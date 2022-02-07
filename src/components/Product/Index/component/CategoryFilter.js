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

const CategoryFilter = (props) => {
  console.log(props.firstCategory);
  return (
    <Grid container spacing={3} md={12} xs={12}>
      <Grid item md={2} xs={12}>
        <h5>카테고리</h5>
      </Grid>

      <Grid item md={10} xs={12} className="align-items-center">
        <Grid container>
          <Grid item md={3} xs={12} className="align-items-center">
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                1차 카테고리
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="1차 카테고리"
                name="firstCategory"
                onChange={(e) => props.onChangeCategory(e, 1)}
              >
                <MenuItem value="">
                  <em>없음</em>
                </MenuItem>
                {(props.firstCategory || []).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={3}
            xs={12}
            className="align-items-center"
            style={{ marginLeft: "5px" }}
          >
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                2차 카테고리
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="2차 카테고리"
                name="secondCategory"
                inputProps={{
                  className: "white-label",
                }}
                onChange={(e) => props.onChangeCategory(e, 2)}
              >
                <MenuItem value="">
                  <em>없음</em>
                </MenuItem>
                {/* {(
                  props.secondCategory.filter(
                    (f) => f.parentId === props.secondCategoryId
                  ) || []
                ).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))} */}
                {(props.secondCategory || []).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            md={3}
            xs={12}
            className="align-items-center"
            style={{ marginLeft: "5px" }}
          >
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                3차 카테고리
              </InputLabel>
              {/* <input
                name="thirdCategory"
                type="hidden"
                value={state.selectedCategories.thirdId}
              /> */}
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="3차 카테고리"
                onChange={(e) => props.onChangeCategory(e, 3)}
              >
                <MenuItem value="">
                  <em>없음</em>
                </MenuItem>
                {(props.thirdCategory || []).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
                {/* {(
                  state.categories.third.filter(
                    (f) => f.parentId === state.selectedCategories.secondId
                  ) || []
                ).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} md={12} xs={12}>
        <Grid item md={5} xs={12}></Grid>
        <Grid
          item
          md={1}
          xs={12}
          className="align-items-center text-center"
          style={{ marginLeft: "5px" }}
        >
          <Button
            fullWidth
            type="submit"
            size="medium"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            검색
          </Button>
        </Grid>
        <Grid
          item
          md={1}
          xs={12}
          className="align-items-center text-center"
          style={{ marginLeft: "5px" }}
        >
          <Button
            fullWidth
            size="medium"
            variant="contained"
            style={{ border: "1px solid #cccbcb" }}
            startIcon={<RefreshIcon />}
          >
            초기화
          </Button>
        </Grid>
        <Grid item md={4} xs={12}></Grid>
      </Grid>
    </Grid>
  );
};
export default CategoryFilter;
