import React from 'react';
import Filter from 'shared/components/filter/Filter';
import FilterCDCS from 'shared/components/filter/FilterObject';
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

let arrDoiTuong = [];
export default function Filters(props) {
  const classes = useStyles();
  const { onFilter, isCase, filter } = props;
  const dt = new Date();
  const year = dt.getFullYear();

  const CDCSState = useSelector(state => state.CDCSState);
  const { listDoiTuong } = CDCSState;
  const { fromHK, fromNH, toHK, toNH, mssv, typeCDCS, DoiTuong } = filter;
  if (arrDoiTuong.length === 0) arrDoiTuong = arrDoiTuong.concat(listDoiTuong);
  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };

  return (
    <div className={classes.container}>
      {isCase === 6 ? (
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
      ) : (
        <Filter
          clickFilter={onFilter}
          label="Loại"
          prop="typeCDCS"
          defaultValue={typeCDCS}
          data={['DTTS', 'HTDX', 'TCXH', 'MGHP', 'SVKT']}
        />
      )}
      <FilterCDCS
        clickFilter={onFilter}
        prop="DoiTuong"
        label="Đối tượng"
        defaultValue={DoiTuong}
        data={arrDoiTuong}
        multiple
      />
      <div
        style={{
          display: 'flex',
          marginLeft: '10px',
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
}
