import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAllList: false,
  isPrintList: true,
  isHistoryList: false,
  dataPrint: [],
  listLink: [],
  listUser: []
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NULL_DATA:
      return {
        ...state,
        dataPrint: []
      };
    case ActionTypes.ALL_LIST:
      return {
        ...state,
        dataPrint: [],
        isAllList: true,
        isPrintList: false,
        isHistoryList: false,
        isHisImport: false
      };
    case ActionTypes.PRINT_LIST:
      return {
        ...state,
        dataPrint: [],
        isAllList: false,
        isPrintList: true,
        isHistoryList: false,
        isHisImport: false
      };
    case ActionTypes.IMPORT_LIST:
      return {
        ...state,
        dataPrint: [],
        isAllList: false,
        isPrintList: false,
        isHistoryList: false,
        isHisImport: true
      };
    case ActionTypes.HISTORY_LIST:
      return {
        ...state,
        dataPrint: [],
        isAllList: false,
        isPrintList: false,
        isHistoryList: true,
        isHisImport: false
      };
      case ActionTypes.GET_LIST_WITH_STATUS:
      return {
        ...state,
        dataPrint: action.payload,
        isAllList: false,
        isPrintList: true,
        isHistoryList: false,
        isHisImport: false
      };
    case ActionTypes.GET_LIST_INFO:
      return {
        ...state,
        dataPrint: action.payload,
        isAllList: true,
        isPrintList: false,
        isHistoryList: false,
        isHisImport: false
      };
    case ActionTypes.GET_HISTORY_LIST:
      return {
        ...state,
        dataPrint: action.payload,
        isAllList: false,
        isPrintList: false,
        isHistoryList: true,
        isHisImport: false
      };
    case ActionTypes.GET_HISTORY_IMPORT_LIST:
      return {
        ...state,
        dataPrint: action.payload,
        isAllList: false,
        isPrintList: false,
        isHistoryList: false,
        isHisImport: true
      };
    case ActionTypes.GET_USER:
      return {
        ...state,
        listUser: action.payload
      };
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink.concat(action.listLink);
      return { ...state, listLink: temp, dataPrint: action.listData };
    }
    case ActionTypes.GET_LIST_DOCX: {
      return { ...state, listLink: action.payload };
    }
    case ActionTypes.ADD_LINK_EXPORT: {
      const temp = state.listLink.concat(action.listLink);
      return { ...state, listLink: temp };
    }
    case ActionTypes.EXPORT_TO_DOCX:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
