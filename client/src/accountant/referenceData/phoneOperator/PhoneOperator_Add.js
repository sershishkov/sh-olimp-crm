import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { addOperatorCode } from '../../../store/actions/accountant/referenceData/phoneOperator';

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

const TypeOf_Unit_Add = ({ setNameOfPage, addOperatorCode }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/phone-operator');
  };

  const [operatorCode, setOperatorCode] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать код оператора');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setOperatorCode(e.target.value);
    setDisabledForm(!operatorCode);
  };

  const addItemHandler = () => {
    addOperatorCode(operatorCode);
    history.push('/accountant/phone-operator');
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
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          name='operatorCode'
          fullWidth
          placeholder='Введите код'
          type='number'
          value={operatorCode}
          onChange={e => onChangeHandler(e)}
        />
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

TypeOf_Unit_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  addOperatorCode: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  addOperatorCode
})(TypeOf_Unit_Add);
