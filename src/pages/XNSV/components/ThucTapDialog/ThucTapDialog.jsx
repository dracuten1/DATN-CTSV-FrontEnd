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

const ThucTapDialog = props => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const { open, handleClose } = props;
  const date = new Date();

  const [values, setValues] = React.useState({
    nameComp: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    date: moment(date).format('DD/MM/YYYY')
  });

  const dataThanhPho = ['TPHCM', 'Vung Tau', 'Da Nang'];
  const dataHuyen = ['Quan 7', 'Nha Be', 'Quan 5'];
  const dataXa = ['Thang Nhat', 'Thang Nhi', 'Thang Tam'];

  const drawData = data => {
    return data.map((val, ind) => {
      return (
        <MenuItem key={ind} value={val}>
          {val}
        </MenuItem>
      );
    });
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <b>Xác Nhận Công Ty</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            className={classes.textField}
            label="Tên công ty"
            defaultValue="Boash"
            onChange={handleChange('nameComp')}
            margin="normal"
          />
          <Divider className={classes.divider} />

          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Tỉnh/Thành Phố
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('city')}
            >
              {drawData(dataThanhPho)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Quận/Huyện
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('district')}
            >
              {drawData(dataHuyen)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Phường/Xã
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('ward')}
            >
              {drawData(dataXa)}
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            label="Địa chỉ"
            margin="normal"
            defaultValue="336/1 Phạm Hữu Lầu"
            onChange={handleChange('address')}
          />
          <Divider className={classes.divider} />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Giá trị đến ngày"
              format="dd/MM/yyyy"
              value={date}
              onChange={handleChange('date')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <Divider className={classes.divider} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button color="primary">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ThucTapDialog;
