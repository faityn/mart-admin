import React from 'react';
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
  IconButton
} from '@material-ui/core';
import { 
  GET_CATEGORIES_FOR_SEARCH, 
  GET_STICKERS 
} from "../Queries";
import { connect } from 'react-redux';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

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
  constructor(){
    super();

    // Default state
    this.state = {
      search: {
        sku: ""
      },
      categories: {
        first: [],
        second: [],
        third: []
      },
      sticker: '',
      searchWord: "name",
    }

    // Events
    this.saveData = this.saveData.bind(this);
    this.searchWord = this.searchWord.bind(this);
  }

  /**
   * @summary saveData
   * @param {String} e 
   */
  saveData(e){
    let search = this.state.search;
    let name = e.target.name; 
    let value = e.target.value;
    search[name] = value;

    this.setState({search})
  }

  /**
   * @override
   */
  async componentDidMount() {
    const { data } = await this.props.apolloClient.httpClient.query({
      query: GET_CATEGORIES_FOR_SEARCH
    });

    if (data) {
      this.setState({
        categories: data.categories
      });
    }

    if (data) {
      this.setState({
        sticker: data.getStickers
      });
    }
  }

  searchWord(e) {
    this.setState({
      searchWord: e.target.value
    });
  }
  
  /**
   * @override
   */
  render() {
    console.log(this.props);
    let sticker = this.props.search.sticker ? this.props.search.sticker : [];

    return <React.Fragment>

      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Checkbox */}
        <Grid item md={12} xs={12} className="text-right">   
          <IconButton color="primary" aria-label="Reset" onClick={(e) => this.props.onReset(e)}>
            <RotateLeftIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Search word</h5>
        </Grid>
        {/* End Title */}

        {/* Select */}
        <Grid item md={2} sm={4} xs={12}>
          <FormControl size="small" fullWidth variant="outlined" defaultValue="">
            <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              onChange={this.searchWord}
              defaultValue={this.state.searchWord}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="sku">sku</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* End Select */}

        {/* TextField */}
        <Grid item md={6} sm={8} xs={12}>
          {this.state.searchWord === "name" ? 
            <TextField fullWidth
              label="Please enter search by name."
              size="small"
              variant="outlined"
              name="name" 
              onBlur={(name) => this.saveData(name)}
              m={20}
            />
          :
            <TextField fullWidth
              label="Please enter search by sku."
              size="small"
              variant="outlined"
              name="sku" 
              onBlur={(sku) => this.saveData(sku)}
              m={20}
            />
          }
        </Grid>
        {/* End TextField */}

        {/* Button */}
        <Grid item md={1} xs={12}>
          <Button fullWidth size="small" variant="contained" color="primary" onClick={() => this.props.searchWord("firstChildsState", this.state)}>
            Search
          </Button>
        </Grid>
      </Grid>
      {/* End Container */}

      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Box */}
        <Box mt={10} display={{ sm: 'block', md: 'none' }} />
        {/* End Box */}

        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Display function</h5>
        </Grid>
        {/* End title */}

        {/* Checkbox */}
        <Grid item md={4} xs={12}>
          {/* All */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.isDisplay === null ? true : false}
                onChange={(event) => this.props.handleDisplay(event)}
              />
            }
            label="All"
          />
          {/* End All */}

          {/* On display */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.isDisplay === "true" ? true : false}
                onChange={(event) => this.props.handleDisplay(event)}
                value="true"
              />
            }
            label="On display"
          />
          {/* End On display */}

          {/* No display */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.isDisplay === "false" ? true : false}
                onChange={(event) => this.props.handleDisplay(event)}
                value="false"
              />
            }
            label="No display"
          />
          {/* End No Display */}
        </Grid>
        {/* End Checkbox */}

        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Registrant</h5>
        </Grid>
        {/* End Title */}

        {/* Checkbox */}
        <Grid item md={4} xs={12}>
          
          {/* All */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.registrant === "" ? true : false}
                onChange={(event) => this.props.handleRegistrant(event)}
                value=""
              />
            }
            label="All"
          />
          {/* End All */}

          {/* Sazaxa */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.registrant === "SAZAXA" ? true : false}
                onChange={(event) => this.props.handleRegistrant(event)}
                value="SAZAXA"
              />
            }
            label="Sazaxa"
          />
          {/* End Sazaxa */}

          {/* Seller */}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={this.props.search.registrant === "SELLER" ? true : false}
                onChange={(event) => this.props.handleRegistrant(event)}
                value="SELLER"
              />
            }
            label="Seller"
          />
          {/* End Seller */}
        </Grid>
        {/* End Checkbox */}
      </Grid>
      {/* End Container */}
      
      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Select category</h5>
        </Grid>
        {/* End Title */}

        {/* Select */}
        <Grid item md={3} xs={12}>
          {/* First category */}
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">First category</InputLabel>
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
              {
                (this.state.categories.first || []).map((category, index) => 
                  <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                ) 
              }
            </Select>
          </FormControl>
          {/* End First category */}
        </Grid>
        {/* End Select */}

        {/* Select */}
        <Grid item md={3} xs={12}>
          {/* Second category */}
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Second category</InputLabel>
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
              {
                (this.state.categories.second.filter(f => f.parentId === this.props.search.firstCategory) || []).map((category, index) => 
                  <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                ) 
              }
            </Select>
          </FormControl>
          {/* End Second category */}
        </Grid>
        {/* Select */}

        {/* End Select */}
        <Grid item md={3} xs={12}>
          {/* Third category */}
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">Third category</InputLabel>
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
              {
                 (this.state.categories.third.filter(f => f.parentId === this.props.search.secondCategory) || []).map((category, index) => 
                  <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                )
              }
            </Select>
          </FormControl>
          {/* End Third category */}
        </Grid>
        {/* End Select */}
      </Grid>
      {/* End Container */}
      
      {/* Container */}
      <Grid container spacing={3} alignItems="center">
        {/* Title */}
        <Grid item md={2} xs={12} className="align-items-center">
          <h5>Sticker</h5>
        </Grid>
        {/* End Title */}

        {/* Checkbox */}
        <Grid item md={8} xs={12}>
          

          {(this.state.sticker || []).map(item => (
            <FormControlLabel key={item.id}
              control={
                <Checkbox
                  color="primary"
                  checked={sticker.indexOf(item.id) !== -1}
                  onChange={(event) => this.props.handleSticker(event, item.id)}
                  value="true"
                />
              }
              label={item.name}
            />
          ))}
        </Grid>
        {/* Checkbox */}
      </Grid>
      {/* End Container */}
    </React.Fragment>;
  }
};

// Redux state to props
const mapStateToProps = state => {
  return {
    apolloClient: state.apolloClient
  }
}

export default connect(mapStateToProps, null)(ProductSearch);
