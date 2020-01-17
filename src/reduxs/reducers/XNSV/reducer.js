import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHistoryList: false,
  isPrintList: true,
  dataPrint: [],
  listLink: [],
  dataHistory: []
};

const xnsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.HISTORY_LIST:
      return { ...state, isHistoryList: true, isPrintList: false };
    case ActionTypes.PRINT_LIST:
      return { ...state, isHistoryList: false, isPrintList: true };
    case ActionTypes.GET_NOT_PRINT_YET:
      return {
        ...state,
        dataPrint: action.payload,
        isHistoryList: false,
        isPrintList: true
      };
    case ActionTypes.GET_HISTORY_LIST:
      return {
        ...state,
        dataHistory: action.payload,
        isPrintList: false,
        isHistoryList: true
      };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp, dataPrint: action.listData };
    }
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    case ActionTypes.PRINT_BY_TYPE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default xnsvReducer;
