import ActionTypes from './actionTypes';

const INIT_STATE = {
  isAlllist: true,
  listData: [],
  listLink: []
};

const xnsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALLLIST:
      return { ...state, isAlllist: true };
    case ActionTypes.GET_ALLLIST:
      return {
        ...state,
        listData: action.payload,
        isAlllist: true,
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

export default xnsvReducer;
