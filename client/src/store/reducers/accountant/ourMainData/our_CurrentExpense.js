import {
  SET_OUR_CURRENT_EXPENSE,
  UPDATE_OUR_CURRENT_EXPENSE,
  GET_ALL_OUR_CURRENT_EXPENSES,
  GET_ONE_OUR_CURRENT_EXPENSE,
  DELETE_OUR_CURRENT_EXPENSE
} from '../../../actions/types';

const initialState = {
  arr_OUR_CURRENT_EXPENSES: [],
  one_OUR_CURRENT_EXPENSE: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_CURRENT_EXPENSE:
      return {
        ...state,
        arr_OUR_CURRENT_EXPENSES: [payload, ...state.arr_OUR_CURRENT_EXPENSES],
        loading: false
      };

    case UPDATE_OUR_CURRENT_EXPENSE:
      return {
        arr_OUR_CURRENT_EXPENSES: state.arr_OUR_CURRENT_EXPENSES.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_CURRENT_EXPENSES:
      return {
        ...state,
        arr_OUR_CURRENT_EXPENSES: payload,
        loading: false
      };

    case GET_ONE_OUR_CURRENT_EXPENSE:
      return {
        ...state,
        one_OUR_CURRENT_EXPENSE: payload,
        loading: false
      };

    case DELETE_OUR_CURRENT_EXPENSE:
      return {
        ...state,
        arr_OUR_CURRENT_EXPENSES: state.arr_OUR_CURRENT_EXPENSES.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
