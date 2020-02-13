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
        prop="type"
        data={['HK1', 'HK2', 'NH']}
      />
      <Filter
        clickFilter={onFilter}
        label="Năm học"
        prop="time"
        data={['2018-2019', '2017-2018', '2016-2017', '2015-2016']}
      />
      <Filter
        clickFilter={onFilter}
        label="Xếp loại"
        prop="xeploai"
        data={['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém']}
      />
    </div>
  );
}
