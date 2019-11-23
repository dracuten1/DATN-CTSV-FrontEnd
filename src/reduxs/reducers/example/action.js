import ActionTypes from './actionTypes';

export default {
  allList: () => {
    return { type: ActionTypes.ALL_LIST };
  },
  printList: () => {
    return { type: ActionTypes.PRINT_LIST };
  }
};
