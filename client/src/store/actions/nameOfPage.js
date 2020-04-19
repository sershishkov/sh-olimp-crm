import { NAME_OF_PAGE } from './types';

export const setNameOfPage = pageName => dispatch => {
  dispatch({
    type: NAME_OF_PAGE,
    payload: pageName
  });
};
