import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_ENTERED_SALES_INVOICE_NAKLADNAYA,
  UPDATE_ENTERED_SALES_INVOICE_NAKLADNAYA,
  GET_ALL_ENTERED_SALES_INVOICE_NAKLADNAYAS,
  GET_ONE_ENTERED_SALES_INVOICE_NAKLADNAYA,
  DELETE_ENTERED_SALES_INVOICE_NAKLADNAYA
} from '../../types';

export const getAll_ENTERED_SALES_INVOICE_NAKLADNAYAS = () => async dispatch => {
  try {
    const result = await axios.get(
      `/api/v1/accountant/entered-service-invoice-nakl`
    );
    dispatch({
      type: GET_ALL_ENTERED_SALES_INVOICE_NAKLADNAYAS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_ENTERED_SALES_INVOICE_NAKLADNAYA = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/entered-service-invoice-nakl/${itemId}`
    );

    dispatch({
      type: GET_ONE_ENTERED_SALES_INVOICE_NAKLADNAYA,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_ENTERED_SALES_INVOICE_NAKLADNAYA = (
  naklNumber,
  naclDate,
  ourFirm,
  client,
  products,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    naklNumber,
    naclDate,
    ourFirm,
    client,
    products,
    active,
    cashPayment
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/entered-service-invoice-nakl`,
      body,
      config
    );

    dispatch({
      type: SET_ENTERED_SALES_INVOICE_NAKLADNAYA,
      payload: createdItem.data.data
    });

    dispatch(getAll_ENTERED_SALES_INVOICE_NAKLADNAYAS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_ENTERED_SALES_INVOICE_NAKLADNAYA = (
  itemId,
  naklNumber,
  naclDate,
  ourFirm,
  client,
  products,
  active,
  cashPayment
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    naklNumber,
    naclDate,
    ourFirm,
    client,
    products,
    active,
    cashPayment
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/entered-service-invoice-nakl/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ENTERED_SALES_INVOICE_NAKLADNAYA,
      payload: updatedItem.data.data
    });

    dispatch(getAll_ENTERED_SALES_INVOICE_NAKLADNAYAS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_ENTERED_SALES_INVOICE_NAKLADNAYA = itemId => async dispatch => {
  try {
    await axios.delete(
      `/api/v1/accountant/entered-service-invoice-nakl/${itemId}`
    );
    dispatch({
      type: DELETE_ENTERED_SALES_INVOICE_NAKLADNAYA,
      payload: itemId
    });
    dispatch(getAll_ENTERED_SALES_INVOICE_NAKLADNAYAS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
