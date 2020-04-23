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
  Grid
} from '@material-ui/core';
import moment from 'moment';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import { useDispatch, useSelector } from 'react-redux';
import * as DRLHandler from 'handlers/DRLHandler';
import DRLActions from 'reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';
import icons from 'shared/icons';
import { CaseEnum } from 'pages/DRL/components/AddDialog/DRLEnum';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import { AddDialog } from '../AddDialog';
import { Filters } from '../Filters';

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
    listLink,
    dataPrint,
    isPrintList,
    isHistoryList,
    isAllList
  } = DRLState;

  const [fillter, setFillter] = React.useState({
    type: 'HK1',
    time: '2018-2019',
    xeploai: 'Giỏi'
  });

  logger.info('history', dataPrint);
  logger.info('dataPrint: ', dataPrint);
  const [open, setOpen] = React.useState(false);
  const [notice, setNotice] = React.useState(false);

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);
  const closeImportDialog = () => {
    setImportOpen(false);
  };
  const handleImport = () => {};

  const UrlsColumns = [
    { title: 'STT', field: 'stt', editable: 'never', filtering: false },
    { title: 'URL', field: 'url', editable: 'never', filtering: false }
  ];

  const PrintColumns = [
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
          return term == rowData.case;
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
  ];

  const AllColumns = [
    // { title: 'STT', field: 'stt', editable: 'never', filtering: false },
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
  ];

  const [state, setState] = useState({
    data: isPrintList ? dataPrint : dataPrint,
    columns: PrintColumns
  });

  if (updateBegin === 0) {
    console.log(moment(new Date()).format('x'));
    dispatch(DRLActions.getNotPrintYet());
    dispatch(
      DRLActions.getListPrintByDate(
        moment(new Date().setHours(0)).format('x'),
        moment(new Date()).format('x')
      )
    );
    updateBegin += 1;
  }

  if (dataPrint.length > 0 && updateBegin === 1) {
    setState({
      ...state,
      data: dataPrint,
      columns: isAllList ? AllColumns : PrintColumns
    });
    updateBegin += 1;
  }

  if (isPrint) {
    setState({ ...state, data: dataPrint });
    isPrint = !isPrint;
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

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thêm thành công!'
  };
  const printSuccessSnackBar = {
    open: true,
    type: 'success',
    message: 'Đã in thành công!'
  };

  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
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
    }
  };

  const handleClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };
  const handleFilter = (prop, data) => {
    setFillter({ ...fillter, [prop]: data });
  };
  logger.info('dataTable: ', state.data);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CustomizedSnackbars value={snackBarValue} handleClose={handleClose} />
      <Divider />
      {isPrintList ? ('') :(
        <CardActions className={classes.actions}>
          <Filters onFilter={handleFilter} />
          <ContainedButton
            handleClick={() => {
              dispatch(DRLActions.fillterListData(fillter));
              updateBegin = 1;
            }}
            label="Lọc sinh viên"
          />
        </CardActions>
      )}
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  DANH SÁCH DỮ LIỆU
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
            {isPrintList ? (
              <>
                <Button
                  onClick={() => {
                    dispatch(
                      DRLActions.fillterListData('HK1', '2018-2019', 'Giỏi')
                    );
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Xem toàn bộ
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
                  onClick={async () => {
                    if (valueCase !== null) {
                      const data = await DRLHandler.ExportToDocx(valueCase[0]);
                      const listData = await DRLHandler.GetListCertificate(
                        'ChuaIn'
                      );

                      if (data.statusCode === 200) {
                        dispatch({
                          type: 'ADD_LINK_PRINT',
                          listLink: data.body,
                          listData
                        });

                        setSnackBarValue(printSuccessSnackBar);
                      } else {
                        setSnackBarValue(errorSnackBar);
                      }
                    } else {
                      setSnackBarValue(errorSnackBar);
                    }
                    isPrint = !isPrint;
                    valueCase = null;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  In theo trường hợp
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={async () => {
                    const keys = dataPrint.map(item => {
                        return ({
                          PK: item.pk,
                          SK: item.sk
                        });
                    });
                    const data = await DRLHandler.PrintAllStudent(keys);

                    if (data.statusCode === 200) {
                      dispatch({
                        type: 'ADD_LINK_PRINT',
                        listLink: data.body,
                        listData: []
                      });

                      setSnackBarValue(printSuccessSnackBar);
                    } else {
                      setSnackBarValue(errorSnackBar);
                    }
                    isPrint = !isPrint;
                    valueCase = null;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  In tất cả
                </Button>           
              </>
            ) : (
              <>
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
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    dispatch(DRLActions.getListHistoryImport(fillter));
                    updateBegin = 1;
                  }}
                >
                  Danh Sách Import
                </Button>
              </>
            )}
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                dispatch(DRLActions.getListHistory());
                updateBegin = 1;
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Xem Lịch Sử
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
        importCase={1}
      />
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
