import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IMask from 'imask';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_OUR_FIRM,
  update_OUR_FIRM
} from '../../../store/actions/accountant/referenceData/ourFirm';

import { getAll_TYPE_OF_FIRMS } from '../../../store/actions/accountant/referenceData/typeOf_Firm';
import { getAll_FIRST_PERSON_POSITIONS } from '../../../store/actions/accountant/referenceData/firstPersonPosition';
import { getAll_TYPE_OF_ACTS_ON_BASIS_OFS } from '../../../store/actions/accountant/referenceData/typeOf_ActsOnBasisOf';
import { getAll_TYPE_OF_TAX_PAYER_ONS } from '../../../store/actions/accountant/referenceData/typeOf_TaxPayerOn';

import { getAll_TYPE_OF_SETTLEMENTS } from '../../../store/actions/accountant/referenceData/typeOf_Settlement';
import { getAll_CITYS } from '../../../store/actions/accountant/referenceData/city';
import { getAll_TYPE_OF_STREETS } from '../../../store/actions/accountant/referenceData/typeOf_Street';
import { getAll_STREETS } from '../../../store/actions/accountant/referenceData/street';

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

const OurFirm_Edit = ({
  setNameOfPage,
  getOne_OUR_FIRM,
  update_OUR_FIRM,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,

  getAll_TYPE_OF_FIRMS,
  getAll_FIRST_PERSON_POSITIONS,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  getAll_TYPE_OF_TAX_PAYER_ONS,
  getAll_GROUP_OF_PRODUCTS,

  state_typeOf_Settlement: { arr_TYPE_OF_SETTLEMENTS },
  state_city: { arr_CITYS },
  state_typeOf_Street: { arr_TYPE_OF_STREETS },
  state_street: { arr_STREETS },

  state_typeOf_Firm: { arr_TYPE_OF_FIRMS },
  state_firstPersonPosition: { arr_FIRST_PERSON_POSITIONS },
  state_typeOf_ActsOnBasisOf: { arr_TYPE_OF_ACTS_ON_BASIS_OFS },
  state_typeOf_TaxPayerOn: { arr_TYPE_OF_TAX_PAYER_ONS },
  state_ourFirm: { one_OUR_FIRM }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/our-firm');
  };

  const [pageForm, setPageForm] = useState({
    firmName: '',
    typeOfFirm: '',
    postCode: '',
    typeOf_settlement: '',
    city: '',
    typeOf_street: '',
    street: '',
    numberOf_house: '',
    numberOf_app: '',
    EDRPOU: '',
    iban: '',
    firstPersonPosition: '',
    firstPersonSurname: '',
    firstPersonName: '',
    firstPersonMiddleName: '',
    firstPersonSurnameRoditelPadej: '',
    firstPersonNameRoditelPadej: '',
    firstPersonMiddleNameRoditelPadej: '',
    shortName: '',
    actsOnBasisOf: '',
    issuedBy: '',
    taxPayerOn: '',
    email: '',
    phoneNumber: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    firmName,
    typeOfFirm,
    postCode,
    typeOf_settlement,
    city,
    typeOf_street,
    street,
    numberOf_house,
    numberOf_app,
    EDRPOU,
    iban,
    firstPersonPosition,
    firstPersonSurname,
    firstPersonName,
    firstPersonMiddleName,
    firstPersonSurnameRoditelPadej,
    firstPersonNameRoditelPadej,
    firstPersonMiddleNameRoditelPadej,
    shortName,
    actsOnBasisOf,
    issuedBy,
    taxPayerOn,
    email,
    phoneNumber
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Редактировать нашу фирму');
    getOne_OUR_FIRM(id);

    getAll_TYPE_OF_SETTLEMENTS();
    getAll_CITYS();
    getAll_TYPE_OF_STREETS();
    getAll_STREETS();

    getAll_TYPE_OF_FIRMS();
    getAll_FIRST_PERSON_POSITIONS();
    getAll_TYPE_OF_ACTS_ON_BASIS_OFS();
    getAll_TYPE_OF_TAX_PAYER_ONS();
  }, [
    setNameOfPage,
    getAll_TYPE_OF_SETTLEMENTS,
    getAll_CITYS,
    getAll_TYPE_OF_STREETS,
    getAll_STREETS,
    getAll_TYPE_OF_FIRMS,
    getAll_FIRST_PERSON_POSITIONS,
    getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
    getAll_TYPE_OF_TAX_PAYER_ONS,

    getOne_OUR_FIRM,
    id
  ]);

  useLayoutEffect(() => {
    if (one_OUR_FIRM) {
      setPageForm({
        ...pageForm,
        firmName: one_OUR_FIRM.firmName,
        typeOfFirm: one_OUR_FIRM.typeOfFirm,
        postCode: one_OUR_FIRM.postCode,
        typeOf_settlement: one_OUR_FIRM.typeOf_settlement,
        city: one_OUR_FIRM.city,
        typeOf_street: one_OUR_FIRM.typeOf_street,
        street: one_OUR_FIRM.street,
        numberOf_house: one_OUR_FIRM.numberOf_house,
        numberOf_app: one_OUR_FIRM.numberOf_app,
        EDRPOU: one_OUR_FIRM.EDRPOU,
        iban: one_OUR_FIRM.iban,
        firstPersonPosition: one_OUR_FIRM.firstPersonPosition,
        firstPersonSurname: one_OUR_FIRM.firstPersonSurname,
        firstPersonName: one_OUR_FIRM.firstPersonName,
        firstPersonMiddleName: one_OUR_FIRM.firstPersonMiddleName,
        firstPersonSurnameRoditelPadej:
          one_OUR_FIRM.firstPersonSurnameRoditelPadej,
        firstPersonNameRoditelPadej: one_OUR_FIRM.firstPersonNameRoditelPadej,
        firstPersonMiddleNameRoditelPadej:
          one_OUR_FIRM.firstPersonMiddleNameRoditelPadej,
        shortName: one_OUR_FIRM.shortName,
        actsOnBasisOf: one_OUR_FIRM.actsOnBasisOf,
        issuedBy: one_OUR_FIRM.issuedBy,
        taxPayerOn: one_OUR_FIRM.taxPayerOn,
        email: one_OUR_FIRM.email,
        phoneNumber: one_OUR_FIRM.phoneNumber
      });
    }
  }, [one_OUR_FIRM]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(
      !(
        firmName &&
        typeOfFirm &&
        postCode &&
        typeOf_settlement &&
        city &&
        typeOf_street &&
        street &&
        numberOf_house &&
        numberOf_app &&
        EDRPOU &&
        iban &&
        firstPersonPosition &&
        firstPersonSurname &&
        firstPersonName &&
        firstPersonMiddleName &&
        firstPersonSurnameRoditelPadej &&
        firstPersonNameRoditelPadej &&
        firstPersonMiddleNameRoditelPadej &&
        shortName &&
        actsOnBasisOf &&
        issuedBy &&
        taxPayerOn &&
        email &&
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

  const updateItemHandler = () => {
    update_OUR_FIRM(
      id,
      firmName,
      typeOfFirm,
      postCode,
      typeOf_settlement,
      city,
      typeOf_street,
      street,
      numberOf_house,
      numberOf_app,
      EDRPOU,
      iban,
      firstPersonPosition,
      firstPersonSurname,
      firstPersonName,
      firstPersonMiddleName,
      firstPersonSurnameRoditelPadej,
      firstPersonNameRoditelPadej,
      firstPersonMiddleNameRoditelPadej,
      shortName,
      actsOnBasisOf,
      issuedBy,
      taxPayerOn,
      email,
      phoneNumber
    );
    history.push('/accountant/our-firm');
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
          <Typography align='left'>Вид собственности</Typography>
        </Grid>
        <Grid item xs={8} container>
          {!arr_TYPE_OF_FIRMS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-firm'
                className={
                  typeOfFirm ? classes.displayNone : classes.displayFlex
                }
              >
                Основание собственности
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-firm'
                fullWidth
                value={typeOfFirm}
                name='typeOfFirm'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_FIRMS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.TypeOf_FirmShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Название фирмы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firmName'
            fullWidth
            placeholder='название фирмы'
            type='text'
            value={firmName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Почтовый индекс</Typography>
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
          <Typography align='left'>Тип нас.пункта</Typography>
        </Grid>
        <Grid item xs={8} container>
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
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Город</Typography>
        </Grid>
        <Grid item xs={8} container>
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
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Тип улицы</Typography>
        </Grid>
        <Grid item xs={8} container>
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
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Улица</Typography>
        </Grid>
        <Grid item xs={8} container>
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
          <Typography align='left'>Номер квартиры или офиса</Typography>
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
          <Typography align='left'>ЄДРПОУ</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='EDRPOU'
            fullWidth
            placeholder='ЄДРПОУ'
            type='text'
            value={EDRPOU}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>IBAN</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='iban'
            fullWidth
            placeholder='IBAN'
            type='text'
            value={iban}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Должность первого лица</Typography>
        </Grid>
        <Grid item xs={8} container>
          {!arr_FIRST_PERSON_POSITIONS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-firstPersonPosition'
                className={
                  firstPersonPosition
                    ? classes.displayNone
                    : classes.displayFlex
                }
              >
                Должность
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-firstPersonPosition'
                fullWidth
                value={firstPersonPosition}
                name='firstPersonPosition'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_FIRST_PERSON_POSITIONS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.position}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Фамилия руководителя</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonSurname'
            fullWidth
            placeholder='Введите фамилию'
            type='text'
            value={firstPersonSurname}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Имя руководителя</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonName'
            fullWidth
            placeholder='Введите имя'
            type='text'
            value={firstPersonName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Отчество руководителя</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonMiddleName'
            fullWidth
            placeholder='Введите Отчество'
            type='text'
            value={firstPersonMiddleName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Фамилия руководителя в родит падеже
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonSurnameRoditelPadej'
            fullWidth
            placeholder='Введите фамилию в родительном падеже'
            type='text'
            value={firstPersonSurnameRoditelPadej}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Имя руководителя в родительном падеже
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonNameRoditelPadej'
            fullWidth
            placeholder='Введите имя в родительном падеже'
            type='text'
            value={firstPersonNameRoditelPadej}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Отчество руководителя в родительном падеже
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='firstPersonMiddleNameRoditelPadej'
            fullWidth
            placeholder='Введите Отчество в родительном падеже'
            type='text'
            value={firstPersonMiddleNameRoditelPadej}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>И.О.Фамилия</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='shortName'
            fullWidth
            placeholder='Введите имя'
            type='text'
            value={shortName}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Руководитель действует на основании
          </Typography>
        </Grid>
        <Grid item xs={8} container>
          {!arr_TYPE_OF_ACTS_ON_BASIS_OFS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-actsOnBasisOf'
                className={
                  actsOnBasisOf ? classes.displayNone : classes.displayFlex
                }
              >
                на основании
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-actsOnBasisOf'
                fullWidth
                value={actsOnBasisOf}
                name='actsOnBasisOf'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_ACTS_ON_BASIS_OFS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.actOnBasisOf}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Выдан кем и когда</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='issuedBy'
            fullWidth
            placeholder='Выдан кем и когда'
            type='text'
            value={issuedBy}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Плательщик налогов на основании</Typography>
        </Grid>
        <Grid item xs={8} container>
          {!arr_TYPE_OF_TAX_PAYER_ONS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-taxPayerOn'
                className={
                  taxPayerOn ? classes.displayNone : classes.displayFlex
                }
              >
                м.?
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-taxPayerOn'
                fullWidth
                value={taxPayerOn}
                name='taxPayerOn'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_TAX_PAYER_ONS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.typeOf_TaxPayerOn}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Электронная почта</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='email'
            fullWidth
            placeholder='Дом№_'
            type='email'
            value={email}
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
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

OurFirm_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_OUR_FIRM: PropTypes.func.isRequired,
  update_OUR_FIRM: PropTypes.func.isRequired,

  getAll_TYPE_OF_SETTLEMENTS: PropTypes.func.isRequired,
  getAll_CITYS: PropTypes.func.isRequired,
  getAll_TYPE_OF_STREETS: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,

  getAll_TYPE_OF_FIRMS: PropTypes.func.isRequired,
  getAll_FIRST_PERSON_POSITIONS: PropTypes.func.isRequired,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS: PropTypes.func.isRequired,
  getAll_TYPE_OF_TAX_PAYER_ONS: PropTypes.func.isRequired,

  state_typeOf_Settlement: PropTypes.object.isRequired,
  state_city: PropTypes.object.isRequired,
  state_typeOf_Street: PropTypes.object.isRequired,
  state_street: PropTypes.object.isRequired,

  state_typeOf_Firm: PropTypes.object.isRequired,
  state_firstPersonPosition: PropTypes.object.isRequired,
  state_typeOf_ActsOnBasisOf: PropTypes.object.isRequired,
  state_typeOf_TaxPayerOn: PropTypes.object.isRequired,

  state_ourFirm: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_typeOf_Settlement: state.typeOf_Settlement,
  state_city: state.city,
  state_typeOf_Street: state.typeOf_Street,
  state_street: state.street,

  state_ourFirm: state.ourFirm,

  state_typeOf_Firm: state.typeOf_Firm,
  state_firstPersonPosition: state.firstPersonPosition,
  state_typeOf_ActsOnBasisOf: state.typeOf_ActsOnBasisOf,
  state_typeOf_TaxPayerOn: state.typeOf_TaxPayerOn
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_OUR_FIRM,
  update_OUR_FIRM,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,

  getAll_TYPE_OF_FIRMS,
  getAll_FIRST_PERSON_POSITIONS,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  getAll_TYPE_OF_TAX_PAYER_ONS
})(OurFirm_Edit);
