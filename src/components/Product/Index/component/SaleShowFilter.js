import React, { useState } from "react";
import {
  Grid,
  Input,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

const SaleShowFilter = (props) => {
  return (
    <Grid container>
      <Grid container spacing={3} md={12} xs={12}>
        <Grid item md={2} xs={12}>
          <h5>판매상태</h5>
        </Grid>

        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid item md={4} className="align-items-center">
              <Grid container>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      name="showStatus"
                      value=""
                      control={<Radio />}
                      label="전체"
                      onChange={props.selectSaleStatus}
                      checked={props.saleFilterStatus === "" ? true : false}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      name="showStatus"
                      value="true"
                      control={<Radio name="showStatus" />}
                      label="판매가능"
                      onChange={props.selectSaleStatus}
                      checked={props.saleFilterStatus === "true" ? true : false}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      name="showStatus"
                      value="false"
                      control={<Radio name="showStatus" />}
                      label="판매불가"
                      onChange={props.selectSaleStatus}
                      checked={
                        props.saleFilterStatus === "false" ? true : false
                      }
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Grid container className="align-items-center">
                <Grid item md={3} xs={12}>
                  <h5>전시상태</h5>
                </Grid>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="전체"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="전시중"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item md={3} xs={12}>
                  <RadioGroup>
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="전시중지"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} md={12} xs={12}>
        <Grid item md={10} xs={12}>
          <Grid container>
            <Grid
              item
              md={4}
              xs={12}
              className="align-items-center text-center"
              style={{ marginLeft: "5px" }}
            ></Grid>
            <Grid
              item
              md={4}
              xs={12}
              className="align-items-center text-center"
              style={{ marginLeft: "5px" }}
            >
              <Button
                type="submit"
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
              >
                검색
              </Button>
              <Button
                type="reset"
                fullWidth
                size="medium"
                variant="contained"
                style={{ border: "1px solid #cccbcb" }}
                startIcon={<RefreshIcon />}
              >
                초기화
              </Button>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
              className="align-items-center text-center"
              style={{ marginLeft: "5px" }}
            ></Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} md={10} xs={12} className="mt-20">
        <Grid item md={12} xs={12} className="text-left"></Grid>
      </Grid>
    </Grid>
  );
};
export default SaleShowFilter;
