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
  Link
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'core/services/Apploger';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import * as XNSVHandler from 'handlers/XNSVHandler';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import Types from 'reduxs/reducers/XNSV/actionTypes';
import icons from 'shared/icons';
import XNTKTDialog from '../XNTruockhiThemDialog/XNTruocKhiThemDialog';
import Filters from '../filters/Filters';

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
      filterCellStyle: {
        paddingTop: 1
      },
      filtering: false,
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
        <Link href={rowData.link}>{rowData.link ? 'Link Download' : ''}</Link>
      )
    }
  ];

  const [filter, setFilter] = React.useState({
    hk: '',
    nh: '',
    type: '',
    username: '',
    fromDate: '',
    toDate: ''
  });
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: dataList,
    columns: isPrintList ? Print : His
  });

  if (updateBegin === 0) {
    dispatch(XNSVActions.getUser());
    dispatch(XNSVActions.getNotPrintYet());
    updateBegin += 1;
  }
  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: isPrintList ? Print : His
    });
    updateBegin += 1;
  }
  if (updateBegin === 2 && state.data.length !== dataList.length) {
    setState({
      ...state,
      data: dataList,
      columns: isPrintList ? Print : His
    });
    updateBegin += 1;
  }

  if (isPrint) {
    setState({ ...state, data: dataList });
    isPrint = !isPrint;
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
        newData.scn = data.length + 1;
        newData.case = reparseCase(newData.case);
        newData.language = reparseLanguage(newData.language);
        data.push(newData);
        return { ...prevState, data };
      });
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
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      {isPrintList ? (
        ''
      ) : (
        <CardActions className={classes.actions}>
          <Filters onFilter={handleFilter} />
          <ContainedButton
            handleClick={() => {
              isHistoryList
                ? dispatch(XNSVActions.getListExport(filter))
                : dispatch(XNSVActions.getListExportByDate(filter));
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
                          const data = {
                            pk: rowData.pk,
                            sk: rowData.sk,
                            type: reparseCaseToString(rowData.case)
                          };
                          const response = await XNSVHandler.PrintOneStudent(
                            data
                          );
                          if (response.statusCode !== 200) {
                            setSnackBarValue(errorSnackBar);
                            return;
                          }
                          handlePrintOne(rowData);
                          dispatch({
                            type: Types.ADD_LINK_PRINT_HANDLER,
                            listLink: response.body
                          });
                          setSnackBarValue(successSnackBar);
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
                          setTimeout(async () => {
                            resolve();
                            const { pk, sk } = oldData;
                            const response = await XNSVHandler.DeleteOneCertificate(
                              pk,
                              sk
                            );
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
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    dispatch({ type: Types.HISTORY_LIST });
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Xem lịch sử
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    dispatch({ type: Types.HISTORY_LIST_BY_DATE });
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Xem lịch sử theo ngày
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
                  onClick={() => {
                    if (valueCase && valueLanguage) {
                      dispatch(
                        XNSVActions.handlePrintByType(
                          keys,
                          reparseCaseToString(valueCase[0]),
                          reparseLanguageToString(valueLanguage[0])
                        )
                      );
                      isPrint = !isPrint;
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
                  onClick={() => {
                    if (valueLanguage) {
                      console.log('keys:', keys);
                      dispatch(
                        XNSVActions.handlePrintAll(
                          keys,
                          reparseLanguageToString(valueLanguage[0])
                        )
                      );
                      isPrint = !isPrint;
                    }
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
                    dispatch({ type: Types.HISTORY_LIST });
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Xem lịch sử
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
                  onClick={() => {
                    dispatch({ type: Types.HISTORY_LIST_BY_DATE });
                    updateBegin = 1;
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Xem lịch sử theo ngày
                </Button>
                <Button
                  style={{ marginLeft: '8px' }}
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
                  style={{ marginLeft: '8px' }}
                  onClick={async () => {
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
                        setSnackBarValue(errorExportSnackBar);
                        return;
                      }
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
                        setSnackBarValue(errorExportSnackBar);
                        return;
                      }
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
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
