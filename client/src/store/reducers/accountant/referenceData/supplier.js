import {
  SET_SUPPLIER,
  UPDATE_SUPPLIER,
  GET_ALL_SUPPLIERS,
  GET_ONE_SUPPLIER,
  DELETE_SUPPLIER
} from '../../../actions/types';

const initialState = {
  arr_SUPPLIERS: [],
  one_SUPPLIER: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SUPPLIER:
      return {
        ...state,
        arr_SUPPLIERS: [payload, ...state.arr_SUPPLIERS],
        loading: false
      };

    case UPDATE_SUPPLIER:
      return {
        arr_SUPPLIERS: state.arr_SUPPLIERS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_SUPPLIERS:
      return {
        ...state,
        arr_SUPPLIERS: payload,
        loading: false
      };

    case GET_ONE_SUPPLIER:
      return {
        ...state,
        one_SUPPLIER: payload,
        loading: false
      };

    case DELETE_SUPPLIER:
      return {
        ...state,
        arr_SUPPLIERS: state.arr_SUPPLIERS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
