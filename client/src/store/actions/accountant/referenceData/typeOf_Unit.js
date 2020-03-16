import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_UNIT,
  UPDATE_TYPE_OF_UNIT,
  GET_ALL_TYPE_OF_UNITS,
  GET_ONE_TYPE_OF_UNIT,
  DELETE_TYPE_OF_UNIT
} from '../../types';

export const getAll_TYPE_OF_UNITS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-unit`);
    dispatch({ type: GET_ALL_TYPE_OF_UNITS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_UNIT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-unit/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_UNIT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_UNIT = typeOf_Unit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_Unit
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-unit`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_UNIT,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_UNIT = (itemId, typeOf_Unit) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_Unit
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-unit/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_UNIT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_UNIT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-unit/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_UNIT,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
