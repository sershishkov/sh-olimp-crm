import {
  SET_PHONE_OPERATOR,
  UPDATE_PHONE_OPERATOR,
  GET_ALL_PHONE_OPERATORS,
  GET_ONE_PHONE_OPERATOR,
  DELETE_PHONE_OPERATOR
} from '../../../actions/types';

const initialState = {
  operatorCodes: [],
  oneOperatorCode: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PHONE_OPERATOR:
      return {
        ...state,
        operatorCodes: [payload, ...state.operatorCodes],
        loading: false
      };

    case UPDATE_PHONE_OPERATOR:
      return {
        operatorCodes: state.operatorCodes.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_PHONE_OPERATORS:
      return {
        ...state,
        operatorCodes: payload,
        loading: false
      };

    case GET_ONE_PHONE_OPERATOR:
      return {
        ...state,
        oneOperatorCode: payload,
        loading: false
      };

    case DELETE_PHONE_OPERATOR:
      return {
        ...state,
        operatorCodes: state.operatorCodes.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
