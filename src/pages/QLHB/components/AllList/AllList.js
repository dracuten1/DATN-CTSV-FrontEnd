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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import * as QLHBHandler from 'handlers/QLHBHandler';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/QLHB/actionTypes';
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
    justifyContent: 'flex-start'
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
  const { dataList, isHBKK, isCounting, listLink } = QLHBState;

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
    LoaiHB: '',
    DoiTuong: '',
    DonViTaiTro: ''
  });

  const [state, setState] = useState({
    isTK: false,
    data: dataList,
    columns: columns
  });

  if (updateBegin === 0) {
    dispatch(Actions.getDataFilter());
    // dispatch({type: Types.HBKK});
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

  if (updateBegin === 2 && state.data.length !== dataList.length) {
    setState({
      ...state,
      data: dataList,
      columns: columns
    });
    updateBegin += 1;
  }

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
        <Filters
          onFilter={handleFilter}
          isCounting={isCounting}
          filter={filter}
          isCase={isCase}
        />
        <ContainedButton
          handleClick={() => {
            if (isCounting) {
              switch (isCase) {
                case 1:
                  dispatch(Actions.countingWithMSSV(filter));
                  break;
                case 2:
                  dispatch(Actions.countingWithLoaiHB(filter));
                  break;
                case 3:
                  dispatch(Actions.countingWithDoiTuong(filter));
                  break;
                default:
                  dispatch(Actions.countingWithDVTT(filter));
              }
            } else {
              dispatch(Actions.getListWithFilter(filter, type));
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
                            const { PK, SK, id } = oldData;
                            const response = await QLHBHandler.DeleteOneCertificate(
                              PK,
                              SK,
                              type,
                              id
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
              onClick={() => {
                type = 'KK';
                isCase = 0;
                updateBegin = 1;
                // dispatch({type: Types.HBKK});
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              HBKK
            </Button>
            <Button
              onClick={() => {
                type = 'TT';
                isCase = 0;
                updateBegin = 1;
                // dispatch({type: Types.HBTT});
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              HBTT
            </Button>
            <Button
              onClick={() => setImportOpen(true)}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Import
            </Button>
            <Button
              onClick={async () => {
                let response;
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
                  response = await QLHBHandler.ExportCountingWithMSSV(filter);
                } else {
                  response = await QLHBHandler.ExportWithFilter(filter, type);
                }
                if (
                  response.statusCode !== 200 ||
                  response.body === 'Không có gì để export'
                ) {
                  setSnackBarValue(errorExportSnackBar);
                  return;
                }
                setSnackBarValue(successSnackBar);
                const { body } = response;
                dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Export
            </Button>
            <Button
              onClick={handleOpenMenu}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Thống kê
            </Button>
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
                  updateBegin = 1;
                  dispatch(Actions.countingWithMSSV(filter));
                  handleCloseMenu();
                }}
              >
                Theo MSSV
              </MenuItem>
              <MenuItem
                onClick={() => {
                  isCase = 2;
                  updateBegin = 1;
                  dispatch(Actions.countingWithLoaiHB(filter));
                  handleCloseMenu();
                }}
              >
                Theo Loại Học Bổng
              </MenuItem>
              <MenuItem
                onClick={() => {
                  isCase = 3;
                  updateBegin = 1;
                  dispatch(Actions.countingWithDoiTuong(filter));
                  handleCloseMenu();
                }}
              >
                Theo Đối Tượng
              </MenuItem>
              <MenuItem
                onClick={() => {
                  isCase = 4;
                  updateBegin = 1;
                  dispatch(Actions.countingWithDVTT(filter));
                  handleCloseMenu();
                }}
              >
                Theo Đơn Vị Tài Trợ
              </MenuItem>
            </Menu>
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
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
