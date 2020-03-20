import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_CITY,
  UPDATE_CITY,
  GET_ALL_CITYS,
  GET_ONE_CITY,
  DELETE_CITY
} from '../../types';

export const getAll_CITYS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/city`);
    dispatch({
      type: GET_ALL_CITYS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_CITY = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/city/${itemId}`);

    dispatch({
      type: GET_ONE_CITY,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_CITY = cityName => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    cityName
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/city`,
      body,
      config
    );

    dispatch({
      type: SET_CITY,
      payload: createdItem.data.data
    });

    dispatch(getAll_CITYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_CITY = (itemId, cityName) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    cityName
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/city/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CITY,
      payload: updatedItem.data.data
    });

    dispatch(getAll_CITYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_CITY = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/city/${itemId}`);
    dispatch({
      type: DELETE_CITY,
      payload: itemId
    });
    dispatch(getAll_CITYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
