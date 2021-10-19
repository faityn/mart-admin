import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    margin: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

/**
 * @summary Profile
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components/Users/Create/Profile
 */
const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    avatar: '/images/avatars/avatar_1.png'
  };

  /**
   * @override
   */
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <Avatar 
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />

      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
