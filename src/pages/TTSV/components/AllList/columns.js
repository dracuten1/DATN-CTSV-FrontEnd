const dt = new Date();
const year = dt.getFullYear();

const SVNN = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
  {
    title: 'Tên chương trình',
    field: 'ktx'
  },
  {
    title: 'Nơi đến',
    field: 'portal'
  },
  {
    title: 'Thể loại',
    field: 'portal'
  },
  {
    title: 'Kinh phí',
    field: 'portal'
  },
  {
    title: 'Thời gian',
    field: 'portal'
  },
  {
    title: 'Đơn vị đề cử',
    field: 'portal'
  },
  {
    title: 'Số quyết định',
    field: 'receiver',
    filtering: false
  },
  {
    title: 'Ngày cấp',
    field: 'note',
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
    field: 'HocKy',
    lookup: {
      1: '1',
      2: '2'
    },
    filterCellStyle: {
      paddingTop: 1
    }
  }
];

const DTB = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
  {
    title: 'Ngày sinh',
    field: 'dob'
  },
  {
    title: 'ĐTB_TL',
    field: 'portal'
  },
  {
    title: 'ĐTB',
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
    field: 'note'
  }
];

const DSTN = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
  {
    title: 'ĐTB',
    field: 'DTB'
  },
  {
    title: 'Loại TN',
    field: 'type'
  },
  {
    title: 'Đợt tháng',
    field: 'month'
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
    field: 'note'
  }
];

const HTCT = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
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
    field: 'note'
  }
];

const CCHV = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
  {
    title: 'ĐTB1',
    field: 'portal'
  },
  {
    title: 'ĐTB2',
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
    field: 'note'
  }
];

const DKHP = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
  {
    title: 'Mã MH',
    field: 'portal'
  },
  {
    title: 'Tên MH',
    field: 'portal'
  },
  {
    title: 'Lớp',
    field: 'portal'
  },
  {
    title: 'Nhóm',
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
  }
];

const BL = [
  // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
  { title: 'MSSV', field: 'MSSV', filtering: false },
  { title: 'Họ tên', field: 'HoVaTen', filtering: false },
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
    field: 'note'
  }
];

export default {
  SVNN,
  DSTN,
  DKHP,
  DTB,
  CCHV,
  HTCT,
  BL
};
