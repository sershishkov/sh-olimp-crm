import {
  SET_OBLAST,
  UPDATE_OBLAST,
  GET_ALL_OBLASTS,
  GET_ONE_OBLAST,
  DELETE_OBLAST
} from '../../../actions/types';

const initialState = {
  arr_OBLASTS: [],
  one_OBLAST: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OBLAST:
      return {
        ...state,
        arr_OBLASTS: [payload, ...state.arr_OBLASTS],
        loading: false
      };

    case UPDATE_OBLAST:
      return {
        arr_OBLASTS: state.arr_OBLASTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OBLASTS:
      return {
        ...state,
        arr_OBLASTS: payload,
        loading: false
      };

    case GET_ONE_OBLAST:
      return {
        ...state,
        one_OBLAST: payload,
        loading: false
      };

    case DELETE_OBLAST:
      return {
        ...state,
        arr_OBLASTS: state.arr_OBLASTS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
