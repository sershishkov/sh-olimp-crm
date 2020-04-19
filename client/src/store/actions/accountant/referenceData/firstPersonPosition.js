import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_FIRST_PERSON_POSITION,
  UPDATE_FIRST_PERSON_POSITION,
  GET_ALL_FIRST_PERSON_POSITIONS,
  GET_ONE_FIRST_PERSON_POSITION,
  DELETE_FIRST_PERSON_POSITION
} from '../../types';

export const getAll_FIRST_PERSON_POSITIONS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/personposition`);
    dispatch({
      type: GET_ALL_FIRST_PERSON_POSITIONS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_FIRST_PERSON_POSITION = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/personposition/${itemId}`
    );

    dispatch({
      type: GET_ONE_FIRST_PERSON_POSITION,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_FIRST_PERSON_POSITION = (
  position,
  positionRoditPadej
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    position,
    positionRoditPadej
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/personposition`,
      body,
      config
    );

    dispatch({
      type: SET_FIRST_PERSON_POSITION,
      payload: createdItem.data.data
    });

    dispatch(getAll_FIRST_PERSON_POSITIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_FIRST_PERSON_POSITION = (
  itemId,
  position,
  positionRoditPadej
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    position,
    positionRoditPadej
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/personposition/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_FIRST_PERSON_POSITION,
      payload: updatedItem.data.data
    });

    dispatch(getAll_FIRST_PERSON_POSITIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_FIRST_PERSON_POSITION = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/personposition/${itemId}`);
    dispatch({
      type: DELETE_FIRST_PERSON_POSITION,
      payload: itemId
    });
    dispatch(getAll_FIRST_PERSON_POSITIONS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
