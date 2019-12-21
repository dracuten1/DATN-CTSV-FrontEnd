import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAllList: false,
  isPrintList: true,
  dataPrint: []
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALL_LIST:
      return { ...state, isAllList: true, isPrintList: false };
    case ActionTypes.PRINT_LIST:
      return { ...state, isAllList: false, isPrintList: true };
    case ActionTypes.GET_NOT_PRINT_YET:
      return { ...state, dataPrint: action.payload };
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state, };
    default:
      return { ...state };
  }
};

export default userReducer;
