import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_INDIVIDUAL_IMAGE_GROUP,
  UPDATE_INDIVIDUAL_IMAGE_GROUP,
  GET_ALL_INDIVIDUAL_IMAGE_GROUPS,
  GET_ONE_INDIVIDUAL_IMAGE_GROUP,
  DELETE_INDIVIDUAL_IMAGE_GROUP,
} from '../../types';

export const getAll_INDIVIDUAL_IMAGE_GROUPS = () => async (dispatch) => {
  try {
    const result = await axios.get(`/api/v1/individual-imagegroup`);
    dispatch({
      type: GET_ALL_INDIVIDUAL_IMAGE_GROUPS,
      payload: result.data.data,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_INDIVIDUAL_IMAGE_GROUP = (imageId) => async (dispatch) => {
  try {
    const oneResult = await axios.get(
      `/api/v1/individual-imagegroup/${imageId}`
    );
    const onedGroup = oneResult.data.data;
    const changedGroup = {
      imageGroup: onedGroup.imageGroup,
      descriptions: onedGroup.descriptions,
      descriptionsSTR: onedGroup.descriptions.join(','),
    };
    dispatch({
      type: GET_ONE_INDIVIDUAL_IMAGE_GROUP,
      payload: changedGroup,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_INDIVIDUAL_IMAGE_GROUP = (imageGroup, descriptions) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ imageGroup, descriptions });

  try {
    const createdItem = await axios.post(
      `/api/v1/individual-imagegroup`,
      body,
      config
    );

    dispatch({
      type: SET_INDIVIDUAL_IMAGE_GROUP,
      payload: createdItem.data.data,
    });

    dispatch(getAll_INDIVIDUAL_IMAGE_GROUPS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_INDIVIDUAL_IMAGE_GROUP = (
  groupId,
  imageGroup,
  descriptions
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ imageGroup, descriptions });

  try {
    const updatedItem = await axios.put(
      `/api/v1/individual-imagegroup/${groupId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_INDIVIDUAL_IMAGE_GROUP,
      payload: updatedItem.data.data,
    });

    dispatch(getAll_INDIVIDUAL_IMAGE_GROUPS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_INDIVIDUAL_IMAGE_GROUP = (imageId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/individual-imagegroup/${imageId}`);
    dispatch({
      type: DELETE_INDIVIDUAL_IMAGE_GROUP,
      payload: imageId,
    });
    dispatch(getAll_INDIVIDUAL_IMAGE_GROUPS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
