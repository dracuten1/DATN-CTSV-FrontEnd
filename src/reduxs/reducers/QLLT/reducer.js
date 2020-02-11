import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAlllist: true,
  dataList: [],
  listLink: [],
};

const qlltReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALLLIST:
      return { ...state, isAlllist: true };
    case ActionTypes.KTX:
      return { ...state,  isAlllist: false };
    case ActionTypes.GET_ALLLIST:
      return {
        ...state,
        dataList: action.payload,
        isAlllist: true
      };
    case ActionTypes.GET_KTX_LIST:
      return {
        ...state,
        dataList: action.payload,
        isAlllist: false,
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

export default qlltReducer;
