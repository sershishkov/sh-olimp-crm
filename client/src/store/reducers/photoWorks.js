import {
  SET_PHOTO,
  GET_ALL_PHOTOS,
  GET_ONE_PHOTO,
  DELETE_PHOTO
} from '../actions/types';

const initialState = {
  photoWorks: [],
  onePhoto: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PHOTO:
      return {
        ...state,
        photoWorks: state.photoWorks.push(payload),
        loading: false
      };

    case GET_ALL_PHOTOS:
      return {
        ...state,
        photoWorks: payload,
        loading: false
      };

    case GET_ONE_PHOTO:
      return {
        ...state,
        onePhoto: payload,
        loading: false
      };

    case DELETE_PHOTO:
      return {
        ...state,
        photoWorks: state.photoWorks.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
