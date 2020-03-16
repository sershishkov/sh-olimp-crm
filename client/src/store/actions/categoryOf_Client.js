import axios from 'axios';
import { setAlert } from './alert';

import {
  SET_CATEGORY_OF_CLIENT,
  UPDATE_CATEGORY_OF_CLIENT,
  GET_ALL_CATEGORY_OF_CLIENTS,
  GET_ONE_CATEGORY_OF_CLIENT,
  DELETE_CATEGORY_OF_CLIENT
} from './types';

export const getAllCategoryOfClient = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/category-imagegroup`);
    dispatch({ type: GET_ALL_CATEGORY_OF_CLIENTS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneCategoryOfClient = itemId => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/category-imagegroup/${itemId}`);

    dispatch({
      type: GET_ONE_CATEGORY_OF_CLIENT,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addCategoryOfClient = categoryOf_Group => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ categoryOf_Group });

  try {
    const result = await axios.post(
      `/api/v1/category-imagegroup`,
      body,
      config
    );

    dispatch({
      type: SET_CATEGORY_OF_CLIENT,
      payload: result.data.data
    });

    dispatch(getAllCategoryOfClient());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updateCategoryOfClient = (
  itemId,
  categoryOf_Group
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ categoryOf_Group });

  try {
    const updatedResult = await axios.put(
      `/api/v1/category-imagegroup/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CATEGORY_OF_CLIENT,
      payload: updatedResult.data.data
    });

    dispatch(getAllCategoryOfClient());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteCategoryOfClient = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/category-imagegroup/${itemId}`);
    dispatch({
      type: DELETE_CATEGORY_OF_CLIENT,
      payload: itemId
    });
    dispatch(getAllCategoryOfClient());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
