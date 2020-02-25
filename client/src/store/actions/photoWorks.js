import axios from 'axios';
import { setAlert } from './alert';

import {
  SET_PHOTO_OF_ASFALT,
  SET_PHOTO_OF_ELEKTRO,
  SET_PHOTO_OF_EMERGENCY_WORK,
  SET_PHOTO_OF_FASAD,
  SET_PHOTO_OF_INSIDE_WORK,
  SET_PHOTO_OF_METALL_CONSTR,
  SET_PHOTO_OF_ROOF,
  SET_PHOTO_OF_SANTEH,
  SET_PHOTO_OF_WINDOW_PL,
  GET_ALL_PHOTO_OF_ASFALT,
  GET_ALL_PHOTO_OF_ELEKTRO,
  GET_ALL_PHOTO_OF_EMERGENCY_WORK,
  GET_ALL_PHOTO_OF_FASAD,
  GET_ALL_PHOTO_OF_INSIDE_WORK,
  GET_ALL_PHOTO_OF_METALL_CONSTR,
  GET_ALL_PHOTO_OF_ROOF,
  GET_ALL_PHOTO_OF_SANTEH,
  GET_ALL_PHOTO_OF_WINDOW_PL,
  GET_ONE_PHOTO_OF_ASFALT,
  GET_ONE_PHOTO_OF_ELEKTRO,
  GET_ONE_PHOTO_OF_EMERGENCY_WORK,
  GET_ONE_PHOTO_OF_FASAD,
  GET_ONE_PHOTO_OF_INSIDE_WORK,
  GET_ONE_PHOTO_OF_METALL_CONSTR,
  GET_ONE_PHOTO_OF_ROOF,
  GET_ONE_PHOTO_OF_SANTEH,
  GET_ONE_PHOTO_OF_WINDOW_PL,
  DELETE_PHOTO_OF_ASFALT,
  DELETE_PHOTO_OF_ELEKTRO,
  DELETE_PHOTO_OF_EMERGENCY_WORK,
  DELETE_PHOTO_OF_FASAD,
  DELETE_PHOTO_OF_INSIDE_WORK,
  DELETE_PHOTO_OF_METALL_CONSTR,
  DELETE_PHOTO_OF_ROOF,
  DELETE_PHOTO_OF_SANTEH,
  DELETE_PHOTO_OF_WINDOW_PL
} from './types';

