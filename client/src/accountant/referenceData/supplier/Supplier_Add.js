import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IMask from 'imask';

import Oblast_Add from '../oblast/Oblast_Add';
import Rayon_Add from '../rayon/Rayon_Add';
import TypeOf_Settlement_Add from '../typeOf_Settlement/TypeOf_Settlement_Add';
import City_Add from '../city/City_Add';
import TypeOf_Street_Add from '../typeOf_Street/TypeOf_Street_Add';
import Street_Add from '../street/Street_Add';

import TypeOf_Firm_Add from '../typeOf_Firm/TypeOf_Firm_Add';
import FirstPersonPosition_Add from '../firstPersonPosition/FirstPersonPosition_Add';
import TypeOf_ActsOnBasisOf_Add from '../typeOf_ActsOnBasisOf/TypeOf_ActsOnBasisOf_Add';
import TypeOf_TaxPayerOn_Add from '../typeOf_TaxPayerOn/TypeOf_TaxPayerOn_Add';
import GroupOf_Product_Add from '../groupOf_Product/GroupOf_Product_Add';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_SUPPLIER } from '../../../store/actions/accountant/referenceData/supplier';

import { getAll_TYPE_OF_FIRMS } from '../../../store/actions/accountant/referenceData/typeOf_Firm';
import { getAll_FIRST_PERSON_POSITIONS } from '../../../store/actions/accountant/referenceData/firstPersonPosition';
import { getAll_TYPE_OF_ACTS_ON_BASIS_OFS } from '../../../store/actions/accountant/referenceData/typeOf_ActsOnBasisOf';
import { getAll_TYPE_OF_TAX_PAYER_ONS } from '../../../store/actions/accountant/referenceData/typeOf_TaxPayerOn';
import { getAll_GROUP_OF_PRODUCTS } from '../../../store/actions/accountant/referenceData/groupOf_Product';

import { getAll_TYPE_OF_SETTLEMENTS } from '../../../store/actions/accountant/referenceData/typeOf_Settlement';
import { getAll_CITYS } from '../../../store/actions/accountant/referenceData/city';
import { getAll_TYPE_OF_STREETS } from '../../../store/actions/accountant/referenceData/typeOf_Street';
import { getAll_STREETS } from '../../../store/actions/accountant/referenceData/street';
import { getAll_OBLASTS } from '../../../store/actions/accountant/referenceData/oblast';
import { getAll_RAYONS } from '../../../store/actions/accountant/referenceData/rayon';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7rem',
    backgroundColor: 'white',
  },
  // buttonBack: {
  //   position: 'fixed',
  //   top: '5rem',
  //   left: 0,
  // },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7,
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative',
  },
  select: {
    height: 55,
    // border: '1px solid red'
  },
  dateField: {},
}));

