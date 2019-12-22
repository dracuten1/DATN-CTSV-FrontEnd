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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import VayVonDialog from 'pages/XNSV/components/VayVonDialog/VayVonDialog';
import ThucTapDialog from 'pages/XNSV/components/ThucTapDialog/ThucTapDialog';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from 'shared/components/textfield/TextField';

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
    width: '90%',
    alignSelf: 'center'
  }
}));

const date = new Date();

const tempValues = {
  stt: 3,
  name: '',
  mssv: '',
  city: '',
  district: '',
  ward: '',
  address: '',
  language: '',
  type: '',
  status: '',
  reason: '',
  semester: null,
  year: '',
  isPrint: false,
  date: moment(date).format('DD/MM/YYYY')
};

const XNTruocKhiThemDialog = props => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const { open, handleClose, handleAdd } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [values, setValues] = React.useState(tempValues);

  const dataLXNTV = [
    'Bảo lưu',
    'Đang học',
    'Chờ xét hoàn tất chương trình',
    'Chờ xét tốt nghiệp',
    'Hoàn tất chương trình',
    'Xác nhận thời gian học',
    'Giới thiệu',
    'Vay vốn'
  ];
  const dataLXNTA = ['Đang học', 'Bảo lưu', 'Xác nhận thời gian học', 'Hoàn tất chương trình'];

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    setIsOpen(true);
  };

  const drawData = data => {
    return data.map((val, ind) => {
      return (
        <MenuItem key={ind} value={val} >
          {val}
        </MenuItem>
      );
    });
  };

  const closeDialog = () => {
    setValues(tempValues);
    setIsOpen(false);
    handleClose();
  };

  const addData = () => {
    handleAdd(values);
  };

  const info = [
    {
      label: "MSSV",
      defaultValue: "1612102",
      state: "mssv",
    },
    {
      label: "Họ tên",
      defaultValue: "Nguyen Van A",
      state: "name",
    },
    "devider",
    {
      label: "Tỉnh/Thành phố",
      defaultValue: "Hồ Chí Minh",
      state: "city",
    },
    {
      label: "Quận (huyện)",
      defaultValue: "Nhà Bè",
      state: "district",
    },
    {
      label: "Phường (xã)",
      defaultValue: "Phước Kiển",
      state: "ward",
    },
    {
      label: "Địa chỉ",
      defaultValue: "336/1 Phạm Hữu Lầu",
      state: "address",

    }
  ];

  return (
    <div>
      <Dialog
        open={open}
        // onClose={handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <b>Xác Nhận Trước Khi In</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          {
            info.map(item => {
              if (item === "devider") {
                return (<Divider className={classes.divider} />);
              }
              return (
              <TextField
                label={item.label}
                defaultValue={item.defaultValue}
                onBlur={handleChange(item.state)}
                margin="normal"

              />
              );
            })
          }
          <Divider className={classes.divider} />
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Ngôn ngữ
            </InputLabel>
            <Select
              variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('language')}
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
                variant="outlined"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange('type')}
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
                variant="outlined"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange('type')}
              >
                {drawData(dataLXNTA)}
              </Select>
            </FormControl>
          )}
          {values.type === 'Vay vốn' && (
            <VayVonDialog
              handleClose={() => {
                setIsOpen(false);
                setValues({ ...values, type: '' });
              }}
              open={isOpen}
            />
          )}
          {values.type === 'Giới thiệu' && (
            <ThucTapDialog
              handleClose={() => {
                setIsOpen(false);
                setValues({ ...values, type: '' });
              }}
              open={isOpen}
            />
          )}
          {values.type === 'Bảo lưu' && (
            <div className={classes.container}>
              <FormControl className={classes.textField} margin="normal">
                <InputLabel id="demo-simple-select-helper-label" >
                  Năm học
                </InputLabel>
                <Select
                  variant="outlined"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={handleChange('year')}
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
                  variant="outlined"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  onChange={handleChange('semester')}
                >
                  <MenuItem value={1}>Học kỳ 1</MenuItem>
                  <MenuItem value={2}>Học kỳ 2</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {values.type === 'Chờ xét TN' && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Chọn ngày công bố dự kiến"
                format="dd/MM/yyyy"
                value={date}
                style={{ width: '400px', marginLeft: '8px' }}
                onChange={handleChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          {values.type === 'Chờ xét HTCT' && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Chọn ngày công bố dự kiến"
                format="dd/MM/yyyy"
                value={date}
                style={{ width: '400px', marginLeft: '8px' }}
                onChange={handleChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          )}
          {values.type === 'Đang học' && (
            <div className={classes.container}>
              <Divider className={classes.divider} />

              <TextareaAutosize
                style={{ width: '400px', marginLeft: '8px' }}
                rowsMax={3}
                placeholder="Ghi chú"
              />
            </div>
          )}
          {values.type === 'Hoàn tất CT' && (
            <div className={classes.container}>
              <Divider className={classes.divider} />

              <TextareaAutosize
                style={{ width: '400px', marginLeft: '8px' }}
                rowsMax={3}
                placeholder="Ghi chú"
              />
            </div>
          )}
          {values.type === 'Xác nhận TGH' && (
            <div className={classes.container}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Từ ngày"
                  format="dd/MM/yyyy"
                  value={date}
                  style={{ width: '400px', marginLeft: '8px' }}
                  onChange={handleChange('date')}
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
                  onChange={handleChange('date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          )}
          <Divider className={classes.divider} />
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">
              Tình trạng
            </InputLabel>
            <Select
              variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('status')}
            >
              {drawData(dataLXNTA)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField} margin="normal">
            <InputLabel id="demo-simple-select-helper-label">Lý do</InputLabel>
            <Select
              variant="outlined"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('reason')}
            >
              {drawData(dataLXNTA)}
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
          <Button onClick={addData} color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default XNTruocKhiThemDialog;
