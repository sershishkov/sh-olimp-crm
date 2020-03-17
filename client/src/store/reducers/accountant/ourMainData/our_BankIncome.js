import {
  SET_OUR_BANK_INCOME,
  UPDATE_OUR_BANK_INCOME,
  GET_ALL_OUR_BANK_INCOMES,
  GET_ONE_OUR_BANK_INCOME,
  DELETE_OUR_BANK_INCOME
} from '../../../actions/types';

const initialState = {
  arr_OUR_BANK_INCOMES: [],
  one_OUR_BANK_INCOME: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_BANK_INCOME:
      return {
        ...state,
        arr_OUR_BANK_INCOMES: [payload, ...state.arr_OUR_BANK_INCOMES],
        loading: false
      };

    case UPDATE_OUR_BANK_INCOME:
      return {
        arr_OUR_BANK_INCOMES: state.arr_OUR_BANK_INCOMES.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_BANK_INCOMES:
      return {
        ...state,
        arr_OUR_BANK_INCOMES: payload,
        loading: false
      };

    case GET_ONE_OUR_BANK_INCOME:
      return {
        ...state,
        one_OUR_BANK_INCOME: payload,
        loading: false
      };

    case DELETE_OUR_BANK_INCOME:
      return {
        ...state,
        arr_OUR_BANK_INCOMES: state.arr_OUR_BANK_INCOMES.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
