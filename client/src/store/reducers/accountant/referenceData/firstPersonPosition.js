import {
  SET_FIRST_PERSON_POSITION,
  UPDATE_FIRST_PERSON_POSITION,
  GET_ALL_FIRST_PERSON_POSITIONS,
  GET_ONE_FIRST_PERSON_POSITION,
  DELETE_FIRST_PERSON_POSITION
} from '../../../actions/types';

const initialState = {
  arr_FIRST_PERSON_POSITIONS: [],
  one_FIRST_PERSON_POSITION: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_FIRST_PERSON_POSITION:
      return {
        ...state,
        arr_FIRST_PERSON_POSITIONS: [
          payload,
          ...state.arr_FIRST_PERSON_POSITIONS
        ],
        loading: false
      };

    case UPDATE_FIRST_PERSON_POSITION:
      return {
        arr_FIRST_PERSON_POSITIONS: state.arr_FIRST_PERSON_POSITIONS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_FIRST_PERSON_POSITIONS:
      return {
        ...state,
        arr_FIRST_PERSON_POSITIONS: payload,
        loading: false
      };

    case GET_ONE_FIRST_PERSON_POSITION:
      return {
        ...state,
        one_FIRST_PERSON_POSITION: payload,
        loading: false
      };

    case DELETE_FIRST_PERSON_POSITION:
      return {
        ...state,
        arr_FIRST_PERSON_POSITIONS: state.arr_FIRST_PERSON_POSITIONS.filter(
          item => item.id !== payload
        ),
        loading: false
      };

    default:
      return state;
  }
}
