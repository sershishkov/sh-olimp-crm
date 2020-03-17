import {
  SET_TYPE_OF_FIRM,
  UPDATE_TYPE_OF_FIRM,
  GET_ALL_TYPE_OF_FIRMS,
  GET_ONE_TYPE_OF_FIRM,
  DELETE_TYPE_OF_FIRM
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_FIRMS: [],
  one_TYPE_OF_FIRM: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_FIRM:
      return {
        ...state,
        arr_TYPE_OF_FIRMS: [payload, ...state.arr_TYPE_OF_FIRMS],
        loading: false
      };

    case UPDATE_TYPE_OF_FIRM:
      return {
        arr_TYPE_OF_FIRMS: state.arr_TYPE_OF_FIRMS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_FIRMS:
      return {
        ...state,
        arr_TYPE_OF_FIRMS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_FIRM:
      return {
        ...state,
        one_TYPE_OF_FIRM: payload,
        loading: false
      };

    case DELETE_TYPE_OF_FIRM:
      return {
        ...state,
        arr_TYPE_OF_FIRMS: state.arr_TYPE_OF_FIRMS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
