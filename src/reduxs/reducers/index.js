import { combineReducers } from 'redux';
import DRLState from './DRL/reducer';
import XNSVState from './XNSV/reducer';
import HSSVState from './HSSV/reducer';
import KTKLState from './KT_KL/reducer';
import QLHBState from './QLHB/reducer';
import QLBHState from './QLBH/reducer';
import QLLTState from './QLLT/reducer';
import SHCDState from './SHCD/reducer';
import TTSVState from './TTSV/reducer';
import CDCSState from './CDCS/reducer';
import Authentication from './Authentication/reducer';

export default combineReducers({
  DRLState,
  XNSVState,
  HSSVState,
  TTSVState,
  KTKLState,
  QLHBState,
  SHCDState,
  QLLTState,
  QLBHState,
  CDCSState,
  auth: Authentication
});
