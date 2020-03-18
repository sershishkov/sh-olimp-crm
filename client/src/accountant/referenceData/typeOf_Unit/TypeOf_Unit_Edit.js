import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_TYPE_OF_UNIT,
  update_TYPE_OF_UNIT
} from '../../../store/actions/accountant/referenceData/typeOf_Unit';

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

const TypeOf_Unit_Edit = ({
  setNameOfPage,
  getOne_TYPE_OF_UNIT,
  update_TYPE_OF_UNIT,
  typeOf_Unit: { one_TYPE_OF_UNIT, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-unit');
  };

  const [typeOf_Unit, setTypeOf_Unit] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать группу едениц измерения');
    getOne_TYPE_OF_UNIT(id);
  }, [setNameOfPage, getOne_TYPE_OF_UNIT, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_UNIT) {
      setTypeOf_Unit(one_TYPE_OF_UNIT.typeOf_Unit);
    }
  }, [one_TYPE_OF_UNIT]);

  const onChangeHandler = e => {
    setTypeOf_Unit(e.target.value);
    setDisabledForm(!typeOf_Unit);
  };

  const updateItemHandler = () => {
    update_TYPE_OF_UNIT(id, typeOf_Unit);
    history.push('/accountant/type-of-unit');
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
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          name='typeOf_Unit'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={typeOf_Unit ? typeOf_Unit : ''}
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
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

TypeOf_Unit_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_UNIT: PropTypes.func.isRequired,
  update_TYPE_OF_UNIT: PropTypes.func.isRequired,
  typeOf_Unit: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_Unit: state.typeOf_Unit
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_UNIT,
  update_TYPE_OF_UNIT
})(TypeOf_Unit_Edit);
