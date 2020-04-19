import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_GROUP_OF_PRODUCT,
  UPDATE_GROUP_OF_PRODUCT,
  GET_ALL_GROUP_OF_PRODUCTS,
  GET_ONE_GROUP_OF_PRODUCT,
  DELETE_GROUP_OF_PRODUCT
} from '../../types';

export const getAll_GROUP_OF_PRODUCTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/group-of-product`);
    dispatch({
      type: GET_ALL_GROUP_OF_PRODUCTS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_GROUP_OF_PRODUCT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/group-of-product/${itemId}`
    );

    dispatch({
      type: GET_ONE_GROUP_OF_PRODUCT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_GROUP_OF_PRODUCT = productGroup => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    productGroup
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/group-of-product`,
      body,
      config
    );

    dispatch({
      type: SET_GROUP_OF_PRODUCT,
      payload: createdItem.data.data
    });

    dispatch(getAll_GROUP_OF_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_GROUP_OF_PRODUCT = (
  itemId,
  productGroup
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    productGroup
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/group-of-product/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_GROUP_OF_PRODUCT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_GROUP_OF_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_GROUP_OF_PRODUCT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/group-of-product/${itemId}`);
    dispatch({
      type: DELETE_GROUP_OF_PRODUCT,
      payload: itemId
    });
    dispatch(getAll_GROUP_OF_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
