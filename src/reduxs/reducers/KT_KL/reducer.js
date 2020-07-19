import ActionTypes from './actionTypes';

const INIT_STATE = {
  isKyLuat: true,
  dataList: [],
  listLink: [],
  CapDatGiai: [],
  CapKhenThuong: [],
  LoaiKhenThuong: []
};

const klktReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_COLUMN_KL:
      return { ...state, isKyLuat: true, dataList: [] };
      case ActionTypes.CHANGE_COLUMN_KT:
      return { ...state, isKyLuat: false, dataList: [] };
    case ActionTypes.LIST_KHENTHUONG:
      return { ...state, isKyLuat: false };
    case ActionTypes.LIST_KYLUAT:
      return { ...state, isKyLuat: true };
      case ActionTypes.GET_DATA_KYLUAT:
      return {
        ...state,
        dataList: action.payload,
        isKyLuat: true
      };
      case ActionTypes.GET_DATA_KHENTHUONG:
      return {
        ...state,
        dataList: action.payload,
        isKyLuat: false
      };
      case ActionTypes.GET_DATA_FILTER:
      const { CapDatGiai, CapKhenThuong, LoaiKhenThuong } = action.payload;
      return {
        ...state,
        CapDatGiai,
        CapKhenThuong,
        LoaiKhenThuong
      };
    case ActionTypes.ADD_LINK_EXPORT: {
      const temp = state.listLink;
      temp.push(action.listLink);
      return { ...state, listLink: temp };
    }
    case ActionTypes.DELETE_ONE_CERTIFICATE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default klktReducer;
