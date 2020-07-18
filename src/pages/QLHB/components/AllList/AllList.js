import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import * as QLHBHandler from 'handlers/QLHBHandler';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import Scholarship from '@material-ui/icons/School';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/QLHB/actionTypes';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/QLHB/action';
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
let type = 'KK';
let columns = [];
let isCase = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const QLHBState = useSelector(state => state.QLHBState);
  const { isAdmin } = useSelector(state => state.auth);

  const {
    dataList,
    isHBKK,
    isCounting,
    listLink
    // listDoiTuong,
    // listDonViTaiTro
  } = QLHBState;

  const classes = useStyles();
  const dispatch = useDispatch();

  let title;
  if (isHBKK) {
    columns = Columns.HBKK;
    title = 'Học Bổng Khuyến Khích';
  } else if (isCounting) {
    columns = Columns.COUNTING;
    title = 'Thống Kê';
  } else {
    columns = Columns.HBTT;
    title = 'Học Bổng Tài Trợ';
  }

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    fromHK: '1',
    fromNH: `${year - 1}-${year}`,
    toHK: '2',
    toNH: `${year - 1}-${year}`,
    mssv: '',
    LoaiHB: 'HBKK',
    DoiTuong: [],
    DonViTaiTro: []
  });

  const [state, setState] = useState({
    isTK: false,
    data: dataList,
    columns: columns
  });

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => {};

  //Create Menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdateState = response => {
    switch (type) {
      case 'KK':
        columns = Columns.HBKK;
        title = 'Học Bổng Khuyến Khích';
        break;
      case 'TT':
        columns = Columns.HBTT;
        title = 'Học Bổng Tài Trợ';
        break;
      default:
        columns = Columns.COUNTING;
        title = 'Thống Kê';
    }
    setState({
      ...state,
      data: response,
      columns: columns
    });
  };

  const handleUpdateStateFilter = response => {
    setState({
      ...state,
      data: response
    });
  };

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getDataFilter()).then(payload => {
      const { DoiTuong, DonViTaiTro } = payload;
      setfilter({
        ...filter,
        DoiTuong: DoiTuong.length > 0 ? [DoiTuong[0]] : [],
        DonViTaiTro: DonViTaiTro.length > 0 ? [DonViTaiTro[0]] : []
      });
    });
    dispatch(Actions.getListWithFilter(filter, type)).then(data =>
      handleUpdateStateFilter(data)
    );
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
          <Scholarship style={{ marginRight: '5px' }} /> QUẢN LÝ HỌC BỔNG
        </Typography>
        <div>
          <Button
            onClick={() => {
              type = 'KK';
              isCase = 0;
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.getListWithFilter(filter, type)).then(data =>
                handleUpdateState(data)
              );
            }}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            HBKK
          </Button>
          <Button
            onClick={() => {
              type = 'TT';
              isCase = 0;
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.getListWithFilter(filter, type)).then(data =>
                handleUpdateState(data)
              );
            }}
            variant="contained"
            color="primary"
            className={classes.ml5px}
          >
            HBTT
          </Button>
          <Button
            onClick={handleOpenMenu}
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
          <MuiThemeProvider theme={themeFilter}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'auto'
              }}
            >
              <Filters
                onFilter={handleFilter}
                isCounting={isCounting}
                filter={filter}
                isCase={isCase}
              />
              <ContainedButton
                handleClick={() => {
                  dispatch(ProgressActions.showProgres());
                  if (isCounting) {
                    switch (isCase) {
                      case 1:
                        dispatch(Actions.countingWithMSSV(filter)).then(data =>
                          handleUpdateStateFilter(data)
                        );
                        break;
                      case 2:
                        dispatch(
                          Actions.countingWithLoaiHB(filter)
                        ).then(data => handleUpdateStateFilter(data));
                        break;
                      case 3:
                        dispatch(
                          Actions.countingWithDoiTuong(filter)
                        ).then(data => handleUpdateStateFilter(data));
                        break;
                      default:
                        dispatch(Actions.countingWithDVTT(filter)).then(data =>
                          handleUpdateStateFilter(data)
                        );
                    }
                  } else {
                    dispatch(
                      Actions.getListWithFilter(filter, type)
                    ).then(data => handleUpdateStateFilter(data));
                  }
                }}
                label="Lọc dữ liệu"
              />
            </div>
          </MuiThemeProvider>
          <div>
            {isCounting ? (
              <div />
            ) : (
              <>
                {isAdmin ? (
                  <Button
                    onClick={() => setImportOpen(true)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    <ImportIcon /> &nbsp;Import
                  </Button>
                ) : (
                  <div />
                )}
              </>
            )}
            <Button
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                let response;
                console.log('isCaseeee:', isCase);
                if (isCounting) {
                  switch (isCase) {
                    case 1:
                      response = await QLHBHandler.ExportCountingWithMSSV(
                        filter
                      );
                      break;
                    case 2:
                      response = await QLHBHandler.ExportCountingWithLoaiHB(
                        filter
                      );
                      break;
                    case 3:
                      response = await QLHBHandler.ExportCountingWithDoiTuong(
                        filter
                      );
                      break;
                    default:
                      response = await QLHBHandler.ExportCountingWithDVTT(
                        filter
                      );
                  }
                } else {
                  response = await QLHBHandler.ExportWithFilter(filter, type);
                }
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
                    isCounting
                      ? {}
                      : {
                          onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                              dispatch(ProgressActions.showProgres());
                              setTimeout(async () => {
                                resolve();
                                if (oldData) {
                                  logger.info('Newdata: ', newData);
                                  const response = await QLHBHandler.UpdateOneStudentByType(
                                    newData,
                                    type
                                  );
                                  if (response.statusCode !== 200) {
                                    setSnackBarValue(errorSnackBar);
                                    dispatch(ProgressActions.hideProgress());
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
                              dispatch(ProgressActions.hideProgress());
                            }),

                          onRowDelete: oldData =>
                            new Promise(resolve => {
                              dispatch(ProgressActions.showProgres());
                              setTimeout(async () => {
                                resolve();
                                logger.info('Olddata: ', oldData);
                                const { PK, SK, id } = oldData;
                                const response = await QLHBHandler.DeleteOneCertificate(
                                  PK,
                                  SK,
                                  type,
                                  id
                                );
                                if (response.statusCode !== 200) {
                                  setSnackBarValue(errorSnackBar);
                                  dispatch(ProgressActions.hideProgress());
                                  return;
                                }
                                setSnackBarValue(successSnackBar);
                                setState(prevState => {
                                  const data = [...prevState.data];
                                  data.splice(data.indexOf(oldData), 1);
                                  return { ...prevState, data };
                                });
                              }, 600);
                              dispatch(ProgressActions.hideProgress());
                            })
                        }
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
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              isCase = 1;
              type = 'TK';
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.countingWithMSSV(filter)).then(data =>
                handleUpdateState(data)
              );
              handleCloseMenu();
            }}
          >
            Theo MSSV
          </MenuItem>
          <MenuItem
            onClick={() => {
              isCase = 2;
              type = 'TK';
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.countingWithLoaiHB(filter)).then(data =>
                handleUpdateState(data)
              );
              handleCloseMenu();
            }}
          >
            Theo Loại Học Bổng
          </MenuItem>
          <MenuItem
            onClick={() => {
              isCase = 3;
              type = 'TK';
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.countingWithDoiTuong(filter)).then(data =>
                handleUpdateState(data)
              );
              handleCloseMenu();
            }}
          >
            Theo Đối Tượng
          </MenuItem>
          <MenuItem
            onClick={() => {
              isCase = 4;
              type = 'TK';
              dispatch(ProgressActions.showProgres());
              dispatch(Actions.countingWithDVTT(filter)).then(data =>
                handleUpdateState(data)
              );
              handleCloseMenu();
            }}
          >
            Theo Đơn Vị Tài Trợ
          </MenuItem>
        </Menu>
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={isHBKK ? 'KK' : 'TT'}
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
