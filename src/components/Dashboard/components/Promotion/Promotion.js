import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

/**
 * @const Promotion
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/Dashboard/components
 */
class Promotion extends React.Component {
  /**
   * @constructor
   */
   constructor(props) {
    super(props);

    this.state = {
      totalSeconds: 0,
    };

    this.timerId = null;
    this.startTimer = this.startTimer.bind(this);
    this.renderTimerCountDown = this.renderTimerCountDown.bind(this);
    this.timer = this.timer.bind(this);
  }

  timer() {      
    this.setState({
      totalSeconds: this.state.totalSeconds-1,
    });
  }

  /**
   * @summary Timer
   * @param {Object} endDate
   */
  startTimer(endDate) {
    let now = moment(moment(), "YYYY-MM-DDTHH:mm:ss[Z]");

    this.setState({
      totalSeconds: endDate.diff(now, "seconds"),
    });

    this.timerId = setInterval(this.timer, 1000);
  }

  renderTimerCountDown() {
    let totalSeconds = this.state.totalSeconds;

    let days = Math.floor(totalSeconds / 86400);
    totalSeconds -= days * 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds -= hours * 3600;
    let minutes = Math.floor(totalSeconds / 60);
    totalSeconds -= minutes * 60;
    let seconds = totalSeconds % 60;

    let daysString = (days + "").padStart(2, "0");
    let hoursString = (hours + "").padStart(2, "0");
    let minutesString = (minutes + "").padStart(2, "0");
    let secondsString = (seconds + "").padStart(2, "0");

    if (hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(this.timerId);
    }

    return (
      <React.Fragment>
        {
          days ? <React.Fragment>
            <span>{daysString.substr(0, 1)}</span>
            <span>{daysString.substr(1, 1)}</span> {"days "}
          </React.Fragment>: null
        }
        {hoursString.split("").map((h, i) => (
          <span key={i}>{h}</span>
        ))}{" "}
        : <span>{minutesString.substr(0, 1)}</span>
        <span>{minutesString.substr(1, 1)}</span> :{" "}
        <span>{secondsString.substr(0, 1)}</span>
        <span>{secondsString.substr(1, 1)}</span>
      </React.Fragment>
    );
  }

  /**
   * @override
   */
   componentWillUnmount() {
    clearInterval(this.timerId);
  }

componentDidUpdate(prevProps) {
  if (prevProps != this.props) {
    let now = moment(moment(), "YYYY-MM-DDTHH:mm:ss[Z]");
    let startDate = moment(
      this.props.dashboard.timedealStartDate,
      "YYYY-MM-DDTHH:mm:ss[Z]"
    );
    let endDate = moment(
      this.props.dashboard.timedealEndDate,
      "YYYY-MM-DDTHH:mm:ss[Z]"
    );
  
    if (startDate && endDate && startDate <= now && endDate >= now) {
      this.startTimer(endDate);
    }
  }
}

  /**
   * @override
   */
  render() {

    return <Card
      
    >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
          <Link to="/settings/operation/coupon" style={{color:"#000"}}>
            <Typography
              // className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Coupon
            </Typography>
            </Link>
            {(this.props.dashboard.coupons || []).map((c,i) => 
              <Typography
                color="inherit"
                variant="h6"
                key={i}
              >
                {c}
              </Typography>
            )}
          </Grid>
          <Grid item xs={4}>
          <Link to="/product-timedeal" style={{color:"#000"}}>
            <Typography
              // className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Time deal
            </Typography>
            </Link>
            <Typography
              color="inherit"
              variant="h6"
            >
             {this.renderTimerCountDown()}
            </Typography>
          </Grid>
          <Grid item xs={4}>
          <Link to="/exhibition" style={{color:"#000"}}>
            <Typography
              // className={classes.title}
              color="inherit"
              gutterBottom
              variant="h4"
            >
              Event
            </Typography>
            </Link>
            {(this.props.dashboard.exhibition || []).map((c,i) => 
              <Typography
                color="inherit"
                variant="h6"
                key={i}
              >
                {c}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  };
};

export default Promotion;
