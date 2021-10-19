import React from 'react';
import {
  CardContent, 
  Grid,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Button,
  Card,
  LinearProgress,
  TextField
 } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Table
import ProductTable from './Table';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';

/**
 * @summary Application
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order
 */
class Application extends React.Component {

  /**
   * @constructor
   */
  constructor(props){
    super(props);

    // Merge search states
    this.state = { 
      firstCategory: "",
      secondCategory: "",
      thirdCategory: "",
      state: "",
      productName: "",
      keyWord: "",
    }; 
    
    // Bind
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @summary handleChange
   * @param {MouseEvent} event 
   */
  handleChange(event, type) {
    if(type === "firstCategory") {
      this.setState({
        firstCategory: event.target.value
      });
    } else if (type === "secondCategory") {
      this.setState({
        secondCategory: event.target.value
      });
    } else if (type === "thirdCategory") {
      this.setState({
        thirdCategory: event.target.value
      });
    } else if (type === "state") {
      this.setState({
        state: event.target.value
      });
    } else if (type === "productName") {
      this.setState({
        productName: event.target.value
      });
    } else if (type === "keyWord") {
      this.setState({
        keyWord: event.target.value
      });
    }
  };

  /**
   * @override
   */
  render() {
    // if (!this.props.isShowForm)
    //   return <LinearProgress />;

    // if (this.props.isShowForm.totalElements === 0 && this.props.isShowForm.list.length === 0)
    //   return <Grid container spacing={2} className="text-center mt-20">
    //     <Grid item md={12} xs={12}>
    //       <Button size="small" variant="contained" color="default" startIcon={<FlipCameraAndroidIcon />}
    //         onClick={this.props.onChangeRefresh}
    //       >
    //         Refresh
    //       </Button>
    //       <div>
    //         There is no result
    //       </div>
    //     </Grid>
    //   </Grid>;
      
    return ( 
      <CardContent>
        {/* Search filter */}
        <Grid container spacing={3}>
          {/* First category */}
          <Grid item md={4} xs={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">1st category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="1st category"
                onChange={(e) => this.handleChange(e, "firstCategory")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  (this.props.categories.first || []).map((category, index) => 
                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                  ) 
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Second category */}
          <Grid item md={4} xs={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">2nd category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="2nd category"
                onChange={(e) => this.handleChange(e, "secondCategory")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  (this.props.categories.second || []).map((category, index) => 
                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                  ) 
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Third category */}
          <Grid item md={4} xs={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">3rd category</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="3rd category"
                onChange={(e) => this.handleChange(e, "thirdCategory")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  (this.props.categories.third || []).map((category, index) => 
                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                  ) 
                }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* End Search filter */}

        {/* Search word */}
        <Grid container spacing={3} className="mt-20">
          {/* Product name */}
          <Grid item md={4} xs={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">Product name</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="productName"
                onChange={(e) => this.handleChange(e, "productName")}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  (this.props.categories.first || []).map((category, index) => 
                    <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                  ) 
                }
              </Select>
            </FormControl>
          </Grid>

          {/* Keyword */}
          <Grid item md={8} xs={8}>
            <TextField fullWidth id="outlined-basic" size="small" label="Key word" variant="outlined" onChange={(e) => this.handleChange(e, "keyWord")} />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-20">
          <Grid item md={12}>
            <Button 
              variant="contained" 
              size="small" 
              color="primary"
              startIcon={<SearchIcon color="white" size="1rem" />}
              onClick={() => this.props.search(this.state)}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Table */}
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Card className="customListTable mt-20">
              {/* List */}
              <CardContent>
                <PerfectScrollbar>
                  {/* Table */}
                  <ProductTable
                    data={this.props.data} 
                    pagination={this.props.pagination} 
                    orderBy={this.props.orderBy} 
                    handleRowsPerPage={this.props.handleRowsPerPage} 
                    handlePageNumber={this.props.handlePageNumber} 
                    handleOrderByProduct={this.props.handleOrderByProduct}
                    handleChange={this.handleChange.bind(this)}
                    onChangeRefresh={this.props.onChangeRefresh}
                    handleChangeLoad={this.props.handleChangeLoad}
                  />
                </PerfectScrollbar>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* End table */}
      </CardContent>
    );
  }
};

export default Application;
