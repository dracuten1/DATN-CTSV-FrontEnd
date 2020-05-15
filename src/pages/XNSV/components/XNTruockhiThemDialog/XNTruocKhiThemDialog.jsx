import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import VayVonDialog from 'pages/XNSV/components/VayVonDialog/VayVonDialog';
import ThucTapDialog from 'pages/XNSV/components/ThucTapDialog/ThucTapDialog';
import { LinearProgress } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import * as XNSVHandler from 'handlers/XNSVHandler';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  divider: {
    margin: theme.spacing(2),
    width: '90%',
    alignSelf: 'center'
  }
}));

const date = new Date();

const defaultValue = {
  stt: null,
  name: '',
  mssv: '',
  city: '',
  district: '',
  ward: '',
  address: '',
  language: '',
  status: '',
  reason: '',
  case: null,
  semester: null,
  year: null,
  isPrint: false,
  note: '',
  studingBeginDate: moment(date).format('DD/MM/YYYY'),
  studingEndDate: moment(date).format('DD/MM/YYYY'),
  expectedPublicationDate: moment(date).format('DD/MM/YYYY'),
  dien: '',
  doituong: '',
  date: moment(date).format('DD/MM/YYYY')
};

const XNTruocKhiThemDialog = props => {
  const classes = useStyles();

  const { open, handleClose, handleAdd } = props;

  const [isOpenVayVonDialog, setIsOpenVayVonDialog] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState(defaultValue);
  const [progress, setProgress] = React.useState(true);

  const [newCertificate, setCertificate] = React.useState({});

  const fetchCertificate = (prop) => event => {
    let tmp = { ...values };
    tmp[prop] = event.target.value;
    let Data;
    logger.info("FECTCH DATA:: ", tmp);
    switch (tmp.case) {
      case 'Bảo lưu':
        Data = {
          HocKy: `${tmp.semester}`,
          NamHoc: `${tmp.year}`,
          NgonNgu: `${tmp.language}`
        }
        break;
      case 'Đang học':
        Data = {
          NgonNgu: `${tmp.language}`,

        }
        break;
      case 'Chờ xét hoàn tất chương trình':
        Data = {
          NgayCongBoKetQua: `${tmp.expectedPublicationDate}`,
          NgonNgu: `${tmp.language}`
        }
        break;
      case 'Hoàn tất chương trình':
        Data = {
          GhiChu: `${tmp.note}`,
          NgonNgu: `${tmp.language}`
        }
        break;
      case 'Thời gian học':
        Data = {
          NamKetThuc: `${tmp.studingEndDate}`,
          NgonNgu: `${tmp.language}`,
        }
        break;
      case 'Vay vốn':
        Data = {
          NgonNgu: `${tmp.language}`,
          ThoiGianRaTruong: `${tmp.studingEndDate}`,
          ThuocDien: `${tmp.dien}`,
          ThuocDoiTuong: `${tmp.doituong}`,
        }
        break;
      default:
        break;
    }

    const tmpCertificate = {
      Data,
      LoaiGiayXN: tmp.case,
      LyDoXN: tmp.reason,
      ThoiGian: tmp.date,
      ThongTinSinhVien: {
        DiaChiThuongTru: {
          PhuongXa: tmp.ward,
          QuanHuyen: tmp.district,
          SoNha: tmp.address,
          TinhTP: tmp.city,
        },
        MSSV: tmp.mssv,
        Ten: tmp.name,
      }
    };
    logger.info("Fetch: ", tmpCertificate);

    setCertificate(tmpCertificate);
  };

  //loại xác nhận tiếng việt
  const dataLXNTV = [
    'Bảo lưu',
    'Đang học',
    'Chờ xét hoàn tất chương trình',
    'Chờ xét tốt nghiệp',
    'Hoàn tất chương trình',
    'Thời gian học',
    'Giới thiệu',
    'Vay vốn'
  ];
  //loại xác nhận tiếng anh
  const dataLXNTA = [
    'Đang học',
    'Bảo lưu',
    'Xác nhận thời gian học',
    'Hoàn tất chương trình'
  ];

  //tình trạng
  const dataTT = {
    DangHoc: 'Đang học',
    BaoLuu: 'Bảo lưu',
    BuocThoiHoc: 'Buộc thôi học',
    CanhCaoHV: 'Cảnh cáo học vụ',
    TotNghiep: 'Tốt nghiệp',
    NN: 'Đi nước ngoài',
    HTCT: 'Hoàn tất chương trình',
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    if (event.target.value === "Vay vốn") setIsOpenVayVonDialog(true)
    else setIsOpen(true);
  };

  const drawData = data => {
    return data.map((val, ind) => {
      return (
        <MenuItem key={ind} value={val}>
          {val}
        </MenuItem>
      );
    });
  };

  const drawDataObject = data => {
    return Object.keys(data).map((val, ind) => {
      return (
        <MenuItem key={ind} value={val}>
          {data[val]}
        </MenuItem>
      );
    });
  };

  const closeDialog = () => {
    setValues(defaultValue);
    setIsOpen(false);
    handleClose();
  };

  const addData = async () => {
    setProgress(false);
    const res = await XNSVHandler.AddCertificate(newCertificate);
    if (res.statusCode === 200) {
      handleAdd(values, true);
    } else {
      // TO DO: SHOW ERROR
    }
    setProgress(true);
    handleClose();
  };

  const info = [
    {
      label: 'MSSV',
      value: values.mssv,
      state: 'mssv'
    },
    {
      label: 'Họ tên',
      value: values.name,
      state: 'name'
    },
    'devider',
    {
      label: 'Tỉnh/Thành phố',
      value: values.city,
      state: 'city'
    },
    {
      label: 'Quận (huyện)',
      value: values.district,
      state: 'district'
    },
    {
      label: 'Phường (xã)',
      value: values.ward,
      state: 'ward'
    },
    {
      label: 'Địa chỉ',
      value: values.address,
      state: 'address'
    }
  ];

  const findStudentInfoById = async event => {
    const id = event.target.value;

    const data = await XNSVHandler.FindStudentInfoById(id);


    const resStudentInfo = data.Items[0];

    let { DiaChiThuongTru } = resStudentInfo;
    if (!DiaChiThuongTru) {
      DiaChiThuongTru = {
        TinhTP: undefined,
        SoNha: undefined,
        QuanHuyen: undefined,
        PhuongXa: undefined,
      }
    }

    const studentInfo = {
      name: valueOrEmpty(resStudentInfo.HoVaTen),
      mssv: valueOrEmpty(resStudentInfo.MSSV),
      city: valueOrEmpty(DiaChiThuongTru.TinhTP),
      address: valueOrEmpty(DiaChiThuongTru.SoNha),
      district: valueOrEmpty(DiaChiThuongTru.QuanHuyen),
      ward: valueOrEmpty(DiaChiThuongTru.PhuongXa)
    };

    logger.info("findStudentInfoById: ", studentInfo);
    setValues({ ...values, ...studentInfo });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div style={{ height: 10 }}>
          <LinearProgress color="secondary" hidden={progress} />
        </div>
        <DialogTitle id="form-dialog-title">
          <b>Xác Nhận Trước Khi In</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          {info.map(item => {
            if (item === 'devider') {
              return <Divider className={classes.divider} />;
            }
            if (item.label === 'MSSV') {
              return (
                <TextField
                  className={classes.textField}
                  label="MSSV"
                  value={values.mssv}
                  onChange={event => {
                    handleChange('mssv')(event);
                    // fetchCertificate();
                  }}
                  onBlur={findStudentInfoById}
                  margin="normal"
                />
              );
            }
            if (item.label === 'Họ tên') {
              return (
                <TextField
                  className={classes.textField}
                  label="Họ tên"
                  value={values.name}
                  onChange={handleChange('name')}
                  margin="normal"
                  InputProps={{
                    readOnly: true
                  }}
                />
              );
            }
            return (
              <TextField
                className={classes.textField}
                label={item.label}
                value={item.value}
                onBlur={handleChange(item.state)}
                margin="normal"
              />
            );
          })}
          <Divider className={classes.divider} />
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Ngôn ngữ
            </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.language}
              onChange={event => {
                handleChange('language')(event)
                // fetchCertificate();
              }}
            >
              <MenuItem value="Tiếng Việt">Tiếng Việt</MenuItem>
              <MenuItem value="Tiếng Anh">Tiếng Anh</MenuItem>
            </Select>
          </FormControl>

          {values.language === 'Tiếng Việt' && (
            <FormControl className={classes.textField} margin="normal">
              <InputLabel id="demo-simple-select-helper-label">
                Loại xác nhận
              </InputLabel>
              <Select
                // variant="outlined"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.case}
                onChange={event => {
                  handleChange('case')(event);
                  fetchCertificate();

                }}
              >
                {drawData(dataLXNTV)}
              </Select>
            </FormControl>
          )}
          {values.language === 'Tiếng Anh' && (
            <FormControl className={classes.textField} margin="normal">
              <InputLabel id="demo-simple-select-helper-label">
                Loại xác nhận
              </InputLabel>
              <Select
                // variant="outlined"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={values.case}
                onChange={event => {
                  handleChange('case')(event);
                  fetchCertificate();
                }}
              >
                {drawData(dataLXNTA)}
              </Select>
            </FormControl>
          )}
          {values.case === 'Vay vốn' && (
            <VayVonDialog
              handleConfirm={(data) => {
                setIsOpenVayVonDialog(false);
                setValues({ ...values, studingEndDate: data.thoigianratruong, dien: data.dien, doituong: data.doituong })
                fetchCertificate();
              }}
              handleClose={() => {
                setIsOpenVayVonDialog(false);
                setValues({ ...values, case: '' });
              }}
              open={isOpenVayVonDialog}
            />
          )}
          {values.case === 'Giới thiệu' && (
            <ThucTapDialog
              handleClose={() => {
                setIsOpen(false);
                setValues({ ...values, case: '' });
              }}
              open={isOpen}
            />
          )}
          {values.case === 'Bảo lưu' && (
            <div className={classes.container}>
              <FormControl className={classes.textField} margin="normal">
                <InputLabel id="demo-simple-select-helper-label">
                  Năm học
                </InputLabel>
                <Select
                  // variant="outlined"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={values.year}
                  onChange={event => {
                    handleChange('year')(event);
                    fetchCertificate();
                  }}
                >
                  <MenuItem selected value={3}>
                    2019-2020
                  </MenuItem>
                  <MenuItem value={2}>2018-2019</MenuItem>
                  <MenuItem value={1}>2017-2018</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.textField} margin="normal">
                <InputLabel id="demo-simple-select-helper-label">
                  Học kỳ
                </InputLabel>
                <Select
                  // variant="outlined"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={values.semester}
                  onChange={event => {
                    handleChange('semester')(event);
                    fetchCertificate();
                  }}
                >
                  <MenuItem value={1}>Học kỳ 1</MenuItem>
                  <MenuItem value={2}>Học kỳ 2</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {values.case === 'Chờ xét tốt nghiệp' && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Chọn ngày công bố dự kiến"
                format="dd/MM/yyyy"
                value={date}
                style={{ width: '400px', marginLeft: '8px' }}
                onChange={event => {
                  handleChange('expectedPublicationDate')(event);
                  fetchCertificate();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          {values.case === 'Chờ xét hoàn tất chương trình' && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Chọn ngày công bố dự kiến"
                format="dd/MM/yyyy"
                value={date}
                style={{ width: '400px', marginLeft: '8px' }}
                onChange={event => {
                  handleChange('expectedPublicationDate')(event);
                  // fetchCertificate();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          <Divider className={classes.divider} />
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Tình trạng
            </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.status}
              onChange={event => {
                handleChange('status')(event)
                fetchCertificate();
              }}
            >
              {drawDataObject(dataTT)}
            </Select>
          </FormControl>
          {values.status === 'Đang học' && (
            <div className={classes.container}>
              <Divider className={classes.divider} />
              <TextareaAutosize
                style={{ width: '400px', marginLeft: '8px' }}
                rowsMax={3}
                placeholder="Ghi chú"
                onBlur={event => {
                  handleChange('note')(event)
                  fetchCertificate();
                }}
              />
            </div>
          )}
          {values.status === 'Hoàn tất chương trình' && (
            <div className={classes.container}>
              <Divider className={classes.divider} />
              <TextareaAutosize
                style={{ width: '400px', marginLeft: '8px' }}
                rowsMax={3}
                placeholder="Ghi chú"
                onBlur={event => {
                  handleChange('note')(event)
                  fetchCertificate();
                }}
              />
            </div>
          )}
          {values.status === 'Xác nhận thời gian học' && (
            <div className={classes.container}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Từ ngày"
                  format="dd/MM/yyyy"
                  value={date}
                  style={{ width: '400px', marginLeft: '8px' }}
                  onChange={event => {
                    handleChange('studingBeginDate')(event);
                    fetchCertificate();
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Đến ngày"
                  format="dd/MM/yyyy"
                  value={date}
                  style={{ width: '400px', marginLeft: '8px' }}
                  onChange={event => {
                    handleChange('studingEndDate')(event);
                    fetchCertificate();
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">Lý do</InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.reason}
              onChange={event => {
                handleChange('reason')(event);
                fetchCertificate('reason')(event);
              }}
            >
              {drawData(dataReason)}
            </Select>
          </FormControl>

          <Divider className={classes.divider} />
          <TextField
            className={classes.textField}
            label="Ngày thêm"
            margin="normal"
            defaultValue={moment(date).format('DD/MM/YYYY')}
            InputProps={{
              readOnly: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Huỷ
          </Button>
          <Button onClick={addData} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const dataReason = [
  'Dạy thêm',
  'Du học',
  'Hỗ trợ học phí',
  'Hoãn nghĩa vụ quân sự',
  'Học nghiệp vụ sư phạm',
  'Học ngiệp vụ quản lý nhà nước',
  'Học tại chức',
  'Học thêm',
  'Khai báo thuế',
  'Lắp đặt ADSL',
  'Mua vé tàu tết',
  'Mượn sách thư viện',
  'Nhận chứng chỉ quốc phòng',
  'Nhận sim khuyến mãi',
  'Nhận trợ cấp',
  'Sổ ưu đãi',
  'Tạm trú',
  'Tạm trú KTX',
  'Thi anh văn',
  'Vào phòng thi',
  'Xin cấp visa',
  'Xin học bổng',
  'Xin số liệu',
  'Xin thực tập',
  'Xin việc làm'
];

export default XNTruocKhiThemDialog;
