import ActionTypes from './actionTypes';

const INIT_STATE = {
  isCase: 1,
  dataList: [],
  listLink: []
};

const shcdReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.DKSHCD:
      return { ...state, isCase: 1 };
    case ActionTypes.DDSHCD:
      return { ...state, isCase: 2 };
    case ActionTypes.KTSHCD:
      return { ...state, isCase: 3 };
    case ActionTypes.KQSHCD:
      return { ...state, isCase: 4 };
    case ActionTypes.GET_LIST_DKSHCD:
      return {
        ...state,
        dataList: action.payload,
        isCase: 1
      };
    case ActionTypes.GET_LIST_DDSHCD:
      return {
        ...state,
        dataList: action.payload,
        isCase: 2
      };
    case ActionTypes.GET_LIST_KTSHCD:
      return {
        ...state,
        dataList: action.payload,
        isCase: 3
      };
    case ActionTypes.GET_LIST_KQSHCD:
      return {
        ...state,
        dataList: action.payload,
        isCase: 4
      };
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp, dataList: action.listData };
    }
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    case ActionTypes.PRINT_BY_TYPE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default shcdReducer;
