import {
  SET_INDIVIDUAL_PHOTO,
  UPDATE_INDIVIDUAL_PHOTO,
  GET_ALL_INDIVIDUAL_PHOTOS,
  GET_ONE_INDIVIDUAL_PHOTO,
  DELETE_INDIVIDUAL_PHOTO,
} from '../../../actions/types';

const initialState = {
  arr_INDIVIDUAL_PHOTOS: [],
  one_INDIVIDUAL_PHOTO: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_INDIVIDUAL_PHOTO:
      return {
        ...state,
        arr_INDIVIDUAL_PHOTOS: [payload, ...state.arr_INDIVIDUAL_PHOTOS],
        loading: false,
      };

    case UPDATE_INDIVIDUAL_PHOTO:
      return {
        arr_INDIVIDUAL_PHOTOS: state.arr_INDIVIDUAL_PHOTOS.map((group) =>
          group._id === payload._id ? payload : group
        ),
        loading: false,
      };

    case GET_ALL_INDIVIDUAL_PHOTOS:
      return {
        ...state,
        arr_INDIVIDUAL_PHOTOS: payload,
        loading: false,
      };

    case GET_ONE_INDIVIDUAL_PHOTO:
      return {
        ...state,
        one_INDIVIDUAL_PHOTO: payload,
        loading: false,
      };

    case DELETE_INDIVIDUAL_PHOTO:
      return {
        ...state,
        arr_INDIVIDUAL_PHOTOS: state.arr_INDIVIDUAL_PHOTOS.filter(
          (item) => item.id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}
