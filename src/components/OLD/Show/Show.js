import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import Profile from './Profile/Profile';
import Detail from './Detail/Detail';
import Roles from './Roles/Roles';
import Permissions from './Permissions/Permissions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Show = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <Profile />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <Detail />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={12} md={6} xl={12} xs={12}>
          <Roles />
        </Grid>
        <Grid item lg={12} md={6} xl={12} xs={12}>
          <Permissions />
        </Grid>
      </Grid>
    </div>
  );
};

export default Show;
