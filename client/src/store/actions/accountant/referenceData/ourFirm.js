import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_FIRM,
  UPDATE_OUR_FIRM,
  GET_ALL_OUR_FIRMS,
  GET_ONE_OUR_FIRM,
  DELETE_OUR_FIRM
} from '../../types';

export const getAll_OUR_FIRMS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-firm`);
    dispatch({
      type: GET_ALL_OUR_FIRMS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_FIRM = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/our-firm/${itemId}`);

    dispatch({
      type: GET_ONE_OUR_FIRM,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_FIRM = (
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
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-firm`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_FIRM,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_FIRM = (
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
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-firm/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_FIRM,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_FIRM = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-firm/${itemId}`);
    dispatch({
      type: DELETE_OUR_FIRM,
      payload: itemId
    });
    dispatch(getAll_OUR_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
