import {
  SET_OUR_WORKERS_SALARY,
  UPDATE_OUR_WORKERS_SALARY,
  GET_ALL_OUR_WORKERS_SALARYS,
  GET_ONE_OUR_WORKERS_SALARY,
  DELETE_OUR_WORKERS_SALARY
} from '../../../actions/types';

const initialState = {
  arr_OUR_WORKERS_SALARYS: [],
  one_OUR_WORKERS_SALARY: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_WORKERS_SALARY:
      return {
        ...state,
        arr_OUR_WORKERS_SALARYS: [payload, ...state.arr_OUR_WORKERS_SALARYS],
        loading: false
      };

    case UPDATE_OUR_WORKERS_SALARY:
      return {
        arr_OUR_WORKERS_SALARYS: state.arr_OUR_WORKERS_SALARYS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_OUR_WORKERS_SALARYS:
      return {
        ...state,
        arr_OUR_WORKERS_SALARYS: payload,
        loading: false
      };

    case GET_ONE_OUR_WORKERS_SALARY:
      return {
        ...state,
        one_OUR_WORKERS_SALARY: payload,
        loading: false
      };

    case DELETE_OUR_WORKERS_SALARY:
      return {
        ...state,
        arr_OUR_WORKERS_SALARYS: state.arr_OUR_WORKERS_SALARYS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
