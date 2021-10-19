import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Detail = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Tuguldur',
    lastName: 'Unurtsetseg',
    email: 'oz.toogii@gmail.com',
    phone: '',
    state: 'Ulaanbaatar',
    country: 'MN'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'ulaanbaatar',
      label: 'Ulaanbaatar'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Profile show"/>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.firstName}
                title="First name"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.lastName}
                title="Last name"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.email}
                title="Email address"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.phone}
                title="Phone"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.state}
                title="State"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <CardHeader
                subheader={values.country}
                title="Country"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
    </Card>
  );
};

Detail.propTypes = {
  className: PropTypes.string
};

export default Detail;
