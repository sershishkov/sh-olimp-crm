import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_RAYON } from '../../../store/actions/accountant/referenceData/rayon';

// import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7rem',
    backgroundColor: 'white',
  },
  // buttonBack: {
  //   position: 'fixed',
  //   top: '5rem',
  //   left: 0
  // },
  displayNone: {
    display: 'none',
  },
}));

const Rayon_Add = ({ setNameOfPage, add_RAYON }) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/rayon');
  // };

  const [rayonName, setRayontName] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать район');
  }, [setNameOfPage]);

  const onChangeHandler = (e) => {
    setRayontName(e.target.value);
    setDisabledForm(!rayonName);
  };

  const addItemHandler = () => {
    add_RAYON(rayonName);
    // history.goBack();
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      {/* <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button> */}

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Район</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='rayonName'
            fullWidth
            autoFocus
            placeholder='Введите полное название'
            type='text'
            value={rayonName}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          type='button'
          fullWidth
          disabled={disabledForm}
          variant='contained'
          color='primary'
          className={classes.buttonAdd}
          onClick={() => addItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

Rayon_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_RAYON: PropTypes.func.isRequired,
};

export default connect(null, {
  setNameOfPage,
  add_RAYON,
})(Rayon_Add);
