import {
  SET_GROUP_OF_SERVICE_JOB,
  UPDATE_GROUP_OF_SERVICE_JOB,
  GET_ALL_GROUP_OF_SERVICE_JOBS,
  GET_ONE_GROUP_OF_SERVICE_JOB,
  DELETE_GROUP_OF_SERVICE_JOB
} from '../../../actions/types';

const initialState = {
  arr_GROUP_OF_SERVICE_JOBS: [],
  one_GROUP_OF_SERVICE_JOB: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_GROUP_OF_SERVICE_JOB:
      return {
        ...state,
        arr_GROUP_OF_SERVICE_JOBS: [
          payload,
          ...state.arr_GROUP_OF_SERVICE_JOBS
        ],
        loading: false
      };

    case UPDATE_GROUP_OF_SERVICE_JOB:
      return {
        arr_GROUP_OF_SERVICE_JOBS: state.arr_GROUP_OF_SERVICE_JOBS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_GROUP_OF_SERVICE_JOBS:
      return {
        ...state,
        arr_GROUP_OF_SERVICE_JOBS: payload,
        loading: false
      };

    case GET_ONE_GROUP_OF_SERVICE_JOB:
      return {
        ...state,
        one_GROUP_OF_SERVICE_JOB: payload,
        loading: false
      };

    case DELETE_GROUP_OF_SERVICE_JOB:
      return {
        ...state,
        arr_GROUP_OF_SERVICE_JOBS: state.arr_GROUP_OF_SERVICE_JOBS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
