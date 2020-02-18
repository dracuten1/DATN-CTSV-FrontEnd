import React from 'react';
import Filter from 'shared/components/filter/Filter';
import { makeStyles } from '@material-ui/core/styles';
import InputDateWithLabel from 'shared/components/inputDateWithLabel/InputDateWithLabel';

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
        data={['None', '1', '2', 'NH']}
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
        label="Loại xác nhận"
        data={[
          'None',
          'Bảo lưu',
          'Đang học',
          'Chờ xét hoàn tất chương trình',
          'Chờ xét tốt nghiệp',
          'Hoàn tất chương trình',
          'Thời gian học',
          'Giới thiệu',
          'Vay vốn'
        ]}
      />

      <InputDateWithLabel
        prop="fromDate"
        clickFilter={onFilter}
        label="Từ ngày"
      />
      <InputDateWithLabel
        prop="toDate"
        clickFilter={onFilter}
        label="Đến ngày"
      />
    </div>
  );
}
