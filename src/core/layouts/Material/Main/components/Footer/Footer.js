import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  }
}));

/**
 * @const Footer
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package core/layouts/main/components
 */
const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  /**
   * @override
   */
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="https://Khandid.com"
          target="_blank"
        >
          Aniborsso
        </Link>
        {' '} 2021 - 2022
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
