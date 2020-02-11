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

  const { listData, isAlllist } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isAlllist ? mockData.info : mockData.importInfo,
    columns: [
      { title: 'MSSV', field: 'mssv'},
      { title: 'Họ tên', field: 'name'},
      {
        title: 'Ngày sinh',
        field: 'dob'
      },
      {
        title: 'Nơi sinh',
        field: 'portal'
      },
      {
        title: 'Nơi sinh khác',
        field: 'isConfirm'
      },
      {
        title: 'Giới tính',
        field: 'gender'
      },
      {
        title: 'Ngày vào trường',
        field: 'semester',
      },
      {
        title: 'Khóa học',
        field: 'receiver',
      },
      {
        title: 'Bậc đào tạo',
        field: 'receiver',
      },
      {
        title: 'Loại hình đào tạo',
        field: 'receiver',
      },
      {
        title: 'Ngành',
        field: 'receiver',
      },
      {
        title: 'Chuyên ngành',
        field: 'receiver',
      },
      {
        title: 'Tình trạng',
        field: 'receiver',
      },
      {
        title: 'CMND',
        field: 'cmnd',
      },
      {
        title: 'Ngày cấp CMND',
        field: 'receiver',
      },
      {
        title: 'Nơi cấp CMND',
        field: 'receiver',
      },
      {
        title: 'Dân tộc',
        field: 'receiver',
      },
      {
        title: 'Tôn giáo',
        field: 'receiver',
      },
      {
        title: 'Quốc tịch',
        field: 'receiver',
      },
      {
        title: 'Địa chỉ',
        field: 'receiver',
      },
      {
        title: 'Phường xã',
        field: 'receiver',
      },
      {
        title: 'Quận huyện',
        field: 'receiver',
      },
      {
        title: 'Tỉnh/TP',
        field: 'receiver',
      },
      {
        title: 'Tạm trú',
        field: 'receiver',
      },
      {
        title: 'ĐT nhà',
        field: 'receiver',
      },
      {
        title: 'ĐT di động',
        field: 'receiver',
      },
      {
        title: 'Thành phần GĐ',
        field: 'receiver',
      },
      {
        title: 'Email',
        field: 'email',
      },
      {
        title: 'Email cá nhân',
        field: 'receiver',
      },
      {
        title: 'Đoàn viên',
        field: 'isConfirm',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.isConfirm ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      {
        title: 'Ngày vào Đoàn',
        field: 'receiver',
      },
      {
        title: 'Đảng viên',
        field: 'isConfirm',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.isConfirm ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      {
        title: 'Ngày vào Đảng',
        field: 'receiver',
      },
      {
        title: 'Ngân hàng',
        field: 'receiver',
      },
      {
        title: 'STK',
        field: 'receiver',
      },
      {
        title: 'Chi nhánh',
        field: 'receiver',
      },
      {
        title: 'Ghi chú',
        field: 'note',
      },
      {
        title: 'Người liên lạc',
        field: 'receiver',
      },
      {
        title: 'Địa chỉ NLL',
        field: 'receiver',
      },
      {
        title: 'Điện thoại NLL',
        field: 'receiver',
      },
      {
        title: 'Email NLL',
        field: 'receiver',
      },
      {
        title: 'Quan hệ NLL',
        field: 'receiver',
      },
      {
        title: 'Ghi chú NLL',
        field: 'receiver',
      },
      {
        title: 'Ngoại ngữ',
        field: 'receiver',
      },
      {
        title: 'Tin học',
        field: 'receiver',
      },
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
