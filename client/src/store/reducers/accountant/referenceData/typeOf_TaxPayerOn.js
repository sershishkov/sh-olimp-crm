import {
  SET_TYPE_OF_TAX_PAYER_ON,
  UPDATE_TYPE_OF_TAX_PAYER_ON,
  GET_ALL_TYPE_OF_TAX_PAYER_ONS,
  GET_ONE_TYPE_OF_TAX_PAYER_ON,
  DELETE_TYPE_OF_TAX_PAYER_ON
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_TAX_PAYER_ONS: [],
  one_TYPE_OF_TAX_PAYER_ON: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_TAX_PAYER_ON:
      return {
        ...state,
        arr_TYPE_OF_TAX_PAYER_ONS: [
          payload,
          ...state.arr_TYPE_OF_TAX_PAYER_ONS
        ],
        loading: false
      };

    case UPDATE_TYPE_OF_TAX_PAYER_ON:
      return {
        arr_TYPE_OF_TAX_PAYER_ONS: state.arr_TYPE_OF_TAX_PAYER_ONS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_TAX_PAYER_ONS:
      return {
        ...state,
        arr_TYPE_OF_TAX_PAYER_ONS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_TAX_PAYER_ON:
      return {
        ...state,
        one_TYPE_OF_TAX_PAYER_ON: payload,
        loading: false
      };

    case DELETE_TYPE_OF_TAX_PAYER_ON:
      return {
        ...state,
        arr_TYPE_OF_TAX_PAYER_ONS: state.arr_TYPE_OF_TAX_PAYER_ONS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
