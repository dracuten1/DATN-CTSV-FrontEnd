import React from 'react';
import Filter from 'shared/components/filter/Filter';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { logger } from 'core/services/Apploger';
import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export default function Filters(props) {
  logger.info("FILTER");
  const classes = useStyles();
  const { onFilter, isCounting, filter } = props;
  const dt = new Date();
  const year = dt.getFullYear();

  const {hk, nh, fromHK, fromNH, toHK, toNH, mssv, type} = filter;

  const handleChange = event => {
    onFilter('mssv', event.target.value);
  };

  return (
    <div className={classes.container}>
      {isCounting ? (
        <>
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
          <div
            style={{ display: 'flex', marginLeft: '10px' ,alignItems: 'center', fontSize: '15px' }}
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
          <Filter
            clickFilter={onFilter}
            label="Loại"
            prop="type"
            defaultValue={type}
            data={['BHYT', 'BHTN', 'Bồi thường']}
          />
        </>
      ) : (
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
