import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_UNIT,
  UPDATE_UNIT,
  GET_ALL_UNITS,
  GET_ONE_UNIT,
  DELETE_UNIT
} from '../../types';

export const getAll_UNITS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/unit`);
    dispatch({ type: GET_ALL_UNITS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_UNIT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/unit/${itemId}`);

    dispatch({
      type: GET_ONE_UNIT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_UNIT = (
  unitNameLong,
  unitNameShort,
  unitType
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    unitNameLong,
    unitNameShort,
    unitType
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/unit`,
      body,
      config
    );

    dispatch({
      type: SET_UNIT,
      payload: createdItem.data.data
    });

    dispatch(getAll_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_UNIT = (
  itemId,
  unitNameLong,
  unitNameShort,
  unitType
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    unitNameLong,
    unitNameShort,
    unitType
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/unit/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_UNIT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_UNIT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/unit/${itemId}`);
    dispatch({
      type: DELETE_UNIT,
      payload: itemId
    });
    dispatch(getAll_UNITS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
