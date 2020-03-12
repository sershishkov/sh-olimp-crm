import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import nameOfPage from './nameOfPage';
import photoWorks from './photoWorks';
import groupOfImage from './groupOfImage';
import users from './users';
import clientRequests from './clientRequests';
import operatorCode from './operatorCode';
import clientCategory from './categoryOf_Client';

export default combineReducers({
  alert,
  auth,
  nameOfPage,
  photoWorks,
  groupOfImage,
  users,
  clientRequests,
  operatorCode,
  clientCategory
});
