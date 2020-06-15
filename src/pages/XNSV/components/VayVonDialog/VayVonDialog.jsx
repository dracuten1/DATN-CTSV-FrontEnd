import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
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

  const [values, setValues] = React.useState({
    cmnd: '',
    address: '',
    dien: '',
    doituong: '',
    thoigianratruong: date,
    date: moment(date).format('DD/MM/YYYY')
  });

  const dataThuocDien = ['Không miễn giảm', 'Giảm học phí', 'Miễn học phí'];
  const dataDoiTuong = ['Mồ côi', 'Không mồ côi'];

  const handleChange = prop => event => {
    const value = event.target ? event.target.value : event;
    setValues({ ...values, [prop]: value });
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

          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Thuộc diện
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('dien')}
            >
              {drawData(dataThuocDien)}
            </Select>
          </FormControl>

          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Thuộc đối tượng
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('doituong')}
            >
              {drawData(dataDoiTuong)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={() => {
            handleConfirm(values);
          }}
            color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VayVonDialog;
