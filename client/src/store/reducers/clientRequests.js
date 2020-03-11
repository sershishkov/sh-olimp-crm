import {
  SET_CLIENT_REQUEST,
  UPDATE_CLIENT_REQUEST,
  GET_ALL_CLIENT_REQUESTS,
  GET_ONE_CLIENT_REQUEST,
  DELETE_CLIENT_REQUEST
} from '../actions/types';

const initialState = {
  clientRequests: [],
  oneClientRequest: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CLIENT_REQUEST:
      return {
        ...state,
        clientRequests: [payload, ...state.clientRequests],
        loading: false
      };

    case UPDATE_CLIENT_REQUEST:
      return {
        clientRequests: state.clientRequests.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_CLIENT_REQUESTS:
      return {
        ...state,
        clientRequests: payload,
        loading: false
      };

    case GET_ONE_CLIENT_REQUEST:
      return {
        ...state,
        oneClientRequest: payload,
        loading: false
      };

    case DELETE_CLIENT_REQUEST:
      return {
        ...state,
        clientRequests: state.clientRequests.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
