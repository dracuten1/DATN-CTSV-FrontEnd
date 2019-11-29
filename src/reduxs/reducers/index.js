import { combineReducers } from 'redux';
import DRLState from './DRL/reducer';
import Authentication from './Authentication/reducer';

export default combineReducers({
  DRLState,
  auth : Authentication
});
