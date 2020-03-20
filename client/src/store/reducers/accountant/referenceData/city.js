import {
  SET_CITY,
  UPDATE_CITY,
  GET_ALL_CITYS,
  GET_ONE_CITY,
  DELETE_CITY
} from '../../../actions/types';

const initialState = {
  arr_CITYS: [],
  one_CITY: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CITY:
      return {
        ...state,
        arr_CITYS: [payload, ...state.arr_CITYS],
        loading: false
      };

    case UPDATE_CITY:
      return {
        arr_CITYS: state.arr_CITYS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_CITYS:
      return {
        ...state,
        arr_CITYS: payload,
        loading: false
      };

    case GET_ONE_CITY:
      return {
        ...state,
        one_CITY: payload,
        loading: false
      };

    case DELETE_CITY:
      return {
        ...state,
        arr_CITYS: state.arr_CITYS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
