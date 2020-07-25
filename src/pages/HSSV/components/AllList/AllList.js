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
  Typography
} from '@material-ui/core';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter2';
import ImportIcon from '@material-ui/icons/Input';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
// import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import * as HSSVHandler from 'handlers/HSSVHandler';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import Description from '@material-ui/icons/Description';
import Types from 'reduxs/reducers/HSSV/actionTypes';
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

let isImportDTB = false;
let updateBegin = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const HSSVState = useSelector(state => state.HSSVState);
  const { isAdmin } = useSelector(state => state.auth);

  const { dataInfo, listLink } = HSSVState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: dataInfo,
    columns: [
      { title: 'Mã Số SV', field: 'mssv', editable: 'never' },
      {
        title: 'Họ',
        field: 'Ho',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tên',
        field: 'Ten',
        cellStyle: {
          minWidth: '150px'
        }
      },
      {
        title: 'Ngày Sinh',
        field: 'NgaySinh',
        cellStyle: {
          minWidth: '150px'
        }
      },
      {
        title: 'Nơi Sinh',
        field: 'NoiSinh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Nơi Sinh Khác',
        field: 'NoiSinhKhac',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Phái',
        field: 'GioiTinh',
        editable: 'never',
        cellStyle: {
          minWidth: '150px'
        }
      },
      {
        title: 'Ngày Vào Trường',
        field: 'NgayVaoTruong',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Khóa Học',
        field: 'KhoaHoc',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Bậc Đào Tạo',
        field: 'BacDaoTao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Loại Hình Đào Tạo',
        field: 'HeDaoTao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngành Đào Tạo',
        field: 'Nganh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Chuyên Ngành Đào Tạo',
        field: 'ChuyenNganh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tình Trạng',
        field: 'TinhTrang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Chứng Minh Nhân Dân',
        field: 'CMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngày Cấp CMND',
        field: 'NgayCapCMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Nơi Cấp CMND',
        field: 'NoiCapCMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Dân Tộc',
        field: 'DanToc',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tôn Giáo',
        field: 'TonGiao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quốc Tịch',
        field: 'QuocTich',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Số Nhà Đường',
        field: 'SoNha',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Phường Xã',
        field: 'PhuongXa',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quận Huyện',
        field: 'QuanHuyen',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tỉnh Thành',
        field: 'TinhTP',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Địa Chỉ Tạm Trú',
        field: 'TamTru',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Điện Thoại Nhà',
        field: 'SDTNha',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Điện Thoại Di Động',
        field: 'DTDD',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Thành Phần Gia Đình',
        field: 'ThanhPhanGiaDinh',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Email',
        field: 'Email',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Email Cá Nhân',
        field: 'EmailCaNhan',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Đoàn Viên',
        field: 'DoanVien',
        editable: 'never',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.DoanVien ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      {
        title: 'Ngày Vào Đoàn',
        field: 'NgayVaoDoan',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Đảng Viên',
        field: 'DangVien',
        editable: 'never',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.DangVien ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      {
        title: 'Ngày Vào Đảng',
        field: 'NgayVaoDang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngân Hàng',
        field: 'NganHang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Số Tài Khoản',
        field: 'SoTK',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Chi Nhánh',
        field: 'ChiNhanh',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ghi Chú',
        field: 'GhiChu',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Người Liên Lạc',
        field: 'TenNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Địa Chỉ Người Liên Lạc',
        field: 'DiaChiNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Điện Thoại Người Liên Lạc',
        field: 'SDTNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Email Người Liên Lạc',
        field: 'EmailNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quan hệ Người Liên Lạc',
        field: 'QuanHe',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ghi chú Người Liên Lạc',
        field: 'GhiChuNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngoại Ngữ',
        field: 'NgoaiNgu',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tin Học',
        field: 'TinHoc',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      }
    ]
  });

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataInfo
    });
    updateBegin += 1;
  }

  const [importOpen, setImportOpen] = React.useState(false);

  const handleImport = () => {};

  const [filter, setFilter] = React.useState({
    mssv: ''
  });

  const handleFilter = (prop, data) => {
    setFilter({ ...filter, [prop]: data });
  };

  const handleUpdateState = response => {
    setState({
      ...state,
      data: response ? [response] : []
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
  const mssvErrorSnackBar = {
    open: true,
    type: 'error',
    message: 'Không tìm thấy thông tin!'
  };
  const FillErrorSnackBar = {
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
          <Description style={{ marginRight: '5px' }} /> HỒ SƠ SINH VIÊN
        </Typography>
      </Card>
      <Card {...rest} className={clsx(classes.root, className)}>
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <Filters onFilter={handleFilter} />
            <ContainedButton
              handleClick={async () => {
                dispatch(ProgressActions.showProgres());
                if (filter.mssv !== '') {
                  const payload = await HSSVHandler.GetInfoStudent(filter.mssv);

                  const { statusCode, body } = payload;

                  if (
                    statusCode !== 200 ||
                    body === 'Không tìm thấy học sinh này !'
                  ) {
                    dispatch({ type: Types.GET_INFO, payload: null });
                    setSnackBarValue(mssvErrorSnackBar);
                    dispatch(ProgressActions.hideProgress());
                    return null;
                  }

                  body.mssv = body.SK.replace('SV#', '');
                  body.Name = body.Ho + ' ' + body.Ten;
                  body.SoNha = body.DiaChiThuongTru.SoNha;
                  body.PhuongXa = body.DiaChiThuongTru.PhuongXa;
                  body.TinhTP = body.DiaChiThuongTru.TinhTP;
                  body.QuanHuyen = body.DiaChiThuongTru.QuanHuyen;
                  body.SoTK = body.TaiKhoanNganHang.SoTK;
                  body.NganHang = body.TaiKhoanNganHang.NganHang;
                  body.ChiNhanh = body.TaiKhoanNganHang.ChiNhanh;
                  body.TenNLL = body.NguoiLienLac.Ten;
                  body.DiaChiNLL = body.NguoiLienLac.DiaChi;
                  body.EmailNLL = body.NguoiLienLac.Email;
                  body.TenNLL = body.NguoiLienLac.Ten;
                  body.SDTNLL = body.NguoiLienLac.DT;
                  body.GhiChuNLL = body.NguoiLienLac.GhiChu;
                  body.QuanHe = body.NguoiLienLac.QuanHe;
                  body.NgoaiNgu = body.NguoiLienLac.NgoaiNgu;
                  body.TinHoc = body.NguoiLienLac.TinHoc;

                  handleUpdateState(body);
                  dispatch({ type: Types.GET_INFO, payload: body });
                } else setSnackBarValue(FillErrorSnackBar);
                dispatch(ProgressActions.hideProgress());
              }}
              label="Tìm kiếm"
            />
          </MuiThemeProvider>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              paddingRight: '13px',
              marginTop: '8px'
            }}
          >
            <div>
              {isAdmin ? (
                <>
                  <Button
                    onClick={() => {
                      isImportDTB = false;
                      setImportOpen(true);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    <ImportIcon /> &nbsp;Import HSSV
                  </Button>
                  <Button
                    onClick={() => {
                      isImportDTB = true;
                      setImportOpen(true);
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    <ImportIcon /> &nbsp;Import ĐTB
                  </Button>
                </>
              ) : (
                <div />
              )}
            </div>
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
                      <b>HỒ SƠ SINH VIÊN</b>
                    </div>
                  }
                  columns={state.columns}
                  data={state.data}
                  localization={{
                    header: {
                      actions: 'Chức năng'
                    },
                    pagination: {
                      labelDisplayedRows: '{from}-{to} trên {count}',
                      labelRowsSelect: 'hàng'
                    }
                  }}
                  actions={[
                    {
                      icon: icons.Print,
                      tooltip: 'Print',
                      onClick: async (event, rowData) => {
                        dispatch(ProgressActions.showProgres());
                        const data = {
                          pk: rowData.PK,
                          sk: rowData.SK
                        };
                        const response = await HSSVHandler.PrintStudentInfo(
                          data
                        );
                        if (response.statusCode !== 200) {
                          setSnackBarValue(errorSnackBar);
                          return;
                        }
                        setSnackBarValue(successSnackBar);
                        const { body } = response;
                        window.open(body);
                        // dispatch({
                        //   type: Types.ADD_LINK_PRINT,
                        //   listLink: body
                        // });
                        dispatch(ProgressActions.hideProgress());
                      }
                    }
                  ]}
                  options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    },
                    rowStyle: {
                      backgroundColor: '#EEE'
                    }
                  }}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise(resolve => {
                        dispatch(ProgressActions.showProgres());
                        setTimeout(async () => {
                          resolve();
                          if (oldData) {
                            newData['DiaChiThuongTru']['PhuongXa'] =
                              newData.PhuongXa;
                            newData['DiaChiThuongTru']['QuanHuyen'] =
                              newData.QuanHuyen;
                            newData['DiaChiThuongTru']['SoNha'] = newData.SoNha;
                            newData['DiaChiThuongTru']['TinhTP'] =
                              newData.TinhTP;

                            const response = await HSSVHandler.UpdateStudentInfo(
                              newData
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
                        dispatch(ProgressActions.hideProgress());
                      })
                  }}
                />
              </MuiThemeProvider>
            </div>
          </PerfectScrollbar>
        </CardContent>
        {/* {listLink.length > 0 ? (
          <div>
            <ListLinkDocx data={listLink} />
          </div>
        ) : (
          ''
        )} */}
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={isImportDTB ? 'DiemTB' : 'import-hssv'}
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
