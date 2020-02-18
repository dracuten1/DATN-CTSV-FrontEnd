import ActionTypes from './actionTypes';

const INIT_STATE = {
  isdataPrint: false,
  isPrintList: true,
  isHistoryList: false,
  dataPrint: [],
  listLink: []
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALL_LIST:
      return {
        ...state,
        dataPrint: action.payload,
        isdataPrint: true,
        isPrintList: false,
        isHistoryList: false
      };
    case ActionTypes.PRINT_LIST:
      return {
        ...state,
        isdataPrint: false,
        isPrintList: true,
        isHistoryList: false
      };
    case ActionTypes.GET_NOT_PRINT_YET:
      return {
        ...state,
        dataPrint: action.payload,
        isdataPrint: false,
        isPrintList: true,
        isHistoryList: false
      };
    case ActionTypes.GET_HISTORY_LIST:
      return {
        ...state,
        dataPrint: action.payload,
        isdataPrint: false,
        isPrintList: false,
        isHistoryList: true
      };
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp, dataPrint: action.listData };
    }
    case ActionTypes.GET_LIST_DOCX: {
      return { ...state, listLink: action.payload };
    }
    case ActionTypes.EXPORT_TO_DOCX:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
