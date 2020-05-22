import React from 'react';
import icons from 'shared/icons';

const dt = new Date();
const year = dt.getFullYear();

const HBKK = [
  {
    title: 'MSSV',
    field: 'MSSV',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'Họ tên',
    field: 'HoVaTen',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'ĐTB',
    field: 'DTB',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Xếp loại ĐRL',
    field: 'XepLoaiDRL',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Loại HB',
    field: 'LoaiHB',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số tiền HB/Tháng',
    field: 'SoTienMoiThang',
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
    title: 'Tổng cộng',
    field: 'TongSoTien',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'CMND',
    field: 'CMND',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Số TK',
    field: 'STK',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Ngân hàng',
    field: 'NganHang',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Chi nhánh',
    field: 'ChiNhanh',
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
    field: 'HK',
    lookup: {
      1: '1',
      2: '2',
      3: '3'
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
    field: 'note',
    cellStyle: {
      minWidth: '150px'
    }
  }
];

const HBTT = [
  {
    title: 'MSSV',
    field: 'MSSV',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'Họ tên',
    field: 'HoVaTen',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'Tên học bổng',
    field: 'TenHocBong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Loại HB',
    field: 'LoaiHB',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Giá trị',
    field: 'GiaTri',
    cellStyle: {
      minWidth: '100px'
    }
  },
  {
    title: 'Đơn vị tài trợ',
    field: 'DonViTaiTro',
    cellStyle: {
      minWidth: '200px'
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
    field: 'HK',
    lookup: {
      1: '1',
      2: '2',
      3: '3'
    },
    filterCellStyle: {
      paddingTop: 1
    },
    cellStyle: {
      minWidth: '100px'
    }
  },
  {
    title: 'Ghi chú',
    field: 'note',
    cellStyle: {
      minWidth: '150px'
    }
  }
];

export default { HBKK, HBTT };
