import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_TYPE_OF_ACTS_ON_BASIS_OF,
  UPDATE_TYPE_OF_ACTS_ON_BASIS_OF,
  GET_ALL_TYPE_OF_ACTS_ON_BASIS_OFS,
  GET_ONE_TYPE_OF_ACTS_ON_BASIS_OF,
  DELETE_TYPE_OF_ACTS_ON_BASIS_OF
} from '../../types';

export const getAll_TYPE_OF_ACTS_ON_BASIS_OFS = () => async dispatch => {
  try {
    const result = await axios.get(
      `/api/v1/accountant/type-of-acts-on-basis-of`
    );
    dispatch({
      type: GET_ALL_TYPE_OF_ACTS_ON_BASIS_OFS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_TYPE_OF_ACTS_ON_BASIS_OF = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/type-of-acts-on-basis-of/${itemId}`
    );

    dispatch({
      type: GET_ONE_TYPE_OF_ACTS_ON_BASIS_OF,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_TYPE_OF_ACTS_ON_BASIS_OF = actOnBasisOf => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    actOnBasisOf
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/type-of-acts-on-basis-of`,
      body,
      config
    );

    dispatch({
      type: SET_TYPE_OF_ACTS_ON_BASIS_OF,
      payload: createdItem.data.data
    });

    dispatch(getAll_TYPE_OF_ACTS_ON_BASIS_OFS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_TYPE_OF_ACTS_ON_BASIS_OF = (
  itemId,
  actOnBasisOf
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    actOnBasisOf
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/type-of-acts-on-basis-of/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_TYPE_OF_ACTS_ON_BASIS_OF,
      payload: updatedItem.data.data
    });

    dispatch(getAll_TYPE_OF_ACTS_ON_BASIS_OFS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_TYPE_OF_ACTS_ON_BASIS_OF = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/type-of-acts-on-basis-of/${itemId}`);
    dispatch({
      type: DELETE_TYPE_OF_ACTS_ON_BASIS_OF,
      payload: itemId
    });
    dispatch(getAll_TYPE_OF_ACTS_ON_BASIS_OFS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
