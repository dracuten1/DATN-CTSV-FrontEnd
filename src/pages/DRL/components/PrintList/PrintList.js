import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import moment from 'moment';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import { useDispatch, useSelector } from 'react-redux';
import DRLActions from 'reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';
import icons from 'shared/icons';
import { CaseEnum } from 'pages/DRL/components/AddDialog/DRLEnum';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
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

let valueCase = null;
let updateBegin = 0;
let isPrint = false;
const PrintList = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const DRLState = useSelector(state => state.DRLState);

  const {
    dataPrint,
    listLink,
    dataHistory,
    isPrintList,
    isHistoryList
  } = DRLState;

  logger.info('history', dataHistory);
  logger.info('dataPrint: ', dataPrint);
  const [open, setOpen] = React.useState(false);
  const [notice, setNotice] = React.useState(false);

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);
  const closeImportDialog = () => {
    setImportOpen(false);
  };
  const handleImport = () => {
  };

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
      { title: 'STT', field: 'stt', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv', editable: 'onAdd', filtering: false },
      {
        title: 'Họ tên',
        field: 'name',
        editable: 'never',
        filtering: false
      },
      {
        title: 'Trường hợp',
        field: 'case',
        lookup: {
          HK: 'Năm học-Học kỳ',
          NH: 'Năm Học',
          All: 'Tất cả',
          TK: 'Toàn Khoá'
        },
        filterCellStyle: {
          paddingTop: 1
        },
        customFilterAndSearch: (term, rowData) => {
          if (valueCase !== term) {
            valueCase = term;
          }
          if (term.length !== 0) {
            return term === rowData.case;
          }
          return rowData;
        }
      },
      {
        title: 'Ngày in',
        field: 'date',
        editable: 'never',
        type: 'date',
        filtering: false
      }
    ]
  });

  if (updateBegin === 0) {
    dispatch(DRLActions.getNotPrintYet());
    dispatch(DRLActions.getListPrintByDate(moment(new Date()).format("x"), moment(new Date()).format("x")));
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

  const reparseCase = tmpcase => {
    switch (tmpcase) {
      case CaseEnum.hk:
        return 'HK';
      case CaseEnum.nh:
        return 'NH';
      case CaseEnum.tc:
        return 'All';
      case CaseEnum.tk:
        return 'TK';
      default:
        return 'All';
    }
  };

  const successSnackBar = { open: true, type: "success", message: "Thêm thành công!" };
  const errorSnackBar = { open: true, type: "error", message: "Đã xảy ra lỗi, vui lòng kiểm tra lại!" };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);

  const handleAdd = (newData, valid) => {
    setOpen(false);
    if (valid) {
      setState(prevState => {
        const data = [...prevState.data];
        logger.info('HOT FIX: ', data);
        logger.info('HOT FIX: ', newData);
        newData.stt = data.length + 1;
        newData.date = moment(new Date()).format('DD/MM/YYYY');
        newData.case = reparseCase(newData.case);

        data.push(newData);
        return { ...prevState, data };
      });
      setSnackBarValue(successSnackBar);
    } else {
      setSnackBarValue(errorSnackBar);
      logger.info('HOT FIX: ', snackBarValue);
    };
  };

  const handleClose = (current) => (event) => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  logger.info('dataTable: ', state.data);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CustomizedSnackbars value={snackBarValue} handleClose={handleClose} />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  {isPrintList ? (
                    <b>
                      DANH SÁCH IN TRONG NGÀY{' '}
                      {moment(new Date()).format('DD/MM/YYYY')}
                    </b>
                  ) : (
                      <b>LỊCH SỬ HOẠT ĐỘNG</b>
                    )}
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={
                isPrintList
                  ? [
                    {
                      icon: icons.Print,
                      tooltip: 'Print',
                      onClick: (event, rowData) => {
                        dispatch(
                          DRLActions.PrintOneStudent(rowData.pk, rowData.sk)
                        );
                        isPrint = !isPrint;
                      }
                    }
                  ]
                  : []
              }
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
              editable={
                isPrintList
                  ? {
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          logger.info('Olddata: ', oldData);
                          const { pk, sk } = oldData;
                          dispatch(DRLActions.deleteOneCertificate(pk, sk));
                          resolve();
                          setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                          });
                        }, 600);
                      })
                  }
                  : {}
              }
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Button
              onClick={() => dispatch(DRLActions.fillterListData('HK1', '2018-2019', 'Giỏi'))}
              variant="contained"
              color="primary"
              size="small"
            >
              Xem toàn bộ
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                // dispatch(DRLActions.getListHistory());
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Xem Lịch Sử
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                dispatch(DRLActions.getNotPrintYet());
                updateBegin = 1;
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Danh sách in
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => setOpen(true)}
              variant="contained"
              color="primary"
              size="small"
            >
              Thêm sinh viên in
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => setImportOpen(true)}
              variant="contained"
              color="primary"
              size="small"
            >
              Import
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              variant="contained"
              color="primary"
              size="small"
            >
              Export
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                dispatch(DRLActions.handlePrint(valueCase));
                isPrint = !isPrint;
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              In theo trường hợp
            </Button>
          </Grid>
          {listLink.length > 0 ? (
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ListLinkDocx data={listLink} />
            </Grid>
          ) : (
              ''
            )}
        </Grid>
      </CardActions>
      <AddDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleAdd={handleAdd}
      />
      <ImportDialog
        open={importOpen}
        handleClose={() => setImportOpen(false)}
        handleImport={handleImport}
        importCase={"import-drl"}
      />
      <Dialog
        open={notice}
        onClose={() => setNotice(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không có gì để in
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotice(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
