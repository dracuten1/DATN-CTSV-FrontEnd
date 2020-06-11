const dt = new Date();
const year = dt.getFullYear();

const DTTS = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoTen', filtering: false },
  {
    title: 'NTNS',
    field: 'NTNS'
  },
  {
    title: 'Dân tộc',
    field: 'DanToc'
    , cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tháng',
    field: 'SoThang'
    , cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Mức hỗ trợ',
    field: 'MucHoTro'
  },
  {
    title: 'Kinh phí',
    field: 'KinhPhi'
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong'
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${(year - 6)}-${(year - 5)}`,
      2: `${(year - 5)}-${(year - 4)}`,
      3: `${(year - 4)}-${(year - 3)}`,
      4: `${(year - 3)}-${(year - 2)}`,
      5: `${(year - 2)}-${(year - 1)}`,
      6: `${(year - 1)}-${year}`,
      7: `${year}-${(year + 1)}`
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'hk',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  },
];

const HTDX = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoTen', filtering: false },
  {
    title: 'Số tiền',
    field: 'SoTien'
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong'
  },
  {
    title: 'Học kỳ',
    field: 'hk',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${(year - 6)}-${(year - 5)}`,
      2: `${(year - 5)}-${(year - 4)}`,
      3: `${(year - 4)}-${(year - 3)}`,
      4: `${(year - 3)}-${(year - 2)}`,
      5: `${(year - 2)}-${(year - 1)}`,
      6: `${(year - 1)}-${year}`,
      7: `${year}-${(year + 1)}`
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu'
  }
];

const MGHP = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoTen', filtering: false },
  
  {
    title: 'Số tháng',
    field: 'SoThang'
    , cellStyle: {
      minWidth: '200px'
    }
  },{
    title: 'Số tiền',
    field: 'SoTien'
    , cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong'
  },
  {
    title: 'Mức miễn giảm (%)',
    field: 'MucGiamHP'
  },
  {
    title: 'Học kỳ',
    field: 'hk',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${(year - 6)}-${(year - 5)}`,
      2: `${(year - 5)}-${(year - 4)}`,
      3: `${(year - 4)}-${(year - 3)}`,
      4: `${(year - 3)}-${(year - 2)}`,
      5: `${(year - 2)}-${(year - 1)}`,
      6: `${(year - 1)}-${year}`,
      7: `${year}-${(year + 1)}`
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu'
  }
];

const SVKT = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoTen', filtering: false },
  {
    title: 'Mức hỗ trợ mua phương tiện',
    field: 'MucHoTroCPPT'
    , cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Mức học bổng',
    field: 'MucHB'
  },
  {
    title: 'Tổng nhu cầu kinh phí',
    field: 'TongTien'
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong'
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${(year - 6)}-${(year - 5)}`,
      2: `${(year - 5)}-${(year - 4)}`,
      3: `${(year - 4)}-${(year - 3)}`,
      4: `${(year - 3)}-${(year - 2)}`,
      5: `${(year - 2)}-${(year - 1)}`,
      6: `${(year - 1)}-${year}`,
      7: `${year}-${(year + 1)}`
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'hk',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  },
];

const TCXH = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoTen', filtering: false },
  {
    title: 'Số tháng',
    field: 'SoThang'
    , cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Mức trợ cấp',
    field: 'MucTroCap'
  },
  {
    title: 'Thành tiền',
    field: 'ThanhTien'
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong'
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${(year - 6)}-${(year - 5)}`,
      2: `${(year - 5)}-${(year - 4)}`,
      3: `${(year - 4)}-${(year - 3)}`,
      4: `${(year - 3)}-${(year - 2)}`,
      5: `${(year - 2)}-${(year - 1)}`,
      6: `${(year - 1)}-${year}`,
      7: `${year}-${(year + 1)}`
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'hk',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  },
];

export default {
  DTTS, HTDX, TCXH, MGHP, SVKT
};
