import React from 'react';
import icons from 'shared/icons';

const dt = new Date();
const year = dt.getFullYear();

const ALL = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'Họ tên', filtering: false },
  {
    title: 'Nội trú - KTX',
    field: 'ktx',
    filtering: false
  },
  {
    title: 'Nội trú - Portal',
    field: 'portal',
    type: 'boolean',
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.portal ? <icons.CheckBox /> : <icons.CheckBlank />}
      </div>
    )
  },
  {
    title: 'Xác nhận ngoại trú',
    field: 'xnnt',
    type: 'boolean',
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.xnnt ? (
          <icons.CheckBox />
        ) : (
          <icons.CheckBlank />
        )}
      </div>
    )
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
    field: 'HK',
    lookup: {
      1: '1',
      2: '2',
      3: '3'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Người nhận',
    field: 'Người nhận',
    filtering: false
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];
const KTX = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HỌ TÊN', filtering: false },
  {
    title: 'KTX',
    field: 'KTX'
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
    field: 'HK',
    lookup: {
      1: '1',
      2: '2',
      3: '3'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'GhiChu',
    filtering: false
  }
];

export default { ALL, KTX };
