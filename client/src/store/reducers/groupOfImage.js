import {
  SET_IMAGE_GROUP,
  UPDATE_IMAGE_GROUP,
  GET_ALL_IMAGE_GROUPS,
  GET_ONE_IMAGE_GROUP,
  DELETE_IMAGE_GROUP
} from '../actions/types';

const initialState = {
  imageGroups: [],
  oneImageGroups: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_IMAGE_GROUP:
      return {
        ...state,
        imageGroups: [payload, ...state.imageGroups],
        loading: false
      };
    //TODO
    // case UPDATE_IMAGE_GROUP:
    // return {
    //
    // };

    case GET_ALL_IMAGE_GROUPS:
      return {
        ...state,
        imageGroups: payload,
        loading: false
      };

    case GET_ONE_IMAGE_GROUP:
      return {
        ...state,
        oneImageGroups: payload,
        loading: false
      };

    case DELETE_IMAGE_GROUP:
      return {
        ...state,
        imageGroups: state.imageGroups.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
