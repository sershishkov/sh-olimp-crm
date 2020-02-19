import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import nameOfPage from './nameOfPage';

export default combineReducers({
  alert,
  auth,
  nameOfPage
});
