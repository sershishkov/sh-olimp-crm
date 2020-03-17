import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ONE_PRODUCT,
  DELETE_PRODUCT
} from '../../types';

export const getAll_PRODUCTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/product`);
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_PRODUCT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(`/api/v1/accountant/product/${itemId}`);

    dispatch({
      type: GET_ONE_PRODUCT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_PRODUCT = (
  file,
  productName,
  unit,
  productGroup,
  amountInPackage,
  price,
  suppliers,
  ratePerUnit,
  length,
  width,
  height,
  weight
) => async dispatch => {
  const newFormData = new FormData();
  newFormData.append('productImage', file);
  newFormData.append('productName', productName);
  newFormData.append('unit', unit);
  newFormData.append('productGroup', productGroup);
  newFormData.append('amountInPackage', amountInPackage);
  newFormData.append('price', price);
  newFormData.append('suppliers', suppliers);
  newFormData.append('ratePerUnit', ratePerUnit);
  newFormData.append('length', length);
  newFormData.append('width', width);
  newFormData.append('height', height);
  newFormData.append('weight', weight);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/product`,
      newFormData,
      config
    );

    dispatch({
      type: SET_PRODUCT,
      payload: createdItem.data.data
    });

    dispatch(getAll_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_PRODUCT = (
  itemId,
  file,
  productName,
  unit,
  productGroup,
  amountInPackage,
  price,
  suppliers,
  ratePerUnit,
  length,
  width,
  height,
  weight
) => async dispatch => {
  const newFormData = new FormData();
  newFormData.append('productImage', file);
  newFormData.append('productName', productName);
  newFormData.append('unit', unit);
  newFormData.append('productGroup', productGroup);
  newFormData.append('amountInPackage', amountInPackage);
  newFormData.append('price', price);
  newFormData.append('suppliers', suppliers);
  newFormData.append('ratePerUnit', ratePerUnit);
  newFormData.append('length', length);
  newFormData.append('width', width);
  newFormData.append('height', height);
  newFormData.append('weight', weight);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/product/${itemId}`,
      newFormData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_PRODUCT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/product/${itemId}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: itemId
    });
    dispatch(getAll_PRODUCTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
