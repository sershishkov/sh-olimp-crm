import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_CLIENT,
  UPDATE_CLIENT,
  GET_ALL_CLIENTS,
  GET_ONE_CLIENT,
  DELETE_CLIENT
} from '../../types';

export const getAll_CLIENTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/client`);
    dispatch({
      type: GET_ALL_CLIENTS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_CLIENT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/client/${itemId}`);

    dispatch({
      type: GET_ONE_CLIENT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_CLIENT = (
  firmName,
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
  ibanOwn,
  ibanGazBank,

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
  phoneNumber
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firmName,
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
    ibanOwn,
    ibanGazBank,
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
    phoneNumber
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/client`,
      body,
      config
    );

    dispatch({
      type: SET_CLIENT,
      payload: createdItem.data.data
    });

    dispatch(getAll_CLIENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_CLIENT = (
  itemId,
  firmName,
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
  ibanOwn,
  ibanGazBank,
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
  phoneNumber
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    firmName,
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
    ibanOwn,
    ibanGazBank,
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
    phoneNumber
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/client/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CLIENT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_CLIENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_CLIENT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/client/${itemId}`);
    dispatch({
      type: DELETE_CLIENT,
      payload: itemId
    });
    dispatch(getAll_CLIENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
