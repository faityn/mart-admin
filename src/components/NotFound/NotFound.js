import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

/**
 * @template useStyles
 */
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

/**
 * @const NotFound
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package components/NotFound
 */
const NotFound = () => {
  const classes = useStyles();

  /**
   * @override
   */
  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h1">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="http://www.savoirdonner.com/images/ja-wall-404.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;