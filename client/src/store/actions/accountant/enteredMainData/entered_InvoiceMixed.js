import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_ENTERED_INVOICE_MIXED,
  UPDATE_ENTERED_INVOICE_MIXED,
  GET_ALL_ENTERED_INVOICE_MIXEDS,
  GET_ONE_ENTERED_INVOICE_MIXED,
  DELETE_ENTERED_INVOICE_MIXED
} from '../../types';

export const getAll_ENTERED_INVOICE_MIXEDS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/entered-invoice-mixed`);
    dispatch({
      type: GET_ALL_ENTERED_INVOICE_MIXEDS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_ENTERED_INVOICE_MIXED = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/entered-invoice-mixed/${itemId}`
    );

    dispatch({
      type: GET_ONE_ENTERED_INVOICE_MIXED,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_ENTERED_INVOICE_MIXED = (
  invoiceNumber,
  invoiceDate,
  ourFirm,
  client,
  products,
  serviceJobs,
  purposeOf_payment,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    invoiceNumber,
    invoiceDate,
    ourFirm,
    client,
    products,
    serviceJobs,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/entered-invoice-mixed`,
      body,
      config
    );

    dispatch({
      type: SET_ENTERED_INVOICE_MIXED,
      payload: createdItem.data.data
    });

    dispatch(getAll_ENTERED_INVOICE_MIXEDS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_ENTERED_INVOICE_MIXED = (
  itemId,
  invoiceNumber,
  invoiceDate,
  ourFirm,
  client,
  products,
  serviceJobs,
  purposeOf_payment,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    invoiceNumber,
    invoiceDate,
    ourFirm,
    client,
    products,
    serviceJobs,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/entered-invoice-mixed/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ENTERED_INVOICE_MIXED,
      payload: updatedItem.data.data
    });

    dispatch(getAll_ENTERED_INVOICE_MIXEDS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_ENTERED_INVOICE_MIXED = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/entered-invoice-mixed/${itemId}`);
    dispatch({
      type: DELETE_ENTERED_INVOICE_MIXED,
      payload: itemId
    });
    dispatch(getAll_ENTERED_INVOICE_MIXEDS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
