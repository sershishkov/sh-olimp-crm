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
  getOne_TYPE_OF_TAX_PAYER_ON,
  update_TYPE_OF_TAX_PAYER_ON
} from '../../../store/actions/accountant/referenceData/typeOf_TaxPayerOn';

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

const TypeOf_TaxPayerOn_Edit = ({
  getOne_TYPE_OF_TAX_PAYER_ON,
  update_TYPE_OF_TAX_PAYER_ON,
  typeOf_TaxPayerOn: { one_TYPE_OF_TAX_PAYER_ON, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-tax-payer-on');
  };

  const [typeOf_TaxPayerOn, setTypeOf_TaxPayerOn] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать налогооблажение');
    getOne_TYPE_OF_TAX_PAYER_ON(id);
  }, [setNameOfPage, getOne_TYPE_OF_TAX_PAYER_ON, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_TAX_PAYER_ON) {
      setTypeOf_TaxPayerOn(one_TYPE_OF_TAX_PAYER_ON.typeOf_TaxPayerOn);
    }
  }, [one_TYPE_OF_TAX_PAYER_ON]);

  const onChangeHandler = e => {
    setTypeOf_TaxPayerOn(e.target.value);
    setDisabledForm(!typeOf_TaxPayerOn);
  };

  const updateItemHandler = () => {
    update_TYPE_OF_TAX_PAYER_ON(id, typeOf_TaxPayerOn);
    history.push('/accountant/type-of-tax-payer-on');
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
          name='typeOf_TaxPayerOn'
          fullWidth
          placeholder='Введите полное название'
          type='text'
          value={typeOf_TaxPayerOn ? typeOf_TaxPayerOn : ''}
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

TypeOf_TaxPayerOn_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_TAX_PAYER_ON: PropTypes.func.isRequired,
  update_TYPE_OF_TAX_PAYER_ON: PropTypes.func.isRequired,
  typeOf_TaxPayerOn: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_TaxPayerOn: state.typeOf_TaxPayerOn
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_TAX_PAYER_ON,
  update_TYPE_OF_TAX_PAYER_ON
})(TypeOf_TaxPayerOn_Edit);
