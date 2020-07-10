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
  const { onFilter, filter } = props;
  const dt = new Date();
  const year = dt.getFullYear();
  const {hk ,nh, type} = filter;

  return (
    <div className={classes.container}>
      <Filter
        clickFilter={onFilter}
        label="Học kỳ"
        prop="hk"
        defaultValue={hk}
        data={['None', '1', '2', '3']}
      />
      <Filter
        clickFilter={onFilter}
        label="Năm học"
        prop="nh"
        defaultValue={nh}
        data={[ `${year}-${(year + 1)}`, `${(year - 1)}-${year}`, `${(year - 2)}-${(year - 1)}`, `${(year - 3)}-${(year - 2)}`, `${(year - 4)}-${(year - 3)}`,`${(year - 5)}-${(year - 4)}`, `${(year - 6)}-${(year - 5)}`]}
      />
      <Filter
        clickFilter={onFilter}
        label="Loại"
        prop="type"
        defaultValue={type}
        data={['All', 'KTX']}
      />
    </div>
  );
}
