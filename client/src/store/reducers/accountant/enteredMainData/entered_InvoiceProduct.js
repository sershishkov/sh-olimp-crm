import {
  SET_ENTERED_INVOICE_PRODUCT,
  UPDATE_ENTERED_INVOICE_PRODUCT,
  GET_ALL_ENTERED_INVOICE_PRODUCTS,
  GET_ONE_ENTERED_INVOICE_PRODUCT,
  DELETE_ENTERED_INVOICE_PRODUCT
} from '../../../actions/types';

const initialState = {
  arr_ENTERED_INVOICE_PRODUCTS: [],
  one_ENTERED_INVOICE_PRODUCT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENTERED_INVOICE_PRODUCT:
      return {
        ...state,
        arr_ENTERED_INVOICE_PRODUCTS: [
          payload,
          ...state.arr_ENTERED_INVOICE_PRODUCTS
        ],
        loading: false
      };

    case UPDATE_ENTERED_INVOICE_PRODUCT:
      return {
        arr_ENTERED_INVOICE_PRODUCTS: state.arr_ENTERED_INVOICE_PRODUCTS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_ENTERED_INVOICE_PRODUCTS:
      return {
        ...state,
        arr_ENTERED_INVOICE_PRODUCTS: payload,
        loading: false
      };

    case GET_ONE_ENTERED_INVOICE_PRODUCT:
      return {
        ...state,
        one_ENTERED_INVOICE_PRODUCT: payload,
        loading: false
      };

    case DELETE_ENTERED_INVOICE_PRODUCT:
      return {
        ...state,
        arr_ENTERED_INVOICE_PRODUCTS: state.arr_ENTERED_INVOICE_PRODUCTS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
