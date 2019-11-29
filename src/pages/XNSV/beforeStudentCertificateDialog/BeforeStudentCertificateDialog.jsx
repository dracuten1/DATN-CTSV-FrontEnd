/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextFieldWithLabel from '../../../shared/components/textFieldWithLabel/TextFieldWithLabel';
import InputDateWithLabel from '../../../shared/components/inputDateWithLabel/InputDateWithLabel';
import Filter from '../../../shared/components/filter/Filter';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 'fit-content'
  },
  select: {
    padding: 10,
    paddingRight: 35
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  groupContent: {
    display: 'flex',
    flexDirection: 'row'
  },
  divider: {
    width: '95%',
    alignSelf: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
  const dataNgonNgu = ['Tiếng Việt', 'Tiếng Anh'];
  const [NgonNgu, setNgonNgu] = React.useState(0);
  const handleChangeNgonNgu = event => {
    setNgonNgu(event.target.value);
  };

  const [LXN, setLXN] = React.useState(0);
  const handleChangeLXN = event => {
    setLXN(event.target.value);
  };

  const drawData = data => {
    return data.map((val, ind) => {
      return (
        <MenuItem key={ind} value={ind}>
          {val}
        </MenuItem>
      );
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Thêm
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Xác nhận trước khi thêm
        </DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent className={classes.groupContent}>
          <TextFieldWithLabel label="MSSV" />
          <TextFieldWithLabel label="Họ và tên" />
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}
          >
            <span>Tỉnh huyện</span>
            <Filter data={['HCM', 'Ha Noi']} />
            <Filter data={['Thi xa Dien Ban', 'Cam Ranh', 'Nha Trang']} />
            <Filter data={['Linh Van', 'Cam Linh']} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}
          >
            <span>Số nhà</span>
            <TextFieldWithLabel />
          </div>
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogContent>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>
              Ngôn ngữ
            </span>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={NgonNgu}
                onChange={handleChangeNgonNgu}
                inputProps={{ className: classes.select }}
              >
                {drawData(dataNgonNgu)}
              </Select>
            </FormControl>
            {dataNgonNgu[NgonNgu] === 'Tiếng Việt' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>
                  Loại xác nhận
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={LXN}
                    onChange={handleChangeLXN}
                    inputProps={{ className: classes.select }}
                  >
                    {drawData(dataLXNTV)}
                  </Select>
                </FormControl>
              </div>
            )}
            {dataNgonNgu[NgonNgu] === 'Tiếng Anh' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>
                  Loại xác nhận
                </span>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                    value={LXN}
                    onChange={handleChangeLXN}
                    inputProps={{ className: classes.select }}
                  >
                    {drawData(dataLXNTA)}
                  </Select>
                </FormControl>
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between'
            }}
          >
            <Filter label="Tình trạng" data={['Đang học']} />
            <Filter label="Lý do " data={['Xin việc làm', 'Thực tập']} />
          </div>
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogContent className={classes.groupContent}>
          {dataLXNTV[LXN] === 'Chờ xét HTCT' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <span>Chọn ngày công bố dự kiến</span>
              <InputDateWithLabel />
            </div>
          )}
          {dataLXNTV[LXN] === 'Vay vốn' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <TextFieldWithLabel label="CMND" />
                <InputDateWithLabel label="Ngày cấp" />
                <TextFieldWithLabel label="Nơi cấp" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span>Chọn thuộc diện</span>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Không MG"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Giảm HP"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Miễn HP"
                />
              </div>
              <br />
              <div>
                <span>Chọn đối tượng</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Mồ côi"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Không mồ côi"
                />
              </div>
            </div>
          )}
          {dataLXNTV[LXN] === 'Giới thiệu' && (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <TextFieldWithLabel label="Tên Công Ty" />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span>Tỉnh huyện</span>
                <Filter data={['HCM', 'Ha Noi']} />
                <Filter data={['Thi xa Dien Ban', 'Cam Ranh', 'Nha Trang']} />
                <Filter data={['Linh Van', 'Cam Linh']} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <span>Số địa chỉ</span>
                <TextFieldWithLabel />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}
              >
                <InputDateWithLabel label="Giá trị đến ngày" />
              </div>
            </div>
          )}
          {dataLXNTV[LXN] === 'Bảo lưu' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <TextFieldWithLabel label="Học Kỳ" />
              <TextFieldWithLabel label="Năm Học" />
            </div>
          )}
          {dataLXNTV[LXN] === 'Chờ xét TN' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <span>Chọn ngày công bố dự kiến</span>
              <InputDateWithLabel />
            </div>
          )}
          {dataLXNTV[LXN] === 'Xác nhận TGH' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <InputDateWithLabel label="Từ ngày" />
              <InputDateWithLabel label="Đến ngày" />
            </div>
          )}
          {dataLXNTV[LXN] === 'Hoàn tất CT' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <TextFieldWithLabel label="Ghi chú" />
            </div>
          )}
          {dataLXNTV[LXN] === 'Đang học' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between'
              }}
            >
              <TextFieldWithLabel label="Ghi chú" />
            </div>
          )}
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
