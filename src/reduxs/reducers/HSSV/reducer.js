import ActionTypes from './actionTypes';

const INIT_STATE = {
  dataInfo: [],
  listLink: []
};

const xnsvReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NULL:{
      return {
        ...state,
        dataInfo: []
      };
    }
    case ActionTypes.GET_INFO:{
      const arr = [];
      arr.push(action.payload);
      return {
        ...state,
        dataInfo: arr,
      };
    }
    case ActionTypes.ADD_LINK_PRINT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp };
    }
    case ActionTypes.UPDATE_INFO:
      return { ...state };
    default:
      return { ...state };
  }
};

export default xnsvReducer;
