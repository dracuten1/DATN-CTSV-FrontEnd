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
  Grid
} from '@material-ui/core';
import { logger } from 'core/services/Apploger';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import * as QLBHHandler from 'handlers/QLBHHandler';
import ImportDialogNewHost from 'shared/components/importDialogNewHost/ImportDialogNewHost';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Actions from 'reduxs/reducers/QLBH/action';
import Types from 'reduxs/reducers/QLBH/actionTypes';
import Columns from './columns';
import { Filters } from '../Filters';
import { MuiThemeProvider } from '@material-ui/core';
import themeTable from 'shared/styles/theme/overrides/MuiTable';

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
const convert = year % 100;

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

  if (updateBegin === 0) {
    // dispatch(Actions.getNullData());
    dispatch(Actions.getListWithFilter(filter, type));
    updateBegin += 1;
  }

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: columns
    });
    updateBegin += 1;
  }

  // if (updateBegin === 2 && state.data.length !== dataList.length) {
  //   setState({
  //     ...state,
  //     data: dataList,
  //     columns: columns
  //   });
  //   updateBegin += 1;
  // }

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => { };

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
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} isCounting={isCounting} filter={filter} />
        <ContainedButton
          handleClick={() => {
            isCounting
              ? dispatch(Actions.countingWithMSSV(filter))
              : dispatch(Actions.getListWithFilter(filter, type));
            updateBegin = 1;
          }}
          label="Lọc dữ liệu"
        />
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
                  filtering: true
                }}
                editable={
                  isBHYT
                    ? {
                      onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                          setTimeout(async () => {
                            resolve();
                            if (oldData) {
                              newData.DuLieu.PK = newData.PK;
                              newData.DuLieu.SK = newData.SK;
                              newData.DuLieu.type = 'YT';
                              newData.DuLieu.MaSo.MaTinh = newData.MaTinh;
                              newData.DuLieu.MaSo.MaBHXH = newData.MaBHXH;
                              newData.DuLieu.MaSo.DoiTuong = newData.DoiTuong;
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
                                return;
                              }
                              setSnackBarValue(successSnackBar);
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
            </MuiThemeProvider>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Button
              onClick={() => {
                type = 'YT';
                updateBegin = 1;
                // dispatch({ type: Types.NO_DATA_BHYT });
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              BHYT
            </Button>
            <Button
              onClick={() => {
                type = 'TN';
                updateBegin = 1;
                // dispatch({ type: Types.NO_DATA_BHTN });
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              BHTN
            </Button>
            <Button
              onClick={() => {
                type = 'BT';
                updateBegin = 1;
                // dispatch(Actions.changeCountingColumns());
                dispatch(Actions.countingWithMSSV(filter))
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Thống kê
            </Button>
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
                  Import
                </Button>
              )}
            {isBHTN ? (
              ''
            ) : (
                <Button
                  onClick={async () => {
                    if (isBHYT) {
                      const response = await QLBHHandler.ExportWithFilter(filter, 'YT');
                      if (response.statusCode !== 200 || response.body === 'Không có gì để export') {
                        setSnackBarValue(errorExportSnackBar);
                        return;
                      }
                      setSnackBarValue(successSnackBar);
                      const { body } = response;
                      dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
                    }
                    if (filter.type === 'Bồi thường' && isCounting) {
                      const response = await QLBHHandler.ExportCountingWithMSSV(filter);
                      if (response.statusCode !== 200 || response.body === 'Không có gì để export') {
                        setSnackBarValue(errorExportSnackBar);
                        return;
                      }
                      setSnackBarValue(successSnackBar);
                      const { body } = response;
                      dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
                    }
                  }}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: '8px' }}
                >
                  Export
                </Button>
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
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
