import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import * as TTSVHandler from 'handlers/TTSVHandler';
import * as XNSVHandler from 'handlers/XNSVHandler';
import { logger } from 'core/services/Apploger';
import { FormControl, InputLabel, Select, Divider, LinearProgress, FormHelperText } from '@material-ui/core';
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
    display: 'flex',
    flexDirection: 'column'
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

  const { open, handleClose, /*handleUpdate*/ } = props;

  const defaultError = {
    studentid: false,
    fullname: false,
    status: false,
    defaultstatus: false,
    average1: false,
    average2: false,
    average3: false,
    averagescore1: false,
    averagescore2: false,
    semester1: false,
    semester2: false,
    year1: false,
    year2: false,
    class: false,
    subjectid: false,
    group: false,
    subjectname: false,
    keepingStudyResultStartSemester: false,
    keepingStudyResultStartYear: false,
    keepingStudyResultEndSemester: false,
    keepingStudyResultEndYear: false,
    keepingStudyResultApplySemester: false,
    keepingStudyResultApplyYear: false,
    graduatingYear: false,
    graduatingMonth: false,
    graduatingType: false,
    graduatingScores: false,
    note: false,
  }
  const [errors, setErrors] = React.useState(defaultError);
  const { mssv } = props;
  const defaultValue = {
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
  }
  const [values, setValues] = React.useState(defaultValue);

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

  const findStudentInfoById = async event => {
    setProgress(false);
    const studentId = event.target.value;
    logger.info(studentId === "" || !studentId)
    if (studentId === "" || !studentId) {
      setProgress(true);

      return;
    }
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
        studentid: studentInfo.MSSV,
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
      setProgress(true);
      logger.info(studentInfo);
    }
    setProgress(true);

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

  //Validate field
  const validate = prop => event => {
    const value = event.target ? event.target.value : event;
    logger.info(`Validate ${prop}:${value}`);
    if (value === '' || value === null || value === undefined)
      setErrors({ ...errors, [prop]: true });
    else
      setErrors({ ...errors, [prop]: false });
  }

  const validateForm = (object) => {
    if (['', null, undefined].includes(object)) return {}
    let valid = {}
    if (Object.keys(object).length !== 0) {
      Object.keys(object).forEach(elem => {
        if (['GhiChu'].includes(elem)) {
          //next;
        }
        else if (['', null, undefined].includes(object[elem]))
          valid = { ...valid, [elem]: true };
        else if (typeof object[elem] !== 'string' && Object.keys(object[elem]).length !== 0) {
          valid = { ...valid, ...validateForm(object[elem]) }
        }
      });
    }
    return valid;

  }
  const handleSubmit = async () => {
    setErrors({ ...errors, ...validateForm(values) });
    const tmp = Object.keys(validateForm(body));
    const isValid = tmp.length === 0;
    logger.info(tmp);
    if (isValid) {
      handleUpdateStudentStatus();

    }
  }
  const BaoLuuComponents = () => {
    return (
      <div className={classes.divcontainer}>
        <Divider className={classes.divider} />
        <div className={classes.formTime}>
          <div className={classes.label}>Thời gian bắt đầu</div>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultStartYear}>
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultStartYear}
              onChange={event => {
                handleChange('keepingStudyResultStartYear')(event);
                validate('keepingStudyResultStartYear')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultStartYear')(event);
              }}
            >
              {drawData(dataYear)}
            </Select>
            {errors.keepingStudyResultStartYear ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultStartSemester}>
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultStartSemester}
              onChange={event => {
                handleChange('keepingStudyResultStartSemester')(event);
                validate('keepingStudyResultStartSemester')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultStartSemester')(event);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
            {errors.keepingStudyResultStartSemester ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
        </div>
        <div className={classes.formTime}>
          <div className={classes.label}>Thời gian kết thúc</div>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultEndYear}>
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultEndYear}
              onChange={event => {
                handleChange('keepingStudyResultEndYear')(event);
                validate('keepingStudyResultEndYear')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultEndYear')(event);
              }}
            >
              {drawData(dataYear)}
            </Select>
            {errors.keepingStudyResultEndYear ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultEndSemester}>
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultEndSemester}
              onChange={event => {
                handleChange('keepingStudyResultEndSemester')(event);
                validate('keepingStudyResultEndSemester')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultEndSemester')(event);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
            {errors.keepingStudyResultEndSemester ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
        </div>
        <div className={classes.formTime}>

          <div className={classes.label}>Thời gian nộp đơn</div>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultApplyYear}>
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultApplyYear}
              onChange={event => {
                handleChange('keepingStudyResultApplyYear')(event);
                validate('keepingStudyResultApplyYear')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultApplyYear')(event);
              }}
            >
              {drawData(dataYear)}
            </Select>
            {errors.keepingStudyResultApplyYear ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
          <FormControl className={classes.textField1} margin="normal" error={errors.keepingStudyResultApplySemester}>
            <InputLabel id="demo-simple-select-helper-label">
              Học kỳ
                </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.keepingStudyResultApplySemester}
              onChange={event => {
                handleChange('keepingStudyResultApplySemester')(event);
                validate('keepingStudyResultApplySemester')(event);
              }}
              onBlur={event => {
                validate('keepingStudyResultApplySemester')(event);
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
            {errors.keepingStudyResultApplySemester ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
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
          error={errors.class}
          value={values.class}
          onChange={event => {
            handleChange('class')(event);
            validate('class')(event);
          }}
          onBlur={event => {
            validate('class')(event);
          }}
          helperText={errors.class ? "Bắt buộc" : ""}
        />
        <TextField
          className={classes.textField}
          label="Mã môn học"
          margin="normal"
          error={errors.subjectid}
          value={values.subjectid}
          onChange={event => {
            handleChange('subjectid')(event);
            validate('subjectid')(event);
          }}
          onBlur={event => {
            validate('subjectid')(event);
          }}
          helperText={errors.subjectid ? "Bắt buộc" : ""}
        />
        <TextField
          className={classes.textField}
          label="Nhóm"
          margin="normal"
          error={errors.group}
          value={values.group}
          onChange={event => {
            handleChange('group')(event);
            validate('group')(event);
          }}
          onBlur={event => {
            validate('group')(event);
          }}
          helperText={errors.group ? "Bắt buộc" : ""}
        />
        <TextField
          className={classes.textField}
          label="Tên môn học"
          margin="normal"
          error={errors.subjectname}
          value={values.subjectname}
          onChange={event => {
            handleChange('subjectname')(event);
            validate('subjectname')(event);
          }}
          onBlur={event => {
            validate('subjectname')(event);
          }}
          helperText={errors.subjectname ? "Bắt buộc" : ""}
        />
        <Divider className={classes.divider} />
      </div>
    )
  }

  const TotNghiepComponents = () => {
    return (
      <div className={classes.divcontainer}>
        <Divider className={classes.divider} />
        <FormControl className={classes.textField} margin="normal" error={errors.graduatingYear}>
          <InputLabel id="demo-simple-select-helper-label">
            Đợt năm
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingYear}
            onChange={event => {
              handleChange('graduatingYear')(event);
              validate('graduatingYear')(event);
            }}
            onBlur={event => {
              validate('graduatingYear')(event);
            }}
          >
            {drawData(dataNTN)}
          </Select>
          {errors.graduatingYear ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
        </FormControl>
        <FormControl className={classes.textField} margin="normal" error={errors.graduatingMonth}>
          <InputLabel id="demo-simple-select-helper-label">
            Đợt tháng
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingMonth}
            onChange={event => {
              handleChange('graduatingMonth')(event);
              validate('graduatingMonth')(event);
            }}
            onBlur={event => {
              validate('graduatingMonth')(event);
            }}
          >
            {drawData(dataTTN)}
          </Select>
          {errors.graduatingMonth ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
        </FormControl>
        <TextField
          className={classes.textField}
          label="Điểm trung bình"
          margin="normal"
          error={errors.graduatingScores}
          value={values.graduatingScores}
          onChange={event => {
            handleChange('graduatingScores')(event);
            validate('graduatingScores')(event);
          }}
          onBlur={event => {
            validate('graduatingScores')(event);
          }}
          helperText={errors.graduatingScores ? "Bắt buộc" : ""}
        />
        <FormControl className={classes.textField} margin="normal" error={errors.graduatingType}>
          <InputLabel id="demo-simple-select-helper-label">
            Xếp loại
            </InputLabel>
          <Select
            // variant="outlined"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={values.graduatingType}
            onChange={event => {
              handleChange('graduatingType')(event);
              validate('graduatingType')(event);
            }}
            onBlur={event => {
              validate('graduatingType')(event);
            }}
          >
            {drawData(dataXL)}
          </Select>
          {errors.graduatingType ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
        </FormControl>
        <Divider className={classes.divider} />
      </div>
    )
  }

  const handleUpdateStudentStatus = async () => {
    setProgress(false);
    await TTSVHandler.UpdateStudentStatus(body);
    setProgress(true);
    setErrors(defaultError);
    setValues(defaultValue);
    handleClose();
  }
  logger.info("condition: ", (values.studentid !== mssv && progress === true) || (values.studentid === mssv && values.fullname === '' && progress === true))
  logger.info("condition: ", values)
  if (mssv !== '') {
    if ((values.studentid !== mssv && progress === true) || (values.studentid === mssv && values.fullname === '' && progress === true)) {
      findStudentInfoById({ target: { value: mssv } })
    }
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
            error={errors.studentid}
            value={values.studentid}
            onChange={event => {
              handleChange('studentid')(event)
              validate('studentid')(event);
            }}
            onBlur={event => {
              findStudentInfoById(event)
              validate('studentid')(event);
            }}
            helperText={errors.studentid ? "Bắt buộc" : ""}
          />
          <TextField
            className={classes.textField}
            label="Họ tên"
            margin="normal"
            error={errors.fullname}
            value={values.fullname}
            onChange={event => {
              handleChange('fullname')(event);
              validate('fullname')(event);
            }}
            onBlur={event => {
              validate('fullname')(event);
            }}
            disabled
            helperText={errors.fullname ? "Bắt buộc" : ""}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 1"
            margin="normal"
            // error={errors.average1}
            value={values.average1}
            onChange={event => {
              handleChange('average1')(event);
              // validate('average1')(event);
            }}
            onBlur={event => {
              // validate('average1')(event);
            }}
            disabled
          // helperText={errors.average1 ? "Bắt buộc" : ""}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 2"
            margin="normal"
            // error={errors.average2}
            value={values.average2}
            onChange={event => {
              handleChange('average2')(event);
              // validate('average2')(event);
            }}
            onBlur={event => {
              // validate('average2')(event);
            }}
            disabled
          // helperText={errors.average2 ? "Bắt buộc" : ""}
          />
          <TextField
            className={classes.textField}
            label="Điểm Trung Bình 3"
            margin="normal"
            // error={errors.average3}
            value={values.average3}
            onChange={event => {
              handleChange('average3')(event);
              // validate('average3')(event);
            }}
            onBlur={event => {
              // validate('average3')(event);
            }}
            disabled
          // helperText={errors.average3 ? "Bắt buộc" : ""}
          />
          <FormControl className={classes.textField} margin="normal" error={errors.status}>
            <InputLabel id="demo-simple-select-helper-label">
              Tình trạng
            </InputLabel>
            <Select
              // variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={values.status}
              onChange={event => {
                handleChange('status')(event);
                validate('status')(event);
              }}
              onBlur={event => {
                validate('status')(event);
              }}
            >
              {drawData(dataTT)}
            </Select>
            {errors.status ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
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
          <Button onClick={() => {
            handleClose();
            setErrors(defaultError);
            setValues(defaultValue);
          }} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={values.status === values.defaultstatus ? true : false}>
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default UpdateDialog;
