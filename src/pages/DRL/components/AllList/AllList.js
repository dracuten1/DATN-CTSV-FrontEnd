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

import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import mockData from './data';
import Actions from '../../../../reduxs/reducers/DRL/action';
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

const AllList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [fillter, setFillter] = React.useState({
    type: 'HK1',
    time: '2018-2019',
    xeploai: 'Giỏi'
  });
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: mockData,
    columns: [
      { title: 'STT', field: 'stt', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv', filtering: false },
      { title: 'Họ tên', field: 'name', filtering: false },
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
          2: '2',
          3: 'Cả năm'
        },
        filterCellStyle: {
          paddingTop: 1
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

  const handleFilter = (prop, data) => {
    setFillter({ ...fillter, [prop]: data });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => dispatch(Actions.fillterListData(fillter))}
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
                  <b>THÔNG TIN SINH VIÊN</b>
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
          style={{ marginLeft: '8px' }}
          onClick={() => {
            dispatch(Actions.getListHistory());
          }}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem Lịch Sử
        </Button>
        <Button
          onClick={() => {
            dispatch(Actions.getNotPrintYet());
          }}
          variant="contained"
          color="primary"
          size="small"
        >
          Danh sách in
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
