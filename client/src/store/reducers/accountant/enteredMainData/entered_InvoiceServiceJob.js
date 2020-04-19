import {
  SET_ENTERED_INVOICE_SERVICE_JOB,
  UPDATE_ENTERED_INVOICE_SERVICE_JOB,
  GET_ALL_ENTERED_INVOICE_SERVICE_JOBS,
  GET_ONE_ENTERED_INVOICE_SERVICE_JOB,
  DELETE_ENTERED_INVOICE_SERVICE_JOB
} from '../../../actions/types';

const initialState = {
  arr_ENTERED_INVOICE_SERVICE_JOBS: [],
  one_ENTERED_INVOICE_SERVICE_JOB: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ENTERED_INVOICE_SERVICE_JOB:
      return {
        ...state,
        arr_ENTERED_INVOICE_SERVICE_JOBS: [
          payload,
          ...state.arr_ENTERED_INVOICE_SERVICE_JOBS
        ],
        loading: false
      };

    case UPDATE_ENTERED_INVOICE_SERVICE_JOB:
      return {
        arr_ENTERED_INVOICE_SERVICE_JOBS: state.arr_ENTERED_INVOICE_SERVICE_JOBS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_ENTERED_INVOICE_SERVICE_JOBS:
      return {
        ...state,
        arr_ENTERED_INVOICE_SERVICE_JOBS: payload,
        loading: false
      };

    case GET_ONE_ENTERED_INVOICE_SERVICE_JOB:
      return {
        ...state,
        one_ENTERED_INVOICE_SERVICE_JOB: payload,
        loading: false
      };

    case DELETE_ENTERED_INVOICE_SERVICE_JOB:
      return {
        ...state,
        arr_ENTERED_INVOICE_SERVICE_JOBS: state.arr_ENTERED_INVOICE_SERVICE_JOBS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
