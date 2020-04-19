import {
  SET_ENTERED_INVOICE_MIXED,
  UPDATE_ENTERED_INVOICE_MIXED,
  GET_ALL_ENTERED_INVOICE_MIXEDS,
  GET_ONE_ENTERED_INVOICE_MIXED,
  DELETE_ENTERED_INVOICE_MIXED
} from '../../../actions/types';

const initialState = {
  arr_ENTERED_INVOICE_MIXEDS: [],
  one_ENTERED_INVOICE_MIXED: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENTERED_INVOICE_MIXED:
      return {
        ...state,
        arr_ENTERED_INVOICE_MIXEDS: [
          payload,
          ...state.arr_ENTERED_INVOICE_MIXEDS
        ],
        loading: false
      };

    case UPDATE_ENTERED_INVOICE_MIXED:
      return {
        arr_ENTERED_INVOICE_MIXEDS: state.arr_ENTERED_INVOICE_MIXEDS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_ENTERED_INVOICE_MIXEDS:
      return {
        ...state,
        arr_ENTERED_INVOICE_MIXEDS: payload,
        loading: false
      };

    case GET_ONE_ENTERED_INVOICE_MIXED:
      return {
        ...state,
        one_ENTERED_INVOICE_MIXED: payload,
        loading: false
      };

    case DELETE_ENTERED_INVOICE_MIXED:
      return {
        ...state,
        arr_ENTERED_INVOICE_MIXEDS: state.arr_ENTERED_INVOICE_MIXEDS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
