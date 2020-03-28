import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OBLAST,
  UPDATE_OBLAST,
  GET_ALL_OBLASTS,
  GET_ONE_OBLAST,
  DELETE_OBLAST
} from '../../types';

export const getAll_OBLASTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/oblast`);
    dispatch({
      type: GET_ALL_OBLASTS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OBLAST = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/oblast/${itemId}`);

    dispatch({
      type: GET_ONE_OBLAST,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OBLAST = oblastName => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    oblastName
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/oblast`,
      body,
      config
    );

    dispatch({
      type: SET_OBLAST,
      payload: createdItem.data.data
    });

    dispatch(getAll_OBLASTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OBLAST = (itemId, oblastName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    oblastName
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/oblast/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OBLAST,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OBLASTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OBLAST = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/oblast/${itemId}`);
    dispatch({
      type: DELETE_OBLAST,
      payload: itemId
    });
    dispatch(getAll_OBLASTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
