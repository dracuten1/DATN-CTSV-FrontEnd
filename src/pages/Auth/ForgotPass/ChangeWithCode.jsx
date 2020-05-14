import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from 'reduxs/reducers/Authentication/action';
import history from 'historyConfig';
import '../Auth.css';

const useStyles = makeStyles(theme => ({
  root: {
    height: '90%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const ChangePass = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { open, handleClose, username } = props;

  const [values, setValues] = React.useState({
    password: '',
    code: '',
    showPassword: false
  });

  const handleClick = () => {
    dispatch(
      actions.changePassWhenForgot(username, values.code, values.password)
    );
    handleClose();
    history.push('/');
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <b>New Password</b>
        </DialogTitle>
        <div style={{ height: 20 }} />
        <DialogContent className={classes.container}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            style={{ width: '100%' }}
          >
            <InputLabel htmlFor="outlined-adornment-password">Code</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={values.code}
              onChange={handleChange('code')}
              labelWidth={70}
            />
          </FormControl>

          <div style={{ height: 20 }} />
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            style={{ width: '100%' }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleClick} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePass;
