import React from "react";
import {
  FormControlLabel,
  TextField,
  Button,
  Grid,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

class LeaveSearch extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    // Default state
    this.state = {
      search: {
        status: "INACTIVE",
      },
    };

    // Events
    this.saveData = this.saveData.bind(this);
  }

  /**
   * @summary saveData
   * @param {String} e
   */
  saveData(e) {
    let search = this.state.search;
    let name = e.target.name;
    let value = e.target.value;
    search[name] = value;

    this.setState({ search });

    this.props.search(this.state.search);
  }

  render() {
    return (
      <React.Fragment>
        {/* Container */}
        <Grid container spacing={3} className="align-items-center">
          {/* Title */}
          <Grid item md={3} xs={12}>
            <h5>Membership withdrawal settings</h5>
          </Grid>

          {/* Checkbox */}
          <Grid item md={9} xs={12}>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              defaultValue="INACTIVE"
              onChange={(status) => this.saveData(status)}
            >
              <FormControlLabel
                value="INACTIVE"
                control={<Radio color="primary" />}
                label="Temporary deleted"
              />
              <FormControlLabel
                value="DELETED"
                control={<Radio color="primary" />}
                label="Permanently deleted"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LeaveSearch;
