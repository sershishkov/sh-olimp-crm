import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_CURRENT_EXPENSE,
  UPDATE_OUR_CURRENT_EXPENSE,
  GET_ALL_OUR_CURRENT_EXPENSES,
  GET_ONE_OUR_CURRENT_EXPENSE,
  DELETE_OUR_CURRENT_EXPENSE
} from '../../types';

export const getAll_OUR_CURRENT_EXPENSES = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-current-expense`);
    dispatch({
      type: GET_ALL_OUR_CURRENT_EXPENSES,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_CURRENT_EXPENSE = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/our-current-expense/${itemId}`
    );

    dispatch({
      type: GET_ONE_OUR_CURRENT_EXPENSE,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_CURRENT_EXPENSE = (
  expenseNumber,
  dateExpense,
  ourFirm,
  expenseDescription,
  typeOf_Expense,
  worker,
  sum,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    expenseNumber,
    dateExpense,
    ourFirm,
    expenseDescription,
    typeOf_Expense,
    worker,
    sum,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-current-expense`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_CURRENT_EXPENSE,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_CURRENT_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_CURRENT_EXPENSE = (
  itemId,
  expenseNumber,
  dateExpense,
  ourFirm,
  expenseDescription,
  typeOf_Expense,
  worker,
  sum,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    expenseNumber,
    dateExpense,
    ourFirm,
    expenseDescription,
    typeOf_Expense,
    worker,
    sum,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-current-expense/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_CURRENT_EXPENSE,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_CURRENT_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_CURRENT_EXPENSE = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-current-expense/${itemId}`);
    dispatch({
      type: DELETE_OUR_CURRENT_EXPENSE,
      payload: itemId
    });
    dispatch(getAll_OUR_CURRENT_EXPENSES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
