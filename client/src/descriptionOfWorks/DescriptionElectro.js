import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import DescriptionOf_ from './components/DescriptionOf_';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '3rem',
    position: 'relative'
  },
  buttonBack: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  slider: {
    marginBottom: '3rem'
  }
}));

const DescriptionElectro = () => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/aboutus');
  };

  return (
    <Grid className={classes.root}>
      <Button
        onClick={buttonBackHandler}
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>
      <DescriptionOf_
        pageName='Электро-работы'
        groupId='5e592a04879dde1289764868'
      />
      <List>
        <ListItem>
          <Typography variant='h6'>Замена электростояков</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Ремонт Щитков </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Замена автоматов </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Проведение освещения в подъездах и подвалах{' '}
          </Typography>
        </ListItem>
      </List>
    </Grid>
  );
};

export default DescriptionElectro;
