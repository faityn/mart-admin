import React from 'react';
import { 
  FormControlLabel, 
  TextField, 
  Button, 
  Grid, 
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { countryList } from "./CountryList";

class MemberSearch extends React.Component {

  /**
   * @constructor
   */
  constructor(){
    super();

    // Default state
    this.state = {
      search: {
        "status": "ACTIVE",
        "memberType": [],
        "age": [],
        "gender": [],
        "agreeEmail": false,
        "nation": null,
        "keyword": null,
        "geoLocation": null,
      }
    }

    // Events
    this.saveData = this.saveData.bind(this);
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

  onChangeAgreeEmail() {
    this.setState(
      {
        search: {
          "status": this.state.search.status,
          "memberType": this.state.search.memberType,
          "age": this.state.search.age,
          "gender": this.state.search.gender,
          "agreeEmail": !this.state.search.agreeEmail,
          "nation": this.state.search.nation,
          "keyword": this.state.search.keyword
        }
      }
    )
  }

  handleCheckboxMemberType = event => {
    let newArray = [...this.state.search.memberType, event.target.value];
    if (this.state.search.memberType.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    this.setState({
      search: {
        "status": this.state.search.status,
        "memberType": newArray,
        "age": this.state.search.age,
        "gender": this.state.search.gender,
        "agreeEmail": !this.state.search.agreeEmail,
        "nation": this.state.search.nation,
        "keyword": this.state.search.keyword
      }
    });
  };

  handleCheckboxGender = event => {
    let newArray = [...this.state.search.gender, event.target.value];
    if (this.state.search.gender.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    this.setState({
      search: {
        "status": this.state.search.status,
        "memberType": this.state.search.memberType,
        "age": this.state.search.age,
        "gender": newArray,
        "agreeEmail": !this.state.search.agreeEmail,
        "nation": this.state.search.nation,
        "keyword": this.state.search.keyword
      }
    });
  };

  handleCheckboxAge = event => {
    let newArray = [...this.state.search.age, event.target.value];
    if (this.state.search.age.includes(event.target.value)) {
      newArray = newArray.filter(day => day !== event.target.value);
    }
    this.setState({
      search: {
        "status": this.state.search.status,
        "memberType": this.state.search.memberType,
        "age": newArray,
        "gender": this.state.search.gender,
        "agreeEmail": !this.state.search.agreeEmail,
        "nation": this.state.search.nation,
        "keyword": this.state.search.keyword
      }
    });
  };
  
  render() {
    return <React.Fragment>
      
      {/* Container */}
      <Grid container spacing={3} className="align-items-center">

        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Membership level</h5>
        </Grid>

        {/* Checkbox */}
        <Grid item md={10} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"A"}
                checked={this.state.search.memberType.includes("A")}
                onChange={this.handleCheckboxMemberType.bind(this)}
              />
            }
            label="Class A"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"B"}
                checked={this.state.search.memberType.includes("B")}
                onChange={this.handleCheckboxMemberType.bind(this)}
              />
            }
            label="Class B"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"C"}
                checked={this.state.search.memberType.includes("C")}
                onChange={this.handleCheckboxMemberType.bind(this)}
              />
            }
            label="Class C"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Consent to receive</h5>
        </Grid>
        {/* Title */}
        <Grid item md={4} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                defaultValue={this.state.agreeEmail}
                onChange={this.onChangeAgreeEmail.bind(this)}
              />
            }
            label="Agree to recieve e-mail"
          />
        </Grid>

        {/* Title */}
        <Grid item md={1} xs={6}>
          <h5>Gender</h5>
        </Grid>
        {/* Title */}
        <Grid item md={5} xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="gender"
                color="primary"
                size="small"
                value={"M"}
                checked={this.state.search.gender.includes("M")}
                onChange={this.handleCheckboxGender.bind(this)}
              />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gender"
                color="primary"
                size="small"
                value={"F"}
                checked={this.state.search.gender.includes("F")}
                onChange={this.handleCheckboxGender.bind(this)}
              />
            }
            label="Female"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gender"
                color="primary"
                size="small"
                value={"X"}
                checked={this.state.search.gender.includes("X")}
                onChange={this.handleCheckboxGender.bind(this)}
              />
            }
            label="Prefer not to answer"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Date of birth</h5>
        </Grid>

        <Grid item md={10} xs={10}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"10"}
                checked={this.state.search.age.includes("10")}
                onChange={this.handleCheckboxAge.bind(this)}
              />
            }
            label="10"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"20"}
                checked={this.state.search.age.includes("20")}
                onChange={this.handleCheckboxAge.bind(this)}
              />
            }
            label="20"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"30"}
                checked={this.state.search.age.includes("30")}
                onChange={this.handleCheckboxAge.bind(this)}
              />
            }
            label="30"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"40"}
                checked={this.state.search.age.includes("40")}
                onChange={this.handleCheckboxAge.bind(this)}
              />
            }
            label="40"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                size="small"
                value={"50"}
                checked={this.state.search.age.includes("50")}
                onChange={this.handleCheckboxAge.bind(this)}
              />
            }
            label="50"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Nation</h5>
        </Grid>

        <Grid item md={4} xs={10}>
          <FormControl fullWidth
            size="small" 
            variant="outlined"
          >
            <InputLabel id="demo-simple-select-outlined-label">Nation</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Nation"
              name="nation"
              onBlur={(nation) => this.saveData(nation)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                countryList.map((county) => {
                  return <MenuItem value={county.name}>
                    <em>{county.name}</em>
                  </MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="align-items-center">
        {/* Title */}
        <Grid item md={2} xs={12}>
          <h5>Search keyword</h5>
        </Grid>
        {/* End Title */}
        <Grid item xs={10}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Please search name."
            margin="dense"
            variant="outlined"
            name="name"
            onBlur={(name) => this.saveData(name)}
          />
        </Grid>
        
        <Grid item xs={12} className="text-right">
          <Button size="small" variant="contained" color="primary" onClick={() => this.props.search(this.state.search)}>
            SEARCH
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  }
  
};


export default MemberSearch;