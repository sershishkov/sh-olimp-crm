import {
  SET_TYPE_OF_ACTS_ON_BASIS_OF,
  UPDATE_TYPE_OF_ACTS_ON_BASIS_OF,
  GET_ALL_TYPE_OF_ACTS_ON_BASIS_OFS,
  GET_ONE_TYPE_OF_ACTS_ON_BASIS_OF,
  DELETE_TYPE_OF_ACTS_ON_BASIS_OF
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_ACTS_ON_BASIS_OFS: [],
  one_TYPE_OF_ACTS_ON_BASIS_OF: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_ACTS_ON_BASIS_OF:
      return {
        ...state,
        arr_TYPE_OF_ACTS_ON_BASIS_OFS: [
          payload,
          ...state.arr_TYPE_OF_ACTS_ON_BASIS_OFS
        ],
        loading: false
      };

    case UPDATE_TYPE_OF_ACTS_ON_BASIS_OF:
      return {
        arr_TYPE_OF_ACTS_ON_BASIS_OFS: state.arr_TYPE_OF_ACTS_ON_BASIS_OFS.map(
          item => (item._id === payload._id ? payload : item)
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_ACTS_ON_BASIS_OFS:
      return {
        ...state,
        arr_TYPE_OF_ACTS_ON_BASIS_OFS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_ACTS_ON_BASIS_OF:
      return {
        ...state,
        one_TYPE_OF_ACTS_ON_BASIS_OF: payload,
        loading: false
      };

    case DELETE_TYPE_OF_ACTS_ON_BASIS_OF:
      return {
        ...state,
        arr_TYPE_OF_ACTS_ON_BASIS_OFS: state.arr_TYPE_OF_ACTS_ON_BASIS_OFS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
