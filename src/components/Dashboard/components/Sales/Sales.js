import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import { Link } from 'react-router-dom';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.warning.main,
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
 * @const Sales
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard/components
 */
const Sales = props => {
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
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
          <Link to="/" style={{color:"#fff"}}>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Sales
            </Typography>
            </Link>
            <Typography
              color="inherit"
              variant="h6"
            >
              7 days
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              30 days
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
