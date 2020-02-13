import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';

import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import mockData from './data';
import Actions from '../../../../reduxs/reducers/QLLT/action';
import { Filters } from '../Filters';
import { AddDialog } from '../AddDialog';

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
    justifyContent: 'flex-start'
  }
}));

let updateBegin = 0;
const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { dataList, isAlllist } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fillter, setFillter] = React.useState({
    hk: '1',
    nh: '19-20',
    type: 'all'
  });
  const [state, setState] = useState({
    data: dataList,
    columns: isAlllist
      ? [
          // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
          { title: 'MSSV', field: 'MSSV', filtering: false },
          { title: 'Họ tên', field: 'Họ tên', filtering: false },
          {
            title: 'Nội trú - KTX',
            field: 'ktx',
            filtering: false
          },
          {
            title: 'Nội trú - Portal',
            field: 'portal',
            type: 'boolean',
            render: rowData => (
              <div style={{ marginLeft: '10px' }}>
                {rowData.portal ? <icons.CheckBox /> : <icons.CheckBlank />}
              </div>
            )
          },
          {
            title: 'Xác nhận ngoại trú',
            field: 'Xác nhận ngoại trú',
            type: 'boolean',
            render: rowData => (
              <div style={{ marginLeft: '10px' }}>
                {rowData['Xác nhận ngoại trú'] ? <icons.CheckBox /> : <icons.CheckBlank />}
              </div>
            )
          },
          {
            title: 'Năm học',
            field: 'NH',
            lookup: {
              1: '16-17',
              2: '17-18',
              3: '18-19',
              4: '19-20'
            },
            filterCellStyle: {
              paddingTop: 1
            }
          },
          {
            title: 'Học kỳ',
            field: 'HK',
            lookup: {
              1: '1',
              2: '2'
            },
            filterCellStyle: {
              paddingTop: 1
            }
          },
          {
            title: 'Người nhận',
            field: 'receiver',
            filtering: false
          },
          {
            title: 'Ghi chú',
            field: 'note',
            filtering: false
          }
        ]
      : [
          { title: 'STT', field: 'stt', editable: 'never', filtering: false },
          { title: 'MSSV', field: 'mssv', filtering: false },
          { title: 'Họ tên', field: 'name', filtering: false },
          {
            title: 'KTX',
            field: 'ktx'
          },
          {
            title: 'Năm học',
            field: 'NH',
            lookup: {
              1: '2016-2017',
              2: '2017-2018',
              3: '2018-2019',
              4: '2019-2020'
            },
            filterCellStyle: {
              paddingTop: 1
            }
          },
          {
            title: 'Học kỳ',
            field: 'HK',
            lookup: {
              1: '1',
              2: '2'
            },
            filterCellStyle: {
              paddingTop: 1
            }
          },
          {
            title: 'Ghi chú',
            field: 'note',
            filtering: false
          }
        ]
  });

  if (updateBegin === 0) {
    dispatch(Actions.getListWithFilter(fillter));
    updateBegin += 1;
  }

  if (dataList.length > 0 && updateBegin === 1) {
    setState({ ...state, data: dataList });
    updateBegin += 1;
  }

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };

  const handleFillter = (prop, data) => {
    setFillter({ ...fillter, [prop]: data });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFillter={handleFillter} />
        <ContainedButton
          handleClick={() => dispatch(Actions.getListWithFilter(fillter))}
          label="Lọc sinh viên"
        />
      </CardActions>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  {isAlllist ? (
                    <b>THÔNG TIN SINH VIÊN</b>
                  ) : (
                    <b>DANH SÁCH IMPORT</b>
                  )}
                </div>
              }
              columns={state.columns}
              data={state.data}
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE'
                },
                // exportButton: true,
                filtering: true
              }}
              editable={{
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
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          Thêm sinh viên in
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Import
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
      </CardActions>
      <AddDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleAdd={handleAdd}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
