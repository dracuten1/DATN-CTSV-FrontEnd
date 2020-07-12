import React from 'react';
import Filter from 'shared/components/filter/Filter';
import TextField from '@material-ui/core/TextField';
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
  const { onFilter, filter, isCase } = props;
  const dt = new Date();
  const year = dt.getFullYear();
  const { hk, nh, type, mssv } = filter;

  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };

  return (
    <div className={classes.container}>

      {isCase !== 10 ? (
        <>
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
            data={[
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />
          <Filter
            clickFilter={onFilter}
            prop="type"
            label="Tình trạng"
            defaultValue={type}
            data={[
              'BẢO LƯU',
              'ĐANG HỌC',
              'SINH VIÊN NƯỚC NGOÀI',
              'TỐT NGHIỆP',
              'HOÀN TẤT CHƯƠNG TRÌNH',
              'BUỘC THÔI HỌC',
              'CẢNH CÁO HỌC VỤ',
              'ĐĂNG KÝ HỌC PHẦN'
              // 'ĐIỂM TRUNG BÌNH'
            ]}
          />
        </>
      ) : (
          <TextField
            id="outlined-basic"
            label="MSSV"
            variant="outlined"
            onChange={handleChange}
            defaultValue={mssv}
            style={{ marginTop: '8px', width: '80%' }}
            inputProps={{
              style: {
                marginBottom: '-6px'
              }
            }}
          />
        )}
    </div>
  );
}
