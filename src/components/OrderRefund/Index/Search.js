import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Grid,
  TextField,
  InputLabel,
  RadioGroup,
  Radio,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

/**
 * @summary Order refund search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package OrderRefund/index
 */
class OrderRefundSearch extends React.Component {
 
  /**
   * @summary Handle submit form
   * @param {MouseEvent} event 
   */ 
  onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);

    this.props.search(formData);
  }

  /**
   * @override
   */
  render() {
    return (
      <form onSubmit={this.onHandleSubmit.bind(this)}>
        <Grid container spacing={3} alignItems="center">
          <Grid item md={12} xs={12} className="text-right">
            <IconButton
              color="primary"
              aria-label="Reset"
              onClick={(e) => this.props.onReset(e)}
            >
              <RotateLeftIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Search keyword</h5>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Search from
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Search from"
                name="searchForm"
              >
                <MenuItem value="orderNumber">Order number</MenuItem>
                <MenuItem value="productName">Product name</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Please enter keyword."
              size="small"
              variant="outlined"
              name="keyword"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Application type</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            <RadioGroup
              row
              aria-label="type"
              name="type"
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="All"
              />
              <FormControlLabel
                value="USER"
                control={<Radio color="primary" />}
                label="Customer cancellation"
              />
              <FormControlLabel
                value="ADMIN"
                control={<Radio color="primary" />}
                label="Administrator  cancellation"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Processing date</h5>
          </Grid>
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="startDate"
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="endDate"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Confirmation the return of goods</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            <RadioGroup
              row
              aria-label="status"
              name="status"
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="All"
              />
              <FormControlLabel
                value="O"
                control={<Radio color="primary" />}
                label="Bounce confirmation"
              />
              <FormControlLabel
                value="X"
                control={<Radio color="primary" />}
                label="Return not confirmed"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={2} xs={12}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              type="submit"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default connect(mapStateToProps, null)(OrderRefundSearch);
