import {
  SET_STREET,
  UPDATE_STREET,
  GET_ALL_STREETS,
  GET_ONE_STREET,
  DELETE_STREET
} from '../../../actions/types';

const initialState = {
  arr_STREETS: [],
  one_STREET: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_STREET:
      return {
        ...state,
        arr_STREETS: [payload, ...state.arr_STREETS],
        loading: false
      };

    case UPDATE_STREET:
      return {
        arr_STREETS: state.arr_STREETS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_STREETS:
      return {
        ...state,
        arr_STREETS: payload,
        loading: false
      };

    case GET_ONE_STREET:
      return {
        ...state,
        one_STREET: payload,
        loading: false
      };

    case DELETE_STREET:
      return {
        ...state,
        arr_STREETS: state.arr_STREETS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
