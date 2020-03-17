import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_PAYMENT,
  UPDATE_OUR_PAYMENT,
  GET_ALL_OUR_PAYMENTS,
  GET_ONE_OUR_PAYMENT,
  DELETE_OUR_PAYMENT
} from '../../types';

export const getAll_OUR_PAYMENTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-payments`);
    dispatch({ type: GET_ALL_OUR_PAYMENTS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_PAYMENT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/our-payments/${itemId}`
    );

    dispatch({
      type: GET_ONE_OUR_PAYMENT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_PAYMENT = (
  paymentNumber,
  dateOf_payment,
  ourFirm,
  client,
  sum,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    paymentNumber,
    dateOf_payment,
    ourFirm,
    client,
    sum,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-payments`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_PAYMENT,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_PAYMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_PAYMENT = (
  itemId,
  paymentNumber,
  dateOf_payment,
  ourFirm,
  client,
  sum,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    paymentNumber,
    dateOf_payment,
    ourFirm,
    client,
    sum,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-payments/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_PAYMENT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_PAYMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_PAYMENT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-payments/${itemId}`);
    dispatch({
      type: DELETE_OUR_PAYMENT,
      payload: itemId
    });
    dispatch(getAll_OUR_PAYMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
