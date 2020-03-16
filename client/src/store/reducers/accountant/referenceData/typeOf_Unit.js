import {
  SET_TYPE_OF_UNIT,
  UPDATE_TYPE_OF_UNIT,
  GET_ALL_TYPE_OF_UNITS,
  GET_ONE_TYPE_OF_UNIT,
  DELETE_TYPE_OF_UNIT
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_UNITS: [],
  one_TYPE_OF_UNIT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_UNIT:
      return {
        ...state,
        arr_TYPE_OF_UNITS: [payload, ...state.arr_TYPE_OF_UNITS],
        loading: false
      };

    case UPDATE_TYPE_OF_UNIT:
      return {
        arr_TYPE_OF_UNITS: state.arr_TYPE_OF_UNITS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_UNITS:
      return {
        ...state,
        arr_TYPE_OF_UNITS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_UNIT:
      return {
        ...state,
        one_TYPE_OF_UNIT: payload,
        loading: false
      };

    case DELETE_TYPE_OF_UNIT:
      return {
        ...state,
        arr_TYPE_OF_UNITS: state.arr_TYPE_OF_UNITS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
