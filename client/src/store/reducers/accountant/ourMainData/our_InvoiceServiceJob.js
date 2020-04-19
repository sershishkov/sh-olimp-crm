import {
  SET_OUR_INVOICE_SERVICE_JOB,
  UPDATE_OUR_INVOICE_SERVICE_JOB,
  GET_ALL_OUR_INVOICE_SERVICE_JOBS,
  GET_ONE_OUR_INVOICE_SERVICE_JOB,
  DELETE_OUR_INVOICE_SERVICE_JOB
} from '../../../actions/types';

const initialState = {
  arr_OUR_INVOICE_SERVICE_JOBS: [],
  one_OUR_INVOICE_SERVICE_JOB: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OUR_INVOICE_SERVICE_JOB:
      return {
        ...state,
        arr_OUR_INVOICE_SERVICE_JOBS: [
          payload,
          ...state.arr_OUR_INVOICE_SERVICE_JOBS
        ],
        loading: false
      };

    case UPDATE_OUR_INVOICE_SERVICE_JOB:
      return {
        arr_OUR_INVOICE_SERVICE_JOBS: state.arr_OUR_INVOICE_SERVICE_JOBS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_OUR_INVOICE_SERVICE_JOBS:
      return {
        ...state,
        arr_OUR_INVOICE_SERVICE_JOBS: payload,
        loading: false
      };

    case GET_ONE_OUR_INVOICE_SERVICE_JOB:
      return {
        ...state,
        one_OUR_INVOICE_SERVICE_JOB: payload,
        loading: false
      };

    case DELETE_OUR_INVOICE_SERVICE_JOB:
      return {
        ...state,
        arr_OUR_INVOICE_SERVICE_JOBS: state.arr_OUR_INVOICE_SERVICE_JOBS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
