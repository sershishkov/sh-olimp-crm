import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_WORKER,
  UPDATE_WORKER,
  GET_ALL_WORKERS,
  GET_ONE_WORKER,
  DELETE_WORKER
} from '../../types';

export const getAll_WORKERS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/worker`);
    dispatch({ type: GET_ALL_WORKERS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_WORKER = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/worker/${itemId}`);

    dispatch({
      type: GET_ONE_WORKER,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_WORKER = (
  surname,
  name,
  middleName,
  dateOf_Birth,
  postCode,
  typeOf_settlement,
  city,
  typeOf_street,
  street,
  numberOf_house,
  numberOf_app,
  individualTaxNumber,
  phoneNumber
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    surname,
    name,
    middleName,
    dateOf_Birth,
    postCode,
    typeOf_settlement,
    city,
    typeOf_street,
    street,
    numberOf_house,
    numberOf_app,
    individualTaxNumber,
    phoneNumber
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/worker`,
      body,
      config
    );

    dispatch({
      type: SET_WORKER,
      payload: createdItem.data.data
    });

    dispatch(getAll_WORKERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_WORKER = (
  itemId,
  surname,
  name,
  middleName,
  dateOf_Birth,
  postCode,
  typeOf_settlement,
  city,
  typeOf_street,
  street,
  numberOf_house,
  numberOf_app,
  individualTaxNumber,
  phoneNumber
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    surname,
    name,
    middleName,
    dateOf_Birth,
    postCode,
    typeOf_settlement,
    city,
    typeOf_street,
    street,
    numberOf_house,
    numberOf_app,
    individualTaxNumber,
    phoneNumber
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/worker/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_WORKER,
      payload: updatedItem.data.data
    });

    dispatch(getAll_WORKERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_WORKER = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/worker/${itemId}`);
    dispatch({
      type: DELETE_WORKER,
      payload: itemId
    });
    dispatch(getAll_WORKERS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
