const dt = new Date();
const year = dt.getFullYear();

const DTTS = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },
  {
    title: 'NTNS',
    field: 'NTNS',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Dân tộc',
    field: 'DanToc',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tháng',
    field: 'SoThang',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Mức hỗ trợ',
    field: 'MucHoTro',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Kinh phí',
    field: 'KinhPhi',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
      paddingTop: 1,
      cellStyle: {
        minWidth: '150px'
      }
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];

const HTDX = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },
  {
    title: 'Số tiền',
    field: 'SoTien',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
    },
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu'
  }
];

const MGHP = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },

  {
    title: 'Số tháng',
    field: 'SoThang',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Số tiền',
    field: 'SoTien',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Mức miễn giảm (%)',
    field: 'MucGiamHP',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
    },
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu'
  }
];

const SVKT = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },
  {
    title: 'Mức hỗ trợ mua phương tiện',
    field: 'MucHoTroCPPT',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Mức học bổng',
    field: 'MucHB',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Tổng nhu cầu kinh phí',
    field: 'TongTien',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
    },
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];

const TCXH = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },
  {
    title: 'Số tháng',
    field: 'SoThang',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Mức trợ cấp',
    field: 'MucTroCap',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Thành tiền',
    field: 'ThanhTien',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'CMND',
    field: 'CMND',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tài khoản',
    field: 'SoTK',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
    filtering: false,
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
    },
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];

const TKMSSV = [
  { title: 'MSSV', field: 'MSSV', filtering: false },
  {
    title: 'Họ tên',
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    },
    filtering: false
  },
  {
    title: 'Tổng tiền',
    field: 'TongTien',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Năm học',
    field: 'nh',
    lookup: {
      1: `${year - 6}-${year - 5}`,
      2: `${year - 5}-${year - 4}`,
      3: `${year - 4}-${year - 3}`,
      4: `${year - 3}-${year - 2}`,
      5: `${year - 2}-${year - 1}`,
      6: `${year - 1}-${year}`,
      7: `${year}-${year + 1}`
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '150px'
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
    },
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];

export default {
  DTTS,
  HTDX,
  TCXH,
  MGHP,
  SVKT,
  TKMSSV
};
