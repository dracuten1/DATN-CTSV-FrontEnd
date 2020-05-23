import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAlllist: true,
  dataList: [],
  listLink: []
};

const qlltReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALLLIST:
      return { ...state, isAlllist: true };
    case ActionTypes.KTX:
      return { ...state, isAlllist: false };
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
        isAlllist: false
      };
    case ActionTypes.UPDATE_STUDENT:
      return {
        ...state
      };
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

export default qlltReducer;
