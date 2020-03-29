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

import { add_FIRST_PERSON_POSITION } from '../../../store/actions/accountant/referenceData/firstPersonPosition';

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

const FirstPersonPosition_Add = ({
  setNameOfPage,
  add_FIRST_PERSON_POSITION
}) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/personposition');
  };

  const [formData, setFormData] = useState({
    position: '',
    positionRoditPadej: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { position, positionRoditPadej } = formData;

  useEffect(() => {
    setNameOfPage('Добавить должность');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(position && positionRoditPadej));
  };

  const addItemHandler = () => {
    add_FIRST_PERSON_POSITION(position, positionRoditPadej);
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
          <Typography align='left'>Должность</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='position'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={position}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Должность в родительном падеже</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='positionRoditPadej'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={positionRoditPadej}
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

FirstPersonPosition_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_FIRST_PERSON_POSITION: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_FIRST_PERSON_POSITION
})(FirstPersonPosition_Add);
