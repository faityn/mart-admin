import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Link } from 'react-router-dom';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.info.main,
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
 * @const Affiliate
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard/components
 */
const Affiliate = props => {
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
          <Link to="/settings/operation/affiliate" style={{color:"#fff"}}>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Affiliate Performance
            </Typography>
            </Link>
            <Link to="/settings/operation/affiliate/payment" style={{color:"#fff"}}>
              <Typography
                color="inherit"
                variant="h6"
              >
                Settlement request ({props.dashboard.affliateRequest})
              </Typography>
            </Link>
            <Typography
              color="inherit"
              variant="h6"
            >
              Clicks ({props.dashboard.affliateClicks})
            </Typography>
            <Typography
              color="inherit"
              variant="h6"
            >
              Number of orders ({props.dashboard.affliateOrders})
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Affiliate.propTypes = {
  className: PropTypes.string
};

export default Affiliate;
