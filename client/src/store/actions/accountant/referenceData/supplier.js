import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_SUPPLIER,
  UPDATE_SUPPLIER,
  GET_ALL_SUPPLIERS,
  GET_ONE_SUPPLIER,
  DELETE_SUPPLIER
} from '../../types';

export const getAll_SUPPLIERS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/supplier`);
    dispatch({
      type: GET_ALL_SUPPLIERS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_SUPPLIER = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/supplier/${itemId}`);

    dispatch({
      type: GET_ONE_SUPPLIER,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_SUPPLIER = (
  supplierName,
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
  phoneNumber,
  groupOf_product
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    supplierName,
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
    phoneNumber,
    groupOf_product
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/supplier`,
      body,
      config
    );

    dispatch({
      type: SET_SUPPLIER,
      payload: createdItem.data.data
    });

    dispatch(getAll_SUPPLIERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_SUPPLIER = (
  itemId,
  supplierName,
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
  phoneNumber,
  groupOf_product
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    supplierName,
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
    phoneNumber,
    groupOf_product
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/supplier/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_SUPPLIER,
      payload: updatedItem.data.data
    });

    dispatch(getAll_SUPPLIERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_SUPPLIER = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/supplier/${itemId}`);
    dispatch({
      type: DELETE_SUPPLIER,
      payload: itemId
    });
    dispatch(getAll_SUPPLIERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
