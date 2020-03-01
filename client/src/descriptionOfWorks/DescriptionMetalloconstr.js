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

const DescriptionMetalloconstr = () => {
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
        pageName='Металлоконструкции'
        groupId='5e592a8a2b1bc913154c526d'
      />
      <List>
        <ListItem>
          <Typography variant='h6'>Металлические скамейки</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>Металлические баки</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Металлические ограждения для мусорных баков
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h6'>
            Металлические решетки (продыхи) на вентиляцонные отверстия
          </Typography>
        </ListItem>
      </List>
    </Grid>
  );
};

export default DescriptionMetalloconstr;
