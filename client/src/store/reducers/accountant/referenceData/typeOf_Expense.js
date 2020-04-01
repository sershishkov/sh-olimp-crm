import {
  SET_TYPE_OF_EXPENSE,
  UPDATE_TYPE_OF_EXPENSE,
  GET_ALL_TYPE_OF_EXPENSES,
  GET_ONE_TYPE_OF_EXPENSE,
  DELETE_TYPE_OF_EXPENSE
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_EXPENSES: [],
  one_TYPE_OF_EXPENSE: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_EXPENSE:
      return {
        ...state,
        arr_TYPE_OF_EXPENSES: [payload, ...state.arr_TYPE_OF_EXPENSES],
        loading: false
      };

    case UPDATE_TYPE_OF_EXPENSE:
      return {
        arr_TYPE_OF_EXPENSES: state.arr_TYPE_OF_EXPENSES.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_EXPENSES:
      return {
        ...state,
        arr_TYPE_OF_EXPENSES: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_EXPENSE:
      return {
        ...state,
        one_TYPE_OF_EXPENSE: payload,
        loading: false
      };

    case DELETE_TYPE_OF_EXPENSE:
      return {
        ...state,
        arr_TYPE_OF_EXPENSES: state.arr_TYPE_OF_EXPENSES.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
