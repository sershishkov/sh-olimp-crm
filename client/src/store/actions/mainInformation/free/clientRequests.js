import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_CLIENT_REQUEST,
  UPDATE_CLIENT_REQUEST,
  GET_ALL_CLIENT_REQUESTS,
  GET_ONE_CLIENT_REQUEST,
  DELETE_CLIENT_REQUEST
} from '../../types';

export const getAllClientRequest = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/request-from-client`);
    dispatch({ type: GET_ALL_CLIENT_REQUESTS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneClientRequest = imageId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/request-from-client/${imageId}`);

    dispatch({
      type: GET_ONE_CLIENT_REQUEST,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addClientRequest = (
  clientName,
  requestFromClient,
  phoneNumber,
  email
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    clientName,
    requestFromClient,
    phoneNumber,
    email
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/request-from-client`,
      body,
      config
    );

    dispatch({
      type: SET_CLIENT_REQUEST,
      payload: createdItem.data.data
    });

    dispatch(getAllClientRequest());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updateClientRequest = (
  itemId,
  clientName,
  requestFromClient,
  phoneNumber,
  email
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    clientName,
    requestFromClient,
    phoneNumber,
    email
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/request-from-client/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CLIENT_REQUEST,
      payload: updatedItem.data.data
    });

    dispatch(getAllClientRequest());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteClientRequest = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/request-from-client/${itemId}`);
    dispatch({
      type: DELETE_CLIENT_REQUEST,
      payload: itemId
    });
    dispatch(getAllClientRequest());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
