import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHistoryList: false,
  isPrintList: true,
  dataList: [],
  listLink: [],
  listUser: []
};

const xnsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NULL_DATA:
      return {
        ...state,
        dataList: []
      };
    case ActionTypes.HISTORY_LIST:
      return {
        ...state,
        isHistoryList: true,
        isPrintList: false,
        dataList: []
      };
    case ActionTypes.PRINT_LIST:
      return {
        ...state,
        isHistoryList: false,
        isPrintList: true,
        dataList: []
      };
    case ActionTypes.HISTORY_LIST_BY_DATE:
      return {
        ...state,
        isHistoryList: false,
        isPrintList: false,
        dataList: []
      };
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
    case ActionTypes.GET_HISTORY_LIST_BY_DATE:
      return {
        ...state,
        dataList: action.payload,
        isPrintList: false,
        isHistoryList: false
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
    case ActionTypes.ADD_LINK_PRINT_HANDLER: {
      const temp = state.listLink.concat(action.listLink);
      return { ...state, listLink: temp };
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
