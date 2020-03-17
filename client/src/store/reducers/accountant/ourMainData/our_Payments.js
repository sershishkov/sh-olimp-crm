import {
  SET_OUR_PAYMENT,
  UPDATE_OUR_PAYMENT,
  GET_ALL_OUR_PAYMENTS,
  GET_ONE_OUR_PAYMENT,
  DELETE_OUR_PAYMENT
} from '../../../actions/types';

const initialState = {
  arr_OUR_PAYMENTS: [],
  one_OUR_PAYMENT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_PAYMENT:
      return {
        ...state,
        arr_OUR_PAYMENTS: [payload, ...state.arr_OUR_PAYMENTS],
        loading: false
      };

    case UPDATE_OUR_PAYMENT:
      return {
        arr_OUR_PAYMENTS: state.arr_OUR_PAYMENTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_PAYMENTS:
      return {
        ...state,
        arr_OUR_PAYMENTS: payload,
        loading: false
      };

    case GET_ONE_OUR_PAYMENT:
      return {
        ...state,
        one_OUR_PAYMENT: payload,
        loading: false
      };

    case DELETE_OUR_PAYMENT:
      return {
        ...state,
        arr_OUR_PAYMENTS: state.arr_OUR_PAYMENTS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
