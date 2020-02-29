import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e0e0e0'
  }
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Hidden smDown>
        <Grid item md={4}>
          <Typography component='h1' variant='h5' align='center'>
            компания
          </Typography>
        </Grid>
      </Hidden>

      <Grid item sm={12} md={4} xm={12}>
        <Typography component='h1' variant='h5' align='center'>
          ОЛИМП-ДС
        </Typography>
      </Grid>

      <Hidden smDown>
        <Grid item md={4} container flexdirextion='column'>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 098 310 47 99
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 067 618 30 60
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 099 180 98 04
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 050 227 96 50
            </Typography>
          </Grid>
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default Footer;
