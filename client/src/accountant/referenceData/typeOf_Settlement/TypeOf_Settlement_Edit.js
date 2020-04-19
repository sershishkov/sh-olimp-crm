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
  getOne_TYPE_OF_SETTLEMENT,
  update_TYPE_OF_SETTLEMENT
} from '../../../store/actions/accountant/referenceData/typeOf_Settlement';

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

const TypeOf_Street_Edit = ({
  setNameOfPage,
  getOne_TYPE_OF_SETTLEMENT,
  update_TYPE_OF_SETTLEMENT,
  typeOf_Settlement: { one_TYPE_OF_SETTLEMENT, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/type-of-settlement');
  };

  const [formData, setFormData] = useState({
    typeOf_SettlementLong: '',
    typeOf_SettlementShort: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { typeOf_SettlementLong, typeOf_SettlementShort } = formData;

  useEffect(() => {
    setNameOfPage('Редактировать тип населенного пункта');
    getOne_TYPE_OF_SETTLEMENT(id);
  }, [setNameOfPage, getOne_TYPE_OF_SETTLEMENT, id]);

  useLayoutEffect(() => {
    if (one_TYPE_OF_SETTLEMENT) {
      setFormData({
        ...FormData,
        typeOf_SettlementLong: one_TYPE_OF_SETTLEMENT.typeOf_SettlementLong,
        typeOf_SettlementShort: one_TYPE_OF_SETTLEMENT.typeOf_SettlementShort
      });
    }
  }, [one_TYPE_OF_SETTLEMENT]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(typeOf_SettlementLong || typeOf_SettlementShort));
  };

  const updateItemHandler = () => {
    update_TYPE_OF_SETTLEMENT(
      id,
      typeOf_SettlementLong,
      typeOf_SettlementShort
    );
    history.push('/accountant/type-of-settlement');
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
          <Typography align='left'>Полное название типа города</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_SettlementLong'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_SettlementLong ? typeOf_SettlementLong : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Сокращенное название типа города</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='typeOf_SettlementShort'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={typeOf_SettlementShort ? typeOf_SettlementShort : ''}
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

TypeOf_Street_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_TYPE_OF_SETTLEMENT: PropTypes.func.isRequired,
  update_TYPE_OF_SETTLEMENT: PropTypes.func.isRequired,
  typeOf_Settlement: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOf_Settlement: state.typeOf_Settlement
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_TYPE_OF_SETTLEMENT,
  update_TYPE_OF_SETTLEMENT
})(TypeOf_Street_Edit);
