import React from 'react';
import icons from 'shared/icons';

const dt = new Date();
const year = dt.getFullYear();

const BHYT = [
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
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'NTNS',
    field: 'NTNS',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'Nữ',
    field: 'GioiTinh',
    editable: 'never',
    type: 'boolean',
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.GioiTinh ? <icons.CheckBox /> : <icons.CheckBlank />}
      </div>
    )
  },
  {
    title: 'Đối tượng',
    field: 'DoiTuong',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Mức hưởng/Mã tỉnh',
    field: 'MaTinh',
    cellStyle: {
      minWidth: '250px'
    }
  },
  {
    title: 'MS BHXH',
    field: 'MaBHXH',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Mã BV',
    field: 'MaBV',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Tên BV',
    field: 'TenBV',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'CMND',
    field: 'SoCMND',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'HSD - Từ',
    field: 'HSDTu',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'HSD - Đến',
    field: 'HSDDen',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Tình trạng thẻ',
    field: 'DaNhan',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Ngày nhận thẻ',
    field: 'NgayNhanThe',
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
    , editable: false 
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
    , editable: false 
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    cellStyle: {
      minWidth: '150px'
    }
  }
];

const BHTN = [
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
    field: 'HoTen',
    cellStyle: {
      minWidth: '150px'
    }
    , editable: false 
  },
  {
    title: 'NTNS',
    field: 'NTNS',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'HSD - Từ',
    field: 'HSDTu',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'HSD - Đến',
    field: 'HSDDen',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Công ty bảo hiểm',
    field: 'CongTyBH',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Số tiền',
    field: 'SoTienBH',
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
    , editable: false 
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    cellStyle: {
      minWidth: '150px'
    }
  }
];

const TTBT = [
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
    title: 'Mã BV',
    field: 'MaBV',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Tên BV',
    field: 'TenBV',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'HSD - Từ',
    field: 'HSDTu',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'HSD - Đến',
    field: 'HSDDen',
    cellStyle: {
      minWidth: '150px'
    }
  },
  {
    title: 'Công ty bảo hiểm',
    field: 'CongTyBH',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Bồi Thường',
    field: 'SoTien',
    cellStyle: {
      minWidth: '200px'
    }
  },
  {
    title: 'Bị tai nạn',
    field: 'BiTaiNan',
    editable: 'never',
    type: 'boolean',
    cellStyle: {
      minWidth: '200px'
    },
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.BiTaiNan ? <icons.CheckBox /> : <icons.CheckBlank />}
      </div>
    )
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
    , editable: false 
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
    , editable: false 
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    cellStyle: {
      minWidth: '150px'
    }
  }
];

export default { BHYT, BHTN, TTBT };
