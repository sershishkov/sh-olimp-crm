import {
  SET_CLIENT,
  UPDATE_CLIENT,
  GET_ALL_CLIENTS,
  GET_ONE_CLIENT,
  DELETE_CLIENT
} from '../../../actions/types';

const initialState = {
  arr_CLIENTS: [],
  one_CLIENT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CLIENT:
      return {
        ...state,
        arr_CLIENTS: [payload, ...state.arr_CLIENTS],
        loading: false
      };

    case UPDATE_CLIENT:
      return {
        arr_CLIENTS: state.arr_CLIENTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_CLIENTS:
      return {
        ...state,
        arr_CLIENTS: payload,
        loading: false
      };

    case GET_ONE_CLIENT:
      return {
        ...state,
        one_CLIENT: payload,
        loading: false
      };

    case DELETE_CLIENT:
      return {
        ...state,
        arr_CLIENTS: state.arr_CLIENTS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
