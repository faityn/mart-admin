import React, { useState } from 'react';
import { useMutation } from "react-apollo";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { gql } from "apollo-boost";

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Profile from './Profile/Profile';

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

// Create user mutation
const CREATE_USER_MUTATION = gql`
  subscription createUser($user: UserInput) {
    createUser(user: $user) {
      lastName
      firstName
      userName
      email
    }
  }
`;

// use custom styles
const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(4)
  },
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

// Tabpanel
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

// tabpanel proptypes
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

/**
 * @summary Create
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Create
 */
export default function Create (props) {

  // const
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  // handlechange
  const handleChange = (event, newValue) => {
    setValue(
      newValue
    );
  };

  // handlechangeIndex
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // use state lastname, firstname, username, email and password
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  // async
  async function createNewUser() {
    await createUser({ variables: { 
      user: { 
        lastName, 
        firstName,
        userName,
        email,
        password,
      }
    } 
  })  
  }

  /**
   * @override
   */
  return (
    <div className={classes.main}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}> 
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

                    {/* username */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        margin="dense"
                        name="username"
                        type="text"
                        variant="outlined"
                        onChange={e => setUserName(e.target.value)}
                      />
                    </Grid>

                    {/* firstname */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        helperText="Please specify the first name"
                        label="First name"
                        margin="dense"
                        name="firstName"
                        variant="outlined"
                        onChange={e => setFirstName(e.target.value)}
                      />
                    </Grid>

                    {/* lastname */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Last name"
                        margin="dense"
                        name="lastName"
                        variant="outlined"
                        onChange={e => setLastName(e.target.value)}
                      />
                    </Grid>

                    {/* email */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        margin="dense"
                        name="email"
                        type="email"
                        variant="outlined"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Grid>

                    {/* password */}
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        margin="dense"
                        type="password"
                        name="password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
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
              <Button onClick={createNewUser} color="primary" variant="contained">
                Create
              </Button>
              <Button color="secondary" variant="contained">
                Back
              </Button>
            </CardActions>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}