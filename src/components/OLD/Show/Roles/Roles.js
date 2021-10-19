import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Roles = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Roles"/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={6} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={true}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Super admin"
            />
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
};

Roles.propTypes = {
  className: PropTypes.string
};

export default Roles;
