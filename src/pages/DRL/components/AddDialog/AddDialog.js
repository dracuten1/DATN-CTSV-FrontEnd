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
import { LinearProgress, FormHelperText } from '@material-ui/core';
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
  const defaultError = {
    stt: false,
    name: false,
    mssv: false,
    dob: false,
    faculty: false,
    case: false,
    year: false,
    semester: false,
    isPrint: false,
    signer: false,
  }
  const [errors, setErrors] = React.useState(defaultError);
  const defaultValue = {
    stt: null,
    name: '',
    mssv: '',
    dob: '',
    faculty: '',
    case: null,
    year: 4,
    semester: null,
    isPrint: false,
    signer: null,
    // pk: '',
    // sk: ''
  }
  const [values, setValues] = React.useState(defaultValue);

  const validate = prop => event => {
    const value = event.target ? event.target.value : event;
    logger.info(`Validate ${prop}:${value}`);
    if (value === '' || value === null || value === undefined)
      setErrors({ ...errors, [prop]: true });
    else
      setErrors({ ...errors, [prop]: false });
  }

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

  const parseYear = key => {
    switch (key) {
      case 7:
        return `${year}-${(year + 1)}`;
      case 6:
        return `${(year - 1)}-${year}`;
      case 5:
        return `${(year - 2)}-${(year - 1)}`;
      case 4:
        return `${(year - 3)}-${(year - 2)}`;
      case 3:
        return `${(year - 4)}-${(year - 3)}`;
      case 2:
        return `${(year - 5)}-${(year - 4)}`;
      case 1:
        return `${(year - 6)}-${(year - 5)}`;
      default:
        return `${(year - 3)}-${(year - 2)}`;
    }
  }

  const parseSemester = key => {
    switch (key) {
      case SemesterEnum.hk1:
        return 'HK1';
      case SemesterEnum.hk2:
        return 'HK2';
      default:
        return 'HK1';
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
    logger.info("ADD DRL::: values: ", tmp);
    const addCase = parseCase(tmp.case);
    const response = await DRLHandler.GetDRLByIdAndType(tmp.mssv, addCase);
    const items = response.Items;
    const Data = {};
    logger.info("ADD DRL::: items: ", items);

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
          const year = parseYear(tmp.year);
          logger.info("ADD DRL::: in caseEnum hk: ", semester);
          logger.info("ADD DRL::: in caseEnum newTime: ", newTime);
          logger.info("ADD DRL::: in caseEnum: year: ", year);
          logger.info("ADD DRL::: in caseEnum: in if: ", newTime.includes(semester) && newTime.includes(year));
          if (
            newTime.includes(semester) &&
            newTime.includes(year)
          )
            Data[newTime] = { ...item };
          break;
        default:
          Data[newTime] = { ...item };
      }
    });

    const SinhVien = {
      Ten: tmp.name,
      MSSV: tmp.mssv,
    };

    const LoaiXN = addCase;
    const NguoiKi = parseSigner(tmp.signer);
    if (prop === "case" || prop === "year" || prop === "semester") {

      logger.info("DATA: ", Data);
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


  const validateAddDialog = () => {
    let valid = {}
    //Loop lv1 
    Object.keys(values).forEach(elem => {
      const newLocal = ['', null, undefined];
      if (newLocal.includes(values[elem]))
        valid = { ...valid, [elem]: true };
      else if (Object.keys(values[elem]).length !== 0) {
        //Loop lv2
        Object.keys(values[elem]).forEach(subElem => {
          if (newLocal.includes(values[elem][subElem]))
            valid = { ...valid, [subElem]: true };
        })
      }
    });
    setErrors({ ...errors, ...valid });
    return Object.keys(valid).length === 0;
  }

  const handleSubmit = () => {
    if (validateAddDialog()) {
      addData();
      setErrors(defaultError);
      setValues(defaultValue);
    }
  }

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
            error={errors.mssv}
            value={values.mssv}
            onChange={event => {
              handleChange('mssv')(event);
              validate('mssv')(event);
            }}
            onBlur={event => {
              findStudentInfoById(event);
              validate('mssv')(event);
            }}
            margin="normal"
            helperText={errors.mssv ? "Bắt buộc" : ""}
          />
          <TextField
            className={classes.textField}
            label="Họ tên"
            margin="normal"
            error={errors.name}
            value={values.name}
            onChange={event => {
              handleChange('name')
              validate('name')(event);
            }}
            onBlur={event => {
              validate('name')(event);
            }}
            helperText={errors.name ? "Bắt buộc" : ""}
          />
          <FormControl className={classes.textField} error={errors.signer}>
            <InputLabel id="demo-simple-select-helper-label">
              Người kí
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('signer')(event);
                fetchCertificate('signer')(event);
                validate('signer')(event);
              }}
              onBlur={event => {
                validate('signer')(event);
              }}
              value={values.signer}
            >
              {drawMenuItem(signer)}
            </Select>
            {errors.signer ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
          <FormControl className={classes.textField} error={errors.case}>
            <InputLabel id="demo-simple-select-helper-label">
              Loại xác nhận
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('case')(event);
                fetchCertificate('case')(event);
                validate('case')(event);
              }}
              onBlur={event => {
                validate('case')(event);
              }}
              value={values.case}
            >
              {drawMenuItem(CaseEnum)}
            </Select>
            {errors.case ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
          {values.case === CaseEnum.nh && (
            <FormControl className={classes.textField} error={errors.year}>
              <InputLabel id="demo-simple-select-helper-label">
                Năm học
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={event => {
                  handleChange('year')(event);
                  fetchCertificate('year')(event);
                  validate('year')(event);
                }}
                onBlur={event => {
                  validate('year')(event);
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
              {errors.year ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
            </FormControl>
          )}
          {values.case === CaseEnum.hk && (
            <>
              <FormControl className={classes.textField} error={errors.year}>
                <InputLabel id="demo-simple-select-helper-label">
                  Năm học
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={event => {
                    handleChange('year')(event);
                    fetchCertificate('year')(event);
                    validate('year')(event);
                  }}
                  onBlur={event => {
                    validate('year')(event);
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
                {errors.year ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
              </FormControl>
              <FormControl className={classes.textField} error={errors.semester}>
                <InputLabel id="demo-simple-select-helper-label">
                  Học kỳ
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={event => {
                    handleChange('semester')(event);
                    fetchCertificate('semester')(event);
                    validate('semester')(event);
                  }}
                  onBlur={event => {
                    validate('semester')(event);
                  }}
                  defaultValue={SemesterEnum.hk1}
                >
                  {drawMenuItem(SemesterEnum)}
                </Select>
                {errors.semester ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
              </FormControl>
            </>
          )}
          <div style={{ display: missingDataError ? "block" : "none", color: "red", marginLeft: 10 }}>Không có dữ liệu điểm rèn luyện!</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose();
            setErrors(defaultError);
            setValues(defaultValue);
          }} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={disableAdd}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDialog;
