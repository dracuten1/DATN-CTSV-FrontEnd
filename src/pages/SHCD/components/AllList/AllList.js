/* eslint-disable no-loop-func */
import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { logger } from 'core/services/Apploger';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
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
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import icons from 'shared/icons';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import * as SHCDHandler from 'handlers/SHCDHandler';
import ImportIcon from '@material-ui/icons/Input';
import Scholarship from '@material-ui/icons/School';
import ImportDialog from 'shared/components/importDialogSHCD/ImportDialogSHCD';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/SHCD/actionTypes';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Actions from '../../../../reduxs/reducers/SHCD/action';
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

let updateBegin = 0;
let isViewer = false;
let pkskArr = [];

const AllList = props => {
  const { className, ...rest } = props;
  const SHCDState = useSelector(state => state.SHCDState);
  const { dataList, listLink } = SHCDState;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    status: 'Đang Lưu Trữ'
  });
  const QLDELFILE = [
    { title: 'STT', field: 'stt', editable: 'never', filtering: false },
    { title: 'Tên file', field: 'fileName', filtering: false },
    {
      title: 'Tài khoản',
      field: 'username',
      cellStyle: {
        minWidth: '200px'
      }
    },
    {
      title: 'Ngày cập nhật',
      field: 'updatedAt',
      cellStyle: {
        minWidth: '300px'
      }
    }
  ];

  const QLSAVEFILE = [
    {
      field: 'Actions',
      width: 50,
      filtering: false,
      render: rowData => (
        <div>
          <Tooltip title="Tải về" placement="bottom">
            <Button
              onClick={async () => {
                try {
                  dispatch(ProgressActions.showProgres());
                  const response = await SHCDHandler.DownloadFile(
                    rowData.keyS3
                  );
                  if (response.statusCode !== 200) {
                    setSnackBarValue(errorSnackBarDownload);
                    dispatch(ProgressActions.hideProgress());
                    return;
                  }
                  const { body } = response;
                  dispatch({
                    type: Types.ADD_LINK_PRINT,
                    listLink: body.link
                  });
                  setSnackBarValue(successSnackBarDownload);
                } catch (error) {
                  setSnackBarValue(errorSnackBar);
                }
                dispatch(ProgressActions.hideProgress());
              }}
              color="primary"
              size="small"
            >
              <SystemUpdateAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Xem File" placement="bottom">
            <Button
              onClick={async () => {
                try {
                  dispatch(ProgressActions.showProgres());
                  const response = await SHCDHandler.GetContentFile(
                    rowData.keyS3
                  );

                  logger.info(
                    'SHCDAction:: GetContentFile: GetContentFile: ',
                    response
                  );

                  if (response.statusCode !== 200) {
                    setSnackBarValue(errorViewerSnackBar);
                    dispatch(ProgressActions.hideProgress());
                    return;
                  }

                  const { body } = response;
                  const { data, headers } = body;

                  if (data.length === 0) {
                    setSnackBarValue(errorNoDataSnackBar);
                    dispatch(ProgressActions.hideProgress());
                    return;
                  }

                  const arrHeader = Object.values(headers);
                  const columns = [];
                  const values = [];

                  arrHeader.forEach(element => {
                    columns.push({
                      title: `${element}`,
                      field: `${element}`
                    });
                  });

                  for (let key = 0; key < data.length; key += 1) {
                    if (data[key] !== null) {
                      //check data is correct
                      let isCorrect = true;
                      Object.keys(data[key]).forEach(elem => {
                        if (elem === 'undefined') isCorrect = false;
                      });

                      if (!isCorrect) {
                        setSnackBarValue(errorViewerSnackBar);
                        dispatch(ProgressActions.hideProgress());
                        return;
                      }

                      //Binding data in table
                      arrHeader.forEach(element => {
                        data[key][`${element}`] = data[key][`${element}`] || '';
                      });
                      values.push(data[key]);
                    }
                  }

                  handleUpdateStateViewer(values, columns, rowData.fileName);
                  setSnackBarValue(successSnackBar);
                } catch (error) {
                  setSnackBarValue(errorSnackBar);
                }
                dispatch(ProgressActions.hideProgress());
              }}
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              <VisibilityIcon />
            </Button>
          </Tooltip>
        </div>
      )
    },
    { title: 'STT', field: 'stt' },
    { title: 'Tên file', field: 'fileName' },
    {
      title: 'Tài khoản',
      field: 'username',
      cellStyle: {
        minWidth: '200px'
      }
    },
    {
      title: 'Ngày cập nhật',
      field: 'updatedAt',
      cellStyle: {
        minWidth: '300px'
      }
    }
  ];

  let title;
  if (!isViewer) {
    if (filter.status === 'Đang Lưu Trữ') title = 'Danh Sách File Đang Lưu Trữ';
    else if (filter.status === 'Xóa Tạm Thời')
      title = 'Danh Sách File Xóa Tạm Thời';
    else title = 'Danh Sách File Đã Hủy';
  }

  const [importOpen, setImportOpen] = React.useState(false);

  const [state, setState] = useState({
    isTK: false,
    title: '',
    data: dataList,
    columns: filter.status === 'Đang Lưu Trữ' ? QLSAVEFILE : QLDELFILE
  });

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => {};

  const handleUpdateStateViewer = (response, arr, fileName) => {
    isViewer = true;
    setState({
      ...state,
      title: fileName,
      data: response,
      columns: arr
    });
  };

  const handleUpdateStateFilter = response => {
    setState({
      ...state,
      data: response,
      columns: filter.status === 'Đang Lưu Trữ' ? QLSAVEFILE : QLDELFILE
    });
  };

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getFileWithFilter(filter)).then(data =>
      handleUpdateStateFilter(data)
    );
    updateBegin += 1;
  }

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công!'
  };
  const successSnackBarDownload = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công. Link chỉ tồn tại 15 phút!'
  };
  const errorSnackBarDownload = {
    open: true,
    type: 'error',
    message: 'File không tồn tại, vui lòng kiểm tra lại!'
  };
  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
  const errorViewerSnackBar = {
    open: true,
    type: 'error',
    message: 'Thực hiện thất bại, vui lòng download để xem file!'
  };
  const errorNoDataSnackBar = {
    open: true,
    type: 'error',
    message: 'File trống, vui lòng download để xem file!'
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
          <Scholarship style={{ marginRight: '5px' }} /> SINH HOẠT CÔNG DÂN
        </Typography>
      </Card>

      <Card {...rest} className={clsx(classes.root, className)}>
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Filters onFilter={handleFilter} filter={filter} />
              <ContainedButton
                handleClick={() => {
                  dispatch(ProgressActions.showProgres());
                  isViewer = false;
                  dispatch(Actions.getFileWithFilter(filter)).then(data =>
                    handleUpdateStateFilter(data)
                  );
                }}
                label="Lọc dữ liệu"
              />
            </div>
          </MuiThemeProvider>
          <div>
            {isViewer ? (
              <div />
            ) : (
              <>
                {filter.status === 'Đã Hủy' ? (
                  <div />
                ) : (
                  <>
                    {filter.status === 'Xóa Tạm Thời' ? (
                      <>
                        <Button
                          onClick={async () => {
                            const status = 1;
                            try {
                              dispatch(ProgressActions.showProgres());
                              const response = await SHCDHandler.UpdateStatusFile(
                                pkskArr,
                                status
                              );

                              if (response.statusCode !== 200) {
                                setSnackBarValue(errorSnackBar);
                                dispatch(ProgressActions.hideProgress());
                                return;
                              }

                              dispatch(
                                Actions.getFileWithFilter(filter)
                              ).then(data => handleUpdateStateFilter(data));

                              setSnackBarValue(successSnackBar);
                            } catch (error) {
                              setSnackBarValue(errorSnackBar);
                            }
                            dispatch(ProgressActions.hideProgress());
                          }}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '8px' }}
                        >
                          <RestoreIcon /> &nbsp;Khôi phục file
                        </Button>
                        <Button
                          onClick={async () => {
                            const status = -1;
                            try {
                              dispatch(ProgressActions.showProgres());
                              const response = await SHCDHandler.UpdateStatusFile(
                                pkskArr,
                                status
                              );

                              if (response.statusCode !== 200) {
                                setSnackBarValue(errorSnackBar);
                                dispatch(ProgressActions.hideProgress());
                                return;
                              }

                              dispatch(
                                Actions.getFileWithFilter(filter)
                              ).then(data => handleUpdateStateFilter(data));

                              setSnackBarValue(successSnackBar);
                            } catch (error) {
                              setSnackBarValue(errorSnackBar);
                            }
                            dispatch(ProgressActions.hideProgress());
                          }}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '8px' }}
                        >
                          <DeleteForeverIcon /> &nbsp;Xóa file vĩnh viễn
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setImportOpen(true)}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '8px' }}
                        >
                          <ImportIcon /> &nbsp;Lưu trữ file
                        </Button>
                        <Button
                          onClick={async () => {
                            const status = 0;
                            try {
                              dispatch(ProgressActions.showProgres());
                              const response = await SHCDHandler.UpdateStatusFile(
                                pkskArr,
                                status
                              );

                              if (response.statusCode !== 200) {
                                setSnackBarValue(errorSnackBar);
                                dispatch(ProgressActions.hideProgress());
                                return;
                              }

                              dispatch(
                                Actions.getFileWithFilter(filter)
                              ).then(data => handleUpdateStateFilter(data));

                              setSnackBarValue(successSnackBar);
                            } catch (error) {
                              setSnackBarValue(errorSnackBar);
                            }
                            dispatch(ProgressActions.hideProgress());
                          }}
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginLeft: '8px' }}
                        >
                          <DeleteIcon /> &nbsp;Xóa file đã chọn
                        </Button>
                      </>
                    )}
                  </>
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
                      <b>{isViewer ? state.title : title}</b>
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
                    selection: !isViewer,
                    filtering: false,
                    selectionProps: () => ({
                      color: 'primary'
                    })
                  }}
                  onSelectionChange={rows => {
                    pkskArr = [];
                    if (rows.length > 0) {
                      for (let i = 0; i < rows.length; i += 1) {
                        pkskArr.push({
                          PK: rows[i].PK,
                          SK: rows[i].SK
                        });
                      }
                    }
                  }}
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
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          NamHoc={filter.nh}
          HocKy={filter.hk}
          handleAdd={() =>
            dispatch(Actions.getFileWithFilter(filter)).then(data =>
              handleUpdateStateFilter(data)
            )
          }
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
