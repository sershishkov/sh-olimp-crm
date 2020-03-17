import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_FIRM,
  UPDATE_TYPE_OF_FIRM,
  GET_ALL_TYPE_OF_FIRMS,
  GET_ONE_TYPE_OF_FIRM,
  DELETE_TYPE_OF_FIRM
} from '../../types';

export const getAll_TYPE_OF_FIRMS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/type-of-firm`);
    dispatch({
      type: GET_ALL_TYPE_OF_FIRMS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_FIRM = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-firm/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_FIRM,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_FIRM = (
  TypeOf_FirmLong,
  TypeOf_FirmShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    TypeOf_FirmLong,
    TypeOf_FirmShort
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-firm`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_FIRM,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_FIRM = (
  itemId,
  TypeOf_FirmLong,
  TypeOf_FirmShort
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    TypeOf_FirmLong,
    TypeOf_FirmShort
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-firm/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_FIRM,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_FIRM = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-firm/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_FIRM,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_FIRMS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
