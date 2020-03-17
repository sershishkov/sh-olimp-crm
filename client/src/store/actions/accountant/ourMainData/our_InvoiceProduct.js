import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_INVOICE_PRODUCT,
  UPDATE_OUR_INVOICE_PRODUCT,
  GET_ALL_OUR_INVOICE_PRODUCTS,
  GET_ONE_OUR_INVOICE_PRODUCT,
  DELETE_OUR_INVOICE_PRODUCT
} from '../../types';

export const getAll_OUR_INVOICE_PRODUCTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-invoice-product`);
    dispatch({ type: GET_ALL_OUR_INVOICE_PRODUCTS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_INVOICE_PRODUCT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/our-invoice-product/${itemId}`
    );

    dispatch({
      type: GET_ONE_OUR_INVOICE_PRODUCT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_INVOICE_PRODUCT = (
  invoceProductNumber,
  invoceProductDate,
  ourFirm,
  client,
  products,
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
    invoceProductNumber,
    invoceProductDate,
    ourFirm,
    client,
    products,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-invoice-product`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_INVOICE_PRODUCT,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_INVOICE_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_INVOICE_PRODUCT = (
  itemId,
  invoceProductNumber,
  invoceProductDate,
  ourFirm,
  client,
  products,
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
    invoceProductNumber,
    invoceProductDate,
    ourFirm,
    client,
    products,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-invoice-product/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_INVOICE_PRODUCT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_INVOICE_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_INVOICE_PRODUCT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-invoice-product/${itemId}`);
    dispatch({
      type: DELETE_OUR_INVOICE_PRODUCT,
      payload: itemId
    });
    dispatch(getAll_OUR_INVOICE_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
