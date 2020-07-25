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
import * as KTKLHandler from 'handlers/KTKLHandler';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import BlockIcon from '@material-ui/icons/Block';
import ImportDialog from 'shared/components/importDialogNewHost/ImportDialogNewHost';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/KT_KL/actionTypes';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import Actions from '../../../../reduxs/reducers/KT_KL/action';
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
let type = 'KL';
let isCase = 2;

const AllList = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const KTKLState = useSelector(state => state.KTKLState);
  const { isAdmin } = useSelector(state => state.auth);

  const { isKyLuat, dataList, listLink } = KTKLState;

  const kyLuatCol = [
    { title: 'MSSV', field: 'MSSV' },
    { title: 'Họ tên', field: 'HoTen' },
    { title: 'Nội dung vi phạm', field: 'NoiDungViPham' },
    { title: 'Hình thức kỷ luật', field: 'HinhThucKyLuat' },
    { title: 'Số quyết định', field: 'SoQuyetDinh' },
    { title: 'Trách nhiệm pháp lý', field: 'TrachNhiemPhapLy' },
    { title: 'Ngày quyết định', field: 'NgayQuyetDinh' },
    {
      title: 'Năm học',
      field: 'nh',
      lookup: {
        1: `${year - 6}-${year - 5}`,
        2: `${year - 5}-${year - 4}`,
        3: `${year - 4}-${year - 3}`,
        4: `${year - 3}-${year - 2}`,
        5: `${year - 2}-${year - 1}`,
        6: `${year - 1}-${year}`,
        7: `${year}-${year + 1}`
      },
      filterCellStyle: {
        paddingTop: 1
      },
      cellStyle: {
        minWidth: '150px'
      },
      editable: false
    },
    {
      title: 'Học kỳ',
      field: 'HK',
      lookup: {
        1: '1',
        2: '2',
        3: '3'
      },
      filterCellStyle: {
        paddingTop: 1
      },
      cellStyle: {
        minWidth: '150px'
      },
      editable: false
    }
  ];
  const khenThuongCol = [
    { title: 'MSSV', field: 'MSSV' },
    { title: 'Họ tên', field: 'HoTen' },
    { title: 'Tên đội', field: 'TenDoi' },
    { title: 'Thành tích', field: 'ThanhTich' },
    { title: 'Cấp đạt giải', field: 'CapDG' },
    { title: 'Số tiền', field: 'SoTien' },
    { title: 'Loại', field: 'Loai' },
    { title: 'Cấp khen thưởng', field: 'CapKT' },
    { title: 'Quyến định', field: 'QuyetDinh' },
    { title: 'Ngày', field: 'Ngay' },
    {
      title: 'Năm học',
      field: 'nh',
      lookup: {
        1: `${year - 6}-${year - 5}`,
        2: `${year - 5}-${year - 4}`,
        3: `${year - 4}-${year - 3}`,
        4: `${year - 3}-${year - 2}`,
        5: `${year - 2}-${year - 1}`,
        6: `${year - 1}-${year}`,
        7: `${year}-${year + 1}`
      },
      filterCellStyle: {
        paddingTop: 1
      },
      cellStyle: {
        minWidth: '150px'
      },
      editable: false
    },
    {
      title: 'Học kỳ',
      field: 'HK',
      lookup: {
        1: '1',
        2: '2',
        3: '3'
      },
      filterCellStyle: {
        paddingTop: 1
      },
      cellStyle: {
        minWidth: '150px'
      },
      editable: false
    }
  ];

  const [filter, setfilter] = React.useState({
    fromHK: '1',
    fromNH: `${year - 1}-${year}`,
    toHK: '2',
    toNH: `${year - 1}-${year}`,
    mssv: '',
    capKT: '',
    capDG: '',
    loaiKT: ''
  });
  const [importOpen, setImportOpen] = React.useState(false);
  const [state, setState] = useState({
    data: dataList,
    columns: isKyLuat ? kyLuatCol : khenThuongCol
  });

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => {};

  const handleUpdateState = response => {
    setState({
      ...state,
      data: response,
      columns: type === 'KL' ? kyLuatCol : khenThuongCol
    });
  };

  //TKKT: Thong ke ky luat
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleTKKLClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleTKKLClose = () => {
    setAnchorEl(null);
  };

  //TKKL: Thong ke khen thuong
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleTKKTClick = event => {
    setAnchorEl2(event.currentTarget);
  };
  const handleTKKTClose = () => {
    setAnchorEl2(null);
  };

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getDataFilter()).then(payload => {
      const { CapDatGiai, CapKhenThuong, LoaiKhenThuong } = payload;
      setfilter({
        ...filter,
        capDG: CapDatGiai.length > 0 ? [CapDatGiai[0].SK] : [],
        capKT: CapKhenThuong.length > 0 ? [CapKhenThuong[0].SK] : [],
        loaiKT: LoaiKhenThuong.length > 0 ? [LoaiKhenThuong[0].SK] : []
      });
    });
    dispatch(Actions.ThongKeKyLuatAll(filter)).then(data =>
      handleUpdateState(data)
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
  const errorQuerySnackBar = {
    open: true,
    type: 'error',
    message: 'Vui lòng nhập MSSV!'
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
          <BlockIcon style={{ marginRight: '5px' }} /> KHEN THƯỞNG - KỶ LUẬT
        </Typography>
        <div>
          <Button
            aria-controls="thongkekyluat"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleTKKLClick}
          >
            THỐNG KÊ KỶ LUẬT
          </Button>
          <Menu
            id="thongkekyluat"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleTKKLClose}
          >
            <MenuItem
              onClick={() => {
                isCase = 1;
                type = 'KL';
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.ThongKeKyLuat1SV(filter)).then(data =>
                  handleUpdateState(data)
                );
                handleTKKLClose();
              }}
            >
              Theo MSSV
            </MenuItem>
            <MenuItem
              onClick={() => {
                isCase = 2;
                type = 'KL';
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.ThongKeKyLuatAll(filter)).then(data =>
                  handleUpdateState(data)
                );
                handleTKKLClose();
              }}
            >
              Tất cả sinh viên
            </MenuItem>
          </Menu>
          <Button
            aria-controls="thongkekhenthuong"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleTKKTClick}
          >
            THỐNG KÊ KHEN THƯỞNG
          </Button>
          <Menu
            id="thongkekhenthuong"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleTKKTClose}
          >
            <MenuItem
              onClick={() => {
                isCase = 3;
                type = 'KT';
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.ThongKeKhenThuong1SV(filter)).then(data =>
                  handleUpdateState(data)
                );
                handleTKKTClose();
              }}
            >
              Theo MSSV
            </MenuItem>
            <MenuItem
              onClick={() => {
                isCase = 4;
                type = 'KT';
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.ThongKeKhenThuongAll(filter)).then(data =>
                  handleUpdateState(data)
                );
                handleTKKTClose();
              }}
            >
              Tất cả sinh viên
            </MenuItem>
            <MenuItem
              onClick={() => {
                isCase = 5;
                type = 'KT';
                dispatch(ProgressActions.showProgres());
                dispatch(
                  Actions.ThongKeKhenThuongAllTheoLoai(
                    filter,
                    'capDG',
                    filter.capDG
                  )
                ).then(data => handleUpdateState(data));
                handleTKKTClose();
              }}
            >
              Theo Cấp Đạt Giải
            </MenuItem>
            <MenuItem
              onClick={() => {
                isCase = 6;
                type = 'KT';
                dispatch(ProgressActions.showProgres());
                dispatch(
                  Actions.ThongKeKhenThuongAllTheoLoai(
                    filter,
                    'capKT',
                    filter.capKT
                  )
                ).then(data => handleUpdateState(data));
                handleTKKTClose();
              }}
            >
              Theo Cấp Khen Thưởng
            </MenuItem>
            <MenuItem
              onClick={() => {
                isCase = 7;
                type = 'KT';
                dispatch(ProgressActions.showProgres());
                dispatch(
                  Actions.ThongKeKhenThuongAllTheoLoai(
                    filter,
                    'loaiKT',
                    filter.loaiKT
                  )
                ).then(data => handleUpdateState(data));
                handleTKKTClose();
              }}
            >
              Theo Loại Khen Thưởng
            </MenuItem>
          </Menu>
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
                filter={filter}
                isCase={isCase}
              />
              <ContainedButton
                handleClick={() => {
                  dispatch(ProgressActions.showProgres());
                  if (isCase === 1 || isCase === 3) {
                    if (filter.mssv === '') {
                      setSnackBarValue(errorQuerySnackBar);
                      dispatch(ProgressActions.hideProgress());
                      return;
                    }
                  }
                  switch (isCase) {
                    case 1:
                      dispatch(Actions.ThongKeKyLuat1SV(filter)).then(data =>
                        handleUpdateState(data)
                      );
                      break;
                    case 2:
                      dispatch(Actions.ThongKeKyLuatAll(filter)).then(data =>
                        handleUpdateState(data)
                      );
                      break;
                    case 3:
                      dispatch(
                        Actions.ThongKeKhenThuong1SV(filter)
                      ).then(data => handleUpdateState(data));
                      break;
                    case 4:
                      dispatch(
                        Actions.ThongKeKhenThuongAll(filter)
                      ).then(data => handleUpdateState(data));
                      break;
                    case 5:
                      dispatch(
                        Actions.ThongKeKhenThuongAllTheoLoai(
                          filter,
                          'capDG',
                          filter.capDG
                        )
                      ).then(data => handleUpdateState(data));
                      break;
                    case 6:
                      dispatch(
                        Actions.ThongKeKhenThuongAllTheoLoai(
                          filter,
                          'capKT',
                          filter.capKT
                        )
                      ).then(data => handleUpdateState(data));
                      break;
                    default:
                      dispatch(
                        Actions.ThongKeKhenThuongAllTheoLoai(
                          filter,
                          'loaiKT',
                          filter.loaiKT
                        )
                      ).then(data => handleUpdateState(data));
                  }
                }}
                label="Lọc dữ liệu"
              />{' '}
            </div>
          </MuiThemeProvider>
          <div>
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
            <Button
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                let response;
                if (isCase === 1 || isCase === 3) {
                  if (filter.mssv === '') {
                    setSnackBarValue(errorQuerySnackBar);
                    dispatch(ProgressActions.hideProgress());
                    return;
                  }
                }
                switch (isCase) {
                  case 1:
                    response = await KTKLHandler.exportKyLuat1SV(filter);
                    break;
                  case 2:
                    response = await KTKLHandler.exportKyLuatAll(filter);
                    break;
                  case 3:
                    response = await KTKLHandler.exportKhenThuong1SV(filter);
                    break;
                  case 4:
                    response = await KTKLHandler.exportKhenThuongAll(filter);
                    break;
                  case 5:
                    response = await KTKLHandler.exportKhenThuongAllTheoLoai(
                      filter,
                      'capDG',
                      filter.capDG
                    );

                    break;
                  case 6:
                    response = await KTKLHandler.exportKhenThuongAllTheoLoai(
                      filter,
                      'capKT',
                      filter.capKT
                    );
                    break;
                  default:
                    response = await KTKLHandler.exportKhenThuongAllTheoLoai(
                      filter,
                      'loaiKT',
                      filter.loaiKT
                    );
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
                      {isKyLuat ? (
                        <b>DỮ LIỆU THỐNG KÊ KỶ LUẬT</b>
                      ) : (
                        <b>DỮ LIỆU THỐNG KÊ KHEN THƯỞNG</b>
                      )}
                    </div>
                  }
                  localization={{
                    header: {
                      actions: 'Chức năng'
                    }
                  }}
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
                    filtering: false
                  }}
                  editable={
                    isAdmin
                      ? {
                          onRowDelete: oldData =>
                            new Promise(resolve => {
                              dispatch(ProgressActions.showProgres());
                              setTimeout(async () => {
                                resolve();
                                logger.info('Olddata: ', oldData);
                                const { PK, SK } = oldData;
                                const response = await KTKLHandler.deleteOneCertificate(
                                  PK,
                                  SK
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
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={isKyLuat ? 'KL' : 'KT'}
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
