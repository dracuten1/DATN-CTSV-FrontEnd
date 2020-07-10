import React from 'react';
import icons from 'shared/icons';

const dt = new Date();
const year = dt.getFullYear();

const QLFILE = [
  { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'Tên file', field: 'fileName', filtering: false },
  {
    title: 'Nhân viên',
    field: 'username',
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
    field: 'hk',
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
    title: 'Ngày cập nhật',
    field: 'updatedAt',
    cellStyle: {
      minWidth: '300px'
    }
  }
];


export default {
  QLFILE
};
