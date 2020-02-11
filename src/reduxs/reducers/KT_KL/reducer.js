import ActionTypes from './actionTypes';

const INIT_STATE = {
  isKyLuat: true,
  listData: [],
  listLink: []
};

const klktReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.LIST_KHENTHUONG:
      return { ...state, isKyLuat: false };
    case ActionTypes.LIST_KYLUAT:
      return { ...state, isKyLuat: true };
      case ActionTypes.GET_DATA_KYLUAT:
      return {
        ...state,
        listData: action.payload,
        isKyLuat: true
      };
      case ActionTypes.GET_DATA_KHENTHUONG:
      return {
        ...state,
        listData: action.payload,
        isKyLuat: false
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

export default klktReducer;
