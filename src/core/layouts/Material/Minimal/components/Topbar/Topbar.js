import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

/**
 * @template useStyles
 */
const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  white: {
    color: "white" 
  }
}));

/**
 * @const Topbar
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package core/layouts/minimal/components
 */
const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  /**
   * @override
   */
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography variant="h3" component="h2" className={classes.white}>
            아니벌써
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
