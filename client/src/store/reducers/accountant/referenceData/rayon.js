import {
  SET_RAYON,
  UPDATE_RAYON,
  GET_ALL_RAYONS,
  GET_ONE_RAYON,
  DELETE_RAYON
} from '../../../actions/types';

const initialState = {
  arr_RAYONS: [],
  one_RAYON: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_RAYON:
      return {
        ...state,
        arr_RAYONS: [payload, ...state.arr_RAYONS],
        loading: false
      };

    case UPDATE_RAYON:
      return {
        arr_RAYONS: state.arr_RAYONS.map(item =>
          item._id === payload._id ? payload : item
        ),
        loading: false
      };

    case GET_ALL_RAYONS:
      return {
        ...state,
        arr_RAYONS: payload,
        loading: false
      };

    case GET_ONE_RAYON:
      return {
        ...state,
        one_RAYON: payload,
        loading: false
      };

    case DELETE_RAYON:
      return {
        ...state,
        arr_RAYONS: state.arr_RAYONS.filter(item => item.id !== payload),
        loading: false
      };

    default:
      return state;
  }
}