export const getAllPhotoWork = typeOfImage => async dispatch => {
  let typeReducer;
  switch (typeOfImage) {
    case 'asfalt':
      typeReducer = GET_ALL_PHOTO_OF_ASFALT;
      break;
    case 'elektro':
      typeReducer = GET_ALL_PHOTO_OF_ELEKTRO;
      break;
    case 'emergencywork':
      typeReducer = GET_ALL_PHOTO_OF_EMERGENCY_WORK;
      break;
    case 'fasad':
      typeReducer = GET_ALL_PHOTO_OF_FASAD;
      break;
    case 'insidework':
      typeReducer = GET_ALL_PHOTO_OF_INSIDE_WORK;
      break;
    case 'metallconstr':
      typeReducer = GET_ALL_PHOTO_OF_METALL_CONSTR;
      break;
    case 'roof':
      typeReducer = GET_ALL_PHOTO_OF_ROOF;
      break;
    case 'santeh':
      typeReducer = GET_ALL_PHOTO_OF_SANTEH;
      break;
    case 'windowpl':
      typeReducer = GET_ALL_PHOTO_OF_WINDOW_PL;
      break;
    default:
      return '';
  }
  try {
    const result = await axios.get(`/api/v1/photo/${typeOfImage}`);
    dispatch({ type: typeReducer, payload: result.data.data });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOnePhotoWork = (imageId, typeOfImage) => async dispatch => {
  let typeReducer;
  switch (typeOfImage) {
    case 'asfalt':
      typeReducer = GET_ONE_PHOTO_OF_ASFALT;
      break;
    case 'elektro':
      typeReducer = GET_ONE_PHOTO_OF_ELEKTRO;
      break;
    case 'emergencywork':
      typeReducer = GET_ONE_PHOTO_OF_EMERGENCY_WORK;
      break;
    case 'fasad':
      typeReducer = GET_ONE_PHOTO_OF_FASAD;
      break;
    case 'insidework':
      typeReducer = GET_ONE_PHOTO_OF_INSIDE_WORK;
      break;
    case 'metallconstr':
      typeReducer = GET_ONE_PHOTO_OF_METALL_CONSTR;
      break;
    case 'roof':
      typeReducer = GET_ONE_PHOTO_OF_ROOF;
      break;
    case 'santeh':
      typeReducer = GET_ONE_PHOTO_OF_SANTEH;
      break;
    case 'windowpl':
      typeReducer = GET_ONE_PHOTO_OF_WINDOW_PL;
      break;
    default:
      return '';
  }

  try {
    const onePhoto = await axios.get(`/api/v1/photo/${typeOfImage}/${imageId}`);
    dispatch({
      type: typeReducer,
      payload: onePhoto.data
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const setPhotoWork = (file, typeOfImage) => async dispatch => {
  const photoFormData = new FormData();
  photoFormData.append('photoWork', file);
  // console.log(file);
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  };
  let photo;
  try {
    photo = await axios.post(
      `/api/v1/photo/${typeOfImage}`,
      photoFormData,
      config
    );
    dispatch(getAllPhotoWork(typeOfImage));
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }

  let typeReducer;
  switch (typeOfImage) {
    case 'asfalt':
      typeReducer = SET_PHOTO_OF_ASFALT;
      break;
    case 'elektro':
      typeReducer = SET_PHOTO_OF_ELEKTRO;
      break;
    case 'emergencywork':
      typeReducer = SET_PHOTO_OF_EMERGENCY_WORK;
      break;
    case 'fasad':
      typeReducer = SET_PHOTO_OF_FASAD;
      break;
    case 'insidework':
      typeReducer = SET_PHOTO_OF_INSIDE_WORK;
      break;
    case 'metallconstr':
      typeReducer = SET_PHOTO_OF_METALL_CONSTR;
      break;
    case 'roof':
      typeReducer = SET_PHOTO_OF_ROOF;
      break;
    case 'santeh':
      typeReducer = SET_PHOTO_OF_SANTEH;
      break;
    case 'windowpl':
      typeReducer = SET_PHOTO_OF_WINDOW_PL;
      break;
    default:
      return '';
  }

  dispatch({
    type: typeReducer,
    payload: photo.data
  });
};

export const deletePhotoWork = (imageId, typeOfImage) => async dispatch => {
  let typeReducer;
  switch (typeOfImage) {
    case 'asfalt':
      typeReducer = DELETE_PHOTO_OF_ASFALT;
      break;
    case 'elektro':
      typeReducer = DELETE_PHOTO_OF_ELEKTRO;
      break;
    case 'emergencywork':
      typeReducer = DELETE_PHOTO_OF_EMERGENCY_WORK;
      break;
    case 'fasad':
      typeReducer = DELETE_PHOTO_OF_FASAD;
      break;
    case 'insidework':
      typeReducer = DELETE_PHOTO_OF_INSIDE_WORK;
      break;
    case 'metallconstr':
      typeReducer = DELETE_PHOTO_OF_METALL_CONSTR;
      break;
    case 'roof':
      typeReducer = DELETE_PHOTO_OF_ROOF;
      break;
    case 'santeh':
      typeReducer = DELETE_PHOTO_OF_SANTEH;
      break;
    case 'windowpl':
      typeReducer = DELETE_PHOTO_OF_WINDOW_PL;
      break;
    default:
      return '';
  }

  try {
    await axios.delete(`/api/v1/photo/${typeOfImage}/${imageId}`);
    dispatch({
      type: typeReducer,
      payload: imageId
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
