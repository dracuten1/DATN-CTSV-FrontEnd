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
import XNSVActions from 'reduxs/reducers/DRL/action';
import mockData from './data';
import Filters from '../filters/Filters';
import XNTKTDialog from '../XNTruockhiThemDialog/XNTruocKhiThemDialog';
import ExportCert from '../beforeStudentExportCertificateDialog/BeforeStudentExportCertificateDialog';

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
  const [open, setOpen] = React.useState({
    add: false,
    export: false
  });
  const [state, setState] = useState({
    data: mockData,
    columns: [
      { title: 'SCN', field: 'scn', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv', filtering: false },
      { title: 'Họ tên', field: 'name', filtering: false },
      { title: 'Loại xác nhận', field: 'loaiXacNhan', filtering: false },
      { title: 'Lý do', field: 'lydo', filtering: false },
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
            <MaterialTable
              icons={icons}
              title={
                <div>
                  <b>THÔNG TIN SINH VIÊN ĐÃ XÁC NHẬN</b>
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
                }
              }}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={() => dispatch(XNSVActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem lịch sử
        </Button>
        <Button
          onClick={() => dispatch(XNSVActions.handlePrintList())}
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
          onClick={() => dispatch(XNSVActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
        <Button
          variant="contained"
          disabled
          color="primary"
          size="small"
        >
          In theo trường hợp
        </Button>
      </CardActions>
      <XNTKTDialog
        open={open.add}
        handleClose={() => setOpen({ add: false })}
        handleAdd={handleAdd}
      />
      <ExportCert
        open={open.export}
        handleClose={() => setOpen({ export: false })}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
