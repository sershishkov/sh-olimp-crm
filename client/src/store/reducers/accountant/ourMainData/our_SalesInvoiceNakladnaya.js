import {
  SET_OUR_SALES_INVOICE_NAKLADNAYA,
  UPDATE_OUR_SALES_INVOICE_NAKLADNAYA,
  GET_ALL_OUR_SALES_INVOICE_NAKLADNAYAS,
  GET_ONE_OUR_SALES_INVOICE_NAKLADNAYA,
  DELETE_OUR_SALES_INVOICE_NAKLADNAYA
} from '../../../actions/types';

const initialState = {
  arr_OUR_SALES_INVOICE_NAKLADNAYAS: [],
  one_OUR_SALES_INVOICE_NAKLADNAYA: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        arr_OUR_SALES_INVOICE_NAKLADNAYAS: [
          payload,
          ...state.arr_OUR_SALES_INVOICE_NAKLADNAYAS
        ],
        loading: false
      };

    case UPDATE_OUR_SALES_INVOICE_NAKLADNAYA:
      return {
        arr_OUR_SALES_INVOICE_NAKLADNAYAS: state.arr_OUR_SALES_INVOICE_NAKLADNAYAS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_OUR_SALES_INVOICE_NAKLADNAYAS:
      return {
        ...state,
        arr_OUR_SALES_INVOICE_NAKLADNAYAS: payload,
        loading: false
      };

    case GET_ONE_OUR_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        one_OUR_SALES_INVOICE_NAKLADNAYA: payload,
        loading: false
      };

    case DELETE_OUR_SALES_INVOICE_NAKLADNAYA:
      return {
        ...state,
        arr_OUR_SALES_INVOICE_NAKLADNAYAS: state.arr_OUR_SALES_INVOICE_NAKLADNAYAS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
