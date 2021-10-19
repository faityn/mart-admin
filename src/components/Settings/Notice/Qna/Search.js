import React from "react";
import {
  Button,
  Grid,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const categories = [
  "Membership",
  "Order/Shipping",
  "Cancel/Return/Refund",
  "Others",
  "Item",
];

/**
 * @summary Qna search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
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
        answerYn: "",
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
  }

  /**
   * @override
   */
  render() {
    console.log(this.state.search)
    return (
      <React.Fragment>
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12}>
            <h5>Status</h5>
          </Grid>
          <Grid item md={10} xs={12}>
            <RadioGroup
              row
              aria-label="type"
              name="answerYn"
              value={this.state.search.answerYn}
              onChange={(answerYn) => this.saveData(answerYn)}
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="All"
              />
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Answered"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="Not answered"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Title</h5>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Please enter keyword."
              size="small"
              variant="outlined"
              name="title"
              defaultValue={this.state.search.title}
              onBlur={(title) => this.saveData(title)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12}></Grid>
          <Grid item md={4} xs={12}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => this.props.search(this.state.search)}
              style={{ marginRight: "10px" }}
            >
              Search
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={(e) => this.props.onReset(e)}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default QnaSearch;
