import { NAME_OF_PAGE } from '../actions/types';

const initialState = {
  pageName: 'Добрый день дорогой гость'
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NAME_OF_PAGE:
      return {
        ...state,
        pageName: payload
      };

    default:
      return state;
  }
}
