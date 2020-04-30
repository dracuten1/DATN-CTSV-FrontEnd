/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
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
import * as AdminHandler from 'handlers/AdminHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
import { LinearProgress } from '@material-ui/core';
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

const dt = new Date();
const year = dt.getFullYear();

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
    isPrint: false,
    signer: null,
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

  const parseSigner = key => {
    return signerObj[key];
  };

  const [newCertificate, setCertificate] = React.useState({});
  const [signer, setSigner] = React.useState({});
  const [signerObj, setSignerObj] = React.useState({});
  const [progress, setProgress] = React.useState(true);
  const [disableAdd, setDisableAdd] = React.useState(true);
  const [missingDataError, setMissingDataError] = React.useState(false);

  const getSignerEnum = async () => {

    const response = await AdminHandler.GetListSigner();

    const SignerEnum = {};
    const SignerObj = {};
    const { Items } = response;
    Items.forEach((item, index) => {
      const key = "singer" + index;
      SignerEnum[key] = item.hvtnguoiki + " - " + item.chucvu;
      SignerObj[item.hvtnguoiki + " - " + item.chucvu] = { chucvu: item.chucvu, hvtnguoiki: item.hvtnguoiki, KT: item.KT, TL: item.TL };
    });
    logger.info("DRL:: Add dialog:: signerEnum: ", SignerEnum);
    setSigner(SignerEnum);
    setSignerObj(SignerObj);
    return SignerEnum;
  };

  React.useEffect(() => {
    getSignerEnum();
  }, []);

  const fetchCertificate = (prop) => async event => {
    const tmp = { ...values };
    tmp[prop] = event.target.value;
    const addCase = parseCase(tmp.case);
    const response = await DRLHandler.GetDRLByIdAndType(tmp.mssv, addCase);
    const items = response.Items;
    const Data = {};
    items.forEach(element => {
      const item = { ...element };
      delete item.Time;
      //remove "DRL-"
      const newTime = element.Time.replace("DRL-", "");
      switch (tmp.case) {
        case CaseEnum.nh:
          if (newTime.includes(tmp.year))
            Data[newTime] = { ...item };
          break;
        case CaseEnum.hk:
          const semester = parseSemester(tmp.semester);
          if (
            newTime.includes(semester) &&
            newTime.includes(tmp.year)
          )
            Data[newTime] = { ...item };
          break;
        default:
          Data[newTime] = { ...item };
      }
    });

    const SinhVien = {
      Ten: tmp.name,
      Khoa: tmp.faculty,
      MSSV: tmp.mssv,
      NS: tmp.dob
    };

    const LoaiXN = addCase;
    const NguoiKi = parseSigner(tmp.signer);
    if (prop === "case" || prop === "year" || prop === "semester") {

      if (isEmptyObj(Data)) {
        setMissingDataError(true);
      } else {
        setMissingDataError(false);
      }
    }

    const tmpCertificate = {
      Data,
      SinhVien,
      LoaiXN,
      NguoiKi,
    };

    logger.info('Fetch certificate: nguoiki: ', tmp.signer);
    logger.info('Fetch certificate: validate', validateCertificate());

    setCertificate(tmpCertificate);
    setDisableAdd(!validateCertificate(tmpCertificate));
  };

  function isEmptyObj(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  const isEmpty = (data) => {
    logger.info("Print list:: validate certificate: data:1 ", data, isEmptyObj(data));
    return (data === undefined || data === null || isEmptyObj(data) || data === "");
  };

  const validateCertificate = data => {
    logger.info("Print list:: validate certificate: data: ", data);
    if (isEmpty(data)) return false;
    if (isEmpty(data.Data)) return false;
    if (isEmpty(data.SinhVien)) return false;
    if (isEmpty(data.LoaiXN)) return false;
    if (isEmpty(data.NguoiKi)) return false;

    return true;
  };

  const addData = async () => {
    setProgress(false);
    const valid = validateCertificate(newCertificate);
    if (valid) {
      const res = await DRLHandler.AddCertificate(newCertificate);
      logger.info('adding cerificate: ', newCertificate);
      logger.info('response adding: ', res);
      const { Items } = res;
      const data = {
        ...values,
        pk: Items[0].PK,
        sk: Items[0].SK
      };
      handleAdd(data, valid);
    } else {
      handleAdd(undefined, valid);
    }

    setProgress(true);
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
    logger.info("DRL:: Add dialog:: drawMenuItem data: ", data);
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
        <div style={{ height: 10 }}>
          <LinearProgress color="secondary" hidden={progress} />
        </div>
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
              Người kí
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('signer')(event);
                fetchCertificate('signer')(event);
              }}
              value={values.signer}
            >
              {drawMenuItem(signer)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Loại xác nhận
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('case')(event);
                fetchCertificate('case')(event);
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
                  fetchCertificate('year')(event);
                }}
                defaultValue={4}
              >
                <MenuItem value={7}>{year}-{(year + 1)}</MenuItem>
                <MenuItem value={6}>{(year - 1)}-{year}</MenuItem>
                <MenuItem value={5}>{(year - 2)}-{(year - 1)}</MenuItem>
                <MenuItem value={4}>{(year - 3)}-{(year - 2)}</MenuItem>
                <MenuItem value={3}>{(year - 4)}-{(year - 3)}</MenuItem>
                <MenuItem value={2}>{(year - 5)}-{(year - 4)}</MenuItem>
                <MenuItem value={1}>{(year - 6)}-{(year - 5)}</MenuItem>
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
                    fetchCertificate('year')(event);
                  }}
                  defaultValue={4}
                >
                  <MenuItem value={7}>{year}-{(year + 1)}</MenuItem>
                  <MenuItem value={6}>{(year - 1)}-{year}</MenuItem>
                  <MenuItem value={5}>{(year - 2)}-{(year - 1)}</MenuItem>
                  <MenuItem value={4}>{(year - 3)}-{(year - 2)}</MenuItem>
                  <MenuItem value={3}>{(year - 4)}-{(year - 3)}</MenuItem>
                  <MenuItem value={2}>{(year - 5)}-{(year - 4)}</MenuItem>
                  <MenuItem value={1}>{(year - 6)}-{(year - 5)}</MenuItem>
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
                    fetchCertificate('semester')(event);
                  }}
                  defaultValue={SemesterEnum.hk1}
                >
                  {drawMenuItem(SemesterEnum)}
                </Select>
              </FormControl>
            </>
          )}
          <div style={{ display: missingDataError ? "block" : "none", color: "red", marginLeft: 10 }}>Không có dữ liệu điểm rèn luyện!</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={addData} color="primary" disabled={disableAdd}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDialog;
