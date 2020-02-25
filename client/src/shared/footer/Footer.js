import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e0e0e0'
  }
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={4}>
        <Typography component='h1' variant='h5' align='center'>
          Строительная компания
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography component='h1' variant='h5' align='center'>
          ОЛИМП-ДС
        </Typography>
      </Grid>
      <Grid item xs={4} container flexdirextion='column'>
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
    </Grid>
  );
};

export default Footer;
