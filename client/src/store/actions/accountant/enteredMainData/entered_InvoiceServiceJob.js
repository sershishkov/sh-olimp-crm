import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_ENTERED_INVOICE_SERVICE_JOB,
  UPDATE_ENTERED_INVOICE_SERVICE_JOB,
  GET_ALL_ENTERED_INVOICE_SERVICE_JOBS,
  GET_ONE_ENTERED_INVOICE_SERVICE_JOB,
  DELETE_ENTERED_INVOICE_SERVICE_JOB
} from '../../types';

export const getAll_ENTERED_INVOICE_SERVICE_JOBS = () => async dispatch => {
  try {
    const result = await axios.get(
      `/api/v1/accountant/entered-invoice-service-job`
    );
    dispatch({
      type: GET_ALL_ENTERED_INVOICE_SERVICE_JOBS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_ENTERED_INVOICE_SERVICE_JOB = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/entered-invoice-service-job/${itemId}`
    );

    dispatch({
      type: GET_ONE_ENTERED_INVOICE_SERVICE_JOB,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_ENTERED_INVOICE_SERVICE_JOB = (
  invoiceServiceJobNumber,
  invoiceServiceJobDate,
  ourFirm,
  client,
  serviceJobs,
  purposeOf_payment,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    invoiceServiceJobNumber,
    invoiceServiceJobDate,
    ourFirm,
    client,
    serviceJobs,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/entered-invoice-service-job`,
      body,
      config
    );

    dispatch({
      type: SET_ENTERED_INVOICE_SERVICE_JOB,
      payload: createdItem.data.data
    });

    dispatch(getAll_ENTERED_INVOICE_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_ENTERED_INVOICE_SERVICE_JOB = (
  itemId,
  invoiceServiceJobNumber,
  invoiceServiceJobDate,
  ourFirm,
  client,
  serviceJobs,
  purposeOf_payment,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    invoiceServiceJobNumber,
    invoiceServiceJobDate,
    ourFirm,
    client,
    serviceJobs,
    purposeOf_payment,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/entered-invoice-service-job/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ENTERED_INVOICE_SERVICE_JOB,
      payload: updatedItem.data.data
    });

    dispatch(getAll_ENTERED_INVOICE_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_ENTERED_INVOICE_SERVICE_JOB = itemId => async dispatch => {
  try {
    await axios.delete(
      `/api/v1/accountant/entered-invoice-service-job/${itemId}`
    );
    dispatch({
      type: DELETE_ENTERED_INVOICE_SERVICE_JOB,
      payload: itemId
    });
    dispatch(getAll_ENTERED_INVOICE_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
