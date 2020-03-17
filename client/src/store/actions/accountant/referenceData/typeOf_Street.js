import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_STREET,
  UPDATE_TYPE_OF_STREET,
  GET_ALL_TYPE_OF_STREETS,
  GET_ONE_TYPE_OF_STREET,
  DELETE_TYPE_OF_STREET
} from '../../types';

export const getAll_TYPE_OF_STREETS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-street`);
    dispatch({
      type: GET_ALL_TYPE_OF_STREETS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_STREET = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-street/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_STREET,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_STREET = (
  typeOf_StreetLong,
  typeOf_StreetShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_StreetLong,
    typeOf_StreetShort
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-street`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_STREET,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_STREET = (
  itemId,
  typeOf_StreetLong,
  typeOf_StreetShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_StreetLong,
    typeOf_StreetShort
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-street/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_STREET,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_STREET = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-street/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_STREET,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_STREETS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
