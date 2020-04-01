import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_EXPENSE,
  UPDATE_TYPE_OF_EXPENSE,
  GET_ALL_TYPE_OF_EXPENSES,
  GET_ONE_TYPE_OF_EXPENSE,
  DELETE_TYPE_OF_EXPENSE
} from '../../types';

export const getAll_TYPE_OF_EXPENSES = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-expense`);
    dispatch({
      type: GET_ALL_TYPE_OF_EXPENSES,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_EXPENSE = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-expense/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_EXPENSE,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_EXPENSE = typeOf_ExpenseName => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_ExpenseName
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-expense`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_EXPENSE,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_EXPENSE = (
  itemId,
  typeOf_ExpenseName
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_ExpenseName
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-expense/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_EXPENSE,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_EXPENSE = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-expense/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_EXPENSE,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
