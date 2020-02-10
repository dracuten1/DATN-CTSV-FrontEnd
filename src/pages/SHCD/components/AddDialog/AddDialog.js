import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import * as DRLHandler from 'handlers/DRLHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import { CaseEnum, SemesterEnum } from './DRLEnum';

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
  }
}));

const AddDialog = props => {
  const classes = useStyles();

  const { open, handleClose, handleAdd } = props;

  const [values, setValues] = React.useState({
    stt: null,
    name: '',
    mssv: '',
    dob: '',
    faculty: '',
    case: null,
    year: null,
    semester: null,
    isPrint: false
    // pk: '',
    // sk: ''
  });

  const handleChange = prop => event => {
    logger.info(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const parseCase = key => {
    switch (key) {
      case CaseEnum.hk:
        return 'HK';
      case CaseEnum.nh:
        return 'NH';
      case CaseEnum.tk:
        return 'TK';
      default:
        return 'All';
    }
  };

  const parseSemester = key => {
    switch (key) {
      case SemesterEnum.hk1:
        return 'HK1';
      default:
        return 'HK2';
    }
  };

  const [newCertificate, setCertificate] = React.useState({});

  const fetchCertificate = async () => {
    const addCase = parseCase(values.case);
    const response = await DRLHandler.GetDRLByIdAndType(values.mssv, addCase);
    const items = response.Items;
    const Data = {};
    items.forEach(element => {
      const item = { ...element };
      delete item.Time;
      switch (values.case) {
        case CaseEnum.nh:
          if (element.Time.includes(values.year))
            Data[element.Time] = { ...item };
          break;
        case CaseEnum.hk:
          const semester = parseSemester(values.semester);
          if (
            element.Time.includes(semester) &&
            element.Time.includes(values.year)
          )
            Data[element.Time] = { ...item };
          break;
        default:
          Data[element.Time] = { ...item };
      }
    });

    const SinhVien = {
      Ten: values.name,
      Khoa: values.faculty,
      MSSV: values.mssv,
      NS: values.dob
    };

    const LoaiXN = addCase;

    const tmpCertificate = {
      Data,
      SinhVien,
      LoaiXN
    };

    logger.info('Fetch certificate: ', tmpCertificate);

    setCertificate(tmpCertificate);
  };

  const addData = async () => {
    fetchCertificate();
    const res = await DRLHandler.AddCertificate(newCertificate);
    logger.info('adding cerificate: ', newCertificate);
    logger.info('response adding: ', res);
    const { Items } = res;
    const data = {
      ...values,
      pk: Items[0].PK,
      sk: Items[0].SK
    };
    handleAdd(data);
  };

  const findStudentInfoById = async event => {
    const id = event.target.value;

    const data = await DRLHandler.FindStudentInfoById(id);

    const resStudentInfo = data.Items[0];

    const studentInfo = {
      name: valueOrEmpty(resStudentInfo.Ten),
      mssv: valueOrEmpty(resStudentInfo.Mssv),
      faculty: valueOrEmpty(resStudentInfo.Nganh),
      dob: valueOrEmpty(resStudentInfo.NgSinh)
    };

    logger.info(studentInfo);
    setValues(studentInfo);
  };

  const drawMenuItem = data => {
    return Object.keys(data).map(key => {
      return (
        <MenuItem key={key} value={data[key]}>
          {data[key]}
        </MenuItem>
      );
    });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <b>Thêm Vào Danh Sách In</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            className={classes.textField}
            label="MSSV"
            value={values.mssv}
            onChange={handleChange('mssv')}
            onBlur={findStudentInfoById}
            margin="normal"
          />
          <TextField
            className={classes.textField}
            label="Họ tên"
            margin="normal"
            value={values.name}
            onChange={handleChange('name')}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            className={classes.textField}
            label="Ngày sinh"
            margin="normal"
            value={values.dob}
            onChange={handleChange('dob')}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            className={classes.textField}
            label="Khoa"
            margin="normal"
            value={values.faculty}
            onChange={handleChange('faculty')}
            InputProps={{
              readOnly: true
            }}
          />
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Loại xác nhận
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('case')(event);
                fetchCertificate();
              }}
              value={values.case}
            >
              {drawMenuItem(CaseEnum)}
            </Select>
          </FormControl>
          {values.case === CaseEnum.nh && (
            <FormControl className={classes.textField}>
              <InputLabel id="demo-simple-select-helper-label">
                Năm học
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={event => {
                  handleChange('year')(event);
                  fetchCertificate();
                }}
              >
                <MenuItem value={4}>2019-2020</MenuItem>
                <MenuItem value={3}>2018-2019</MenuItem>
                <MenuItem value={2}>2017-2018</MenuItem>
                <MenuItem value={1}>2016-2017</MenuItem>
              </Select>
            </FormControl>
          )}
          {values.case === CaseEnum.hk && (
            <>
              <FormControl className={classes.textField}>
                <InputLabel id="demo-simple-select-helper-label">
                  Năm học
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={event => {
                    handleChange('year')(event);
                    fetchCertificate();
                  }}
                >
                  <MenuItem value={4}>2019-2020</MenuItem>
                  <MenuItem value={3}>2018-2019</MenuItem>
                  <MenuItem value={2}>2017-2018</MenuItem>
                  <MenuItem value={1}>2016-2017</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.textField}>
                <InputLabel id="demo-simple-select-helper-label">
                  Học kỳ
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={event => {
                    handleChange('semester')(event);
                    fetchCertificate();
                  }}
                >
                  {drawMenuItem(SemesterEnum)}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

export default AddDialog;
