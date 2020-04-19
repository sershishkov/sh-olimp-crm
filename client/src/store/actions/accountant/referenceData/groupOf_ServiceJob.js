import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_GROUP_OF_SERVICE_JOB,
  UPDATE_GROUP_OF_SERVICE_JOB,
  GET_ALL_GROUP_OF_SERVICE_JOBS,
  GET_ONE_GROUP_OF_SERVICE_JOB,
  DELETE_GROUP_OF_SERVICE_JOB
} from '../../types';

export const getAll_GROUP_OF_SERVICE_JOBS = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/accountant/group-of-servicejob`);
    dispatch({
      type: GET_ALL_GROUP_OF_SERVICE_JOBS,
      payload: result.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_GROUP_OF_SERVICE_JOB = itemId => async dispatch => {
  try {
    const oneResult = await axios.get(
      `/api/v1/accountant/group-of-servicejob/${itemId}`
    );

    dispatch({
      type: GET_ONE_GROUP_OF_SERVICE_JOB,
      payload: oneResult.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_GROUP_OF_SERVICE_JOB = serviceJobGroup => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    serviceJobGroup
  });

  try {
    const createdItem = await axios.post(
      `/api/v1/accountant/group-of-servicejob`,
      body,
      config
    );

    dispatch({
      type: SET_GROUP_OF_SERVICE_JOB,
      payload: createdItem.data.data
    });

    dispatch(getAll_GROUP_OF_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_GROUP_OF_SERVICE_JOB = (
  itemId,
  serviceJobGroup
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    serviceJobGroup
  });

  try {
    const updatedItem = await axios.put(
      `/api/v1/accountant/group-of-servicejob/${itemId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_GROUP_OF_SERVICE_JOB,
      payload: updatedItem.data.data
    });

    dispatch(getAll_GROUP_OF_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_GROUP_OF_SERVICE_JOB = itemId => async dispatch => {
  try {
    await axios.delete(`/api/v1/accountant/group-of-servicejob/${itemId}`);
    dispatch({
      type: DELETE_GROUP_OF_SERVICE_JOB,
      payload: itemId
    });
    dispatch(getAll_GROUP_OF_SERVICE_JOBS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
