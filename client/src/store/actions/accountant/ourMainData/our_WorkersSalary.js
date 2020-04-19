import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_OUR_WORKERS_SALARY,
  UPDATE_OUR_WORKERS_SALARY,
  GET_ALL_OUR_WORKERS_SALARYS,
  GET_ONE_OUR_WORKERS_SALARY,
  DELETE_OUR_WORKERS_SALARY
} from '../../types';

export const getAll_OUR_WORKERS_SALARYS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/our-workers-salary`);
    dispatch({
      type: GET_ALL_OUR_WORKERS_SALARYS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_OUR_WORKERS_SALARY = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/our-workers-salary/${itemId}`
    );

    dispatch({
      type: GET_ONE_OUR_WORKERS_SALARY,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_OUR_WORKERS_SALARY = (
  paymentNumber,
  datePayment,
  worker,
  ourFirm,
  client,
  description,
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
    paymentNumber,
    datePayment,
    worker,
    ourFirm,
    client,
    description,
    sum,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/our-workers-salary`,
      body,
      config
    );

    dispatch({
      type: SET_OUR_WORKERS_SALARY,
      payload: createdItem.data.data
    });

    dispatch(getAll_OUR_WORKERS_SALARYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_OUR_WORKERS_SALARY = (
  itemId,
  paymentNumber,
  datePayment,
  worker,
  ourFirm,
  client,
  description,
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
    paymentNumber,
    datePayment,
    worker,
    ourFirm,
    client,
    description,
    sum,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/our-workers-salary/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_OUR_WORKERS_SALARY,
      payload: updatedItem.data.data
    });

    dispatch(getAll_OUR_WORKERS_SALARYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_OUR_WORKERS_SALARY = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/our-workers-salary/${itemId}`);
    dispatch({
      type: DELETE_OUR_WORKERS_SALARY,
      payload: itemId
    });
    dispatch(getAll_OUR_WORKERS_SALARYS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
