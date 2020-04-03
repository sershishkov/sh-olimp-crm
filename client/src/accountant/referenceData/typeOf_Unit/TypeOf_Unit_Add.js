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

import { add_TYPE_OF_UNIT } from '../../../store/actions/accountant/referenceData/typeOf_Unit';

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

const TypeOf_Unit_Add = ({ setNameOfPage, add_TYPE_OF_UNIT }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.goBack();
    // history.push('/accountant/type-of-unit');
  };

  const [typeOf_Unit, setTypeOf_Unit] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Создать группу едениц измерения');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setTypeOf_Unit(e.target.value);
    setDisabledForm(!typeOf_Unit);
  };

  const addItemHandler = () => {
    add_TYPE_OF_UNIT(typeOf_Unit);
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
          <Typography align='left'>Группа измерений</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_Unit'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_Unit}
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

TypeOf_Unit_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_TYPE_OF_UNIT: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  add_TYPE_OF_UNIT
})(TypeOf_Unit_Add);
