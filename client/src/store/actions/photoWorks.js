import axios from 'axios';
import { setAlert } from './alert';

import {
  SET_PHOTO,
  UPDATE_PHOTO,
  GET_ALL_PHOTOS,
  GET_ONE_PHOTO,
  DELETE_PHOTO
} from './types';

export const getAllPhotoWork = () => async dispatch => {
  try {
    const result = await axios.get(`/api/v1/photo`);
    dispatch({ type: GET_ALL_PHOTOS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOnePhotoWork = imageId => async dispatch => {
  try {
    const onePhoto = await axios.get(`/api/v1/photo/${imageId}`);
    dispatch({
      type: GET_ONE_PHOTO,
      payload: onePhoto.data.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const addPhotoWork = (
  file,
  groupOfImageID,
  description
) => async dispatch => {
  const photoFormData = new FormData();
  photoFormData.append('photoWork', file);
  photoFormData.append('imageGroup', groupOfImageID);
  photoFormData.append('description', description);
  // console.log(file);
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const photo = await axios.post(`/api/v1/photo`, photoFormData, config);

    dispatch({
      type: SET_PHOTO,
      payload: photo.data.data
    });

    dispatch(getAllPhotoWork());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const updatePhotoWork = (
  photoId,
  groupID,
  description
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    imageGroup: groupID,
    description: description
  });

  try {
    const updatedPhoto = await axios.put(
      `/api/v1/photo/${photoId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PHOTO,
      payload: updatedPhoto.data.data
    });

    dispatch(getAllPhotoWork());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const deletePhotoWork = imageId => async dispatch => {
  try {
    await axios.delete(`/api/v1/photo/${imageId}`);
    dispatch({
      type: DELETE_PHOTO,
      payload: imageId
    });
    dispatch(getAllPhotoWork());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
