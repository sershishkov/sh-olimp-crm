import {
  SET_IMAGE_TYPE,
  UPDATE_IMAGE_TYPE,
  GET_ALL_IMAGE_TYPES,
  GET_ONE_IMAGE_TYPE,
  DELETE_IMAGE_TYPE
} from '../actions/types';

const initialState = {
  imageTypes: [],
  oneImageType: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_IMAGE_TYPE:
      return {
        ...state,
        imageTypes: [payload, ...state.imageTypes],
        loading: false
      };
    //TODO
    // case UPDATE_IMAGE_TYPE:
    // return {
    //   ...state,
    //   imageTypes: state.imageTypes.push(payload)
    // };

    case GET_ALL_IMAGE_TYPES:
      return {
        ...state,
        imageTypes: payload,
        loading: false
      };

    case GET_ONE_IMAGE_TYPE:
      return {
        ...state,
        oneImageType: payload,
        loading: false
      };

    case DELETE_IMAGE_TYPE:
      return {
        ...state,
        imageTypes: state.imageTypes.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
