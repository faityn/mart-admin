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

const DateFilter = (props) => {
  return (
    <Grid container spacing={3} md={12} xs={12}>
      <Grid item md={2} xs={12} className="align-items-center">
        <h5>일자</h5>
      </Grid>

      <Grid item md={10} xs={12} className="align-items-center">
        <Grid item md={1} xs={12}>
          <Button
            fullWidth
            size="medium"
            variant="contained"
            style={{ border: "1px solid #cccbcb" }}
          >
            등록일
          </Button>
        </Grid>
        <Grid container md={5} xs={12} style={{ marginLeft: "10px" }}>
          <Grid item md={5} xs={12} className="align-items-center">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="startDate"
              value={props.dateFrom}
            />
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
            className="text-center"
            className="align-items-center"
            style={{ paddingTop: "8px", paddingLeft: "1rem" }}
          >
            <h5>~</h5>
          </Grid>
          <Grid item md={5} xs={12} className="align-items-center">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="endDate"
              value={props.dateTo}
            />
          </Grid>
        </Grid>
        <Grid container md={5} xs={12} className="align-items-center">
          <Grid item md={2} xs={12}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "today" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "today")}
            >
              오늘
            </Button>
          </Grid>
          <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "week" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "week")}
            >
              1주일
            </Button>
          </Grid>
          <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "month" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "month")}
            >
              1개월
            </Button>
          </Grid>
          <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "3month" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "3month")}
            >
              3개월
            </Button>
          </Grid>
          <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "6month" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "6month")}
            >
              6개월
            </Button>
          </Grid>
          <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color={props.dateTypeSelect === "year" ? "primary" : ""}
              style={{ border: "1px solid #cccbcb" }}
              onClick={(e) => props.selectDateType(e, "year")}
            >
              1년
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DateFilter;
