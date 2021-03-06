import {
  SET_OUR_CERTIFICATE_OF_COMPLETION,
  UPDATE_OUR_CERTIFICATE_OF_COMPLETION,
  GET_ALL_OUR_CERTIFICATE_OF_COMPLETIONS,
  GET_ONE_OUR_CERTIFICATE_OF_COMPLETION,
  DELETE_OUR_CERTIFICATE_OF_COMPLETION
} from '../../../actions/types';

const initialState = {
  arr_OUR_CERTIFICATE_OF_COMPLETIONS: [],
  one_OUR_CERTIFICATE_OF_COMPLETION: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_CERTIFICATE_OF_COMPLETION:
      return {
        ...state,
        arr_OUR_CERTIFICATE_OF_COMPLETIONS: [
          payload,
          ...state.arr_OUR_CERTIFICATE_OF_COMPLETIONS
        ],
        loading: false
      };

    case UPDATE_OUR_CERTIFICATE_OF_COMPLETION:
      return {
        arr_OUR_CERTIFICATE_OF_COMPLETIONS: state.arr_OUR_CERTIFICATE_OF_COMPLETIONS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_OUR_CERTIFICATE_OF_COMPLETIONS:
      return {
        ...state,
        arr_OUR_CERTIFICATE_OF_COMPLETIONS: payload,
        loading: false
      };

    case GET_ONE_OUR_CERTIFICATE_OF_COMPLETION:
      return {
        ...state,
        one_OUR_CERTIFICATE_OF_COMPLETION: payload,
        loading: false
      };

    case DELETE_OUR_CERTIFICATE_OF_COMPLETION:
      return {
        ...state,
        arr_OUR_CERTIFICATE_OF_COMPLETIONS: state.arr_OUR_CERTIFICATE_OF_COMPLETIONS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
