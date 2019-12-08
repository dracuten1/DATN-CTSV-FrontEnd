import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Actions from 'reduxs/reducers/DRL/action';

import icons from 'shared/icons';
import mockData from './data';
import XNTKTDialog from '../XNTruockhiThemDialog/XNTruocKhiThemDialog';

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

const date = new Date();

const PrintList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  // const DRLState = useSelector(state => state.DRLState);
  // const { dataPrint } = DRLState;

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: mockData,
    columns: [
      {
        title: 'Đã In',
        field: 'isPrint',
        editable: 'onAdd',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.isPrint ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      { title: 'SCN', field: 'scn', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv', editable: 'onAdd', filtering: false },
      {
        title: 'Họ tên',
        field: 'name',
        editable: 'never',
        filtering: false
      },
      {
        title: 'Loại xác nhận',
        field: 'case',
        lookup: {
          1: 'Đang học',
          2: 'Bảo lưu',
          3: 'Chờ xét TN',
          4: 'Chờ xét HTCT'
        },
        filterCellStyle: {
          paddingTop: 1
        }
      },
      {
        title: 'Tình trạng',
        field: 'tinhTrang',
        editable: 'never',
        filtering: false
      },
      {
        title: 'Ghi chú',
        field: 'ghiChu',
        editable: 'never',
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
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  <b>DANH SÁCH IN TRONG NGÀY {moment(date).format('DD/MM/YYYY')}</b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={[
                {
                  icon: icons.Print,
                  tooltip: 'Print'
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
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem lịch sử
        </Button>
        <Button
          onClick={() => dispatch(Actions.handlePrintList())}
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
          Export
        </Button>
        <Button
          onClick={() => dispatch(Actions.handlePrint())}
          variant="contained"
          color="primary"
          size="small"
        >
          In theo trường hợp
        </Button>
      </CardActions>
      <XNTKTDialog handleAdd={handleAdd} open={open} handleClose={() => setOpen(false)} />
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;