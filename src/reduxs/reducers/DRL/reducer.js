import ActionTypes from './actionTypes';
import mockData from '../../../pages/DRL/components/PrintList/data';

const INIT_STATE = {
  isAllList: false,
  isPrintList: true,
  dataPrint: mockData
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ALL_LIST:
      return { ...state, isAllList: true, isPrintList: false };
    case ActionTypes.PRINT_LIST:
      return { ...state, isAllList: false, isPrintList: true };
    case ActionTypes.DATA_PRINT: {
      const data = [...state.dataPrint];
      data.push(action.newData);
      return { ...state, dataPrint: data };
    }
    default:
      return { ...state };
  }
};

export default userReducer;
