import React from 'react';
import Filter from 'shared/components/filter/Filter';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { logger } from 'core/services/Apploger';
import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

let arrLoaiHB = ['None'];
let arrDoiTuong = ['None'];
let arrDVTT = ['None'];

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter, mssv } = props;
  const dt = new Date();
  const year = dt.getFullYear();
  const QLHBState = useSelector(state => state.QLHBState);
  const { isCounting, listLoaiHB, listDoiTuong, listDonViTaiTro } = QLHBState;

  if (arrLoaiHB.length === 1)
  {
    arrLoaiHB = arrLoaiHB.concat(listLoaiHB);
    arrDoiTuong = arrDoiTuong.concat(listDoiTuong);
    arrDVTT = arrDVTT.concat(listDonViTaiTro);
  }

  logger.info('listLoaiHB: ', listLoaiHB);

  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };
  
  return (
    <div className={classes.container}>
      {isCounting ? (
        <>
          <div
            style={{ display: 'flex', alignItems: 'center', fontSize: '15px' }}
          >
            Start
          </div>
          <Filter
            clickFilter={onFilter}
            label="Học kỳ"
            prop="fromHK"
            data={['None', '1', '2', '3']}
          />
          <Filter
            clickFilter={onFilter}
            label="Năm học"
            prop="fromNH"
            data={[
              'None',
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />

          <div
            style={{
              marginLeft: '10px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px'
            }}
          >
            End
          </div>
          <Filter
            clickFilter={onFilter}
            label="Học kỳ"
            prop="toHK"
            data={['None', '1', '2', '3']}
          />
          <Filter
            clickFilter={onFilter}
            label="Năm học"
            prop="toNH"
            data={[
              'None',
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />

          <div
            style={{
              marginLeft: '10px',
              marginRight: '5px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px'
            }}
          >
            Filter
          </div>
          <TextField
            id="outlined-basic"
            label="MSSV"
            variant="outlined"
            defaultValue={mssv}
            onChange={handleChange}
            style={{ marginTop: '8px', width: '80%' }}
            inputProps={{
              style: {
                marginBottom: '-6px'
              }
            }}
          />
          <Filter
            clickFilter={onFilter}
            prop="LoaiHB"
            label="Loại học bổng"
            data={arrLoaiHB}
          />
          <Filter
            clickFilter={onFilter}
            prop="DoiTuong"
            label="Đối tượng"
            data={arrDoiTuong}
          />
          <Filter
            clickFilter={onFilter}
            prop="DonViTaiTro"
            label="Đơn vị tài trợ"
            data={arrDVTT}
          />
        </>
      ) : (
        <>
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
            data={[
              'None',
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />
        </>
      )}
    </div>
  );
}
