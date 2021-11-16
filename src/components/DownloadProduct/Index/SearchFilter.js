import React from 'react';
import { Button, FormControl, FormControlLabel, MenuItem, Select, Grid, TextField, InputLabel, Checkbox, Input, InputAdornment } from '@material-ui/core';


class UsersToolbar extends React.Component {
  
  render() {
    return (
      <Grid container spacing={3} className="grid-lineHeight">
         <Grid item xs={2}>
          <h4>SELECT CATEGORY</h4>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-outlined-label">FIRST CATEGORY</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="FIRST CATEGORY"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-outlined-label">SECOND CATEGORY</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="SECOND CATEGORY"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-outlined-label">THIRD CATEGORY</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="THIRD CATEGORY"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <h4>PRICE</h4>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="standard">
            <Input
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} className="text-center">
          <h4>TO</h4>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="standard">
            <Input
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <h4>DISPLAY</h4>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-outlined-label">ON DISPLAY</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="ON DISPLAY"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={1} className="text-center">
          <h4>STICKER</h4>
        </Grid>
        <Grid item xs={7}>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="PRE ORDER"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="BEST SELLER"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="Aniborsso A CHOICE"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="DISCOUNT"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="OTHERS"
          />
        </Grid>
        
        <Grid item xs={2}>
          <h4>SEARCH WORD</h4>
        </Grid>
        
        <Grid item xs={3}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-outlined-label">PRODUCT NAME</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="PRODUCT NAME"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          <FormControl fullWidth variant="standard">
            <TextField id="standard-basic" label="Please enter your search term." />
          </FormControl>
        </Grid>
        
        <Grid item xs={12} className="text-right">
          <Button size="small" variant="contained" color="primary">
            SEARCH
          </Button>
        </Grid>
      </Grid>
    );
  }
  
};


export default UsersToolbar;
