import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_TAX_PAYER_ON,
  UPDATE_TYPE_OF_TAX_PAYER_ON,
  GET_ALL_TYPE_OF_TAX_PAYER_ONS,
  GET_ONE_TYPE_OF_TAX_PAYER_ON,
  DELETE_TYPE_OF_TAX_PAYER_ON
} from '../../types';

export const getAll_TYPE_OF_TAX_PAYER_ONS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-tax-payer-on`);
    dispatch({
      type: GET_ALL_TYPE_OF_TAX_PAYER_ONS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_TAX_PAYER_ON = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-tax-payer-on/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_TAX_PAYER_ON,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_TAX_PAYER_ON = typeOf_TaxPayerOn => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_TaxPayerOn
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-tax-payer-on`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_TAX_PAYER_ON,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_TAX_PAYER_ONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_TAX_PAYER_ON = (
  itemId,
  typeOf_TaxPayerOn
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_TaxPayerOn
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-tax-payer-on/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_TAX_PAYER_ON,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_TAX_PAYER_ONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_TAX_PAYER_ON = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-tax-payer-on/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_TAX_PAYER_ON,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_TAX_PAYER_ONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
