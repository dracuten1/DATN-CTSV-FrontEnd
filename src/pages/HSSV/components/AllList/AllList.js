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

import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import * as HSSVHandler from 'handlers/HSSVHandler';
import Types from 'reduxs/reducers/HSSV/actionTypes';
import Actions from 'reduxs/reducers/HSSV/action';
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

let isImportDTB = false;
let updateBegin = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const HSSVState = useSelector(state => state.HSSVState);

  const { dataInfo, listLink } = HSSVState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    data: dataInfo,
    columns: [
      { title: 'MSSV', field: 'mssv', editable: 'never' },
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
        title: 'Ngày sinh',
        field: 'NgaySinh',
        cellStyle: {
          minWidth: '150px'
        }
      },
      {
        title: 'Nơi sinh',
        field: 'NoiSinh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Nơi sinh khác',
        field: 'NoiSinhKhac',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Giới tính',
        field: 'GioiTinh',
        editable: 'never',
        cellStyle: {
          minWidth: '150px'
        }
      },
      {
        title: 'Ngày vào trường',
        field: 'NgayVaoTruong',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Khóa học',
        field: 'KhoaHoc',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Bậc đào tạo',
        field: 'BacDaoTao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Loại hình đào tạo',
        field: 'HeDaoTao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngành',
        field: 'Nganh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Chuyên ngành',
        field: 'ChuyenNganh',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tình trạng',
        field: 'TinhTrang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'CMND',
        field: 'CMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngày cấp CMND',
        field: 'NgayCapCMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Nơi cấp CMND',
        field: 'NoiCapCMND',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Dân tộc',
        field: 'DanToc',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tôn giáo',
        field: 'TonGiao',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quốc tịch',
        field: 'QuocTich',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Địa chỉ',
        field: 'SoNha',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Phường xã',
        field: 'PhuongXa',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quận huyện',
        field: 'QuanHuyen',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tỉnh/TP',
        field: 'TinhTP',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tạm trú',
        field: 'TamTru',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'SĐT nhà',
        field: 'SDTNha',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'SĐT di động',
        field: 'DTDD',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Thành phần GĐ',
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
        title: 'Email cá nhân',
        field: 'EmailCaNhan',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Đoàn viên',
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
        title: 'Ngày vào Đoàn',
        field: 'NgayVaoDoan',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Đảng viên',
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
        title: 'Ngày vào Đảng',
        field: 'NgayVaoDang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngân hàng',
        field: 'NganHang',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'STK',
        field: 'SoTK',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Chi nhánh',
        field: 'ChiNhanh',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ghi chú',
        field: 'GhiChu',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Người liên lạc',
        field: 'TenNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Địa chỉ NLL',
        field: 'DiaChiNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Điện thoại NLL',
        field: 'SDTNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Email NLL',
        field: 'EmailNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Quan hệ NLL',
        field: 'QuanHe',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ghi chú NLL',
        field: 'GhiChuNLL',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Ngoại ngữ',
        field: 'NgoaiNgu',
        editable: 'never',
        cellStyle: {
          minWidth: '200px'
        }
      },
      {
        title: 'Tin học',
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
  const nullSnackBar = {
    open: true,
    type: 'error',
    message: 'Không tìm thấy thông tin!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            dispatch(Actions.getInfoStudent(filter.mssv));
            updateBegin = 1;
          }}
          label="Tìm kiếm"
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
                  <b>HỒ SƠ SINH VIÊN</b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={[
                {
                  icon: icons.Print,
                  tooltip: 'Print',
                  onClick: async (event, rowData) => {
                    const data = {
                      pk: rowData.PK,
                      sk: rowData.SK
                    };
                    const response = await HSSVHandler.PrintStudentInfo(data);
                    if (response.statusCode !== 200) {
                      setSnackBarValue(errorSnackBar);
                      return;
                    }
                    setSnackBarValue(successSnackBar);
                    const { body } = response;
                    dispatch({ type: Types.ADD_LINK_PRINT, listLink: body });
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
                    setTimeout(async () => {
                      resolve();
                      if (oldData) {
                        newData['DiaChiThuongTru']['PhuongXa'] =
                        newData.PhuongXa;
                        newData['DiaChiThuongTru']['QuanHuyen'] =
                        newData.QuanHuyen;
                        newData['DiaChiThuongTru']['SoNha'] = newData.SoNha;
                        newData['DiaChiThuongTru']['TinhTP'] = newData.TinhTP;
                        
                        const response = await HSSVHandler.UpdateStudentInfo(newData);
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
                  })
              }}
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
                isImportDTB = false;
                setImportOpen(true);
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Import HSSV
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
              Import ĐTB
            </Button>
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
        importCase={isImportDTB ? 'DiemTB' : 'import-hssv'}
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
