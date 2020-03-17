import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_SETTLEMENT,
  UPDATE_TYPE_OF_SETTLEMENT,
  GET_ALL_TYPE_OF_SETTLEMENTS,
  GET_ONE_TYPE_OF_SETTLEMENT,
  DELETE_TYPE_OF_SETTLEMENT
} from '../../types';

export const getAll_TYPE_OF_SETTLEMENTS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-settlement`);
    dispatch({
      type: GET_ALL_TYPE_OF_SETTLEMENTS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_SETTLEMENT = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-settlement/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_SETTLEMENT,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_SETTLEMENT = (
  typeOf_SettlementLong,
  typeOf_SettlementShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_SettlementLong,
    typeOf_SettlementShort
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-settlement`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_SETTLEMENT,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_SETTLEMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_SETTLEMENT = (
  itemId,
  typeOf_SettlementLong,
  typeOf_SettlementShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    typeOf_SettlementLong,
    typeOf_SettlementShort
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-settlement/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_SETTLEMENT,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_SETTLEMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_SETTLEMENT = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-settlement/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_SETTLEMENT,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_SETTLEMENTS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
