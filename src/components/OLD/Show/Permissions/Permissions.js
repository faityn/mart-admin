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
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Permissions = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
        <CardHeader title="Permissions"/>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid item md={3} xs={12}>
              <FormControl>
                <FormLabel>User</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={true} name="gilad" color="primary"/>}
                    label="User list"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="jason" color="primary"/>}
                    label="User create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="User edit"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="User show"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="User delete"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item md={3} xs={12}>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={true} name="gilad" color="primary"/>}
                    label="Role list"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="jason" color="primary"/>}
                    label="Role create"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="Role edit"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="Role show"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={true} name="antoine" color="primary"/>}
                    label="Role delete"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
};

Permissions.propTypes = {
  className: PropTypes.string
};

export default Permissions;
