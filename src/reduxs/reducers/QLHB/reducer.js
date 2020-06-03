import ActionTypes from './actionTypes';

const INIT_STATE = {
  isHBKK: true,
  isCounting: false,
  dataList: [],
  listLink: [],
  listLoaiHB: [],
  listDoiTuong: [],
  listDonViTaiTro: []
};

const qlhbReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.HBKK:
      return { ...state, isHBKK: true, isCounting: false };
    case ActionTypes.HBTT:
      return { ...state, isHBKK: false, isCounting: false };
    case ActionTypes.TK:
      return { ...state, isHBKK: false, isCounting: true, dataList: [] };
    case ActionTypes.GET_DATA_HBKK:
      return {
        ...state,
        dataList: action.payload,
        isHBKK: true,
        isCounting: false
      };
    case ActionTypes.GET_DATA_HBTT:
      return {
        ...state,
        dataList: action.payload,
        isHBKK: false,
        isCounting: false
      };
    case ActionTypes.GET_DATA_COUNTING:
      return {
        ...state,
        dataList: action.payload,
        isHBKK: false,
        isCounting: true
      };
    case ActionTypes.GET_DATA_FILTER:
      const { LoaiHB, DoiTuong, DonViTaiTro } = action.payload;
      return {
        ...state,
        listLoaiHB: LoaiHB,
        listDoiTuong: DoiTuong,
        listDonViTaiTro: DonViTaiTro
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

export default qlhbReducer;
