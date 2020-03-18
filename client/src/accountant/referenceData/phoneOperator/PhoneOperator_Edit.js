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
  getOneOperatorCode,
  updateOperatorCode
} from '../../../store/actions/accountant/referenceData/phoneOperator';

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
  getOneOperatorCode,
  updateOperatorCode,
  phoneOperator: { oneOperatorCode, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/phone-operator');
  };

  const [operatorCode, setOperatorCode] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать код оператора');
    getOneOperatorCode(id);
  }, [setNameOfPage, getOneOperatorCode, id]);

  useLayoutEffect(() => {
    if (oneOperatorCode) {
      setOperatorCode(oneOperatorCode.operatorCode);
    }
  }, [oneOperatorCode]);

  const onChangeHandler = e => {
    setOperatorCode(e.target.value);
    setDisabledForm(!operatorCode);
  };

  const updateItemHandler = () => {
    updateOperatorCode(id, operatorCode);
    history.push('/accountant/phone-operator');
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
          name='operatorCode'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={operatorCode ? operatorCode : ''}
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
  getOneOperatorCode: PropTypes.func.isRequired,
  updateOperatorCode: PropTypes.func.isRequired,
  phoneOperator: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  phoneOperator: state.phoneOperator
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOneOperatorCode,
  updateOperatorCode
})(TypeOf_Unit_Edit);
