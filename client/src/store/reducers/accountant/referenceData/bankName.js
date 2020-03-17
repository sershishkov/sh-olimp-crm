import {
  SET_BANK_NAME,
  UPDATE_BANK_NAME,
  GET_ALL_BANK_NAMES,
  GET_ONE_BANK_NAME,
  DELETE_BANK_NAME
} from '../../../actions/types';

const initialState = {
  arr_BANK_NAMES: [],
  one_BANK_NAME: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_BANK_NAME:
      return {
        ...state,
        arr_BANK_NAMES: [payload, ...state.arr_BANK_NAMES],
        loading: false
      };

    case UPDATE_BANK_NAME:
      return {
        arr_BANK_NAMES: state.arr_BANK_NAMES.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_BANK_NAMES:
      return {
        ...state,
        arr_BANK_NAMES: payload,
        loading: false
      };

    case GET_ONE_BANK_NAME:
      return {
        ...state,
        one_BANK_NAME: payload,
        loading: false
      };

    case DELETE_BANK_NAME:
      return {
        ...state,
        arr_BANK_NAMES: state.arr_BANK_NAMES.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
