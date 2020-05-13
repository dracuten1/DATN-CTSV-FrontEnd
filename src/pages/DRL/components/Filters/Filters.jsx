import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { logger } from 'core/services/Apploger';
import Filter from 'shared/components/filter/Filter';
import InputDateWithLabel from 'shared/components/inputDateWithLabel/InputDateWithLabel';
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

  const DRLState = useSelector(state => state.DRLState);
  const { listUser } = DRLState;

  tempArr = tempArr.concat(listUser);
  logger.info('dataUser: ', tempArr);

  const dt = new Date();
  const year = dt.getFullYear();

  return (
    <div className={classes.container}>
      <Filter
        clickFilter={onFilter}
        label="Học kỳ"
        prop="type"
        data={['None', '1', '2', '3']}
      />
      <Filter
        clickFilter={onFilter}
        label="Năm học"
        prop="time"
        data={['None', `${year}-${(year + 1)}`, `${(year - 1)}-${year}`, `${(year - 2)}-${(year - 1)}`, `${(year - 3)}-${(year - 2)}`, `${(year - 4)}-${(year - 3)}`,`${(year - 5)}-${(year - 4)}`, `${(year - 6)}-${(year - 5)}`]}
      />
      <Filter
        clickFilter={onFilter}
        label="Xếp loại"
        prop="xeploai"
        data={['None', 'Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém']}
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
