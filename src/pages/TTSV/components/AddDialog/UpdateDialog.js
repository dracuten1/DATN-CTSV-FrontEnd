import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import * as DRLHandler from 'handlers/DRLHandler';
import * as TTSVHandler from 'handlers/TTSVHandler';
import * as XNSVHandler from 'handlers/XNSVHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import { FormControl, InputLabel, Select, Divider, LinearProgress } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: theme.spacing(1),
    width: 400
  },
  textField1: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    margin: theme.spacing(1),
    width: 125,
  },
  divcontainer: {
    width: 'min-content',
  },
  divider: {
    margin: theme.spacing(2),
    width: '90%',
    alignSelf: 'center'
  },
  label: {
    fontSize: 'larger',
    width: 125,
    marginLeft: 10,
  },
  formTime: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  }
}));

const UpdateDialog = props => {
  const classes = useStyles();

  const { open, handleClose, handleUpdate } = props;

  const [values, setValues] = React.useState({
    studentid: '',
    fullname: '',
    status: '',
    defaultstatus: '',
    average1: '',
    average2: '',
    average3: '',
    averagescore1: '',
    averagescore2: '',
    semester1: '',
    semester2: '',
    year1: '',
    year2: '',
    class: '',
    subjectid: '',
    group: '',
    subjectname: '',
    keepingStudyResultStartSemester: '',
    keepingStudyResultStartYear: '',
    keepingStudyResultEndSemester: '',
    keepingStudyResultEndYear: '',
    keepingStudyResultApplySemester: '',
    keepingStudyResultApplyYear: '',
    graduatingYear: '',
    graduatingMonth: '',
    graduatingType: '',
    graduatingScores: '',
    note: '',
  });

  const handleChange = prop => event => {
    logger.info(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
    fetchData(prop)(event);
  };

  const [body, setBody] = React.useState({});
  const [progress, setProgress] = React.useState(true);

  const fetchData = prop => event => {

    let tmpValues = { ...values };
    tmpValues[prop] = event.target.value;
    const info = {
      MSSV: tmpValues.studentid,
      GhiChu: tmpValues.note,
      LoaiTinhTrang: tmpValues.status,
    }
    let tmp;
    switch (tmpValues.status) {
      case dataTT[8]:
        tmp = {
          Lop: tmpValues.class,
          MaMonHoc: tmpValues.subjectid,
          Nhom: tmpValues.group,
          TenMonHoc: tmpValues.subjectname,
        }
        break;
      case dataTT[1]:
        tmp = {
          Tu: {
            HK: tmpValues.keepingStudyResultStartSemester,
            NH: tmpValues.keepingStudyResultStartYear,
          },
          Den: {
            HK: tmpValues.keepingStudyResultEndSemester,
            NH: tmpValues.keepingStudyResultEndYear,
          },
          ThoiDiemNopDon: {
            HK: tmpValues.keepingStudyResultApplySemester,
            NH: tmpValues.keepingStudyResultApplyYear,
          }
        }
        break;
      case dataTT[4]:
        tmp = {
          DotNam: tmpValues.graduatingYear,
          DotThang: tmpValues.graduatingMonth,
          DTB: tmpValues.graduatingScores,
          LoaiTotNghiep: tmpValues.graduatingType,
        }
        break;
      case dataTT[2]:
        tmp = {
          DTB: [
            {
              Diem: tmpValues.averagescore2,
              HK: tmpValues.semester2,
              NH: tmpValues.year2,
            },
            {
              Diem: tmpValues.averagescore1,
              HK: tmpValues.semester1,
              NH: tmpValues.year1,
            }
          ]
        }
        break;
      case dataTT[3]:
        tmp = {
          DTB1: tmpValues.averagescore2,
          DTB2: tmpValues.averagescore1
        }
        break;
      default:
        break;
    }

    const tmpBody = { info: { ...info, ...tmp } };

    logger.info('Fetch body: ', tmpBody);

    setBody(tmpBody);
  };

  const findStudentInfoById = async  event => {

    const studentId = event.target.value;
    logger.info(studentId === "" || !studentId)
    if (studentId === "" || !studentId) return;
    const studentInfo = (await XNSVHandler.FindStudentInfoById(studentId)).Items[0];
    if (Object.keys(studentInfo).length !== 0) {
      logger.info(studentInfo)
      const DiemTBArr = Object.entries(studentInfo.DiemTB).reverse();
      logger.info(DiemTBArr);
      const average1 = DiemTBArr[0] ? DiemTBArr[0][0] : undefined;
      const average2 = DiemTBArr[1] ? DiemTBArr[1][0] : undefined;
      const average3 = DiemTBArr[2] ? DiemTBArr[2][0] : undefined;
      logger.info(average1, average2, average3)
      const tmpStudentInfo = {
        fullname: studentInfo.HoVaTen,
        status: studentInfo.LatestTTHVDetails.TenTinhTrang,
        defaultstatus: studentInfo.LatestTTHVDetails.TenTinhTrang,
        average1: average1 ? average1 + ': ' + studentInfo.DiemTB[average1].DiemTB : '',
        average2: average2 ? average2 + ': ' + studentInfo.DiemTB[average2].DiemTB : '',
        average3: average3 ? average3 + ': ' + studentInfo.DiemTB[average3].DiemTB : '',
        averagescore1: average1 ? studentInfo.DiemTB[average1].DiemTB : '',
        averagescore2: average2 ? studentInfo.DiemTB[average2].DiemTB : '',
        semester1: average1 ? studentInfo.DiemTB[average1].HocKi : '',
        semester2: average2 ? studentInfo.DiemTB[average2].HocKi : '',
        year1: average1 ? studentInfo.DiemTB[average1].NamHoc : '',
        year2: average2 ? studentInfo.DiemTB[average2].NamHoc : '',
      }
      setValues({ ...values, ...tmpStudentInfo });
      logger.info(studentInfo);
    }

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

  //tình trạng
  const dataTT = [
    'Đang học',
    'Bảo lưu',
    'Buộc thôi học',
    'Cảnh cáo học vụ',
    'Tốt nghiệp',
    'Đi nước ngoài',
    'Hoàn tất chương trình',
    'Thôi học',
    'Đăng ký học phần',
    'Chưa cập nhật',
  ]
  // xếp loại
  const dataXL = [
    'Xuất sắc',
    'Giỏi',
    'Khá',
    'Trung bình - khá',
    'Yếu',
  ]
  const date = new Date();
  const currentYear = Number.parseInt(moment(date).format('YYYY'));
  //đợt năm tốt nghiêp
  const dataNTN = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ]

  const dataYear = [
    `${currentYear - 1}-${currentYear}`,
    `${currentYear - 2}-${currentYear - 1}`,
    `${currentYear - 3}-${currentYear - 2}`,
    `${currentYear - 4}-${currentYear - 3}`,
    `${currentYear - 5}-${currentYear - 4}`,
  ]

  //Đợt tháng tốt nghiệp
  const dataTTN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const drawInputByStatus = status => {

    if (status === values.defaultstatus) return;

    switch (status) {
      case dataTT[8]:
        return DangKyHocPhanComponents();
      case dataTT[1]:
        return BaoLuuComponents();
      case dataTT[4]:
        return TotNghiepComponents();
      default:
        return;
    }

  }

  const BaoLuuComponents = () => {
    return (
      <div className={classes.divcontainer}>
        <Divider className={classes.divider} />
        <div className={classes.formTime}>
          <div className={classes.label}>Thời gian bắt đầu</div>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultStartYear}
              onChange={handleChange('keepingStudyResultStartYear')}
            >
              {drawData(dataYear)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultStartSemester}
              onChange={handleChange('keepingStudyResultStartSemester')}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.formTime}>
          <div className={classes.label}>Thời gian kết thúc</div>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
            >
              {drawData(dataYear)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultEndSemester}
              onChange={handleChange('keepingStudyResultEndSemester')}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.formTime}>

          <div className={classes.label}>Thời gian nộp đơn</div>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultApplyYear}
              onChange={handleChange('keepingStudyResultApplyYear')}
            >
              {drawData(dataYear)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField1} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultApplySemester}
              onChange={handleChange('keepingStudyResultApplySemester')}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Divider className={classes.divider} />
      </div>
    )
  }

  const DangKyHocPhanComponents = () => {
    return (
      <div className={classes.divcontainer}>
        <Divider className={classes.divider} />
        <TextField
          className={classes.textField}
          label="Lớp"
          margin="normal"
          value={values.class}
          onChange={handleChange('class')}
        />
        <TextField
          className={classes.textField}
          label="Mã môn học"
          margin="normal"
          value={values.subjectid}
          onChange={handleChange('subjectid')}
        />
        <TextField
          className={classes.textField}
          label="Nhóm"
          margin="normal"
          value={values.group}
          onChange={handleChange('group')}
        />
        <TextField
          className={classes.textField}
          label="Tên môn học"
          margin="normal"
          value={values.subjectname}
          onChange={handleChange('subjectname')}
        />
        <Divider className={classes.divider} />
      </div>
    )
  }

  const TotNghiepComponents = () => {
    return (
      <div className={classes.divcontainer}>
        <Divider className={classes.divider} />
        <FormControl className={classes.textField} margin="normal">
          <InputLabel id="demo-simple-select-helper-label">
            Đơt năm
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingYear}
            onChange={handleChange('graduatingYear')}
          >
            {drawData(dataNTN)}
          </Select>
        </FormControl>
        <FormControl className={classes.textField} margin="normal">
          <InputLabel id="demo-simple-select-helper-label">
            Đợt tháng
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingMonth}
            onChange={handleChange('graduatingMonth')}
          >
            {drawData(dataTTN)}
          </Select>
        </FormControl>
        <TextField
          className={classes.textField}
          label="Điểm trung bình"
          margin="normal"
          value={values.graduatingScores}
          onChange={handleChange('graduatingScores')}
        />
        <FormControl className={classes.textField} margin="normal">
          <InputLabel id="demo-simple-select-helper-label">
            Xếp loại
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingType}
            onChange={handleChange('graduatingType')}
          >
            {drawData(dataXL)}
          </Select>
        </FormControl>
        <Divider className={classes.divider} />
      </div>
    )
  }

  const handleUpdateStudentStatus = async () => {
    setProgress(false);
    await TTSVHandler.UpdateStudentStatus(body);
    setProgress(true);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <div style={{ height: 10 }}>
          <LinearProgress color="secondary" hidden={progress} />
        </div>
        <DialogTitle id="form-dialog-title">
          <b>Cập nhât tình trạng sinh viên</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            className={classes.textField}
            label="MSSV"
            margin="normal"
            value={values.studenid}
            onChange={handleChange('studentid')}
            onBlur={findStudentInfoById}
          />
          <TextField
            className={classes.textField}
            label="Họ tên"
            margin="normal"
            value={values.fullname}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 1"
            margin="normal"
            value={values.average1}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 2"
            margin="normal"
            value={values.average2}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 3"
            margin="normal"
            value={values.average3}
          />
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Tình trạng
            </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.status}
              onChange={handleChange('status')}
            >
              {drawData(dataTT)}
            </Select>
          </FormControl>
          {drawInputByStatus(values.status)}
          <TextField
            className={classes.textField}
            label="Ghi chú"
            margin="normal"
            value={values.note}
            onChange={handleChange('note')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleUpdateStudentStatus} color="primary" disabled={values.status === values.defaultstatus ? true : false}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default UpdateDialog;
