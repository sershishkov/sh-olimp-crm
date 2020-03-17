import {
  SET_PRODUCT,
  UPDATE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ONE_PRODUCT,
  DELETE_PRODUCT
} from '../../../actions/types';

const initialState = {
  arr_PRODUCTS: [],
  one_PRODUCT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PRODUCT:
      return {
        ...state,
        arr_PRODUCTS: [payload, ...state.arr_PRODUCTS],
        loading: false
      };

    case UPDATE_PRODUCT:
      return {
        arr_PRODUCTS: state.arr_PRODUCTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        arr_PRODUCTS: payload,
        loading: false
      };

    case GET_ONE_PRODUCT:
      return {
        ...state,
        one_PRODUCT: payload,
        loading: false
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        arr_PRODUCTS: state.arr_PRODUCTS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
