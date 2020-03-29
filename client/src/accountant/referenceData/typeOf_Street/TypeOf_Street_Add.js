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

import { add_TYPE_OF_STREET } from '../../../store/actions/accountant/referenceData/typeOf_Street';

// import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7rem'
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0
  },
  displayNone: {
    display: 'none'
  }
}));

const TypeOf_Street_Add = ({ setNameOfPage, add_TYPE_OF_STREET }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-street');
  };

  const [formData, setFormData] = useState({
    typeOf_StreetLong: '',
    typeOf_StreetShort: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { typeOf_StreetLong, typeOf_StreetShort } = formData;

  useEffect(() => {
    setNameOfPage('Добавить тип улицы');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(typeOf_StreetLong && typeOf_StreetShort));
  };

  const addItemHandler = () => {
    add_TYPE_OF_STREET(typeOf_StreetLong, typeOf_StreetShort);
    history.goBack();
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Полное название типа улицы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_StreetLong'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_StreetLong}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Сокращенное название типа улицы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_StreetShort'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_StreetShort}
            onChange={e => onChangeHandler(e)}
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

TypeOf_Street_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_STREET: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_STREET
})(TypeOf_Street_Add);
