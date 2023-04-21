import { combineReducers } from 'redux';
import CarReducers from './CarReducers';
import HeaderReducers from './HeaderReducers';
import LoginReducers from './LoginReducers';

export default combineReducers({
  headerinfo: HeaderReducers,
  auth: LoginReducers,
  cars: CarReducers,

});
