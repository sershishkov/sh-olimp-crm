import {
  SET_UNIT,
  UPDATE_UNIT,
  GET_ALL_UNITS,
  GET_ONE_UNIT,
  DELETE_UNIT
} from '../../../actions/types';

const initialState = {
  arr_UNITS: [],
  one_UNIT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_UNIT:
      return {
        ...state,
        arr_UNITS: [payload, ...state.arr_UNITS],
        loading: false
      };

    case UPDATE_UNIT:
      return {
        arr_UNITS: state.arr_UNITS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_UNITS:
      return {
        ...state,
        arr_UNITS: payload,
        loading: false
      };

    case GET_ONE_UNIT:
      return {
        ...state,
        one_UNIT: payload,
        loading: false
      };

    case DELETE_UNIT:
      return {
        ...state,
        arr_UNITS: state.arr_UNITS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
