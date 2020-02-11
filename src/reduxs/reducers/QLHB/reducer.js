import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHBKK: true,
  listData: [],
  listLink: []
};

const qlhbReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.HBKK:
      return { ...state, isHBKK: true };
    case ActionTypes.HBTT:
      return { ...state, isHBKK: false };
    case ActionTypes.GET_DATA_HBKK:
      return {
        ...state,
        listData: action.payload,
        isHBKK: true
      };
    case ActionTypes.GET_DATA_HBTT:
      return {
        ...state,
        listData: action.payload,
        isHBKK: false
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

export default qlhbReducer;
