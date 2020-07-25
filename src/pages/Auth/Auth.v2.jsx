import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import * as actions from 'reduxs/reducers/Authentication/action';
import { LinearProgress, CardMedia } from '@material-ui/core';
import history from 'historyConfig';
import './Auth.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.fit.hcmus.edu.vn/vn/">
        FIT@HCMUS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      showPassword: false,
      newpassword: '',
      confirmPassword: '',
      errorMsg: '',
      resetpasswordloading: false
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { username, password } = this.state;
    const { onAuth } = this.props;
    onAuth(username, password);
  };

  resetPassword = (event) => {
    event.preventDefault();
    this.setState({
      resetpasswordloading: true
    });
    const { username, newpassword, confirmPassword } = this.state;
    if (newpassword !== confirmPassword) {
      this.setState({ 
        errorMsg: 'Mật khẩu mới không khớp.',
        resetpasswordloading: false,
      });
    }
    else if (newpassword.length<8) {
      this.setState({ 
        errorMsg: 'Mật khẩu phải dài tối thiểu 8 ký tự.',
        resetpasswordloading: false,
      });
    }
    else {

      this.setState({ errorMsg: '' });
      const { onSetNewPassword, onAuth } = this.props;
      onSetNewPassword(newpassword);
      onAuth(username, newpassword);

    }
  };

  render() {


    const { resetPassword } = this.props;
    if (resetPassword) {

      return (

        <Container component="main" maxWidth="xs" style={{ marginTop: '20vh' }}>
          <div
            style={{
              height: 10,
              width: '100vw',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <LinearProgress
              style={{ display: this.state.errorMsg === '' ? 'none' : (this.state.resetpasswordloading ? 'block' : 'none') }}
            />
          </div>
          <CssBaseline />
          <div className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đổi mật khẩu
          </Typography>
            <form className="form" noValidate style={{ whiteSpace: "normal" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="newpassword"
                label="Mật khẩu mới"
                type="password"
                autoFocus
                value={this.state.newpassword || ''}
                onChange={event => {
                  this.setState({ newpassword: event.target.value });
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirm-password"
                label="Nhập lại mật khẩu mới"
                type="password"
                id="confirm-password"
                value={this.state.confirmPassword}
                onChange={event => {
                  this.setState({ confirmPassword: event.target.value });
                }}
              />
              {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
              <div style={{ color: "red" }}>{this.state.errorMsg}</div>
              <div style={{ height: 20 }} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={this.resetPassword}
              >
                Đổi mật khẩu
            </Button>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )
    }
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '10vh' }}>
        <div
          style={{
            height: 10,
            width: '100vw',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <LinearProgress
            style={{ display: this.props.error ? 'none' : (this.state.loading ? 'block' : 'none') }}
          />
        </div>
        <CssBaseline />
        <div className="paper">
          <CardMedia src={`https://i.ibb.co/SmtZZc6/logo-khtn.png`} style={{ marginBottom: 20 }} component="img">
          </CardMedia>
          <Typography component="h1" variant="h3" style={{ fontWeight: 600 }}>
            ĐĂNG NHẬP
          </Typography>
          <form className="form" noValidate style={{ whiteSpace: 'normal' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Tên đăng nhập"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.username}
              onChange={event => {
                this.setState({ username: event.target.value });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
            {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
            <div style={{ color: "red" }}>{this.props.error ? this.props.error.message : ""}</div>
            <div style={{ height: 20 }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.handleClick}
            >
              Đăng nhập
            </Button>
            <Grid container>
              <Grid item lg={12} md={12} xl={12} xs={12} style={{ textAlign: "center" }}>
                <Link component="button" variant="body2" onClick={() => {
                  const { onForgotPass } = this.props;
                  onForgotPass();
                  history.push('/forgotpass');
                }}>
                  Quên mật khẩu?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
//a..

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    resetPassword: state.auth.resetPassword,
    authRedirectPath: state.auth.authRedirectPath,
    cognitoUser: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onForgotPass: () => dispatch(actions.forgotPass()),
    onSetNewPassword: password => dispatch(actions.handleNewPassword(password)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/dashboard'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
