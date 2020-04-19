import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_ENTERED_CERTIFICATE_OF_COMPLETION,
  UPDATE_ENTERED_CERTIFICATE_OF_COMPLETION,
  GET_ALL_ENTERED_CERTIFICATE_OF_COMPLETIONS,
  GET_ONE_ENTERED_CERTIFICATE_OF_COMPLETION,
  DELETE_ENTERED_CERTIFICATE_OF_COMPLETION
} from '../../types';

export const getAll_ENTERED_CERTIFICATE_OF_COMPLETIONS = () => async dispatch => {
  try {
    const result = await axios.get(
      `/api/v1/accountant/entered-certificate-of-completion`
    );
    dispatch({
      type: GET_ALL_ENTERED_CERTIFICATE_OF_COMPLETIONS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_ENTERED_CERTIFICATE_OF_COMPLETION = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/entered-certificate-of-completion/${itemId}`
    );

    dispatch({
      type: GET_ONE_ENTERED_CERTIFICATE_OF_COMPLETION,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_ENTERED_CERTIFICATE_OF_COMPLETION = (
  certificatNumber,
  cerificateDate,
  ourFirm,
  client,
  serviceJobs,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    certificatNumber,
    cerificateDate,
    ourFirm,
    client,
    serviceJobs,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/entered-certificate-of-completion`,
      body,
      config
    );

    dispatch({
      type: SET_ENTERED_CERTIFICATE_OF_COMPLETION,
      payload: createdItem.data.data
    });

    dispatch(getAll_ENTERED_CERTIFICATE_OF_COMPLETIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_ENTERED_CERTIFICATE_OF_COMPLETION = (
  itemId,
  certificatNumber,
  cerificateDate,
  ourFirm,
  client,
  serviceJobs,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    certificatNumber,
    cerificateDate,
    ourFirm,
    client,
    serviceJobs,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/entered-certificate-of-completion/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ENTERED_CERTIFICATE_OF_COMPLETION,
      payload: updatedItem.data.data
    });

    dispatch(getAll_ENTERED_CERTIFICATE_OF_COMPLETIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_ENTERED_CERTIFICATE_OF_COMPLETION = itemId => async dispatch => {
  try {
    await axios.delete(
      `/api/v1/accountant/entered-certificate-of-completion/${itemId}`
    );
    dispatch({
      type: DELETE_ENTERED_CERTIFICATE_OF_COMPLETION,
      payload: itemId
    });
    dispatch(getAll_ENTERED_CERTIFICATE_OF_COMPLETIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
