import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAllList: false,
  isPrintList: true,
  dataPrint: [],
  listLink: []
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALL_LIST:
      return { ...state, isAllList: true, isPrintList: false };
    case ActionTypes.PRINT_LIST:
      return { ...state, isAllList: false, isPrintList: true };
    case ActionTypes.GET_NOT_PRINT_YET:
      return { ...state, dataPrint: action.payload };
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
      case ActionTypes.ADD_LINK_PRINT:{
        const temp = state.listLink;
        temp.push(action.payload);
        return {...state, listLink: temp };
      }
    case ActionTypes.EXPORT_TO_DOCX:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
