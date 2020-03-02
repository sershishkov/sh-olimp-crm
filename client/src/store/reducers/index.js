import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import nameOfPage from './nameOfPage';
import photoWorks from './photoWorks';
import groupOfImage from './groupOfImage';
import users from './users';

export default combineReducers({
  alert,
  auth,
  nameOfPage,
  photoWorks,
  groupOfImage,
  users
});
