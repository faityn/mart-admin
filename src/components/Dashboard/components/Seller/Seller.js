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
    backgroundColor: theme.palette.error.main,
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
 * @const Seller
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard/components
 */
const Seller = props => {
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
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              {/* Seller listing */}
              Partner listing
            </Typography>
            <Link to="/partners" style={{color:"#fff"}}>
              <Typography
                color="inherit"
                variant="h6"
              >
                New Subscribers ({props.dashboard.sellerNew})
              </Typography>
            </Link>
            <Link to="/products" style={{color:"#fff"}}>
              <Typography
                color="inherit"
                variant="h6"
              >
                Registration Request ({props.dashboard.sellerRequest})
              </Typography>
            </Link>
            <Link to="/partner/settlement-management" style={{color:"#fff"}}>
            <Typography
              color="inherit"
              variant="h6"
            >
              Warehousing request ({props.dashboard.sellerWarehousing})
            </Typography>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Seller.propTypes = {
  className: PropTypes.string
};

export default Seller;
