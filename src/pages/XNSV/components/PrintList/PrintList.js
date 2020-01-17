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
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'core/services/Apploger';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import icons from 'shared/icons';
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
let updateBegin = 0;
let isPrint = false;

const PrintList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const XNSVState = useSelector(state => state.XNSVState);
  const {
    dataPrint,
    listLink,
    dataHistory,
    isPrintList,
    isHistoryList
  } = XNSVState;

  logger.info('history', dataHistory);
  logger.info('dataPrint: ', dataPrint);

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isPrintList ? dataPrint : dataHistory,
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
          3: 'Chờ xét tốt nghiệp',
          4: 'Chờ xét hoàn tất chương trình',
          5: 'Vay vốn',
          6: 'Giấy giới thiệu',
          7: 'Thời gian học',
          8: 'Hoàn tất chương trình'
        },
        filterCellStyle: {
          paddingTop: 1
        }
      },
      {
        title: 'Lý do',
        field: 'reason',
        editable: 'never',
      },
      {
        title: 'Ghi chú',
        field: 'ghiChu',
        editable: 'never',
        filtering: false
      }
    ]
  });

  if (updateBegin === 0) {
    dispatch(XNSVActions.getNotPrintYet());
    updateBegin += 1;
  }

  if (dataPrint.length > 0 && updateBegin === 1) {
    setState({ ...state, data: dataPrint });
    updateBegin += 1;
  }

  if (isPrint) {
    setState({ ...state, data: dataPrint });
    isPrint = !isPrint;
  }

  if (isHistoryList && state.data.length !== dataHistory.length) {
    setState({ ...state, data: dataHistory });
  }

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
                  <b>
                    DANH SÁCH IN TRONG NGÀY {moment(date).format('DD/MM/YYYY')}
                  </b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={!isHistoryList ? [
                {
                  icon: icons.Print,
                  tooltip: 'Print'
                }
              ] : []}
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
              editable={!isHistoryList ? {
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
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      logger.info('Olddata: ', oldData);
                      const { pk, sk } = oldData;
                      dispatch(XNSVActions.deleteOneCertificate(pk, sk));
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  })
              }: {}}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={() => dispatch(XNSVActions.getListHistory())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem lịch sử
        </Button>
        <Button
          onClick={() => {
            dispatch(XNSVActions.getNotPrintYet());
            updateBegin = 1;
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
          onClick={() => dispatch(XNSVActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
        <Button
          onClick={() => dispatch(XNSVActions.handlePrint())}
          variant="contained"
          color="primary"
          size="small"
        >
          In theo trường hợp
        </Button>
      </CardActions>
      <XNTKTDialog
        handleAdd={handleAdd}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
