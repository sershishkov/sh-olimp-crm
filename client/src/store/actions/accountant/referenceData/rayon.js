import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_RAYON,
  UPDATE_RAYON,
  GET_ALL_RAYONS,
  GET_ONE_RAYON,
  DELETE_RAYON
} from '../../types';

export const getAll_RAYONS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/rayon`);
    dispatch({
      type: GET_ALL_RAYONS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_RAYON = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/rayon/${itemId}`);

    dispatch({
      type: GET_ONE_RAYON,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_RAYON = rayonName => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    rayonName
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/rayon`,
      body,
      config
    );

    dispatch({
      type: SET_RAYON,
      payload: createdItem.data.data
    });

    dispatch(getAll_RAYONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_RAYON = (itemId, rayonName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    rayonName
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/rayon/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_RAYON,
      payload: updatedItem.data.data
    });

    dispatch(getAll_RAYONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_RAYON = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/rayon/${itemId}`);
    dispatch({
      type: DELETE_RAYON,
      payload: itemId
    });
    dispatch(getAll_RAYONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
