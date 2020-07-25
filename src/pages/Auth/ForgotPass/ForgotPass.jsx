import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import * as actions from 'reduxs/reducers/Authentication/action';
import { LinearProgress } from '@material-ui/core';
import history from 'historyConfig';
import ChangWithCode from './ChangeWithCode';
import '../Auth.css';

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

class ForgotPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      open: false
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      open: true
    });
    const { email } = this.state;
    const { onReset, onSetAuthRedirectPath } = this.props;
    onReset(email);
    onSetAuthRedirectPath();
  };

  render() {
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
            style={{ display: this.state.loading ? 'block' : 'none' }}
          />
        </div>
        <CssBaseline />
        <div className="paper">
          <Avatar
            style={{
              backgroundColor: '#1e88e5',
              height: '100px',
              width: '100px',
              margin: '1rem'
            }}
          >
            <HelpOutlineIcon style={{ fontSize: '4.1875rem' }} />
          </Avatar>
          <Typography component="h1" variant="h1" style={{ color: '#3285af' }}>
            Quên Mật Khẩu
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
            />
            <div style={{ height: 20 }} />

            <Grid container spacing={4}>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.handleClick}
                >
                  Gửi Mail
                </Button>
              </Grid>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={() => {
                    const { onForgotPassSuccess } = this.props;
                    onForgotPassSuccess();
                    history.push('/');
                  }}
                >
                  Đăng Nhập
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <ChangWithCode
          username={this.state.email}
          open={this.state.open}
          handleClose={() => this.setState({ open: false })}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReset: email => dispatch(actions.resetPassword(email)),
    onForgotPassSuccess: () => dispatch(actions.forgotPassSuccess()),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass);
