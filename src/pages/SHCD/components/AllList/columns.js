import React from 'react';
import icons from 'shared/icons';


const DKSHCD = [
  { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'mssv', filtering: false },
  { title: 'Họ tên', field: 'name', filtering: false },
  {
    title: 'Tên chuyên đề',
    field: 'ktx'
  },
  {
    title: 'Lớp',
    field: 'portal'
  },
  {
    title: 'Đợt',
    field: 'portal'
  },
  {
    title: 'Ngày đăng ký',
    field: 'portal'
  },
  {
    title: 'Năm học',
    field: 'NamHoc',
    lookup: {
      1: '2016-2017',
      2: '2017-2018',
      3: '2018-2019',
      4: '2019-2020'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'HocKy',
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
    field: 'note'
  }
];

const KQSHCD = [
  { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'mssv', filtering: false },
  { title: 'Họ tên', field: 'name', filtering: false },
  {
    title: 'Chuyên đề 1',
    field: 'isConfirm',
    type: 'boolean',
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.isConfirm ? <icons.CheckBox /> : <icons.CheckBlank />}
      </div>
    )
  },
  {
    title: 'Chuyên đề 2',
    field: 'isConfirm',
    type: 'boolean',
    render: rowData => (
      <div style={{ marginLeft: '10px' }}>
        {rowData.isConfirm ? <icons.CheckBox /> : <icons.CheckBlank />}
      </div>
    )
  },
  {
    title: 'Điểm',
    field: 'portal'
  },
  {
    title: 'Học kỳ',
    field: 'HocKy',
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
    field: 'NamHoc',
    lookup: {
      1: '2016-2017',
      2: '2017-2018',
      3: '2018-2019',
      4: '2019-2020'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Ghi chú',
    field: 'note'
  }
];

const DDSHCD = [
  { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'mssv', filtering: false },
  { title: 'Họ tên', field: 'name', filtering: false },
  {
    title: 'Tên chuyên đề',
    field: 'ktx'
  },
  {
    title: 'Lớp',
    field: 'portal'
  },
  {
    title: 'Ngày học',
    field: 'portal'
  },
  {
    title: 'Năm học',
    field: 'NamHoc',
    lookup: {
      1: '2016-2017',
      2: '2017-2018',
      3: '2018-2019',
      4: '2019-2020'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'HocKy',
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
    field: 'note'
  }
];

const KTSHCD = [
  { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'mssv', filtering: false },
  { title: 'Họ tên', field: 'name', filtering: false },
  {
    title: 'Năm học',
    field: 'NamHoc',
    lookup: {
      1: '2016-2017',
      2: '2017-2018',
      3: '2018-2019',
      4: '2019-2020'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  },
  {
    title: 'Học kỳ',
    field: 'HocKy',
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
    field: 'note'
  }
];

export default {
  DKSHCD,
  KTSHCD,
  DDSHCD,
  KQSHCD
};
