import React from 'react';
import Filter from 'shared/components/filter/Filter';
import { makeStyles } from '@material-ui/core/styles';

import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter } = props;

  return (
    <div className={classes.container}>
      <Filter
        clickFilter={onFilter}
        label="Học kỳ"
        prop="hk"
        data={['None', '1', '2']}
      />
      <Filter
        clickFilter={onFilter}
        label="Năm học"
        prop="nh"
        data={['None', '2018-2019', '2017-2018', '2016-2017', '2015-2016']}
      />
      <Filter
        clickFilter={onFilter}
        prop="type"
        label="Tình trạng"
        data={[
          'Bảo lưu',
          'Đang học',
          'Sinh viên nước ngoài',
          'Tốt nghiệp',
          'Hoàn tất chương trình',
          'Buộc thôi học',
          'Cảnh cáo học vụ',
          'Đăng ký học phần'
        ]}
      />
    </div>
  );
}
