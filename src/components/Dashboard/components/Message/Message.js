import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { Link } from 'react-router-dom';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

/**
 * @const Message
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard/components
 */
const Message = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  /**
   * @override
   */
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {/* <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Message
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Membership ({props.dashboard.msgMembership})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Item ({props.dashboard.msgItem})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Cancel/Return/Refund ({props.dashboard.msgCancel})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Others ({props.dashboard.msgOthers})
            </Typography>
          </Grid>
        </Grid>
      </CardContent> */}
      
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
          <Link to="/consult-management" style={{color:'#fff'}}>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Message
            </Typography>
            </Link>
            <Typography
              color="inherit"
              variant="h6"
            >
              Membership ({props.dashboard.msgMembership})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Item ({props.dashboard.msgItem})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Cancel/Return/Refund ({props.dashboard.msgCancel})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Others ({props.dashboard.msgOthers})
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
    </Card>
  );
};

Message.propTypes = {
  className: PropTypes.string
};

export default Message;
