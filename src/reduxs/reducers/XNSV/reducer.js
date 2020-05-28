import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHistoryList: false,
  isPrintList: true,
  isHisImport: false,
  dataList: [],
  listLink: [],
  listUser: []
};

const xnsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.HISTORY_LIST:
      return {
        ...state,
        isHistoryList: true,
        isPrintList: false,
        isHisImport: false
      };
    case ActionTypes.PRINT_LIST:
      return {
        ...state,
        isHistoryList: false,
        isPrintList: true,
        isHisImport: false
      };
    case ActionTypes.HISTORY_IMPORT_LIST:
      return {
        ...state,
        isHistoryList: false,
        isPrintList: false,
        isHisImport: true
      };
    case ActionTypes.GET_NOT_PRINT_YET:
      return {
        ...state,
        dataList: action.payload,
        isHistoryList: false,
        isHisImport: false,
        isPrintList: true
      };
    case ActionTypes.GET_HISTORY_LIST:
      return {
        ...state,
        dataList: action.payload,
        isPrintList: false,
        isHistoryList: true,
        isHisImport: false
      };
    case ActionTypes.GET_HISTORY_IMPORT_LIST:
      return {
        ...state,
        dataList: action.payload,
        isPrintList: false,
        isHistoryList: false,
        isHisImport: true
      };
    case ActionTypes.GET_USER:
      return {
        ...state,
        listUser: action.payload
      };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink.concat(action.listLink);
      return { ...state, listLink: temp, dataList: action.listData };
    }
    case ActionTypes.ADD_LINK_EXPORT: {
      const ex = state.listLink.concat(action.listLink);
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
