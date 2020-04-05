import {
  SET_INDIVIDUAL_IMAGE_GROUP,
  UPDATE_INDIVIDUAL_IMAGE_GROUP,
  GET_ALL_INDIVIDUAL_IMAGE_GROUPS,
  GET_ONE_INDIVIDUAL_IMAGE_GROUP,
  DELETE_INDIVIDUAL_IMAGE_GROUP,
} from '../../../actions/types';

const initialState = {
  arr_INDIVIDUAL_IMAGE_GROUPS: [],
  one_INDIVIDUAL_IMAGE_GROUP: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_INDIVIDUAL_IMAGE_GROUP:
      return {
        ...state,
        arr_INDIVIDUAL_IMAGE_GROUPS: [
          payload,
          ...state.arr_INDIVIDUAL_IMAGE_GROUPS,
        ],
        loading: false,
      };

    case UPDATE_INDIVIDUAL_IMAGE_GROUP:
      return {
        arr_INDIVIDUAL_IMAGE_GROUPS: state.arr_INDIVIDUAL_IMAGE_GROUPS.map(
          (group) => (group._id === payload._id ? payload : group)
        ),
        loading: false,
      };

    case GET_ALL_INDIVIDUAL_IMAGE_GROUPS:
      return {
        ...state,
        arr_INDIVIDUAL_IMAGE_GROUPS: payload,
        loading: false,
      };

    case GET_ONE_INDIVIDUAL_IMAGE_GROUP:
      return {
        ...state,
        one_INDIVIDUAL_IMAGE_GROUP: payload,
        loading: false,
      };

    case DELETE_INDIVIDUAL_IMAGE_GROUP:
      return {
        ...state,
        arr_INDIVIDUAL_IMAGE_GROUPS: state.arr_INDIVIDUAL_IMAGE_GROUPS.filter(
          (item) => item.id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}
