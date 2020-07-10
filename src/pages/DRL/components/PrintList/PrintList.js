import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  MuiThemeProvider,
  Typography,
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
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PrintIcon from '@material-ui/icons/Print';
import MailIcon from '@material-ui/icons/Mail';
import { CaseEnum } from 'pages/DRL/components/AddDialog/DRLEnum';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
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
    justifyContent: 'space-between'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #f0f2f4',
    background: 'white',
    marginBottom: '20px',
    borderRadius: '3px',
    alignItems: 'center',
    padding: '20px'
  },
  title: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#1088e7',
    display: 'flex',
    alignItems: 'center'
  },
  ml5px: {
    marginLeft: '5px'
  }
}));

const dt = new Date();
const year = dt.getFullYear();

let valueCase = null;
let valueType = null;
let updateBegin = 0;
let typeColumns = [];

const PrintList = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const DRLState = useSelector(state => state.DRLState);
  const AuthState = useSelector(state => state.auth);

  const {
    listLink,
    dataPrint,
    isPrintList,
    isHistoryList,
    isAllList
  } = DRLState;
  const { username } = AuthState.cognitoUser;

  logger.info('dataPrint: ', dataPrint);
  const [open, setOpen] = React.useState(false);

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);

  const handleImport = () => { };

  const UrlsColumns = [
    { title: 'STT', field: 'stt', editable: 'never', filtering: false },
    { title: 'Ngày', field: 'date', editable: 'never', filtering: false },
    {
      title: 'URL',
      field: 'url',
      editable: 'never',
      filtering: false,
      render: rowData => (
        <Link style={{ textDecoration: 'none' }} href={rowData.url}>
          Link Download
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

  const handleShowDataInfoDRL = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(DRLActions.filterListInfoDRL(filter)).then(payload =>
      handleUpdateState(payload, 1)
    );
  };

  const handleShowDataPrint = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(DRLActions.getListWithStatus(filter)).then(payload =>
      handleUpdateState(payload, 2)
    );
  };

  const handleShowDataHistory = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(DRLActions.getListPrintByDate(filter)).then(payload =>
      handleUpdateState(payload, 3)
    );
  };

  const handleShowDataHistoryImport = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(DRLActions.getListHistoryImport(filter)).then(payload =>
      handleUpdateState(payload, 4)
    );
  };

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
    nh: `${year - 1}-${year}`,
    hk: '1',
    type: 'HK1',
    time: `${year - 1}-${year}`,
    xeploai: 'Giỏi',
    status: 'Chưa In',
    username: username,
    from: new Date(),
    to: new Date()
  });

  if (updateBegin === 0) {
    handleShowDataPrint();
    dispatch(DRLActions.getUser());
    updateBegin += 1;
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

  const handleUpdateState = (response, cl) => {
    switch (cl) {
      case 1:
        typeColumns = AllColumns;
        valueType = 0;
        title = 'Thông Tin Điểm Rèn Luyện';
        break;
      case 2:
        typeColumns = PrintColumns;
        valueType = 1;
        title = 'Danh Sách In Theo Trạng Thái';
        break;
      case 3:
        typeColumns = HistoryColumns;
        valueType = 2;
        title = 'Thống Kê Lịch Sử In';
        break;
      default:
        typeColumns = UrlsColumns;
        valueType = 3;
        title = 'Thống Kê Lịch Sử Import';
    }
    setState({
      ...state,
      data: response,
      columns: typeColumns
    });
  };



  React.useEffect(() => {
    dispatch(ProgressActions.hideProgress());
    // eslint-disable-next-line
  }, []);

  //set actions of table
  let actions;
  let editTable;
  if (isPrintList && filter.status === 'Chưa In') {
    actions = [
      {
        icon: icons.Print,
        tooltip: 'Print',
        onClick: async (event, rowData) => {
          dispatch(ProgressActions.showProgres());
          const response = await DRLHandler.PrintOneStudent(
            rowData.PK,
            rowData.SK
          );
          // const status = 'ChuaIn';
          logger.info('DRLAction:: exporttodocx: reponse: ', response);
          if (response.statusCode !== 200) {
            setSnackBarValue(errorSnackBar);
            dispatch(ProgressActions.hideProgress());
            return;
          }
          handlePrintOne(rowData);
          const { body } = response;
          const { data } = state;
          dispatch({
            type: Types.ADD_LINK_PRINT,
            listLink: body,
            listData: data.splice(data.indexOf(rowData), 1)
          });
          setSnackBarValue(successSnackBar);
          dispatch(ProgressActions.hideProgress());
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
    <div>
      <Card
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
        className={classes.titleContainer}
      >
        <Typography className={classes.title}>
          <MailIcon style={{ marginRight: '5px' }} /> ĐIỂM RÈN LUYỆN
        </Typography>
        <div>
          <Button
            onClick={handleShowDataInfoDRL}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            Thông Tin ĐRL
          </Button>
          <Button
            onClick={handleShowDataPrint}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            Danh Sách In
          </Button>
          <Button
            onClick={handleShowDataHistory}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            File Đã Lưu
          </Button>
          <Button
            onClick={handleShowDataHistoryImport}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            Danh Sách File Import
          </Button>
        </div>
      </Card>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CustomizedSnackbars value={snackBarValue} handleClose={handleClose} />
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}>
              <Filters
                valueType={valueType}
                onFilter={handleFilter}
                filter={filter}
                username={'ngocvu'}
              />
              <ContainedButton
                handleClick={() => {
                  if (isAllList) {
                    handleShowDataInfoDRL();
                  } else if (isPrintList) {
                    handleShowDataPrint();
                  } else if (isHistoryList) {
                    handleShowDataHistory();
                  } else {
                    handleShowDataHistoryImport();
                  }
                }}
                label="Lọc dữ liệu"
              />
            </div>
          </MuiThemeProvider>
          <div style={{ marginTop: '8px' }}>
            {isPrintList ? (
              <>
                {filter.status === 'Chưa In' ? (
                  <>
                    <Button
                      style={{ marginLeft: '8px' }}
                      onClick={() => setOpen(true)}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <PostAddIcon /> &nbsp;Thêm Sinh Viên Đăng Ký
                    </Button>
                    <Button
                      style={{ marginLeft: '8px' }}
                      onClick={async () => {
                        dispatch(ProgressActions.showProgres());
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
                              dispatch(ProgressActions.hideProgress());
                              return;
                            }

                            dispatch({
                              type: Types.ADD_LINK_PRINT,
                              listLink: response.body,
                              listData: listData.Items
                            });

                            handleUpdateState(listData.Items, 2);
                            valueCase = null;
                            setSnackBarValue(printSuccessSnackBar);
                          } else {
                            setSnackBarValue(errorSnackBar);
                          }
                          dispatch(ProgressActions.hideProgress());
                        }
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <PrintIcon />
                      &nbsp;Xuất File Theo Trường Hợp
                    </Button>
                    <Button
                      style={{ marginLeft: '8px' }}
                      onClick={async () => {
                        dispatch(ProgressActions.showProgres());
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
                        else {
                          setSnackBarValue(errorSnackBar);
                        }
                        dispatch(ProgressActions.hideProgress());
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <PrintIcon />
                      &nbsp;Xuất File Tất Cả
                    </Button>
                  </>
                ) : (
                    <>
                      <Button
                        style={{ marginLeft: '8px' }}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={async () => {
                          if (filter.status === 'Đã In') {
                            dispatch(ProgressActions.showProgres());
                            const response = await DRLHandler.ExportWithFilter(
                              filter
                            );
                            const { statusCode, body } = response;

                            if (statusCode !== 200 || body.Items === '') {
                              setSnackBarValue(errorSnackBar);
                              dispatch(ProgressActions.hideProgress());
                              return;
                            }
                            setSnackBarValue(printSuccessSnackBar);
                            dispatch({
                              type: Types.ADD_LINK_EXPORT,
                              listLink: body.Items
                            });
                            dispatch(ProgressActions.hideProgress());
                          }
                        }}
                      >
                        <GetAppIcon /> &nbsp;Export
                    </Button>
                    </>
                  )}
              </>
            ) : (
                <>
                  {isAllList ? (
                    <Button
                      style={{ marginLeft: '8px' }}
                      onClick={() => setImportOpen(true)}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <ImportIcon /> &nbsp;Import
                    </Button>
                  ) : (
                      ''
                    )}
                </>
              )}
          </div>
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
              </MuiThemeProvider>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <Divider />
        {listLink.length > 0 ? (
          <CardActions className={classes.actions}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <ListLinkDocx data={listLink} />
              </Grid>
            </Grid>
          </CardActions>
        ) : (
            ''
          )}
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
    </div>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
