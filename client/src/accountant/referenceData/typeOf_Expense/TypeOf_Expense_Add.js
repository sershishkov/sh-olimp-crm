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

import { add_TYPE_OF_EXPENSE } from '../../../store/actions/accountant/referenceData/typeOf_Expense';

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

const TypeOf_Expense_Add = ({ setNameOfPage, add_TYPE_OF_EXPENSE }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.goBack();
  };

  const [typeOf_ExpenseName, setTypeOf_Expense] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать тип затрат');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setTypeOf_Expense(e.target.value);
    setDisabledForm(!typeOf_ExpenseName);
  };

  const addItemHandler = () => {
    add_TYPE_OF_EXPENSE(typeOf_ExpenseName);
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
          <Typography align='left'>Тип затрат</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_ExpenseName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_ExpenseName}
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

TypeOf_Expense_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_EXPENSE: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_EXPENSE
})(TypeOf_Expense_Add);
