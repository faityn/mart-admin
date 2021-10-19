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
  Checkbox,
  Box,
} from "@material-ui/core";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const categories = [
  "Membership",
  "Order/Shipping",
  "Cancel/Return/Refund",
  "Others",
  "Item"
];

/**
 * @summary Consult search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package ConsultationManagement/index
 */
class QnaSearch extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    // Default state
    this.state = {
      search: {
        title: "",
        categories: [],
        status: "",
        userName: "",
        startDate: null,
        endDate: null
      }
    };

    // Events
    this.saveData = this.saveData.bind(this);
  }

  handleCheckboxChange = event => {
    let newArray = [...this.state.search.categories, event.target.value];
    if (this.state.search.categories.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    this.setState({
      search: {
        categories: newArray
      }
    });
  };

  createCheckbox = (label) => (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          value={label}
          checked={this.state.search.categories.includes(label)}
          onChange={this.handleCheckboxChange}
        />
      }
      label={label}
      key={label}
    />
  );

  createCheckboxes = () => categories.map(this.createCheckbox);

  /**
   * @summary saveData
   * @param {String} e
   */
  saveData(e) {
    let search = this.state.search;
    let name = e.target.name;
    let value = e.target.value;

    // Date format
    if(name === "startDate"){
      if( value !== ""){
        value += "T00:00:00Z";
      } else {
        value = null;
      }
    }
    if (name === "endDate"){
      if( value !== ""){
        value += "T23:59:59Z";
      } else {
        value = null;
      }
    }

    search[name] = value;

    this.setState({ search });
  }
  
  /**
   * @override
   */
  render() {
    
    return (
      <React.Fragment>
        {/* Container Reset */}
        <Grid container spacing={3} alignItems="center">
          {/* Checkbox */}
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

        {/* Container Category */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12}>
            <h5>Category</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            {this.createCheckboxes()}
          </Grid>
          {/* End Checkbox */}
        </Grid>
        {/* End Container */}

        {/* Container Username */}
        <Grid container spacing={3} alignItems="center">
          {/* Title */}
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Username</h5>
          </Grid>
          {/* End Title */}

          {/* TextField */}
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Please enter username."
              size="small"
              variant="outlined"
              name="userName"
              value={this.state.search.userName}
              onBlur={(userName) => this.saveData(userName)}
            />
          </Grid>
          {/* End TextField */}
        </Grid>
        {/* End Container */}

        {/* Container Date */}
        <Grid container spacing={3} alignItems="center">
          {/* Title */}
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Date</h5>
          </Grid>
          {/* End Title */}

          {/* Dates */}
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="startDate"
              defaultValue={moment(
                this.state.search.startDate,
                "YYYY-MM-DDTHH:mm:ssZ"
              ).format("YYYY-MM-DD")}
              onBlur={(startDate) => this.saveData(startDate)}
              // onChange={(e) => this.onChangeDate(e, 'startDate')}
            />
          </Grid>
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              type="date"
              name="endDate"
              defaultValue={moment(
                this.state.search.endDate,
                "YYYY-MM-DDTHH:mm:ssZ"
              ).format("YYYY-MM-DD")}
              onBlur={(endDate) => this.saveData(endDate)}
              // onChange={(e) => this.onChangeDate(e, 'endDate')}
            />
          </Grid>
          {/* End Dates */}
        </Grid>
        {/* End Container */}

        {/* Container Status */}
        <Grid container spacing={3} alignItems="center">
          {/* Title */}
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Status</h5>
          </Grid>
          {/* End Title */}

          {/* Select */}
          <Grid item md={2} sm={4} xs={12}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Status"
                name="status"
                onBlur={(status) => this.saveData(status)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="answering">Answering</MenuItem>
                <MenuItem value="answered">Answered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* End Select */}
        </Grid>
        {/* End Container */}

        {/* Container Keyword */}
        <Grid container spacing={3} alignItems="center">
          {/* Title */}
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Keyword</h5>
          </Grid>
          {/* End Title */}

          {/* TextField */}
          <Grid item md={2} xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Please enter keyword."
              size="small"
              variant="outlined"
              name="title"
              value={this.state.search.title}
              onBlur={(title) => this.saveData(title)}
            />
          </Grid>
          {/* End TextField */}
        </Grid>
        {/* End Container */}

        {/* Container Submit */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12}></Grid>
          {/* Button */}
          <Grid item md={2} xs={12}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => this.props.search(this.state.search)}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {/* End Container */}
      </React.Fragment>
    );
  }
}

export default QnaSearch;
