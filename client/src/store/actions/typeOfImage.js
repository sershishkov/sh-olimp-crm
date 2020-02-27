import axios from 'axios';
import { setAlert } from './alert';

import {
  SET_IMAGE_TYPE,
  UPDATE_IMAGE_TYPE,
  GET_ALL_IMAGE_TYPES,
  GET_ONE_IMAGE_TYPE,
  DELETE_IMAGE_TYPE
} from './types';

export const getAllTypeOfImage = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/imagetype`);
    dispatch({ type: GET_ALL_IMAGE_TYPES, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneTypeOfImage = imageId => async dispatch => {
  try {
    const oneImage = await axios.get(`/api/v1/imagetype/${imageId}`);
    dispatch({
      type: GET_ONE_IMAGE_TYPE,
      payload: oneImage.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addTypeOfImage = typeOfImage => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(typeOfImage);

  try {
    const typeImage = await axios.post(`/api/v1/imagetype`, body, config);

    dispatch({
      type: SET_IMAGE_TYPE,
      payload: typeImage.data.data
    });

    dispatch(getAllTypeOfImage());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteTypeOfImage = imageId => async dispatch => {
  try {
    await axios.delete(`/api/v1/imagetype/${imageId}`);
    dispatch({
      type: DELETE_IMAGE_TYPE,
      payload: imageId
    });
    dispatch(getAllTypeOfImage());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
