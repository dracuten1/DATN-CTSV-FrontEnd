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

let arrLoaiHB = [];
let arrDoiTuong = [];
let arrDVTT = [];

export default function Filters(props) {
  logger.info("FILTER");
  const classes = useStyles();
  const { onFilter, filter, isCounting, isCase } = props;
  const dt = new Date();
  const year = dt.getFullYear();
  const QLHBState = useSelector(state => state.QLHBState);
  const { listLoaiHB, listDoiTuong, listDonViTaiTro } = QLHBState;
  const {
    hk,
    nh,
    fromHK,
    fromNH,
    toHK,
    toNH,
    mssv,
    LoaiHB,
    DoiTuong,
    DonViTaiTro
  } = filter;

  if (arrLoaiHB.length === 0) {
    arrLoaiHB = arrLoaiHB.concat(listLoaiHB);
    arrDoiTuong = arrDoiTuong.concat(listDoiTuong);
    arrDVTT = arrDVTT.concat(listDonViTaiTro);
  }

  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };

  if (isCounting) {
    switch (isCase) {
      case 1:
        return (
          <>
            <div className={classes.container}>
              <>
                <TextField
                  id="outlined-basic"
                  label="MSSV"
                  variant="outlined"
                  defaultValue={mssv}
                  onChange={handleChange}
                  style={{ marginTop: '8px' }}
                  inputProps={{
                    style: {
                      marginBottom: '-6px'
                    }
                  }}
                />
              </>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px'
                }}
              >
                Start
              </div>
              <Filter
                clickFilter={onFilter}
                label="Học kỳ"
                prop="fromHK"
                defaultValue={fromHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="fromNH"
                defaultValue={fromNH}
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
                defaultValue={toHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="toNH"
                defaultValue={toNH}
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
            </div>
          </>
        );
      case 2:
        return (
            <div className={classes.container}>
              <div>
                <Filter
                  clickFilter={onFilter}
                  prop="LoaiHB"
                  defaultValue={LoaiHB}
                  label="Loại học bổng"
                  data={['HBKK', 'HBTT']}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px'
                }}
              >
                Start
              </div>
              <Filter
                clickFilter={onFilter}
                label="Học kỳ"
                prop="fromHK"
                defaultValue={fromHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="fromNH"
                defaultValue={fromNH}
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
                defaultValue={toHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="toNH"
                defaultValue={toNH}
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
            </div>
        );
      case 3:
        return (
          <>
            <div className={classes.container}>
              <>
                <Filter
                  clickFilter={onFilter}
                  prop="DoiTuong"
                  defaultValue={DoiTuong}
                  label="Đối tượng"
                  data={arrDoiTuong}
                  multiple
                />
              </>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px'
                }}
              >
                Start
              </div>
              <Filter
                clickFilter={onFilter}
                label="Học kỳ"
                prop="fromHK"
                defaultValue={fromHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="fromNH"
                defaultValue={fromNH}
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
                defaultValue={toHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="toNH"
                defaultValue={toNH}
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
            </div>
          </>
        );
      default:
        return (
          // <>
            <div className={classes.container}>
              <div>
                <Filter
                  clickFilter={onFilter}
                  prop="DonViTaiTro"
                  defaultValue={DonViTaiTro}
                  label="Đơn vị tài trợ"
                  data={arrDVTT}
                  multiple
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '15px'
                }}
              >
                Start
              </div>
              <Filter
                clickFilter={onFilter}
                label="Học kỳ"
                prop="fromHK"
                defaultValue={fromHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="fromNH"
                defaultValue={fromNH}
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
                defaultValue={toHK}
                data={['None', '1', '2', '3']}
              />
              <Filter
                clickFilter={onFilter}
                label="Năm học"
                prop="toNH"
                defaultValue={toNH}
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
            </div>
          // </>
        );
    }
  } else {
    return (
      <>
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
        </div>
      </>
    );
  }
}
