import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  DELETE_USER
} from '../../types';

export const getAllUsers = params => async dispatch => {
  let newParams = params ? `?${params}` : '';
  try {
    const result = await axios.get(`/api/v1/users${newParams}`);
    dispatch({ type: GET_ALL_USERS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneUser = imageId => async dispatch => {
  try {
    const oneUser = await axios.get(`/api/v1/users/${imageId}`);
    dispatch({
      type: GET_ONE_USER,
      payload: oneUser.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addUser = userObj => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userObj);

  try {
    const createdUser = await axios.post(`/api/v1/users`, body, config);

    dispatch({
      type: SET_USER,
      payload: createdUser.data.data
    });

    dispatch(getAllUsers());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updateUser = (userId, newUserObject) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(newUserObject);

  try {
    const updatedUser = await axios.put(
      `/api/v1/users/${userId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_USER,
      payload: updatedUser.data.data
    });

    dispatch(getAllUsers());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/v1/users/${userId}`);
    dispatch({
      type: DELETE_USER,
      payload: userId
    });
    dispatch(getAllUsers());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
