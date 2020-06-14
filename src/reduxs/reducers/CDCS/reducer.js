import ActionTypes from './actionTypes';

const INIT_STATE = {
  isCase: 6,
  listDoiTuong: [],
  dataList: [],
  listLink: []
};

const cdcsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TK:
      return { ...state, isCase: 6, dataList: [] };
    case ActionTypes.DS:
      return { ...state, isCase: 1, dataList: [] };
    case ActionTypes.GET_NULL_DATA:
      return { ...state, dataList: [] };
    case ActionTypes.GET_LIST_DTTS:
      return {
        ...state,
        dataList: action.payload,
        isCase: 1
      };
    case ActionTypes.GET_LIST_HTDX:
      return {
        ...state,
        dataList: action.payload,
        isCase: 2
      };
    case ActionTypes.GET_LIST_TCXH:
      return {
        ...state,
        dataList: action.payload,
        isCase: 3
      };
    case ActionTypes.GET_LIST_MGHP:
      return {
        ...state,
        dataList: action.payload,
        isCase: 4
      };
    case ActionTypes.GET_LIST_SVKT:
      return {
        ...state,
        dataList: action.payload,
        isCase: 5
      };
    case ActionTypes.GET_LIST_MSSV:
      return {
        ...state,
        dataList: action.payload,
        isCase: 6
      };
    case ActionTypes.GET_DATA_FILTER:
      const { DoiTuong } = action.payload;
      return {
        ...state,
        listDoiTuong: DoiTuong
      };
    case ActionTypes.ADD_LINK_EXPORT: {
      const ex = state.listLink.concat(action.listLink);
      return { ...state, listLink: ex };
    }
    default:
      return { ...state };
  }
};

export default cdcsReducer;
