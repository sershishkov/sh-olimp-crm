import axios from 'axios';
import { setAlert } from './alert';

import {
  SET_OPERATOR_CODE,
  UPDATE_OPERATOR_CODE,
  GET_ALL_OPERATOR_CODES,
  GET_ONE_OPERATOR_CODE,
  DELETE_OPERATOR_CODE
} from './types';

export const getAllOperatorCode = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/phone-operator`);
    dispatch({ type: GET_ALL_OPERATOR_CODES, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneOperatorCode = imageId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/phone-operator/${imageId}`
    );

    dispatch({
      type: GET_ONE_OPERATOR_CODE,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addOperatorCode = operatorCode => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    operatorCode
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/phone-operator`,
      body,
      config
    );

    dispatch({
      type: SET_OPERATOR_CODE,
      payload: createdItem.data.data
    });

    dispatch(getAllOperatorCode());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updateOperatorCode = (itemId, operatorCode) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    operatorCode
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/phone-operator/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OPERATOR_CODE,
      payload: updatedItem.data.data
    });

    dispatch(getAllOperatorCode());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteOperatorCode = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/phone-operator/${itemId}`);
    dispatch({
      type: DELETE_OPERATOR_CODE,
      payload: itemId
    });
    dispatch(getAllOperatorCode());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
