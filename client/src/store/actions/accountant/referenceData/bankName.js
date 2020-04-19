import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_BANK_NAME,
  UPDATE_BANK_NAME,
  GET_ALL_BANK_NAMES,
  GET_ONE_BANK_NAME,
  DELETE_BANK_NAME
} from '../../types';

export const getAll_BANK_NAMES = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/bankname`);
    dispatch({
      type: GET_ALL_BANK_NAMES,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_BANK_NAME = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/bankname/${itemId}`);

    dispatch({
      type: GET_ONE_BANK_NAME,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_BANK_NAME = (bankName, mfo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    bankName,
    mfo
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/bankname`,
      body,
      config
    );

    dispatch({
      type: SET_BANK_NAME,
      payload: createdItem.data.data
    });

    dispatch(getAll_BANK_NAMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_BANK_NAME = (itemId, bankName, mfo) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    bankName,
    mfo
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/bankname/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_BANK_NAME,
      payload: updatedItem.data.data
    });

    dispatch(getAll_BANK_NAMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_BANK_NAME = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/bankname/${itemId}`);
    dispatch({
      type: DELETE_BANK_NAME,
      payload: itemId
    });
    dispatch(getAll_BANK_NAMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
