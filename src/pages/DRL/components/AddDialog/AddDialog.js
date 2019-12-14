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
import moment from 'moment';
import DRLAction from 'reduxs/reducers/DRL/action';
import { useSelector, useDispatch } from 'react-redux';

import * as DRLHandler from 'handlers/DRLHandler';
import { logger } from 'core/services/Apploger';
import { valueOrEmpty } from 'core/ultis/stringUtil';
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
  }
}));

const AddDialog = props => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const { open, handleClose, handleAdd } = props;
  const date = new Date();


  const dispatch = useDispatch();

  const [values, setValues] = React.useState({
    stt: 3,
    name: '',
    mssv: '',
    dob: '',
    faculty: '',
    case: null,
    year: null,
    semester: null,
    isPrint: false,
    date: moment(date).format('DD/MM/YYYY')
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const addData = () => {
    handleAdd(values);
  };



  const findStudentInfoById = async event => {

    const id = event.target.value;

    const data = await DRLHandler.FindStudentInfoById(id);

    const resStudentInfo = data.Items[0];

    const studentInfo = {
      name: valueOrEmpty(resStudentInfo.Ten),
      mssv: valueOrEmpty(resStudentInfo.Mssv),
      faculty: valueOrEmpty(resStudentInfo.Nganh),
      dob: valueOrEmpty(resStudentInfo.NgSinh),
    };

    setValues(studentInfo);

  };


  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose()}
        aria-labelledby="form-dialog-title"
      >
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
              Trường hợp
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('case')}
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={4}>Toàn khoá</MenuItem>
              <MenuItem value={3}>Tất cả</MenuItem>
              <MenuItem value={2}>Năm học</MenuItem>
              <MenuItem value={1}>Năm học-học kỳ</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('year')}
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={3}>2019-2020</MenuItem>
              <MenuItem value={2}>2018-2019</MenuItem>
              <MenuItem value={1}>2017-2018</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">Học kỳ</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('semester')}
            >
              <MenuItem value={null}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Học kỳ 1</MenuItem>
              <MenuItem value={2}>Học kỳ 2</MenuItem>
            </Select>
          </FormControl>
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
