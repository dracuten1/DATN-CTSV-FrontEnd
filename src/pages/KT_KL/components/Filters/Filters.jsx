import React from 'react';
import Filter from 'shared/components/filter/Filter';
import FilterCDCS from 'shared/components/filter/FilterObject';
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

let arrCapDG = [];
let arrCapKT = [];
let arrLoaiKT = [];

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter, filter, isCase } = props;
  const dt = new Date();
  const year = dt.getFullYear();
  const KTKLState = useSelector(state => state.KTKLState);
  const { CapDatGiai, CapKhenThuong, LoaiKhenThuong } = KTKLState;
  const { fromHK, fromNH, toHK, toNH, mssv, capKT, capDG, loaiKT } = filter;

  if (arrLoaiKT.length === 0) {
    arrLoaiKT = arrLoaiKT.concat(LoaiKhenThuong);
    arrCapKT = arrCapKT.concat(CapKhenThuong);
    arrCapDG = arrCapDG.concat(CapDatGiai);
  }

  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };

  switch (isCase) {
    case 1:
    case 3:
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
                fontSize: '15px',
                marginLeft: '15px'
              }}
            >
              Start
            </div>
            <>
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
            <>
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
          </div>
        </>
      );
    case 2:
    case 4:
      return (
        <div className={classes.container}>
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
    case 5:
      return (
        <div className={classes.container}>
          <FilterCDCS
            clickFilter={onFilter}
            prop="capDG"
            defaultValue={capDG}
            label="Cấp đạt giải"
            data={arrCapDG}
            // multiple
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px'
            }}
          >
            Start
          </div>
          <>
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
          <>
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
        </div>
      );
    case 6:
      return (
        <div className={classes.container}>
          <>
            <FilterCDCS
              clickFilter={onFilter}
              prop="capKT"
              defaultValue={capKT}
              label="Cấp khen thưởng"
              data={arrCapKT}
              // multiple
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
          <>
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
          <>
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
        </div>
      );
    default:
      return (
        <div className={classes.container}>
          <FilterCDCS
            clickFilter={onFilter}
            prop="loaiKT"
            defaultValue={loaiKT}
            label="Loại khen thưởng"
            data={arrLoaiKT}
            // multiple
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '15px'
            }}
          >
            Start
          </div>
          <>
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
          <>
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
        </div>
      );
  }
}
