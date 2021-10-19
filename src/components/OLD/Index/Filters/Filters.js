import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Button
} from '@material-ui/core';

/**
 * @summary Filters
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Index/Filters
 */
class Filters extends Component {	 

  /**
   * @override
   */
	render() {
		return (
			<Card>
        <CardHeader title="Search filter"/>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={2} xs={12}>
              <TextField id="outlined-basic" label="Name" />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField id="outlined-basic" label="Email" />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField id="outlined-basic" label="Location" />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                id="date"
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={1} xs={12}>
              <Button variant="contained" color="primary">Search</Button>
            </Grid>
            <Grid item md={1} xs={12}>
              <Button variant="contained" color="default">Reset</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
		);
	}
}

export default Filters;