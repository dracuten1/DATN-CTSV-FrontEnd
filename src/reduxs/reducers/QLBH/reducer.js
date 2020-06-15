import ActionTypes from './actionTypes';

const INIT_STATE = {
  isBHYT: true,
  isBHTN: false,
  isTTBT: false,
  isCounting: false,
  dataList: [],
  listLink: []
};

const qlbhReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TK:
      return {
        ...state,
        isBHYT: false,
        isBHTN: false,
        isTTBT: false,
        isCounting: true,
        dataList: []
      };
    case ActionTypes.NO_DATA_BHYT:
      return {
        ...state,
        isBHYT: true,
        isBHTN: false,
        isTTBT: false,
        isCounting: false,
        dataList: []
      };
    case ActionTypes.NO_DATA_BHTN:
      return {
        ...state,
        isBHYT: false,
        isBHTN: true,
        isTTBT: false,
        isCounting: false,
        dataList: []
      };
    case ActionTypes.NO_DATA_TTBT:
      return {
        ...state,
        isBHYT: false,
        isBHTN: false,
        isTTBT: true,
        isCounting: false,
        dataList: []
      };
    case ActionTypes.NO_DATA:
      return {
        ...state,
        dataList: []
      };
    case ActionTypes.GET_DATA_BHYT:
      return {
        ...state,
        dataList: action.payload,
        isBHYT: true,
        isTTBT: false,
        isBHTN: false,
        isCounting: false
      };
    case ActionTypes.GET_DATA_BHTN:
      return {
        ...state,
        dataList: action.payload,
        isTTBT: false,
        isBHTN: true,
        isBHYT: false,
        isCounting: false
      };
    case ActionTypes.GET_DATA_TTBT:
      return {
        ...state,
        dataList: action.payload,
        isBHYT: false,
        isBHTN: false,
        isTTBT: true,
        isCounting: false
      };
    case ActionTypes.GET_DATA_COUNTING:
      return {
        ...state,
        dataList: action.payload,
        isTTBT: false,
        isBHYT: false,
        isBHTN: false,
        isCounting: true
      };
    case ActionTypes.ADD_LINK_EXPORT: {
      const ex = state.listLink.concat(action.listLink);
      return { ...state, listLink: ex };
    }
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default qlbhReducer;
