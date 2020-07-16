import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import Actions from '../../../../reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';

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
    width: '95%',
    alignSelf: 'center'
  }
}));

const VayVonDialog = props => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const { open, handleClose, handleConfirm, CMNDInfo } = props;
  const date = new Date();
  const defaultError = {
    dien: false,
    doituong: false,
  }
  const [errors, setErrors] = React.useState(defaultError);
  const defaultValue = {
    cmnd: '',
    address: '',
    dien: '',
    doituong: '',
    thoigianratruong: date,
    date: moment(date).format('DD/MM/YYYY')
  }
  const [values, setValues] = React.useState(defaultValue);

  const dataThuocDien = ['Không miễn giảm', 'Giảm học phí', 'Miễn học phí'];
  const dataDoiTuong = ['Mồ côi', 'Không mồ côi'];

  const handleChange = prop => event => {
    const value = event.target ? event.target.value : event;
    setValues({ ...values, [prop]: value });
  };
  const validate = prop => event => {
    const value = event.target ? event.target.value : event;
    logger.info(`Validate ${prop}:${value}`);
    if (value === '' || value === null || value === undefined)
      setErrors({ ...errors, [prop]: true });
    else
      setErrors({ ...errors, [prop]: false });
  }

  const drawData = data => {
    return data.map((val, ind) => {
      return (
        <MenuItem key={ind} value={val}>
          {val}
        </MenuItem>
      );
    });
  };
  const validateVayvon = () => {
    let valid = {}
    Object.keys(values).forEach(elem => {
      if (['dien', 'doituong'].includes(elem) && ['', null, undefined].includes(values[elem])) {
        valid = { ...valid, [elem]: true };
      }
    })
    setErrors({ ...errors, ...valid })
    return Object.keys(valid).length === 0
  }

  const handleSubmit = () => {
    const isValid = validateVayvon();
    if (isValid) {
      handleConfirm(values);
      setErrors(defaultError);
      setValues(defaultValue);
    }
  }

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <b>Xác Nhận Vay Vốn</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            className={classes.textField}
            label="CMND"
            defaultValue={CMNDInfo.CMND}
            margin="normal"
            disabled
          />
          <TextField
            className={classes.textField}
            label="Nơi cấp"
            margin="normal"
            defaultValue={CMNDInfo.NoiCapCMND}
            disabled
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Ngày cấp"
              style={{ width: '400px', marginLeft: '8px' }}
              format="dd/MM/yyyy"
              value={moment(CMNDInfo.NgayCapCMND, "DD/MM/YYYY")}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              disabled
            />
          </MuiPickersUtilsProvider>
          <Divider className={classes.divider} />
          <FormControl className={classes.textField}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Thời gian ra trường"
                format="dd/MM/yyyy"
                value={values.thoigianratruong}
                onChange={handleChange('thoigianratruong')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

          <FormControl className={classes.textField} error={errors.dien}>
            <InputLabel id="demo-simple-select-helper-label">
              Thuộc diện
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('dien')(event);
                validate('dien')(event);
              }}
              onBlur={event => {
                validate('dien')(event);
              }}
            >
              {drawData(dataThuocDien)}
            </Select>
            {errors.dien ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>

          <FormControl className={classes.textField} error={errors.doituong}>
            <InputLabel id="demo-simple-select-helper-label">
              Thuộc đối tượng
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={event => {
                handleChange('doituong')(event);
                validate('doituong')(event);
              }}
              onBlur={event => {
                validate('doituong')(event);
              }}
            >
              {drawData(dataDoiTuong)}
            </Select>
            {errors.doituong ? <FormHelperText>Bắt buộc</FormHelperText> : <></>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose();
            setErrors(defaultError);
            setValues(defaultValue);
          }} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSubmit}
            color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VayVonDialog;
