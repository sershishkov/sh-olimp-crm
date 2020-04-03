import {
  SET_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  GET_ONE_USER,
  DELETE_USER
} from '../../../actions/types';

const initialState = {
  users: [],
  oneUser: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false
      };

    case UPDATE_USER:
      return {
        users: state.users.map(user =>
          user._id === payload._id ? payload : user
        ),
        loading: false
      };

    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };

    case GET_ONE_USER:
      return {
        ...state,
        oneUser: payload,
        loading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
