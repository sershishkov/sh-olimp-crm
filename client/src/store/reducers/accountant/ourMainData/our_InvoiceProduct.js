import {
  SET_OUR_INVOICE_PRODUCT,
  UPDATE_OUR_INVOICE_PRODUCT,
  GET_ALL_OUR_INVOICE_PRODUCTS,
  GET_ONE_OUR_INVOICE_PRODUCT,
  DELETE_OUR_INVOICE_PRODUCT
} from '../../../actions/types';

const initialState = {
  arr_OUR_INVOICE_PRODUCTS: [],
  one_OUR_INVOICE_PRODUCT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_INVOICE_PRODUCT:
      return {
        ...state,
        arr_OUR_INVOICE_PRODUCTS: [payload, ...state.arr_OUR_INVOICE_PRODUCTS],
        loading: false
      };

    case UPDATE_OUR_INVOICE_PRODUCT:
      return {
        arr_OUR_INVOICE_PRODUCTS: state.arr_OUR_INVOICE_PRODUCTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_INVOICE_PRODUCTS:
      return {
        ...state,
        arr_OUR_INVOICE_PRODUCTS: payload,
        loading: false
      };

    case GET_ONE_OUR_INVOICE_PRODUCT:
      return {
        ...state,
        one_OUR_INVOICE_PRODUCT: payload,
        loading: false
      };

    case DELETE_OUR_INVOICE_PRODUCT:
      return {
        ...state,
        arr_OUR_INVOICE_PRODUCTS: state.arr_OUR_INVOICE_PRODUCTS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