const Supplier_Add = ({
  setNameOfPage,
  add_SUPPLIER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,
  getAll_OBLASTS,
  getAll_RAYONS,

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
  state_groupOf_Product: { arr_GROUP_OF_PRODUCTS },
  state_oblast: { arr_OBLASTS },
  state_rayon: { arr_RAYONS },
}) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/supplier');
  // };

  const [pageForm, setPageForm] = useState({
    supplierName: '',
    typeOfFirm: '',
    postCode: '',
    oblast: '5e808f28376cba45cb4f131f',
    rayon: '5e808f36376cba45cb4f1320',
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
    actsOnBasisOf_Number: '',
    issuedBy: '',
    taxPayerOn: '5e66530d9bd54710d45b1196',
    email: '',
    phoneNumber: '',
    groupOf_product: [],
  });

  const [disabledForm, setDisabledForm] = useState(true);

  const [openOblast_Add, setOpenOblast_Add] = useState(false);
  const [openRayon_Add, setOpenRayon_Add] = useState(false);
  const [openTypeOf_Settlement_Add, setOpenTypeOf_Settlement_Add] = useState(
    false
  );
  const [openCity_Add, setOpenCity_Add] = useState(false);
  const [openTypeOf_Street_Add, setOpenTypeOf_Street_Add] = useState(false);
  const [openStreet_Add, setOpenStreet_Add] = useState(false);

  const [openTypeOf_Firm_Add, setOpenTypeOf_Firm_Add] = useState(false);
  const [
    openFirstPersonPosition_Add,
    setOpenFirstPersonPosition_Add,
  ] = useState(false);
  const [
    openTypeOf_ActsOnBasisOf_Add,
    setOpenTypeOf_ActsOnBasisOf_Add,
  ] = useState(false);
  const [openTypeOf_TaxPayerOn_Add, setOpenTypeOf_TaxPayerOn_Add] = useState(
    false
  );
  const [openGroupOf_Product_Add, setOpenGroupOf_Product_Add] = useState(false);

  const {
    supplierName,
    typeOfFirm,
    postCode,
    oblast,
    rayon,
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
    actsOnBasisOf_Number,
    issuedBy,
    taxPayerOn,
    email,
    phoneNumber,
    groupOf_product,
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Создать поставщика');
    getAll_TYPE_OF_SETTLEMENTS();
    getAll_CITYS();
    getAll_TYPE_OF_STREETS();
    getAll_STREETS();

    getAll_TYPE_OF_FIRMS();
    getAll_FIRST_PERSON_POSITIONS();
    getAll_TYPE_OF_ACTS_ON_BASIS_OFS();
    getAll_TYPE_OF_TAX_PAYER_ONS();
    getAll_GROUP_OF_PRODUCTS();
    getAll_OBLASTS();
    getAll_RAYONS();
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
    getAll_GROUP_OF_PRODUCTS,

    getAll_OBLASTS,
    getAll_RAYONS,
  ]);

  const onChangeHandler = (e) => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(
      !(
        supplierName &&
        typeOfFirm &&
        postCode &&
        typeOf_settlement &&
        city &&
        typeOf_street &&
        street &&
        numberOf_house &&
        // numberOf_app &&
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
        // issuedBy &&
        taxPayerOn &&
        email &&
        phoneNumber &&
        groupOf_product
      )
    );
  };

  const onInputPhoneHandler = (e) => {
    const inputMaskOptions = {
      mask: '+{38}(000)000-00-00',
    };
    IMask(e.target, inputMaskOptions);
  };

  const addItemHandler = () => {
    add_SUPPLIER(
      supplierName,
      typeOfFirm,
      postCode,
      oblast,
      rayon,
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
      actsOnBasisOf_Number,
      issuedBy,
      taxPayerOn,
      email,
      phoneNumber,
      groupOf_product
    );
    // history.goBack();
  };

  const handleOpen_Oblast_Add = () => {
    setOpenOblast_Add(true);
  };
  const handleOpen_Rayon_Add = () => {
    setOpenRayon_Add(true);
  };
  const handleOpen_TypeOf_Settlement_Add = () => {
    setOpenTypeOf_Settlement_Add(true);
  };
  const handleOpen_City_Add = () => {
    setOpenCity_Add(true);
  };
  const handleOpen_TypeOf_Street_Add = () => {
    setOpenTypeOf_Street_Add(true);
  };
  const handleOpen_Street_Add = () => {
    setOpenStreet_Add(true);
  };

  const handleOpen_TypeOf_Firm_Add = () => {
    setOpenTypeOf_Firm_Add(true);
  };
  const handleOpen_FirstPersonPosition_Add = () => {
    setOpenFirstPersonPosition_Add(true);
  };
  const handleOpen_TypeOf_ActsOnBasisOf_Add = () => {
    setOpenTypeOf_ActsOnBasisOf_Add(true);
  };
  const handleOpen_TypeOf_TaxPayerOn_Add = () => {
    setOpenTypeOf_TaxPayerOn_Add(true);
  };
  const handleOpen_GroupOf_Product_Add = () => {
    setOpenGroupOf_Product_Add(true);
  };

  const handleClose_Oblast_Add = () => {
    setOpenOblast_Add(false);
  };
  const handleClose_Rayon_Add = () => {
    setOpenRayon_Add(false);
  };
  const handleClose_TypeOf_Settlement_Add = () => {
    setOpenTypeOf_Settlement_Add(false);
  };
  const handleClose_City_Add = () => {
    setOpenCity_Add(false);
  };
  const handleClose_TypeOf_Street_Add = () => {
    setOpenTypeOf_Street_Add(false);
  };
  const handleClose_Street_Add = () => {
    setOpenStreet_Add(false);
  };

  const handleClose_TypeOf_Firm_Add = () => {
    setOpenTypeOf_Firm_Add(false);
  };
  const handleClose_FirstPersonPosition_Add = () => {
    setOpenFirstPersonPosition_Add(false);
  };
  const handleClose_TypeOf_ActsOnBasisOf_Add = () => {
    setOpenTypeOf_ActsOnBasisOf_Add(false);
  };
  const handleClose_TypeOf_TaxPayerOn_Add = () => {
    setOpenTypeOf_TaxPayerOn_Add(false);
  };
  const handleClose_GroupOf_Product_Add = () => {
    setOpenGroupOf_Product_Add(false);
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      <Modal open={openOblast_Add} onClose={handleClose_Oblast_Add}>
        <Oblast_Add />
      </Modal>
      <Modal open={openRayon_Add} onClose={handleClose_Rayon_Add}>
        <Rayon_Add />
      </Modal>
      <Modal
        open={openTypeOf_Settlement_Add}
        onClose={handleClose_TypeOf_Settlement_Add}
      >
        <TypeOf_Settlement_Add />
      </Modal>
      <Modal open={openCity_Add} onClose={handleClose_City_Add}>
        <City_Add />
      </Modal>
      <Modal
        open={openTypeOf_Street_Add}
        onClose={handleClose_TypeOf_Street_Add}
      >
        <TypeOf_Street_Add />
      </Modal>
      <Modal open={openStreet_Add} onClose={handleClose_Street_Add}>
        <Street_Add />
      </Modal>

      <Modal open={openTypeOf_Firm_Add} onClose={handleClose_TypeOf_Firm_Add}>
        <TypeOf_Firm_Add />
      </Modal>
      <Modal
        open={openFirstPersonPosition_Add}
        onClose={handleClose_FirstPersonPosition_Add}
      >
        <FirstPersonPosition_Add />
      </Modal>
      <Modal
        open={openTypeOf_ActsOnBasisOf_Add}
        onClose={handleClose_TypeOf_ActsOnBasisOf_Add}
      >
        <TypeOf_ActsOnBasisOf_Add />
      </Modal>
      <Modal
        open={openTypeOf_TaxPayerOn_Add}
        onClose={handleClose_TypeOf_TaxPayerOn_Add}
      >
        <TypeOf_TaxPayerOn_Add />
      </Modal>
      <Modal
        open={openGroupOf_Product_Add}
        onClose={handleClose_GroupOf_Product_Add}
      >
        <GroupOf_Product_Add />
      </Modal>

      {/* <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button> */}
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Вид собственности</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_FIRMS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.TypeOf_FirmShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_TypeOf_Firm_Add();
              // history.push('/accountant/type-of-firm/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Название фирмы</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='supplierName'
            fullWidth
            placeholder='название фирмы'
            type='text'
            value={supplierName}
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_OBLASTS.map((item) => (
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
              handleOpen_Oblast_Add();
              // history.push('/accountant/oblast/add');
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_RAYONS.map((item) => (
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
              handleOpen_Rayon_Add();
              // history.push('/accountant/rayon/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Тип нас.пункта</Typography>
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_SETTLEMENTS.map((item) => (
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
              handleOpen_TypeOf_Settlement_Add();
              // history.push('/accountant/type-of-settlement/add');
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_CITYS.map((item) => (
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
              handleOpen_City_Add();
              // history.push('/accountant/city/add');
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_STREETS.map((item) => (
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
              handleOpen_TypeOf_Street_Add();
              // history.push('/accountant/type-of-street/add');
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_STREETS.map((item) => (
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
              handleOpen_Street_Add();
              // history.push('/accountant/street/add');
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Должность первого лица</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_FIRST_PERSON_POSITIONS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.position}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_FirstPersonPosition_Add();
              // history.push('/accountant/personposition/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
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
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>
            Руководитель действует на основании
          </Typography>
        </Grid>
        <Grid item xs={7} container>
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_ACTS_ON_BASIS_OFS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.actOnBasisOf}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_TypeOf_ActsOnBasisOf_Add();
              // history.push('/accountant/type-of-acts-on-basis-of/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Номер свидоства</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='actsOnBasisOf_Number'
            fullWidth
            placeholder='Номер свидоства'
            type='text'
            value={actsOnBasisOf_Number}
            onChange={(e) => onChangeHandler(e)}
          />
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
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Плательщик налогов на основании</Typography>
        </Grid>
        <Grid item xs={7} container>
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_TYPE_OF_TAX_PAYER_ONS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.typeOf_TaxPayerOn}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_TypeOf_TaxPayerOn_Add();
              // history.push('/accountant/type-of-tax-payer-on/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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
            placeholder='Электронная почта_'
            type='email'
            value={email}
            onChange={(e) => onChangeHandler(e)}
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
            onInput={(e) => onInputPhoneHandler(e)}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группы товаров</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_GROUP_OF_PRODUCTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-groupOf_product'
                className={
                  groupOf_product ? classes.displayNone : classes.displayFlex
                }
              >
                Группы товаров
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-groupOf_product'
                fullWidth
                multiple
                value={groupOf_product}
                name='groupOf_product'
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_GROUP_OF_PRODUCTS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.productGroup}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_GroupOf_Product_Add();
              // history.push('/accountant/group-of-product/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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

Supplier_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_SUPPLIER: PropTypes.func.isRequired,

  getAll_TYPE_OF_SETTLEMENTS: PropTypes.func.isRequired,
  getAll_CITYS: PropTypes.func.isRequired,
  getAll_TYPE_OF_STREETS: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,
  getAll_OBLASTS: PropTypes.func.isRequired,
  getAll_RAYONS: PropTypes.func.isRequired,

  getAll_TYPE_OF_FIRMS: PropTypes.func.isRequired,
  getAll_FIRST_PERSON_POSITIONS: PropTypes.func.isRequired,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS: PropTypes.func.isRequired,
  getAll_TYPE_OF_TAX_PAYER_ONS: PropTypes.func.isRequired,
  getAll_GROUP_OF_PRODUCTS: PropTypes.func.isRequired,

  state_typeOf_Settlement: PropTypes.object.isRequired,
  state_city: PropTypes.object.isRequired,
  state_typeOf_Street: PropTypes.object.isRequired,
  state_street: PropTypes.object.isRequired,

  state_typeOf_Firm: PropTypes.object.isRequired,
  state_firstPersonPosition: PropTypes.object.isRequired,
  state_typeOf_ActsOnBasisOf: PropTypes.object.isRequired,
  state_typeOf_TaxPayerOn: PropTypes.object.isRequired,
  state_groupOf_Product: PropTypes.object.isRequired,

  state_oblast: PropTypes.object.isRequired,
  state_rayon: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_typeOf_Settlement: state.typeOf_Settlement,
  state_city: state.city,
  state_typeOf_Street: state.typeOf_Street,
  state_street: state.street,

  state_typeOf_Firm: state.typeOf_Firm,
  state_firstPersonPosition: state.firstPersonPosition,
  state_typeOf_ActsOnBasisOf: state.typeOf_ActsOnBasisOf,
  state_typeOf_TaxPayerOn: state.typeOf_TaxPayerOn,
  state_groupOf_Product: state.groupOf_Product,

  state_oblast: state.oblast,
  state_rayon: state.rayon,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_SUPPLIER,
  getAll_TYPE_OF_SETTLEMENTS,
  getAll_CITYS,
  getAll_TYPE_OF_STREETS,
  getAll_STREETS,
  getAll_OBLASTS,
  getAll_RAYONS,

  getAll_TYPE_OF_FIRMS,
  getAll_FIRST_PERSON_POSITIONS,
  getAll_TYPE_OF_ACTS_ON_BASIS_OFS,
  getAll_TYPE_OF_TAX_PAYER_ONS,
  getAll_GROUP_OF_PRODUCTS,
})(Supplier_Add);
