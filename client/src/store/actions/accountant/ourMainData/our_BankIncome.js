import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_BANK_INCOME,
  UPDATE_OUR_BANK_INCOME,
  GET_ALL_OUR_BANK_INCOMES,
  GET_ONE_OUR_BANK_INCOME,
  DELETE_OUR_BANK_INCOME
} from '../../types';

export const getAll_OUR_BANK_INCOMES = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-bank-income`);
    dispatch({ type: GET_ALL_OUR_BANK_INCOMES, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_BANK_INCOME = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/our-bank-income/${itemId}`
    );

    dispatch({
      type: GET_ONE_OUR_BANK_INCOME,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_BANK_INCOME = (
  bankIncomeNumber,
  dateOf_income,
  ourFirm,
  client,
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
    bankIncomeNumber,
    dateOf_income,
    ourFirm,
    client,
    sum,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-bank-income`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_BANK_INCOME,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_BANK_INCOMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_BANK_INCOME = (
  itemId,
  bankIncomeNumber,
  dateOf_income,
  ourFirm,
  client,
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
    bankIncomeNumber,
    dateOf_income,
    ourFirm,
    client,
    sum,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-bank-income/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_BANK_INCOME,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_BANK_INCOMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_BANK_INCOME = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-bank-income/${itemId}`);
    dispatch({
      type: DELETE_OUR_BANK_INCOME,
      payload: itemId
    });
    dispatch(getAll_OUR_BANK_INCOMES());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
