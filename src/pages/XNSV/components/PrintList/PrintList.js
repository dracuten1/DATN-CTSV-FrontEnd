import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import moment from 'moment';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Button,
  Divider,
  Link,
  createMuiTheme,
  Icon,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector, connect } from 'react-redux';
import { logger } from 'core/services/Apploger';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import * as XNSVHandler from 'handlers/XNSVHandler';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import Types from 'reduxs/reducers/XNSV/actionTypes';
import icons from 'shared/icons';
import XNTKTDialog from '../XNTruockhiThemDialog/XNTruocKhiThemDialog';
import Filters from '../filters/Filters';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { MuiThemeProvider } from '@material-ui/core';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import InboxIcon from '@material-ui/icons/MoveToInbox';


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
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #f0f2f4",
    background: "white",
    marginBottom: "20px",
    borderRadius: "3px",
    alignItems: "center",
    padding: "20px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#1088e7",
    display: "flex",
    alignItems: "center",
  },
  ml5px: {
    marginLeft: "5px",
  }
}));

const date = new Date();
const year = date.getFullYear();
let updateBegin = 0;
let valueCase = null;
let valueLanguage = null;
let keys = [];

const PrintList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  const XNSVState = useSelector(state => state.XNSVState);
  const { dataList, listLink, isPrintList, isHistoryList } = XNSVState;

  const Print = [
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
      title: 'Lý do',
      field: 'reason',
      editable: 'never',
      filtering: false
    },
    {
      title: 'Ngôn ngữ',
      field: 'language',
      editable: 'never',
      lookup: {
        1: 'Tiếng Anh',
        2: 'Tiếng Việt'
      },
      customFilterAndSearch: (term, rowData) => {
        if (valueLanguage !== term) {
          valueLanguage = term;
          keys = [];
        }
        switch (term.length) {
          case 1:
            if (rowData.language === parseInt(term[0])) {
              keys.push({
                PK: rowData.pk,
                SK: rowData.sk
              });
            }
            break;
          default:
            keys = [];
        }

        if (term.length !== 0) {
          return term == rowData.language;
        }
        return rowData;
      }
    },
    {
      title: 'Ngày thêm',
      field: 'date',
      editable: 'never',
      type: 'date',
      filtering: false
    }
  ];
  const His = [
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
      filtering: false,
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
      title: 'Lý do',
      field: 'reason',
      editable: 'never',
      filtering: false
    },
    {
      title: 'Ngôn ngữ',
      field: 'language',
      editable: 'never',
      filtering: false,
      lookup: {
        1: 'Tiếng Anh',
        2: 'Tiếng Việt'
      }
    },
    {
      title: 'Ngày in',
      field: 'ngayin',
      editable: 'never',
      type: 'date',
      filtering: false
    },
    {
      title: 'Link',
      field: 'link',
      editable: 'never',
      width: 300,
      filtering: false,
      render: rowData => (
        <Link href={rowData.link}>{rowData.link ? <SystemUpdateAltIcon /> : ''}</Link>
      )
    }
  ];

  const [filter, setFilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    type: 'Đang học',
    username: '',
    fromDate: moment(new Date()).format('YYYY-MM-DD'),
    toDate: moment(new Date()).format('YYYY-MM-DD')
  });
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: dataList,
    columns: isPrintList ? Print : His
  });

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(XNSVActions.getUser());
    dispatch(XNSVActions.getNotPrintYet()).then(payload =>
      handleUpdateState(payload)
    );
    updateBegin += 1;
  }


  logger.info('XNSVAction:: data: ', state.data);
  const reparseCase = tmpcase => {
    switch (tmpcase) {
      case 'Đang học':
        return 1;
      case 'Bảo lưu':
        return 2;
      case 'Chờ xét tốt nghiệp':
        return 3;
      case 'Chờ xét hoàn tất chương trình':
        return 4;
      case 'Vay vốn':
        return 5;
      case 'Giấy giới thiệu':
        return 6;
      case 'Thời gian học':
        return 7;
      case 'Hoàn tất chương trình':
        return 8;
      default:
        return 9;
    }
  };

  const reparseLanguage = tmpcase => {
    if (tmpcase === 'Tiếng Anh') {
      return 1;
    }
    return 2;
  };

  const reparseLanguageToString = tmpcase => {
    if (tmpcase === 1 || tmpcase === '1') {
      return 'Tiếng Anh';
    }
    return 'Tiếng Việt';
  };

  const reparseCaseToString = tmpcase => {
    switch (tmpcase) {
      case '1':
      case 1:
        return 'Đang học';
      case '2':
      case 2:
        return 'Bảo lưu';
      case '3':
      case 3:
        return 'Chờ xét tốt nghiệp';
      case '4':
      case 4:
        return 'Chờ xét hoàn tất chương trình';
      case '5':
      case 5:
        return 'Vay vốn';
      case '6':
      case 6:
        return 'Giấy giới thiệu';
      case '7':
      case 7:
        return 'Thời gian học';
      case '8':
      case 8:
        return 'Hoàn tất chương trình';
      default:
        return null;
    }
  };

  const handleAdd = (newData, valid) => {
    setOpen(false);
    if (valid) {
      setState(prevState => {
        const data = [...prevState.data];
        logger.info('PRINTLIST:: handleAdd:: data: ', newData);
        newData.scn = data.length + 1;
        newData.date = moment(new Date()).format('DD/MM/YYYY');
        newData.case = reparseCase(newData.case);
        newData.language = reparseLanguage(newData.language);
        data.push(newData);
        logger.info('PRINTLIST:: handleAdd:: newData: ', newData);
        return { ...prevState, data };
      });
    } else {
      setSnackBarValue(errorSnackBar);
    }
  };

  const handleFilter = (prop, data) => {
    setFilter({ ...filter, [prop]: data });
  };

  const handlePrintOne = oldData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.splice(data.indexOf(oldData), 1);
      return { ...prevState, data };
    });
  };

  const handleUpdateState = response => {
    setState({
      ...state,
      data: response,
    });
  };

  const handleUpdateStateColumn = (response, bool) => {
    setState({
      ...state,
      data: response,
      columns: bool ? Print : His
    });
  };

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công!'
  };
  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
  const errorExportSnackBar = {
    open: true,
    type: 'error',
    message: 'Export thất bại!'
  };
  const errorPrintByTypeSnackBar = {
    open: true,
    type: 'error',
    message: 'Vui lòng chọn Loại Xác Nhận và Ngôn Ngữ!'
  };
  const errorPrintAllSnackBar = {
    open: true,
    type: 'error',
    message: 'Vui lòng chọn Ngôn Ngữ!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  React.useEffect(() => {
    dispatch(ProgressActions.hideProgress());
    // eslint-disable-next-line
  }, []);

  const handleShowPrintList = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(XNSVActions.getNotPrintYet()).then(payload =>
      handleUpdateStateColumn(payload, true)
    );
  }

  const handleShowHistory = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(XNSVActions.getListExport(filter)).then(response =>
      handleUpdateStateColumn(response, false)
    );
  }
  const handleShowHistoryByDate = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(
      XNSVActions.getListExportByDate(filter)
    ).then(response => handleUpdateStateColumn(response, false));
  }


  const { isLoadding } = props;
  return (
    <div>

      <Card item lg={12} sm={12} xl={12} xs={12} className={classes.titleContainer}>

        <Typography className={classes.title} ><InboxIcon style={{ marginRight: "5px" }} /> XÁC NHẬN SINH VIÊN</Typography>
        <div>
          <Button variant="contained" color="primary" className={classes.ml5px} onClick={handleShowPrintList}>Xem danh sách chưa in</Button>
          <Button variant="contained" color="primary" className={classes.ml5px} onClick={handleShowHistory}>Xem lịch sử đã in</Button>
          <Button variant="contained" color="primary" className={classes.ml5px} onClick={handleShowHistoryByDate}>Xem lịch sử đã in (theo ngày)</Button>
        </div>
      </Card>
      <Card {...rest} className={clsx(classes.root, className)}>
        {isPrintList ? (
          ''
        ) : (
            <CardActions className={classes.actions}>
              <Filters onFilter={handleFilter} filter={filter} />
              <ContainedButton
                handleClick={() => {
                  dispatch(ProgressActions.showProgres());
                  isHistoryList
                    ? dispatch(XNSVActions.getListExport(filter)).then(response =>
                      handleUpdateStateColumn(response, false)
                    )
                    : dispatch(
                      XNSVActions.getListExportByDate(filter)
                    ).then(response => handleUpdateStateColumn(response, false));
                }}
                label="Lọc sinh viên"
              />
            </CardActions>
          )}
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <MuiThemeProvider theme={themeTable}>
                <MaterialTable
                  icons={icons}
                  title={
                    <div>
                      {isPrintList ? <b>DANH SÁCH CHƯA IN</b> : <b>LỊCH SỬ IN</b>}
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
                          onClick: async (event, rowData) => {
                            dispatch(ProgressActions.showProgres());
                            const data = {
                              pk: rowData.pk,
                              sk: rowData.sk,
                              type: reparseCaseToString(rowData.case)
                            };
                            const response = await XNSVHandler.PrintOneStudent(
                              data
                            );
                            if (response.statusCode !== 200) {
                              dispatch(ProgressActions.hideProgress());
                              setSnackBarValue(errorSnackBar);
                              return;
                            }
                            handlePrintOne(rowData);
                            dispatch({
                              type: Types.ADD_LINK_PRINT_HANDLER,
                              listLink: response.body
                            });
                            dispatch(ProgressActions.hideProgress());
                            setSnackBarValue(successSnackBar);
                          }
                        }
                      ]
                      : []
                  }
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF',
                      position: 'sticky',
                      top: 0
                    },
                    rowStyle: {
                      backgroundColor: '#EEE'
                    },
                    filtering: true
                  }}
                  editable={
                    isPrintList
                      ? {
                        onRowDelete: oldData =>
                          new Promise(resolve => {
                            setTimeout(async () => {
                              resolve();
                              const { pk, sk } = oldData;
                              const response = await XNSVHandler.DeleteOneCertificate(
                                pk,
                                sk
                              );
                              if (response.statusCode !== 200) {
                                dispatch(ProgressActions.hideProgress());
                                setSnackBarValue(errorSnackBar);
                                return;
                              }
                              dispatch(ProgressActions.hideProgress());
                              setSnackBarValue(successSnackBar);
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
              </MuiThemeProvider>
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
                    style={{ marginLeft: '8px' }}
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Thêm giấy xác nhận
                </Button>
                  <Button
                    style={{ marginLeft: '8px' }}
                    onClick={async () => {
                      dispatch(ProgressActions.showProgres());
                      if (valueCase && valueLanguage) {
                        const status = 'ChuaIn';
                        const type = reparseCaseToString(valueCase[0]);
                        const language = reparseLanguageToString(valueLanguage[0]);
                        const response = await XNSVHandler.PrintByType(keys, type, language);
                        const listData = await XNSVHandler.GetListCertificate(status);
                        logger.info('XNSVAction:: PrintByType: reponse: ', response);
                        if (response.statusCode === 200 && response.body !== "Không có gì để in") {
                          setSnackBarValue(successSnackBar);
                          dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
                          handleUpdateState(listData);
                        } else {
                          setSnackBarValue(errorSnackBar);
                        }
                      } else {
                        setSnackBarValue(errorPrintByTypeSnackBar);
                      }
                      dispatch(ProgressActions.hideProgress());
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
                      dispatch(ProgressActions.showProgres());
                      if (valueLanguage) {
                        const status = 'ChuaIn';
                        const language = reparseLanguageToString(valueLanguage[0]);
                        const response = await XNSVHandler.PrintAllCertificate(keys, language);
                        const listData = await XNSVHandler.GetListCertificate(status);
                        logger.info('XNSVAction:: PrintAll: reponse: ', response);
                        if (response.statusCode === 200 && response.body !== "Không có gì để in") {
                          setSnackBarValue(successSnackBar);
                          dispatch({ type: Types.ADD_LINK_PRINT, listLink: response.body, listData });
                          handleUpdateState(listData);
                        } else {
                          setSnackBarValue(errorSnackBar);
                        }
                      } else {
                        setSnackBarValue(errorPrintAllSnackBar);
                      }
                      dispatch(ProgressActions.hideProgress());
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
                      onClick={async () => {
                        dispatch(ProgressActions.showProgres());
                        if (isHistoryList) {
                          const response = await XNSVHandler.ExportWithFilter(
                            filter
                          );
                          logger.info(
                            'XNSVAction:: Exportfilter: reponse: ',
                            response
                          );
                          if (
                            response.statusCode !== 200 ||
                            response.body.Items === 'Không có gì để export'
                          ) {
                            dispatch(ProgressActions.hideProgress());
                            setSnackBarValue(errorExportSnackBar);
                            return;
                          }
                          dispatch(ProgressActions.hideProgress());
                          setSnackBarValue(successSnackBar);
                          const { body } = response;
                          dispatch({
                            type: Types.ADD_LINK_EXPORT,
                            listLink: body.Items
                          });
                        } else {
                          const response = await XNSVHandler.ExportWithFilterByDate(
                            filter
                          );
                          logger.info(
                            'XNSVAction:: Exportfilter: reponse: ',
                            response
                          );
                          if (
                            response.statusCode !== 200 ||
                            response.body.Items === 'Không có gì để export'
                          ) {
                            dispatch(ProgressActions.hideProgress());
                            setSnackBarValue(errorExportSnackBar);
                            return;
                          }
                          dispatch(ProgressActions.hideProgress());
                          setSnackBarValue(successSnackBar);
                          const { body } = response;
                          dispatch({
                            type: Types.ADD_LINK_EXPORT,
                            listLink: body.Items
                          });
                        }
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Export
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
        <XNTKTDialog
          handleAdd={handleAdd}
          open={open}
          handleClose={() => setOpen(false)}
        />
        <CustomizedSnackbars
          value={snackBarValue}
          handleClose={handleSnackBarClose}
        />
      </Card>
    </div>

  );
};

PrintList.propTypes = {
  className: PropTypes.string
};
const mapStateToProps = state => {
  return {
    isLoadding: !state.ProgressState.hiddenStatus
  };
};
export default connect(mapStateToProps)(PrintList);
