import {
  SET_GROUP_OF_PRODUCT,
  UPDATE_GROUP_OF_PRODUCT,
  GET_ALL_GROUP_OF_PRODUCTS,
  GET_ONE_GROUP_OF_PRODUCT,
  DELETE_GROUP_OF_PRODUCT
} from '../../../actions/types';

const initialState = {
  arr_GROUP_OF_PRODUCTS: [],
  one_GROUP_OF_PRODUCT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_GROUP_OF_PRODUCT:
      return {
        ...state,
        arr_GROUP_OF_PRODUCTS: [payload, ...state.arr_GROUP_OF_PRODUCTS],
        loading: false
      };

    case UPDATE_GROUP_OF_PRODUCT:
      return {
        arr_GROUP_OF_PRODUCTS: state.arr_GROUP_OF_PRODUCTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_GROUP_OF_PRODUCTS:
      return {
        ...state,
        arr_GROUP_OF_PRODUCTS: payload,
        loading: false
      };

    case GET_ONE_GROUP_OF_PRODUCT:
      return {
        ...state,
        one_GROUP_OF_PRODUCT: payload,
        loading: false
      };

    case DELETE_GROUP_OF_PRODUCT:
      return {
        ...state,
        arr_GROUP_OF_PRODUCTS: state.arr_GROUP_OF_PRODUCTS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
