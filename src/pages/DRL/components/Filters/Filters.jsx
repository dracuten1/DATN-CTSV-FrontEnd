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
  const { onFillter } = props;

  return (
    <div className={classes.container}>
      <Filter
        clickFillter={onFillter}
        label="Học kỳ"
        prop="type"
        data={['HK1', 'HK2', 'NH']}
      />
      <Filter
        clickFillter={onFillter}
        label="Năm học"
        prop="time"
        data={['2018-2019', '2017-2018', '2016-2017', '2015-2016']}
      />
      <Filter
        clickFillter={onFillter}
        label="Xếp loại"
        prop="xeploai"
        data={['Xuất sắc', 'Giỏi', 'Khá', 'Trung bình', 'Yếu', 'Kém']}
      />
    </div>
  );
}
