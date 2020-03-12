import {
  SET_CATEGORY_OF_CLIENT,
  UPDATE_CATEGORY_OF_CLIENT,
  GET_ALL_CATEGORY_OF_CLIENTS,
  GET_ONE_CATEGORY_OF_CLIENT,
  DELETE_CATEGORY_OF_CLIENT
} from '../actions/types';

const initialState = {
  clientCategorys: [],
  oneClientCategory: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORY_OF_CLIENT:
      return {
        ...state,
        clientCategorys: [payload, ...state.clientCategorys],
        loading: false
      };

    case UPDATE_CATEGORY_OF_CLIENT:
      return {
        clientCategorys: state.clientCategorys.map(group =>
          group._id === payload._id ? payload : group
        ),
        loading: false
      };

    case GET_ALL_CATEGORY_OF_CLIENTS:
      return {
        ...state,
        clientCategorys: payload,
        loading: false
      };

    case GET_ONE_CATEGORY_OF_CLIENT:
      return {
        ...state,
        oneClientCategory: payload,
        loading: false
      };

    case DELETE_CATEGORY_OF_CLIENT:
      return {
        ...state,
        clientCategorys: state.clientCategorys.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
