import React from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import DescriptionOf from './components/DescriptionOf_';

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

const DescriptionFasad = () => {
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
      <DescriptionOf
        pageName='Фасадные работы'
        groupId='5e592a5f2b1bc913154c526b'
      />
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
    </Grid>
  );
};

export default DescriptionFasad;
