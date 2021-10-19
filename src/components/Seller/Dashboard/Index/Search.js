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
  IconButton,
} from "@material-ui/core";
import { GET_CATEGORIES } from "../../Queries";
import { connect } from "react-redux";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

/**
 * @summary Product search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/index
 */
class ProductSearch extends React.Component {
  /**
   * @constructor
   */
  constructor() {
    super();

    // Default state
    this.state = {
      search: {
        sku: "",
      },
      categories: {
        first: [],
        second: [],
        third: [],
      },
      searchWord: "name",
    };

    // Events
    this.saveData = this.saveData.bind(this);
    this.searchWord = this.searchWord.bind(this);
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
  async componentDidMount() {
    const { data } = await this.props.apolloClient.httpClient.query({
      query: GET_CATEGORIES,
    });

    if (data) {
      this.setState({
        categories: data.categories,
      });
    }
  }

  searchWord(e) {
    this.setState({
      searchWord: e.target.value,
    });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
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

        {/* Category */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Select category</h5>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                First category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="First category"
                name="firstCategory"
                onChange={(e) => this.props.handleCategory(e, 0)}
                value={this.props.search.firstCategory}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {(this.state.categories.first || []).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Second category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Second category"
                name="secondCategory"
                onChange={(e) => this.props.handleCategory(e, 1)}
                value={this.props.search.secondCategory}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {(
                  this.state.categories.second.filter(
                    (f) => f.parentId === this.props.search.firstCategory
                  ) || []
                ).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} xs={12}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Third category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Third category"
                name="thirdCategory"
                onChange={(e) => this.props.handleCategory(e, 2)}
                value={this.props.search.thirdCategory}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {(
                  this.state.categories.third.filter(
                    (f) => f.parentId === this.props.search.secondCategory
                  ) || []
                ).map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Keyword */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={2} xs={12} className="align-items-center">
            <h5>Search word</h5>
          </Grid>
          <Grid item md={2} sm={4} xs={12}>
            <FormControl
              size="small"
              fullWidth
              variant="outlined"
              defaultValue=""
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Select
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.searchWord}
                defaultValue={this.state.searchWord}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="sku">SKU</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={8} xs={12}>
            {this.state.searchWord === "name" ? (
              <TextField
                fullWidth
                label="Please enter search by name."
                size="small"
                variant="outlined"
                name="name"
                onBlur={(name) => this.saveData(name)}
                m={20}
              />
            ) : (
              <TextField
                fullWidth
                label="Please enter search by sku."
                size="small"
                variant="outlined"
                name="sku"
                onBlur={(sku) => this.saveData(sku)}
                m={20}
              />
            )}
          </Grid>
          <Grid item md={1} xs={12}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="primary"
              onClick={() =>
                this.props.searchWord("firstChildsState", this.state)
              }
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default connect(mapStateToProps, null)(ProductSearch);
