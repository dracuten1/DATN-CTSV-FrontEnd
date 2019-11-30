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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
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

export default function CustomizedDialogs(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const { open, handleClose } = props;

  return (
    <div>
      {/* <Button
        variant="contained"
        className={classes.button}
        onClick={handleClickOpen}
      >
        Xuất
      </Button> */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Export xác nhận sinh viên
        </DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent className={classes.groupContent}>
          <div>
            <span>Chọn định dạng xuất file</span>
            &nbsp;&nbsp;
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="xlsx"
            />
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="xsv"
            />
            <TextField
              id="outlined-textarea"
              label="Chọn nơi lưu trữ"
              className={classes.textField}
              variant="outlined"
              style={{ width: 500, height: 70 }}
            />
            <Button variant="contained">Chọn file</Button>
          </div>
        </DialogContent>
        <Divider className={classes.divider} />
        <DialogContent className={classes.groupContent}>
          <List>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" value="gilad" checked />}
                label="MSSV"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked value="jason" />}
                label="Họ và tên"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="antoine" checked />}
                label="Loại giấy xác nhận"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="gilad" checked />}
                label="Lý do"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="jason" checked />}
                label="Địa chỉ"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="antoine" checked />}
                label="Học kỳ"
              />
              <FormControlLabel
                control={<Checkbox color="primary" value="antoine" checked />}
                label="Năm học"
              />
            </FormGroup>
          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Xuất
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
