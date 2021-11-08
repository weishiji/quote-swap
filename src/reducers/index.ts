import { combineReducers } from 'redux';
import application from './application';
import multicall from './multicall';

export default combineReducers({
  application,
  multicall,
});
