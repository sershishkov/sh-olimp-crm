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
} from '../actions/types';

const initialState = {
  photoAsfalt: [],
  photoEmergencyWork: [],
  photoFasad: [],
  photoInsideWork: [],
  photoMetallConstr: [],
  photoRoof: [],
  photoSantex: [],
  photoWindowsPl: [],
  photoElektro: [],

  onePhotoAsfalt: {},
  onePhotoEmergencyWork: {},
  onePhotoFasad: {},
  onePhotoInsideWork: {},
  onePhotoMetallConstr: {},
  onePhotoRoof: {},
  onePhotoSantex: {},
  onePhotoWindowsPl: {},
  onePhotoElektro: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PHOTO_OF_ASFALT:
      return {
        ...state,
        photoAsfalt: state.photoAsfalt.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_ELEKTRO:
      return {
        ...state,
        photoElektro: state.photoElektro.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_EMERGENCY_WORK:
      return {
        ...state,
        photoEmergencyWork: state.photoEmergencyWork.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_FASAD:
      return {
        ...state,
        photoFasad: state.photoFasad.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_INSIDE_WORK:
      return {
        ...state,
        photoInsideWork: state.photoInsideWork.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_METALL_CONSTR:
      return {
        ...state,
        photoMetallConstr: state.photoMetallConstr.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_ROOF:
      return {
        ...state,
        photoRoof: state.photoRoof.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_SANTEH:
      return {
        ...state,
        photoSantex: state.photoSantex.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    case SET_PHOTO_OF_WINDOW_PL:
      return {
        ...state,
        photoWindowsPl: state.photoWindowsPl.push({
          id: payload.id,
          imageUrl: payload.image
        })
      };

    ////////GET ALL///////////////////////////////////////////////////////////////
    case GET_ALL_PHOTO_OF_ASFALT:
      return {
        ...state,
        photoAsfalt: payload
      };

    case GET_ALL_PHOTO_OF_ELEKTRO:
      return {
        ...state,
        photoElektro: payload
      };

    case GET_ALL_PHOTO_OF_EMERGENCY_WORK:
      return {
        ...state,
        photoEmergencyWork: payload
      };

    case GET_ALL_PHOTO_OF_FASAD:
      return {
        ...state,
        photoFasad: payload
      };

    case GET_ALL_PHOTO_OF_INSIDE_WORK:
      return {
        ...state,
        photoInsideWork: payload
      };

    case GET_ALL_PHOTO_OF_METALL_CONSTR:
      return {
        ...state,
        photoMetallConstr: payload
      };

    case GET_ALL_PHOTO_OF_ROOF:
      return {
        ...state,
        photoRoof: payload
      };

    case GET_ALL_PHOTO_OF_SANTEH:
      return {
        ...state,
        photoSantex: payload
      };

    case GET_ALL_PHOTO_OF_WINDOW_PL:
      return {
        ...state,
        photoAsfalt: payload
      };

    ///////GET ONE////////////////////////////////////////////////////////////////
    case GET_ONE_PHOTO_OF_ASFALT:
      return {
        ...state,
        onePhotoAsfalt: payload
      };

    case GET_ONE_PHOTO_OF_ELEKTRO:
      return {
        ...state,
        onePhotoElektro: payload
      };

    case GET_ONE_PHOTO_OF_EMERGENCY_WORK:
      return {
        ...state,
        onePhotoEmergencyWork: payload
      };

    case GET_ONE_PHOTO_OF_FASAD:
      return {
        ...state,
        onePhotoFasad: payload
      };

    case GET_ONE_PHOTO_OF_INSIDE_WORK:
      return {
        ...state,
        onePhotoInsideWork: payload
      };

    case GET_ONE_PHOTO_OF_METALL_CONSTR:
      return {
        ...state,
        onePhotoMetallConstr: payload
      };

    case GET_ONE_PHOTO_OF_ROOF:
      return {
        ...state,
        onePhotoRoof: payload
      };

    case GET_ONE_PHOTO_OF_SANTEH:
      return {
        ...state,
        onePhotoSantex: payload
      };

    case GET_ONE_PHOTO_OF_WINDOW_PL:
      return {
        ...state,
        onePhotoWindowsPl: payload
      };

    //////DELETE ONE//////////////////////////////////////////////////////////////////

    case DELETE_PHOTO_OF_ASFALT:
      return {
        ...state,
        photoAsfalt: state.photoAsfalt.filter(item => item.id !== payload)
      };

    case DELETE_PHOTO_OF_ELEKTRO:
      return {
        ...state,
        photoElektro: state.photoElektro.filter(item => item.id !== payload)
      };

    case DELETE_PHOTO_OF_EMERGENCY_WORK:
      return {
        ...state,
        photoEmergencyWork: state.photoEmergencyWork.filter(
          item => item.id !== payload
        )
      };

    case DELETE_PHOTO_OF_FASAD:
      return {
        ...state,
        photoFasad: state.photoFasad.filter(item => item.id !== payload)
      };

    case DELETE_PHOTO_OF_INSIDE_WORK:
      return {
        ...state,
        photoInsideWork: state.photoInsideWork.filter(
          item => item.id !== payload
        )
      };

    case DELETE_PHOTO_OF_METALL_CONSTR:
      return {
        ...state,
        photoMetallConstr: state.photoMetallConstr.filter(
          item => item.id !== payload
        )
      };

    case DELETE_PHOTO_OF_ROOF:
      return {
        ...state,
        photoRoof: state.photoRoof.filter(item => item.id !== payload)
      };

    case DELETE_PHOTO_OF_SANTEH:
      return {
        ...state,
        photoSantex: state.photoSantex.filter(item => item.id !== payload)
      };

    case DELETE_PHOTO_OF_WINDOW_PL:
      return {
        ...state,
        photoWindowsPl: state.photoWindowsPl.filter(item => item.id !== payload)
      };

    default:
      return state;
  }
}
