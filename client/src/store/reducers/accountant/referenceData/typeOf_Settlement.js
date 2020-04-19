import {
  SET_TYPE_OF_SETTLEMENT,
  UPDATE_TYPE_OF_SETTLEMENT,
  GET_ALL_TYPE_OF_SETTLEMENTS,
  GET_ONE_TYPE_OF_SETTLEMENT,
  DELETE_TYPE_OF_SETTLEMENT
} from '../../../actions/types';

const initialState = {
  arr_TYPE_OF_SETTLEMENTS: [],
  one_TYPE_OF_SETTLEMENT: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TYPE_OF_SETTLEMENT:
      return {
        ...state,
        arr_TYPE_OF_SETTLEMENTS: [payload, ...state.arr_TYPE_OF_SETTLEMENTS],
        loading: false
      };

    case UPDATE_TYPE_OF_SETTLEMENT:
      return {
        arr_TYPE_OF_SETTLEMENTS: state.arr_TYPE_OF_SETTLEMENTS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_TYPE_OF_SETTLEMENTS:
      return {
        ...state,
        arr_TYPE_OF_SETTLEMENTS: payload,
        loading: false
      };

    case GET_ONE_TYPE_OF_SETTLEMENT:
      return {
        ...state,
        one_TYPE_OF_SETTLEMENT: payload,
        loading: false
      };

    case DELETE_TYPE_OF_SETTLEMENT:
      return {
        ...state,
        arr_TYPE_OF_SETTLEMENTS: state.arr_TYPE_OF_SETTLEMENTS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
