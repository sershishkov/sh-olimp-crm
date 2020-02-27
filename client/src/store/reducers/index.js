import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import nameOfPage from './nameOfPage';
import photoWorks from './photoWorks';
import typeOfImage from './typeOfImage';

export default combineReducers({
  alert,
  auth,
  nameOfPage,
  photoWorks,
  typeOfImage
});
