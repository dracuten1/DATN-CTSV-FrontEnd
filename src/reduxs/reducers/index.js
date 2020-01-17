import { combineReducers } from 'redux';
import DRLState from './DRL/reducer';
import XNSVState from './XNSV/reducer'
import Authentication from './Authentication/reducer';

export default combineReducers({
  DRLState,
  XNSVState,
  auth : Authentication
});
