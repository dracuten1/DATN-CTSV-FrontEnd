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
  Divider,
  MuiThemeProvider,
  Typography,
  Grid
} from '@material-ui/core';
import { logger } from 'core/services/Apploger';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import icons from 'shared/icons';
import * as QLBHHandler from 'handlers/QLBHHandler';
import Hospital from '@material-ui/icons/LocalHospital';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import ImportDialogNewHost from 'shared/components/importDialogNewHost/ImportDialogNewHost';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import Actions from 'reduxs/reducers/QLBH/action';
import Types from 'reduxs/reducers/QLBH/actionTypes';
import Columns from './columns';
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
// const convert = year % 100;

let updateBegin = 0;
let type = 'YT';
let columns = [];

const AllList = props => {
  const { className, ...rest } = props;
  const QLBHState = useSelector(state => state.QLBHState);
  const { dataList, isBHYT, isBHTN, isCounting, listLink } = QLBHState;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    fromHK: '1',
    fromNH: `${year - 1}-${year}`,
    toHK: '2',
    toNH: `${year - 1}-${year}`,
    mssv: '',
    type: 'Bồi thường'
  });

  let title;
  if (isBHYT) {
    title = 'Bảo Hiểm Y Tế';
    type = 'YT';
    columns = Columns.BHYT;
  } else if (isBHTN) {
    title = 'Bảo Hiểm Tai Nạn';
    type = 'TN';
    columns = Columns.BHTN;
  } else {
    title = 'Thống Kê';
    type = 'BT';
    columns = Columns.TTBT;
  }

  const [state, setState] = useState({
    data: dataList,
    columns: columns
  });

  const handleUpdateState = response => {
    switch (type) {
      case 'YT':
        title = 'Bảo Hiểm Y Tế';
        columns = Columns.BHYT;
        break;
      case 'TN':
        title = 'Bảo Hiểm Tai Nạn';
        columns = Columns.BHTN;
        break;
      default:
        title = 'Thống Kê';
        columns = Columns.TTBT;
    }
    setState({
      ...state,
      data: response,
      columns: columns
    });
  };

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleDataWithFilter = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getListWithFilter(filter, type)).then(data =>
      handleUpdateState(data)
    );
  };

  const handleDataWithMSSV = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.countingWithMSSV(filter)).then(data =>
      handleUpdateState(data)
    );
  };

  const handleImport = () => {};

  if (updateBegin === 0) {
    handleDataWithFilter();
    updateBegin += 1;
  }

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
  const errorExportBoiThuongSnackBar = {
    open: true,
    type: 'error',
    message: 'Chỉ hỗ trợ export Bồi thường!'
  };
  const errorFilterSnackBar = {
    open: true,
    type: 'error',
    message: 'BHYT và BHTN cần nhập MSSV!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };
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
          <Hospital style={{ marginRight: '5px' }} /> QUẢN LÝ BẢO HIỂM
        </Typography>
        <div>
          <Button
            onClick={() => {
              type = 'YT';
              handleDataWithFilter();
            }}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            BHYT
          </Button>
          <Button
            onClick={() => {
              type = 'TN';
              handleDataWithFilter();
            }}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            BHTN
          </Button>
          <Button
            onClick={() => {
              type = 'BT';
              handleDataWithMSSV();
            }}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            Thống kê
          </Button>
        </div>
      </Card>

      <Card {...rest} className={clsx(classes.root, className)}>
        <CardActions className={classes.actions}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Filters
              onFilter={handleFilter}
              isCounting={isCounting}
              filter={filter}
            />
            <ContainedButton
              handleClick={() => {
                if (isCounting) {
                  if (
                    (filter.type === 'BHYT' || filter.type === 'BHYT') &&
                    filter.mssv === ''
                  )
                    setSnackBarValue(errorFilterSnackBar);
                  else handleDataWithMSSV();
                } else {
                  handleDataWithFilter();
                }
              }}
              label="Lọc dữ liệu"
            />
          </div>
          <div>
            {isCounting ? (
              ''
            ) : (
              <Button
                onClick={() => setImportOpen(true)}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: '8px' }}
              >
                <ImportIcon /> &nbsp;Import
              </Button>
            )}
            {isBHTN ? (
              ''
            ) : (
              <Button
                onClick={async () => {
                  dispatch(ProgressActions.showProgres());
                  let response;
                  if (isBHYT) {
                    response = await QLBHHandler.ExportWithFilter(filter, 'YT');
                  } else if (filter.type === 'Bồi thường' && isCounting) {
                    response = await QLBHHandler.ExportCountingWithMSSV(filter);
                  } else setSnackBarValue(errorExportBoiThuongSnackBar);
                  if (
                    response.statusCode !== 200 ||
                    response.body === 'Không có gì để export'
                  ) {
                    setSnackBarValue(errorExportSnackBar);
                    dispatch(ProgressActions.hideProgress());
                    return;
                  }
                  setSnackBarValue(successSnackBar);
                  const { body } = response;
                  dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
                  dispatch(ProgressActions.hideProgress());
                }}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: '8px' }}
              >
                <GetAppIcon /> &nbsp;Export
              </Button>
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
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    rowStyle: {
                      backgroundColor: '#EEE'
                    },
                    // exportButton: true,
                    filtering: false
                  }}
                  editable={
                    isBHYT
                      ? {
                          onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                              dispatch(ProgressActions.showProgres());
                              setTimeout(async () => {
                                resolve();
                                if (oldData) {
                                  newData.DuLieu.PK = newData.PK;
                                  newData.DuLieu.SK = newData.SK;
                                  newData.DuLieu.type = 'YT';
                                  newData.DuLieu.MaSo.MaTinh = newData.MaTinh;
                                  newData.DuLieu.MaSo.MaBHXH = newData.MaBHXH;
                                  newData.DuLieu.MaSo.DoiTuong =
                                    newData.DoiTuong;
                                  newData.DuLieu.NoiDKKCB.MaBV = newData.MaBV;
                                  newData.DuLieu.NoiDKKCB.TenBV = newData.TenBV;
                                  newData.DuLieu.TinhTrangNhanThe.DaNhan =
                                    newData.DaNhan;
                                  newData.DuLieu.TinhTrangNhanThe.Ngay =
                                    newData.NgayNhanThe;
                                  newData.DuLieu.HSD.Tu = newData.HSDTu;
                                  newData.DuLieu.HSD.Den = newData.HSDDen;
                                  logger.info('Newdata: ', newData);
                                  const response = await QLBHHandler.UpdateOneStudentByType(
                                    newData.DuLieu
                                  );
                                  if (response.statusCode !== 200) {
                                    setSnackBarValue(errorSnackBar);
                                    dispatch(ProgressActions.hideProgress());
                                    return;
                                  }
                                  setSnackBarValue(successSnackBar);
                                  dispatch(ProgressActions.hideProgress());
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
                              dispatch(ProgressActions.showProgres());
                              setTimeout(async () => {
                                resolve();
                                logger.info('Olddata: ', oldData);
                                const { PK, SK } = oldData;
                                const response = await QLBHHandler.DeleteOneCertificate(
                                  PK,
                                  SK,
                                  'YT'
                                );
                                if (response.statusCode !== 200) {
                                  dispatch(ProgressActions.hideProgress());
                                  setSnackBarValue(errorSnackBar);
                                  return;
                                }
                                setSnackBarValue(successSnackBar);
                                dispatch(ProgressActions.hideProgress());
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
        <ImportDialogNewHost
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={isBHYT ? 'YT' : 'TN'}
        />
        <CustomizedSnackbars
          value={snackBarValue}
          handleClose={handleSnackBarClose}
        />
      </Card>
    </div>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
