import React from 'react';
import icons from 'shared/icons';

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
      1: '16-17',
      2: '17-18',
      3: '18-19',
      4: '19-20'
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
      2: '2'
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
    field: 'Ghi chú',
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
      1: '16-17',
      2: '17-18',
      3: '18-19',
      4: '19-20'
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
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'Ghi chú',
    filtering: false
  }
];

export default { ALL, KTX };
