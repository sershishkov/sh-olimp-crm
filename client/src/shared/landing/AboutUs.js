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
      <Typography variant='h3'>
        Компания "Олимп-ДС" предлагает следующие виды работ:
      </Typography>

      <List>
        <ListItem>
          <Button color='inherit' href='/description-asfalt'>
            <Typography variant='h6'>Асфальтные работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-fasad'>
            <Typography variant='h6'>Фасадные работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-inside-works'>
            <Typography variant='h6'>Внутренние работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-roof'>
            <Typography variant='h6'>Кровельные работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-windowpl'>
            <Typography variant='h6'>
              Установка и замена металлопластиковых окон и дверей
            </Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-metall-constr'>
            <Typography variant='h6'>
              Изготовление металлоконструкций
            </Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-santeh'>
            <Typography variant='h6'>Сантехнические работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-emergency'>
            <Typography variant='h6'>Аварийно-ремонтные работы</Typography>
          </Button>
        </ListItem>
        <ListItem>
          <Button color='inherit' href='/description-electro'>
            <Typography variant='h6'>Электро работы</Typography>
          </Button>
        </ListItem>
      </List>
    </Grid>
  );
};

AboutUs.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

export default connect(null, { setNameOfPage })(AboutUs);
