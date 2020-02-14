import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHistoryList: false,
  isPrintList: true,
  dataList: [],
  listLink: [],
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
        dataList: action.payload,
        isHistoryList: false,
        isPrintList: true
      };
    case ActionTypes.GET_HISTORY_LIST:
      return {
        ...state,
        dataList: action.payload,
        isPrintList: false,
        isHistoryList: true
      };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp, dataList: action.listData };
    }
    case ActionTypes.ADD_LINK_EXPORT: {
      const ex = state.listLink;
      ex.push(action.listLink);
      return { ...state, listLink: ex };
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
