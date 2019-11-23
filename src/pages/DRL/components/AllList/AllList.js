import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';

import mockData from './data';
import icons from '../icons';
import Actions from '../../../../reduxs/reducers/DRL/action';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const AllList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    data: mockData,
    columns: [
      { title: 'STT', field: 'stt', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv' },
      { title: 'Họ tên', field: 'name' },
      {
        title: 'Năm học',
        field: 'year',
        lookup: {
          1: '2016-2017',
          2: '2017-2018',
          3: '2018-2019',
          4: '2019-2020'
        }
      },
      {
        title: 'Học kỳ',
        field: 'semester',
        lookup: {
          1: '1',
          2: '2',
          3: 'Cả năm'
        }
      },
      {
        title: 'Điểm',
        field: 'score'
      },
      {
        title: 'Xếp loại',
        field: 'grade',
        lookup: {
          1: 'Xuất sắc',
          2: 'Giỏi',
          3: 'Khá',
          4: 'Trung bình',
          5: 'Yếu',
          6: 'Kém'
        }
      },
      {
        title: 'Ghi chú',
        field: 'note',
        filtering: false
      }
    ]
  });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  <b>THÔNG TIN SINH VIÊN</b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={[
                {
                  icon: icons.Import,
                  tooltip: 'Import',
                  isFreeAction: true
                  // onClick: (event, rowData) =>
                }
              ]}
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE'
                },
                exportButton: true,
                filtering: true
              }}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  })
              }}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem toàn bộ
        </Button>
        <Button
          onClick={() => dispatch(Actions.handlePrintList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Danh sách in
        </Button>
        <Button disabled variant="contained" color="primary" size="small">
          In theo trường hợp
        </Button>
      </CardActions>
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
