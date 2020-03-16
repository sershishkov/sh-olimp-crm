import React from 'react';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const AboutUs = props => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant='h3' align='center' className={classes.header}>
          Компания Олимп-ДС
        </Typography>
        <Typography
          variant='h5'
          align='center'
          className={classes.description_main}
        >
          Наша компания осуществляет услуги по ремонтам для ОСББ, так же мы
          работаем с физическими лицами
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h5'
          align='center'
          className={classes.description_main}
        >
          Основные наши направления:
        </Typography>
        <List>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Асфальтные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Аварийные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Ремонт подъездов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Кровельные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Крыльцо и козырьки подъездов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Высотные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Электромонтажные работы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Изготовление и установка металлоконструкций
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' className={classes.groupOfWork}>
              Сантехнические работы
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Асфальтные работы
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Укладка асфальта
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Установка бордюров и поребриков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Укладка тротуарной плитки
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Укладка асфальтной крошки
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Аварийные работы
        </Typography>
        <List>
          <ListItem>
            <Typography variant='body2' align='center'>
              устранение протекания в трубопроводах ХВП ГВП отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              устранение засоров внутридомовых водопроводных сетей и
              канализационных выпусков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт системы горячего водоснабжения (ГВП)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт системы холодного водоснабжения (ХВП)
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт системы канализации
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт системы отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт сетей электроснабжения дома
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              сварочные работы по ремонту железных труб разного диаметра
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              запуск и консервация системы центрального отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт контактных соединений и проводов в соединительных коробках
              и щитах
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              замена задвижек разного диаметра
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Ремонт подъездов
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Ремонт стен
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Ремонт потолков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Покраска стен и потолков
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Покраска перил
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Замена окон на металлопластиковые
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Замена дверей на металлопластиковые
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Устройство откосов
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Кровельные работы
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт мягкой кровли
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              демонтаж и монтаж покрытия мягкой кровли
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт смотровых окон шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт коньков шиферных крыш
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт и замена водосточной системы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              демонтаж и монтаж кровель на основе металлоцерепицы
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              демонтаж и монтаж кровель на основе профнастила
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Высотные работы
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              Ремонт межпанельных швов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт температурных швов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт панелей дома
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              утепление домов пенопластом
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Электромонтажные работы
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              ремонт и поиск неисправности в электропроводке
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              установка и замена щитового оборудования и его компонентов
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              монтаж и замена вводно-распределительного устройства
              электропроводки осветительной арматуры электрощитовой
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              проверка и ревизия контактных соединений и состояния проводов в
              соединительных и видгалужуных коробках и щитах
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Typography variant='h6' className={classes.groupOfWork}>
          Сантехнические работы
        </Typography>
        <List>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              монтаж и замена трубопроводов и стояков горячего и голодного
              водоснабжения
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              монтаж и замена системы канализации
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              монтаж и замена системы отопления
            </Typography>
          </ListItem>
          <ListItem>
            <Typography
              variant='body2'
              align='center'
              className={classes.descriptionOfWork}
            >
              монтаж и замена задвижек
            </Typography>
          </ListItem>
        </List>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            align='center'
            className={classes.descriptionOfWork}
          >
            связаться с нами:
          </Typography>
        </Grid>

        <Grid
          item
          xs={6}
          container
          flexdirextion='column'
          className={classes.wrapPhonesCont1}
        >
          <Grid item xs={12}>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 098 310 47 99
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 067 618 30 60
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={6}
          container
          flexdirextion='column'
          className={classes.wrapPhonesCont2}
        >
          <Grid item xs={12}>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 099 180 98 04
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='body1'
              align='center'
              className={classes.phones}
            >
              +38 050 227 96 50
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} container justify='space-between' alignItems='center'>
        <Grid item xs={3}>
          <Button href='/' variant='contained' color='primary'>
            Главная
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            href='/request-from-client'
            variant='contained'
            color='primary'
          >
            Оставить Заявку
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button href='/for-osbb' variant='contained' color='primary'>
            Для ОСББ
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button href='/for-individuals' variant='contained' color='primary'>
            Для физ. лиц
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
