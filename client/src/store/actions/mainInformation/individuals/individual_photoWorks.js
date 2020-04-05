import axios from 'axios';
import { setAlert } from '../../alert';

import {
  SET_INDIVIDUAL_PHOTO,
  UPDATE_INDIVIDUAL_PHOTO,
  GET_ALL_INDIVIDUAL_PHOTOS,
  GET_ONE_INDIVIDUAL_PHOTO,
  DELETE_INDIVIDUAL_PHOTO,
} from '../../types';

export const getAll_INDIVIDUAL_PHOTOS = (filterId) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/v1/individual-photo`);
    // console.log(result);
    dispatch({ type: GET_ALL_INDIVIDUAL_PHOTOS, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne_INDIVIDUAL_PHOTO = (imageId) => async (dispatch) => {
  try {
    const oneResult = await axios.get(`/api/v1/individual-photo/${imageId}`);
    dispatch({
      type: GET_ONE_INDIVIDUAL_PHOTO,
      payload: oneResult.data.data,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const add_INDIVIDUAL_PHOTO = (
  file,
  groupOfImageID,
  description
) => async (dispatch) => {
  const photoFormData = new FormData();
  photoFormData.append('photoWork', file);
  photoFormData.append('imageGroup', groupOfImageID);
  photoFormData.append('description', description);
  // console.log(file);
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const createdItem = await axios.post(
      `/api/v1/individual-photo`,
      photoFormData,
      config
    );

    dispatch({
      type: SET_INDIVIDUAL_PHOTO,
      payload: createdItem.data.data,
    });

    dispatch(getAll_INDIVIDUAL_PHOTOS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update_INDIVIDUAL_PHOTO = (
  photoId,
  file,
  groupOfImageID,
  description
) => async (dispatch) => {
  const photoFormData = new FormData();
  photoFormData.append('photoWork', file);
  photoFormData.append('imageGroup', groupOfImageID);
  photoFormData.append('description', description);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const updatedItem = await axios.put(
      `/api/v1/individual-photo/${photoId}`,
      photoFormData,
      config
    );

    dispatch({
      type: UPDATE_INDIVIDUAL_PHOTO,
      payload: updatedItem.data.data,
    });

    dispatch(getAll_INDIVIDUAL_PHOTOS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete_INDIVIDUAL_PHOTO = (imageId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/individual-photo/${imageId}`);
    dispatch({
      type: DELETE_INDIVIDUAL_PHOTO,
      payload: imageId,
    });
    dispatch(getAll_INDIVIDUAL_PHOTOS());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
