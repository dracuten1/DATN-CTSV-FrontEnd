import React from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import * as actions from 'reduxs/reducers/Authentication/action';
import { logger } from 'core/services/Apploger';
import * as AdminHandler from 'handlers/AdminHandler';
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
    backgroundColor: theme.palette.info.main,
    height: "100px",
    width: "100px",
    margin: theme.spacing(2),
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

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thay đổi thành công!'
  };
  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  const handleClick = async () => {
    try {
      const response = await AdminHandler.ChangePass(values.password);
      logger.info('AdminAction:: update: reponse: ', response);

      if (response.statusCode === 200) {
        setSnackBarValue(successSnackBar);
        dispatch(actions.logout());
        history.push('/');
      }
    } catch (error) {
      setSnackBarValue(errorSnackBar);
    }
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
    <Container component="main" maxWidth="xs" style={{ marginTop: '20vh' }}>
      <CssBaseline />
      <div className="paper">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ fontSize:'3.1875rem'}}/>
        </Avatar>
        <Typography component="h1" variant="h1" style={{ color: "#3285af" }}>
          Thay Đổi Mật Khẩu
        </Typography>
        <div style={{ height: 20 }} />
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" style={{width: "100%"}}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
        <div style={{ height: 20 }} />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
          onClick={handleClick}
        >
          Đổi Mật Khẩu
        </Button>
      </div>
      <CustomizedSnackbars
        value={snackBarValue}
        handleClose={handleSnackBarClose}
      />
    </Container>
  );
};

export default ChangePass;
