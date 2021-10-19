import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

import {
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel
} from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

/**
 * @summary Detail
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Create/Detail
 */
export default function Detail(props) {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(
      newValue
    );
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  /**
   * @override
   */
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Roles" {...a11yProps(1)} />
          <Tab label="Permissions" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  margin="dense"
                  name="firstName"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  margin="dense"
                  name="lastName"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="dense"
                  name="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  margin="dense"
                  name="phone"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Select State"
                  margin="dense"
                  name="state"
                  select
                  // eslint-disable-next-line react/jsx-sort-props
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {states.map(option => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  margin="dense"
                  name="country"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>

        <Grid container spacing={3}>
            <Grid item md={12} xs={12} >
              <FormControl >
                <FormLabel>Role</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox  name="gilad" />}
                    label="Super admin"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12} >
              <FormControl >
                <FormLabel>User</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox  name="gilad" />}
                    label="User create"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="jason" />}
                    label="User edit"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="User show"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="User delete"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12} >
              <FormControl >
                <FormLabel>Role</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox  name="gilad" />}
                    label="Role create"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="jason" />}
                    label="Role edit"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="Role show"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="Role delete"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12} >
              <FormControl >
                <FormLabel>Product</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox  name="gilad" />}
                    label="Product create"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="jason" />}
                    label="Product edit"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="Product show"
                  />
                  <FormControlLabel
                    control={<Checkbox  name="antoine" />}
                    label="Product delete"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
      <CardActions>
        <Button type="submit" color="primary" variant="contained">
          Create
        </Button>
        <Button color="secondary" variant="contained">
          Back
        </Button>
      </CardActions>
    </div>
  );
}