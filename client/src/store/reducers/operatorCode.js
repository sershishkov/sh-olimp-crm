import {
  SET_OPERATOR_CODE,
  UPDATE_OPERATOR_CODE,
  GET_ALL_OPERATOR_CODES,
  GET_ONE_OPERATOR_CODE,
  DELETE_OPERATOR_CODE
} from '../actions/types';

const initialState = {
  operatorCodes: [],
  oneOperatorCode: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OPERATOR_CODE:
      return {
        ...state,
        operatorCodes: [payload, ...state.operatorCodes],
        loading: false
      };

    case UPDATE_OPERATOR_CODE:
      return {
        operatorCodes: state.operatorCodes.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OPERATOR_CODES:
      return {
        ...state,
        operatorCodes: payload,
        loading: false
      };

    case GET_ONE_OPERATOR_CODE:
      return {
        ...state,
        oneOperatorCode: payload,
        loading: false
      };

    case DELETE_OPERATOR_CODE:
      return {
        ...state,
        operatorCodes: state.operatorCodes.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
