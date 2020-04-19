import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_STREET,
  UPDATE_STREET,
  GET_ALL_STREETS,
  GET_ONE_STREET,
  DELETE_STREET
} from '../../types';

export const getAll_STREETS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/street`);
    dispatch({
      type: GET_ALL_STREETS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_STREET = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/street/${itemId}`);

    dispatch({
      type: GET_ONE_STREET,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_STREET = streetName => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    streetName
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/street`,
      body,
      config
    );

    dispatch({
      type: SET_STREET,
      payload: createdItem.data.data
    });

    dispatch(getAll_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_STREET = (itemId, streetName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    streetName
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/street/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_STREET,
      payload: updatedItem.data.data
    });

    dispatch(getAll_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_STREET = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/street/${itemId}`);
    dispatch({
      type: DELETE_STREET,
      payload: itemId
    });
    dispatch(getAll_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
