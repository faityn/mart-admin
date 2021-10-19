import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';

/**
 * @template useStyles
 */
const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

/**
 * @const Topbar
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package core/layouts/minimal/components
 */
const Minimal = props => {
  const { children } = props;

  const classes = useStyles();

  /**
   * @override
   */
  return (
    <div className={classes.root}>
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
