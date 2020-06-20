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
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import * as DRLHandler from 'handlers/DRLHandler';
import DRLActions from 'reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';
import Types from 'reduxs/reducers/DRL/actionTypes';
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

const dt = new Date();
const year = dt.getFullYear();

let valueCase = null;
let valueType = null;
let updateBegin = 0;
let isPrint = false;
let typeColumns = [];

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

  logger.info('history', dataPrint);
  logger.info('dataPrint: ', dataPrint);
  const [open, setOpen] = React.useState(false);

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);

  const handleImport = () => {};

  const UrlsColumns = [
    { title: 'STT', field: 'stt', editable: 'never', filtering: false },
    // { title: 'Ngày', field: 'date', editable: 'never', filtering: false },
    {
      title: 'URL',
      field: 'url',
      editable: 'never',
      filtering: false,
      render: rowData => (
        <Link style={{ textDecoration: 'none' }} href={rowData.url}>
          {`${rowData.url.substring(0, 200)}...`}
        </Link>
      )
    }
  ];

  const HistoryColumns = [
    { title: 'STT', field: 'stt', editable: 'never', filtering: false },
    {
      title: 'Ngày in',
      field: 'date',
      editable: 'never',
      type: 'date',
      filtering: false
    },
    {
      title: 'URL',
      field: 'DL',
      editable: 'never',
      filtering: false,
      render: rowData => (
        <Link style={{ textDecoration: 'none' }} href={rowData.DL}>
          {/* {`${rowData.DL.substring(0, 200)}...`} */}
          {rowData.DL}
        </Link>
      )
    }
  ];

  const PrintColumns = [
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
          // eslint-disable-next-line
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
    { title: 'MSSV', field: 'mssv', filtering: false },
    { title: 'Họ tên', field: 'name', filtering: false },
    {
      title: 'Năm học',
      field: 'year',
      filtering: false
    },
    {
      title: 'Học kỳ',
      field: 'semester',
      filtering: false
    },
    {
      title: 'Điểm',
      field: 'Diem',
      filtering: false
    },
    {
      title: 'Xếp loại',
      field: 'grade',
      filtering: false
      // lookup: {
      //   1: 'Xuất sắc',
      //   2: 'Tốt',
      //   3: 'Khá',
      //   4: 'Trung bình',
      //   5: 'Yếu',
      //   6: 'Kém'
      // },
      // filterCellStyle: {
      //   paddingTop: 1
      // }
    },
    {
      title: 'Ghi chú',
      field: 'note',
      filtering: false
    }
  ];

  let title;
  if (isAllList) {
    typeColumns = AllColumns;
    valueType = 0;
    title = 'Thông Tin Điểm Rèn Luyện';
  } else if (isPrintList) {
    typeColumns = PrintColumns;
    valueType = 1;
    title = 'Danh Sách In Theo Trạng Thái';
  } else if (isHistoryList) {
    typeColumns = HistoryColumns;
    valueType = 2;
    title = 'Thống Kê Lịch Sử In';
  } else {
    typeColumns = UrlsColumns;
    valueType = 3;
    title = 'Thống Kê Lịch Sử Import';
  }

  const [state, setState] = useState({
    data: dataPrint,
    columns: typeColumns
  });

  const [filter, setFilter] = React.useState({
    nh: '',
    hk: '',
    type: '1',
    time: `${year}-${year + 1}`,
    xeploai: '',
    status: 'Chưa In',
    username: '',
    from: new Date(),
    to: new Date()
  });

  if (updateBegin === 0) {
    dispatch({ type: Types.GET_NULL_DATA });
    dispatch(DRLActions.getUser());
    updateBegin += 1;
  }

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataPrint,
      columns: typeColumns
    });
    updateBegin += 1;
  }

  // if (updateBegin === 2 && state.data.length !== dataPrint.length) {
  //   setState({
  //     ...state,
  //     data: dataPrint,
  //     columns: typeColumns
  //   });
  //   updateBegin += 1;
  // }

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
    message: 'Thực hiện thành công!'
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
    setFilter({ ...filter, [prop]: data });
  };
  logger.info('dataTable: ', state.data);

  const handlePrintAll = () => {
    setState({ ...state, data: [] });
  };

  const handlePrintOne = oldData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.splice(data.indexOf(oldData), 1);
      return { ...prevState, data };
    });
  };

  //set actions of table
  let actions;
  let editTable;
  if (isPrintList && filter.status === 'Chưa In') {
    actions = [
      {
        icon: icons.Print,
        tooltip: 'Print',
        onClick: async (event, rowData) => {
          const response = await DRLHandler.PrintOneStudent(
            rowData.PK,
            rowData.SK
          );
          const status = 'ChuaIn';
          logger.info('DRLAction:: exporttodocx: reponse: ', response);
          if (response.statusCode !== 200) {
            setSnackBarValue(errorSnackBar);
            return;
          }
          handlePrintOne(rowData);
          const { body } = response;
          const {data} = state;
          dispatch({ type: Types.ADD_LINK_PRINT, listLink: body, listData: data.splice(data.indexOf(rowData), 1) });
          setSnackBarValue(successSnackBar);
        }
      }
    ];
    editTable = {
      onRowDelete: oldData =>
        new Promise(resolve => {
          setTimeout(async () => {
            resolve();
            const { pk, sk } = oldData;
            const response = await DRLHandler.DeleteOneCertificate(pk, sk);
            if (response.statusCode !== 200) {
              setSnackBarValue(errorSnackBar);
              return;
            }
            setSnackBarValue(successSnackBar);
            setState(prevState => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }, 600);
        })
    };
  } else {
    actions = [];
    editTable = {};
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CustomizedSnackbars value={snackBarValue} handleClose={handleClose} />
      <Divider />
      <CardActions className={classes.actions}>
        <Filters valueType={valueType} onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            if (isAllList) {
              dispatch(DRLActions.filterListInfoDRL(filter));
            } else if (isPrintList) {
              dispatch(DRLActions.getListWithStatus(filter));
            } else if (isHistoryList) {
              dispatch(DRLActions.getListPrintByDate(filter));
            } else {
              dispatch(DRLActions.getListHistoryImport(filter));
            }
            updateBegin = 1;
          }}
          label="Lọc dữ liệu"
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
                  <b>{title}</b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={actions}
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
              editable={editTable}
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
                    dispatch(DRLActions.handleAllList());
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Thông Tin ĐRL
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
                    if (filter.status !== 'Đã In') {
                      if (valueCase !== null) {
                        const data = await DRLHandler.ExportToDocx(
                          valueCase[0],
                          filter
                        );
                        const { response, listData } = data;
                        if (
                          response.statusCode !== 200 ||
                          response.body === 'Không có gì để in'
                        ) {
                          setSnackBarValue(errorSnackBar);
                          return;
                        }

                        dispatch({
                          type: Types.ADD_LINK_PRINT,
                          listLink: response.body,
                          listData: listData.Items
                        });

                        isPrint = !isPrint;
                        valueCase = null;
                        setSnackBarValue(printSuccessSnackBar);
                      } else {
                        setSnackBarValue(errorSnackBar);
                      }
                    }
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
                    if (filter.status !== 'Đã In') {
                      const keys = state.data.map(item => {
                        return {
                          PK: item.pk,
                          SK: item.sk
                        };
                      });
                      const data = await DRLHandler.PrintAllStudent(keys);

                      if (
                        data.statusCode !== 200 ||
                        data.body === 'Không có gì để in'
                      ) {
                        setSnackBarValue(errorSnackBar);
                        return;
                      }
                      dispatch({
                        type: Types.ADD_LINK_PRINT,
                        listLink: data.body,
                        listData: []
                      });
                      handlePrintAll();
                      setSnackBarValue(printSuccessSnackBar);
                      valueCase = null;
                    }
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  In tất cả
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={async () => {
                    if (filter.status === 'Đã In') {
                      const response = await DRLHandler.ExportWithFilter(
                        filter
                      );
                      const { statusCode, body } = response;

                      if (statusCode !== 200 || body.Items === '') {
                        setSnackBarValue(errorSnackBar);
                        return;
                      }
                      setSnackBarValue(printSuccessSnackBar);
                      dispatch({
                        type: Types.ADD_LINK_EXPORT,
                        listLink: body.Items
                      });
                    }
                  }}
                >
                  Export
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    dispatch({ type: Types.HISTORY_LIST });
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Link đã in
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    dispatch(DRLActions.handlePrintList());
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Danh sách in
                </Button>
                {isAllList ? (
                  <Button
                    style={{ marginLeft: '8px' }}
                    onClick={() => setImportOpen(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Import
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      dispatch(DRLActions.handleAllList());
                      updateBegin = 1;
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    Thông Tin ĐRL
                  </Button>
                )}

                <Button
                  style={{ marginLeft: '8px' }}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => {
                    dispatch({ type: Types.IMPORT_LIST });
                    updateBegin = 1;
                  }}
                >
                  Danh Sách Đã Import
                </Button>
              </>
            )}
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
