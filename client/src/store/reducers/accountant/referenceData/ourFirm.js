import {
  SET_OUR_FIRM,
  UPDATE_OUR_FIRM,
  GET_ALL_OUR_FIRMS,
  GET_ONE_OUR_FIRM,
  DELETE_OUR_FIRM
} from '../../../actions/types';

const initialState = {
  arr_OUR_FIRMS: [],
  one_OUR_FIRM: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_FIRM:
      return {
        ...state,
        arr_OUR_FIRMS: [payload, ...state.arr_OUR_FIRMS],
        loading: false
      };

    case UPDATE_OUR_FIRM:
      return {
        arr_OUR_FIRMS: state.arr_OUR_FIRMS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_FIRMS:
      return {
        ...state,
        arr_OUR_FIRMS: payload,
        loading: false
      };

    case GET_ONE_OUR_FIRM:
      return {
        ...state,
        one_OUR_FIRM: payload,
        loading: false
      };

    case DELETE_OUR_FIRM:
      return {
        ...state,
        arr_OUR_FIRMS: state.arr_OUR_FIRMS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
