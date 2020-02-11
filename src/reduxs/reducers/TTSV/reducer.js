import ActionTypes from './actionTypes';

const INIT_STATE = {
  isCase: 1,
  dataList: [],
  listLink: []
};

const ttsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SVNN:
      return { ...state, isCase: 1 };
    case ActionTypes.DTB:
      return { ...state, isCase: 2 };
    case ActionTypes.DSTN:
      return { ...state, isCase: 3 };
    case ActionTypes.HTTC:
      return { ...state, isCase: 4 };
    case ActionTypes.DH:
      return { ...state, isCase: 5 };
    case ActionTypes.CCHV:
      return { ...state, isCase: 6 };
    case ActionTypes.BTH:
      return { ...state, isCase: 7 };
    case ActionTypes.DKHP:
      return { ...state, isCase: 8 };
    case ActionTypes.GET_LIST_SVNN:
      return {
        ...state,
        dataList: action.payload,
        isCase: 1
      };
    case ActionTypes.GET_LIST_DTB:
      return {
        ...state,
        dataList: action.payload,
        isCase: 2
      };
    case ActionTypes.GET_LIST_DSTN:
      return {
        ...state,
        dataList: action.payload,
        isCase: 3
      };
    case ActionTypes.GET_LIST_HTTC:
      return {
        ...state,
        dataList: action.payload,
        isCase: 4
      };
      case ActionTypes.GET_LIST_DH:
      return {
        ...state,
        dataList: action.payload,
        isCase: 5
      };
    case ActionTypes.GET_LIST_CCHV:
      return {
        ...state,
        dataList: action.payload,
        isCase: 6
      };
    case ActionTypes.GET_LIST_BTH:
      return {
        ...state,
        dataList: action.payload,
        isCase: 7
      };
    case ActionTypes.GET_LIST_DKHP:
      return {
        ...state,
        dataList: action.payload,
        isCase: 8
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

export default ttsvReducer;