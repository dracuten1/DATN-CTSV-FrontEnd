import Types from './actionTypes';

const handleAllList = () => async dispatch => {
  dispatch({ type: Types.ALL_LIST });
};

const handlePrintList = () => async dispatch => {
  dispatch({ type: Types.PRINT_LIST });
};

// const handleAdd = newData => async dispatch => {
//   dispatch({ type: Types.DATA_PRINT, newData });
// };

const handlePrint = () => {};

export default {
  handleAllList,
  handlePrintList,
  handlePrint
  // handleAdd
};
