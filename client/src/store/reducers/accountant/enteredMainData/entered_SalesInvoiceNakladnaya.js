import {
  SET_ENTERED_SALES_INVOICE_NAKLADNAYA,
  UPDATE_ENTERED_SALES_INVOICE_NAKLADNAYA,
  GET_ALL_ENTERED_SALES_INVOICE_NAKLADNAYAS,
  GET_ONE_ENTERED_SALES_INVOICE_NAKLADNAYA,
  DELETE_ENTERED_SALES_INVOICE_NAKLADNAYA
} from '../../../actions/types';

const initialState = {
  arr_ENTERED_SALES_INVOICE_NAKLADNAYAS: [],
  one_ENTERED_SALES_INVOICE_NAKLADNAYA: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENTERED_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        arr_ENTERED_SALES_INVOICE_NAKLADNAYAS: [
          payload,
          ...state.arr_ENTERED_SALES_INVOICE_NAKLADNAYAS
        ],
        loading: false
      };

    case UPDATE_ENTERED_SALES_INVOICE_NAKLADNAYA:
      return {
        arr_ENTERED_SALES_INVOICE_NAKLADNAYAS: state.arr_ENTERED_SALES_INVOICE_NAKLADNAYAS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_ENTERED_SALES_INVOICE_NAKLADNAYAS:
      return {
        ...state,
        arr_ENTERED_SALES_INVOICE_NAKLADNAYAS: payload,
        loading: false
      };

    case GET_ONE_ENTERED_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        one_ENTERED_SALES_INVOICE_NAKLADNAYA: payload,
        loading: false
      };

    case DELETE_ENTERED_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        arr_ENTERED_SALES_INVOICE_NAKLADNAYAS: state.arr_ENTERED_SALES_INVOICE_NAKLADNAYAS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
