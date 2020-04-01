import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_TYPE_OF_EXPENSE,
  update_TYPE_OF_EXPENSE
} from '../../../store/actions/accountant/referenceData/typeOf_Expense';

import Spinner from '../../../shared/spinner/Spinner';

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

const TypeOf_Expense_Edit = ({
  setNameOfPage,
  getOne_TYPE_OF_EXPENSE,
  update_TYPE_OF_EXPENSE,
  state_typeOf_Expense: { one_TYPE_OF_EXPENSE, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-expense');
  };

  const [typeOf_ExpenseName, setTypeOf_Expense] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать тип затрат');
    getOne_TYPE_OF_EXPENSE(id);
  }, [setNameOfPage, getOne_TYPE_OF_EXPENSE, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_EXPENSE) {
      setTypeOf_Expense(one_TYPE_OF_EXPENSE.typeOf_ExpenseName);
    }
  }, [one_TYPE_OF_EXPENSE]);

  const onChangeHandler = e => {
    setTypeOf_Expense(e.target.value);
    setDisabledForm(!typeOf_ExpenseName);
  };

  const updateItemHandler = () => {
    update_TYPE_OF_EXPENSE(id, typeOf_ExpenseName);
    history.push('/accountant/type-of-expense');
  };

  return loading ? (
    <Spinner />
  ) : (
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
          <Typography align='left'>Группа измерений</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_ExpenseName'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_ExpenseName ? typeOf_ExpenseName : ''}
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
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

TypeOf_Expense_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_EXPENSE: PropTypes.func.isRequired,
  update_TYPE_OF_EXPENSE: PropTypes.func.isRequired,

  state_typeOf_Expense: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_typeOf_Expense: state.typeOf_Expense
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_EXPENSE,
  update_TYPE_OF_EXPENSE
})(TypeOf_Expense_Edit);
