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
