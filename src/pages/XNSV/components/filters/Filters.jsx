import React from 'react';
import Filter from 'shared/components/filter/Filter';
import { makeStyles } from '@material-ui/core/styles';
import InputDateWithLabel from 'shared/components/inputDateWithLabel/InputDateWithLabel';
import { useSelector } from 'react-redux';
import { logger } from 'core/services/Apploger';

import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

let tempArr = ['None'];

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter } = props;

  const XNSVState = useSelector(state => state.XNSVState);
  const { listUser } = XNSVState;
  
  tempArr = tempArr.concat(listUser);
  logger.info('dataUser: ', tempArr);

  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <div className={classes.container}>
      <Filter
        clickFilter={onFilter}
        label="Học kỳ"
        prop="hk"
        data={['None', '1', '2', '3']}
      />
      <Filter
        clickFilter={onFilter}
        label="Năm học"
        prop="nh"
        data={['None', `${year}-${(year + 1)}`, `${(year - 1)}-${year}`, `${(year - 2)}-${(year - 1)}`, `${(year - 3)}-${(year - 2)}`, `${(year - 4)}-${(year - 3)}`,`${(year - 5)}-${(year - 4)}`, `${(year - 6)}-${(year - 5)}`]}
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
      <Filter
        clickFilter={onFilter}
        prop="username"
        label="User"
        data={tempArr}
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
