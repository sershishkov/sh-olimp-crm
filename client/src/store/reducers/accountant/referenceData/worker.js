import {
  SET_WORKER,
  UPDATE_WORKER,
  GET_ALL_WORKERS,
  GET_ONE_WORKER,
  DELETE_WORKER
} from '../../../actions/types';

const initialState = {
  arr_WORKERS: [],
  one_WORKER: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_WORKER:
      return {
        ...state,
        arr_WORKERS: [payload, ...state.arr_WORKERS],
        loading: false
      };

    case UPDATE_WORKER:
      return {
        arr_WORKERS: state.arr_WORKERS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_WORKERS:
      return {
        ...state,
        arr_WORKERS: payload,
        loading: false
      };

    case GET_ONE_WORKER:
      return {
        ...state,
        one_WORKER: payload,
        loading: false
      };

    case DELETE_WORKER:
      return {
        ...state,
        arr_WORKERS: state.arr_WORKERS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
