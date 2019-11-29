import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import VayVonDialog from 'pages/XNSV/VayVonDialog/VayVonDialog';
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

const XNTruocKhiThemDialog = props => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  const { open, handleClose } = props;
  const date = new Date();

  const [isOpen, setIsOpen] = React.useState(true);
  const [values, setValues] = React.useState({
    stt: 3,
    name: '',
    mssv: '',
    city: '',
    district: '',
    ward: '',
    language: '',
    type: '',
    status: '',
    reason: '',
    semester: null,
    year: '',
    isPrint: false,
    date: moment(date).format('DD/MM/YYYY')
  });

  const dataLXNTV = [
    'Bảo lưu',
    'Đang học',
    'Chờ xét HTCT',
    'Chờ xét TN',
    'Hoàn tất CT',
    'Xác nhận TGH',
    'Giới thiệu',
    'Vay vốn'
  ];
  const dataLXNTA = ['Đang học', 'Bảo lưu', 'Xác nhận TGH', 'Hoàn tất CT'];

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
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
      <Dialog
        open={open}
        // onClose={handleClose()}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <b>Xác Nhận Trước Khi In</b>
        </DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            className={classes.textField}
            label="MSSV"
            defaultValue="1612123"
            onChange={handleChange('mssv')}
            margin="normal"
          />
          <TextField
            className={classes.textField}
            label="Họ tên"
            margin="normal"
            defaultValue="Nguyễn Quốc Dũng"
            onChange={handleChange('name')}
            InputProps={{
              readOnly: true
            }}
          />
          <Divider className={classes.divider} />
          <TextField
            className={classes.textField}
            label="Tỉnh/Thành phố"
            margin="normal"
            defaultValue="Hồ Chí Minh"
            onChange={handleChange('city')}
          />
          <TextField
            className={classes.textField}
            label="Quận (huyện)"
            margin="normal"
            defaultValue="Nhà Bè"
            onChange={handleChange('district')}
          />
          <TextField
            className={classes.textField}
            label="Phường (xã)"
            margin="normal"
            defaultValue="Phước Kiển"
            onChange={handleChange('ward')}
          />
          <TextField
            className={classes.textField}
            label="Địa chỉ"
            margin="normal"
            defaultValue="336/1 Phạm Hữu Lầu"
            onChange={handleChange('address')}
          />

          <Divider className={classes.divider} />
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Ngôn ngữ
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('language')}
            >
              <MenuItem value="Tiếng Việt">Tiếng Việt</MenuItem>
              <MenuItem value="Tiếng Anh">Tiếng Anh</MenuItem>
            </Select>
          </FormControl>

          {values.language === 'Tiếng Việt' && (
            <FormControl className={classes.textField}>
              <InputLabel id="demo-simple-select-helper-label">
                Loại xác nhận
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange('type')}
              >
                {drawData(dataLXNTV)}
              </Select>
            </FormControl>
          )}
          {values.language === 'Tiếng Anh' && (
            <FormControl className={classes.textField}>
              <InputLabel id="demo-simple-select-helper-label">
                Loại xác nhận
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleChange('type')}
              >
                {drawData(dataLXNTA)}
              </Select>
            </FormControl>
          )}
          <Divider className={classes.divider} />
          {values.type === 'Vay vốn' && (
            <VayVonDialog handleClose={() => setIsOpen(false)} open={isOpen} />
          )}
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Tình trạng
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('status')}
            >
              {drawData(dataLXNTA)}
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">Lý do</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('reason')}
            >
              {drawData(dataLXNTA)}
            </Select>
          </FormControl>
          <Divider className={classes.divider} />

          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">
              Năm học
            </InputLabel>
            <Select
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
          <FormControl className={classes.textField}>
            <InputLabel id="demo-simple-select-helper-label">Học kỳ</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={handleChange('semester')}
            >
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
          <Button color="primary">Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default XNTruocKhiThemDialog;
