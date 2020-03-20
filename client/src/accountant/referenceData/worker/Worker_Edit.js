import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_WORKER,
  update_WORKER
} from '../../../store/actions/accountant/referenceData/worker';

import { getAll_TYPE_OF_SETTLEMENTS } from '../../../store/actions/accountant/referenceData/typeOf_Settlement';
import { getAll_CITYS } from '../../../store/actions/accountant/referenceData/city';
import { getAll_TYPE_OF_STREETS } from '../../../store/actions/accountant/referenceData/typeOf_Street';
import { getAll_STREETS } from '../../../store/actions/accountant/referenceData/street';
import { getAllOperatorCode } from '../../../store/actions/accountant/referenceData/phoneOperator';

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
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 55
    // border: '1px solid red'
  }
}));

const Worker_Edit = ({
  setNameOfPage,
  getOne_WORKER,
  update_WORKER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,
  getAllOperatorCode,
  state_worker: { one_WORKER },
  state_typeOf_Settlement: { arr_TYPE_OF_SETTLEMENTS },
  state_city: { arr_CITYS },
  state_typeOf_Street: { arr_TYPE_OF_STREETS },
  state_street: { arr_STREETS },
  state_phoneOperator: { operatorCodes }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/worker');
  };

  const [pageForm, setPageForm] = useState({
    surname: '',
    name: '',
    middleName: '',
    dateOf_Birth: '',
    postCode: '',
    typeOf_settlement: '',
    city: '',
    typeOf_street: '',
    street: '',
    numberOf_house: '',
    numberOf_app: '',
    individualTaxNumber: '',
    operatorCode: '',
    phoneNumber: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    surname,
    name,
    middleName,
    dateOf_Birth,
    postCode,
    typeOf_settlement,
    city,
    typeOf_street,
    street,
    numberOf_house,
    numberOf_app,
    individualTaxNumber,
    operatorCode,
    phoneNumber
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Редактировать работника');
    getOne_WORKER(id);
    getAll_TYPE_OF_SETTLEMENTS();
    getAll_CITYS();
    getAll_TYPE_OF_STREETS();
    getAll_STREETS();
    getAllOperatorCode();
  }, [
    setNameOfPage,
    getAll_TYPE_OF_SETTLEMENTS,
    getAll_CITYS,
    getAll_TYPE_OF_STREETS,
    getAll_STREETS,
    getAllOperatorCode,
    getOne_WORKER,
    id
  ]);

  useLayoutEffect(() => {
    if (one_WORKER) {
      const oldDate = new Date(one_WORKER.dateOf_Birth);
      const year = oldDate.getFullYear();
      const month =
        oldDate.getMonth() < 10 ? `0${oldDate.getMonth()}` : oldDate.getMonth();
      const day =
        oldDate.getDay() < 10 ? `0${oldDate.getDay()}` : oldDate.getDay();
      const reverceDate = `${year}-${month}-${day}`;

      setPageForm({
        ...pageForm,
        surname: one_WORKER.surname,
        name: one_WORKER.name,
        middleName: one_WORKER.middleName,
        dateOf_Birth: reverceDate,
        postCode: one_WORKER.postCode,
        typeOf_settlement: one_WORKER.typeOf_settlement,
        city: one_WORKER.city,
        typeOf_street: one_WORKER.typeOf_street,
        street: one_WORKER.street,
        numberOf_house: one_WORKER.numberOf_house,
        numberOf_app: one_WORKER.numberOf_app,
        individualTaxNumber: one_WORKER.individualTaxNumber,
        operatorCode: one_WORKER.operatorCode,
        phoneNumber: one_WORKER.phoneNumber
      });
    }
  }, [one_WORKER]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(
      !(
        surname &&
        name &&
        middleName &&
        dateOf_Birth &&
        postCode &&
        typeOf_settlement &&
        city &&
        typeOf_street &&
        street &&
        numberOf_house &&
        numberOf_app &&
        individualTaxNumber &&
        operatorCode &&
        phoneNumber
      )
    );
  };

  const updateItemHandler = () => {
    update_WORKER(
      id,
      surname,
      name,
      middleName,
      dateOf_Birth,
      postCode,
      typeOf_settlement,
      city,
      typeOf_street,
      street,
      numberOf_house,
      numberOf_app,
      individualTaxNumber,
      operatorCode,
      phoneNumber
    );
    history.push('/accountant/worker');
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
        <Grid item xs={3}>
          <TextField
            variant='outlined'
            name='surname'
            fullWidth
            placeholder='Введите фамилию'
            type='text'
            value={surname ? surname : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant='outlined'
            name='name'
            fullWidth
            placeholder='Введите имя'
            type='text'
            value={name ? name : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            variant='outlined'
            name='middleName'
            fullWidth
            placeholder='Введите отчество'
            type='text'
            value={middleName ? middleName : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            type='date'
            variant='outlined'
            name='dateOf_Birth'
            fullWidth
            value={dateOf_Birth ? dateOf_Birth : ''}
            onChange={e => onChangeHandler(e)}
            className={classes.dateField}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={2}>
          <TextField
            variant='outlined'
            name='postCode'
            fullWidth
            placeholder='Введите индекс'
            type='text'
            value={postCode ? postCode : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={1}>
          {!arr_TYPE_OF_SETTLEMENTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-city'
                className={
                  typeOf_settlement ? classes.displayNone : classes.displayFlex
                }
              >
                м.?
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-city'
                fullWidth
                value={typeOf_settlement ? typeOf_settlement : ''}
                name='typeOf_settlement'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_SETTLEMENTS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.typeOf_SettlementShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          {!arr_CITYS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-city'
                className={city ? classes.displayNone : classes.displayFlex}
              >
                город?
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-city'
                fullWidth
                value={city ? city : ''}
                name='city'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_CITYS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.cityName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1}>
          {!arr_TYPE_OF_STREETS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-street'
                className={
                  typeOf_street ? classes.displayNone : classes.displayFlex
                }
              >
                вул.?
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-street'
                fullWidth
                value={typeOf_street ? typeOf_street : ''}
                name='typeOf_street'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_STREETS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.typeOf_StreetShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3}>
          {!arr_STREETS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-street'
                className={street ? classes.displayNone : classes.displayFlex}
              >
                вулиця?
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-street'
                fullWidth
                value={street ? street : ''}
                name='street'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_STREETS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.streetName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1}>
          <TextField
            variant='outlined'
            name='numberOf_house'
            fullWidth
            placeholder='Дом№_'
            type='text'
            value={numberOf_house ? numberOf_house : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            variant='outlined'
            name='numberOf_app'
            fullWidth
            placeholder='Кв.№_'
            type='text'
            value={numberOf_app ? numberOf_app : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={5}>
          <TextField
            variant='outlined'
            name='individualTaxNumber'
            fullWidth
            placeholder='ИНН'
            type='text'
            value={individualTaxNumber ? individualTaxNumber : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={2}>
          {!operatorCodes ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-phone-code'
                className={
                  operatorCode ? classes.displayNone : classes.displayFlex
                }
              >
                тел код
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-phone-code'
                fullWidth
                value={operatorCode ? operatorCode : ''}
                name='operatorCode'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {operatorCodes.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.operatorCode}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant='outlined'
            name='phoneNumber'
            fullWidth
            placeholder='телефон'
            type='text'
            value={phoneNumber ? phoneNumber : ''}
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

Worker_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_WORKER: PropTypes.func.isRequired,
  update_WORKER: PropTypes.func.isRequired,
  getAll_TYPE_OF_SETTLEMENTS: PropTypes.func.isRequired,
  getAll_CITYS: PropTypes.func.isRequired,
  getAll_TYPE_OF_STREETS: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,
  getAllOperatorCode: PropTypes.func.isRequired,

  state_typeOf_Settlement: PropTypes.object.isRequired,
  state_city: PropTypes.object.isRequired,
  state_typeOf_Street: PropTypes.object.isRequired,
  state_street: PropTypes.object.isRequired,
  state_phoneOperator: PropTypes.object.isRequired,
  state_worker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_typeOf_Settlement: state.typeOf_Settlement,
  state_city: state.city,
  state_typeOf_Street: state.typeOf_Street,
  state_street: state.street,
  state_phoneOperator: state.phoneOperator,
  state_worker: state.worker
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_WORKER,
  update_WORKER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,
  getAllOperatorCode
})(Worker_Edit);
