import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_IMAGE_GROUP,
  UPDATE_IMAGE_GROUP,
  GET_ALL_IMAGE_GROUPS,
  GET_ONE_IMAGE_GROUP,
  DELETE_IMAGE_GROUP
} from '../../types';

export const getAllGroupOfImage = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/imagegroup`);
    dispatch({ type: GET_ALL_IMAGE_GROUPS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOneGroupOfImage = imageId => async dispatch => {
  try {
    const oneImage = await axios.get(`/api/v1/imagegroup/${imageId}`);
    const onedGroup = oneImage.data.data;
    const changedGroup = {
      imageGroup: onedGroup.imageGroup,
      descriptions: onedGroup.descriptions,
      descriptionsSTR: onedGroup.descriptions.join(',')
    };
    dispatch({
      type: GET_ONE_IMAGE_GROUP,
      payload: changedGroup
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addGroupOfImage = (imageGroup, descriptions) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ imageGroup, descriptions });

  try {
    const groupImage = await axios.post(`/api/v1/imagegroup`, body, config);

    dispatch({
      type: SET_IMAGE_GROUP,
      payload: groupImage.data.data
    });

    dispatch(getAllGroupOfImage());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updateGroupOfImage = (
  groupId,
  imageGroup,
  descriptions
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ imageGroup, descriptions });

  try {
    const groupImage = await axios.put(
      `/api/v1/imagegroup/${groupId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_IMAGE_GROUP,
      payload: groupImage.data.data
    });

    dispatch(getAllGroupOfImage());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deleteGroupOfImage = imageId => async dispatch => {
  try {
    await axios.delete(`/api/v1/imagegroup/${imageId}`);
    dispatch({
      type: DELETE_IMAGE_GROUP,
      payload: imageId
    });
    dispatch(getAllGroupOfImage());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
