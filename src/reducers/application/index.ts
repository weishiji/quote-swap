import { combineReducers } from 'redux';

import blockNumber from './blockNumber';
import openModal from './openModal';

export default combineReducers({
  openModal,
  blockNumber,
});
