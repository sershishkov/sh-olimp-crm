import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IMask from 'imask';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_WORKER } from '../../../store/actions/accountant/referenceData/worker';

import { getAll_TYPE_OF_SETTLEMENTS } from '../../../store/actions/accountant/referenceData/typeOf_Settlement';
import { getAll_CITYS } from '../../../store/actions/accountant/referenceData/city';
import { getAll_TYPE_OF_STREETS } from '../../../store/actions/accountant/referenceData/typeOf_Street';
import { getAll_STREETS } from '../../../store/actions/accountant/referenceData/street';

import { getAll_OBLASTS } from '../../../store/actions/accountant/referenceData/oblast';
import { getAll_RAYONS } from '../../../store/actions/accountant/referenceData/rayon';

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
  },
  dateField: {}
}));

const Worker_Add = ({
  setNameOfPage,
  add_WORKER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,

  getAll_OBLASTS,
  getAll_RAYONS,

  state_typeOf_Settlement: { arr_TYPE_OF_SETTLEMENTS },
  state_city: { arr_CITYS },
  state_typeOf_Street: { arr_TYPE_OF_STREETS },
  state_street: { arr_STREETS },

  state_oblast: { arr_OBLASTS },
  state_rayon: { arr_RAYONS }
}) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/worker');
  };

  const [pageForm, setPageForm] = useState({
    surname: '',
    name: '',
    middleName: '',
    dateOf_Birth: '',
    postCode: '',

    oblast: '5e808f28376cba45cb4f131f',
    rayon: '5e808f36376cba45cb4f1320',

    typeOf_settlement: '',
    city: '',
    typeOf_street: '',
    street: '',
    numberOf_house: '',
    numberOf_app: '',
    individualTaxNumber: '',
    phoneNumber: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    surname,
    name,
    middleName,
    dateOf_Birth,
    postCode,

    oblast,
    rayon,

    typeOf_settlement,
    city,
    typeOf_street,
    street,
    numberOf_house,
    numberOf_app,
    individualTaxNumber,
    phoneNumber
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Создать работника');
    getAll_TYPE_OF_SETTLEMENTS();
    getAll_CITYS();
    getAll_TYPE_OF_STREETS();
    getAll_STREETS();

    getAll_OBLASTS();
    getAll_RAYONS();
  }, [
    setNameOfPage,
    getAll_TYPE_OF_SETTLEMENTS,
    getAll_CITYS,
    getAll_TYPE_OF_STREETS,
    getAll_STREETS,

    getAll_OBLASTS,
    getAll_RAYONS
  ]);

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
        // numberOf_app &&
        individualTaxNumber &&
        phoneNumber
      )
    );
  };

  const onInputPhoneHandler = e => {
    const inputMaskOptions = {
      mask: '+{38}(000)000-00-00'
    };

    IMask(e.target, inputMaskOptions);
  };

  const addItemHandler = () => {
    add_WORKER(
      surname,
      name,
      middleName,
      dateOf_Birth,
      postCode,

      oblast,
      rayon,

      typeOf_settlement,
      city,
      typeOf_street,
      street,
      numberOf_house,
      numberOf_app,
      individualTaxNumber,
      phoneNumber
    );
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
          <Typography align='left'>Фамилия</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='surname'
            fullWidth
            placeholder='Введите фамилию'
            type='text'
            value={surname}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Имя</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='name'
            fullWidth
            placeholder='Введите имя'
            type='text'
            value={name}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Отчество</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='middleName'
            fullWidth
            placeholder='Введите отчество'
            type='text'
            value={middleName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Дата рождения</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            type='date'
            variant='outlined'
            name='dateOf_Birth'
            fullWidth
            value={dateOf_Birth}
            onChange={e => onChangeHandler(e)}
            className={classes.dateField}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Индекс</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='postCode'
            fullWidth
            placeholder='Введите индекс'
            type='text'
            value={postCode}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Область</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_OBLASTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-oblast'
                className={oblast ? classes.displayNone : classes.displayFlex}
              >
                Область
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-oblast'
                fullWidth
                value={oblast}
                name='oblast'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_OBLASTS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.oblastName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/oblast/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Район</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_RAYONS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-rayon'
                className={rayon ? classes.displayNone : classes.displayFlex}
              >
                Район
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-rayon'
                fullWidth
                value={rayon}
                name='rayon'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_RAYONS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.rayonName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/rayon/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>ТипНасПункта</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                value={typeOf_settlement}
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
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/type-of-settlement/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Город</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                value={city}
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
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/city/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Тип улицы</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                value={typeOf_street}
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
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/type-of-street/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Улица</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                value={street}
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
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/street/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Номер дома</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='numberOf_house'
            fullWidth
            placeholder='Дом№_'
            type='text'
            value={numberOf_house}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Номер квартиры</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='numberOf_app'
            fullWidth
            placeholder='Кв.№_'
            type='text'
            value={numberOf_app}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>ИНН</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='individualTaxNumber'
            fullWidth
            placeholder='ИНН'
            type='number'
            value={individualTaxNumber}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Телефон</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            id='pnoneNumber'
            variant='outlined'
            name='phoneNumber'
            fullWidth
            placeholder='телефон'
            type='tel'
            value={phoneNumber}
            onInput={e => onInputPhoneHandler(e)}
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

Worker_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_WORKER: PropTypes.func.isRequired,

  getAll_TYPE_OF_SETTLEMENTS: PropTypes.func.isRequired,
  getAll_CITYS: PropTypes.func.isRequired,
  getAll_TYPE_OF_STREETS: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,

  getAll_OBLASTS: PropTypes.func.isRequired,
  getAll_RAYONS: PropTypes.func.isRequired,

  state_typeOf_Settlement: PropTypes.object.isRequired,
  state_city: PropTypes.object.isRequired,
  state_typeOf_Street: PropTypes.object.isRequired,
  state_street: PropTypes.object.isRequired,

  state_oblast: PropTypes.object.isRequired,
  state_rayon: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_typeOf_Settlement: state.typeOf_Settlement,
  state_city: state.city,
  state_typeOf_Street: state.typeOf_Street,
  state_street: state.street,

  state_oblast: state.oblast,
  state_rayon: state.rayon
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_WORKER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,
  getAll_OBLASTS,
  getAll_RAYONS
})(Worker_Add);
