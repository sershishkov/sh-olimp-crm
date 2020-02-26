import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
          <Typography variant='h6'>Асфальтные работы</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Фасадные работы</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Внутренние работы</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Кровельные работы</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Установка и замена металлопластиковых окон и дверей
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Изготовление металлоконструкций</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Сантехнические работы</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Аварийно-ремонтные работы</Typography>
        </ListItem>
      </List>
      <Typography variant='h3'>Асфальтные работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>Укладка асфальта</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Установка бордюров и поребриков</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Укладка тротуарной плитки</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Укладка асфальтной крошки</Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Фасадные работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>Утепление стен домов</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Реставрация межпанельных швов</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Ремонт температурных швов</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Реставрация панельных плит</Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Внутренние работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>
            Штукатурные, облицовочные или малярные работы
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Установка стен, различных перегородок, откосов и т.д.
          </Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Электромонтажные работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>замена стояков</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Установка электро-щитков, электросчетчиков, автоматов и т.д.
          </Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Кровельные работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>Мягкая кровля</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Ремонт шиферной кровли</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Замена шифера на профнастил или металлочерепицу{' '}
          </Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>
        Установка и замена металлопластиковых окон и дверей:
      </Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>
            Установка металлопластиковых конструкций любой конфигурации
          </Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Сантехнические работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>
            Установка и замена канализации, водопровода и отопления (из
            пластика){' '}
          </Typography>
        </ListItem>
      </List>

      <Typography variant='h3'>Аварийно-ремонтные работы:</Typography>
      <List>
        <ListItem>
          <Typography variant='h6'>Электросети </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Системы холодной, горячей воды, канализации и отопление{' '}
          </Typography>
        </ListItem>
      </List>
    </Grid>
  );
};

AboutUs.propTypes = {
  setNameOfPage: PropTypes.func.isRequired
};

export default connect(null, { setNameOfPage })(AboutUs);
