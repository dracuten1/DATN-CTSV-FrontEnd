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
import Actions from '../../../../reduxs/reducers/DRL/action';
import { Filters } from '../Filters';
import { AddDialog } from '../AddDialog';
import { MuiThemeProvider } from '@material-ui/core';
import themeTable from 'shared/styles/theme/overrides/MuiTable';

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

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { isKyLuat } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isKyLuat ? mockData.info : mockData.importInfo,
    columns: isKyLuat
      ? [
        { title: 'STT', field: 'stt', editable: 'never', filtering: false },
        { title: 'MSSV', field: 'mssv', filtering: false },
        { title: 'Họ tên', field: 'name', filtering: false },
        {
          title: 'Nội dung vi phạm',
          field: 'ktx'
        },
        {
          title: 'Hình thức kỷ luật',
          field: 'portal'
        },
        {
          title: 'Số quyết định',
          field: 'portal'
        },
        {
          title: 'Ngày quyết định',
          field: 'portal'
        },
        {
          title: 'Trách nhiệm pháp lý',
          field: 'portal'
        },
        {
          title: 'Năm học',
          field: 'year',
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
          field: 'semester',
          lookup: {
            1: '1',
            2: '2'
          },
          filterCellStyle: {
            paddingTop: 1
          }
        }
      ]
      : [
        { title: 'STT', field: 'stt', editable: 'never', filtering: false },
        { title: 'MSSV', field: 'mssv', filtering: false },
        { title: 'Họ tên', field: 'name', filtering: false },
        {
          title: 'Thành tích',
          field: 'ktx'
        },
        {
          title: 'Cấp đạt giải',
          field: 'ktx'
        },
        {
          title: 'Số tiền',
          field: 'ktx'
        },
        {
          title: 'Loại',
          field: 'ktx'
        },
        {
          title: 'Cấp khen thưởng',
          field: 'ktx'
        },
        {
          title: 'Quyết định',
          field: 'ktx'
        },
        {
          title: 'Ngày',
          field: 'ktx'
        },
        {
          title: 'Năm học',
          field: 'year',
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
          field: 'semester',
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

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters />
        <ContainedButton label="Lọc sinh viên" />
      </CardActions>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MuiThemeProvider theme={themeTable}>

              <MaterialTable
                icons={icons}
                title={
                  <div>
                    {isKyLuat ? (
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
            </MuiThemeProvider>
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
