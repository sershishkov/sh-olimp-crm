import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {},
  listItem: {}
}));

const AboutUs = ({ setNameOfPage }) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage('О нас');
  });

  return (
    <Grid className={classes.root}>
      <Typography variant='h3' align='center'>
        Компания "Олимп-ДС" предлагает следующие виды работ:
      </Typography>

      <List>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Асфальтные работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-asfalt'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Фасадные работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-fasad'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Внутренние работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-inside-works'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Кровельные работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-roof'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>
                Металлопластиковые окна и двери
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-windowpl'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>
                Изготовление металлоконструкций
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-metall-constr'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Сантехнические работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-santeh'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Аварийно-ремонтные работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-emergency'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid container justify='space-between'>
            <Grid item xs={10}>
              <Typography variant='h6'>Электро работы</Typography>
            </Grid>
            <Grid item xs={2}>
              <Button
                color='primary'
                size='small'
                variant='contained'
                href='/description-electro'
              >
                подробнее
              </Button>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
};

AboutUs.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

export default connect(null, { setNameOfPage })(AboutUs);
