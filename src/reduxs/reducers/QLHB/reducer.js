import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHBKK: true,
  dataList: [],
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
        dataList: action.payload,
        isHBKK: true
      };
    case ActionTypes.GET_DATA_HBTT:
      return {
        ...state,
        dataList: action.payload,
        isHBKK: false
      };
    case ActionTypes.ADD_LINK_EXPORT: {
      const ex = state.listLink;
      ex.push(action.listLink);
      return { ...state, listLink: ex };
    }
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default qlhbReducer;
