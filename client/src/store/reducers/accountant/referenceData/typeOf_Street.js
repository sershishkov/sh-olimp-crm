import {
  SET_TYPE_OF_STREET,
  UPDATE_TYPE_OF_STREET,
  GET_ALL_TYPE_OF_STREETS,
  GET_ONE_TYPE_OF_STREET,
  DELETE_TYPE_OF_STREET
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_STREETS: [],
  one_TYPE_OF_STREET: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_STREET:
      return {
        ...state,
        arr_TYPE_OF_STREETS: [payload, ...state.arr_TYPE_OF_STREETS],
        loading: false
      };

    case UPDATE_TYPE_OF_STREET:
      return {
        arr_TYPE_OF_STREETS: state.arr_TYPE_OF_STREETS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_STREETS:
      return {
        ...state,
        arr_TYPE_OF_STREETS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_STREET:
      return {
        ...state,
        one_TYPE_OF_STREET: payload,
        loading: false
      };

    case DELETE_TYPE_OF_STREET:
      return {
        ...state,
        arr_TYPE_OF_STREETS: state.arr_TYPE_OF_STREETS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
