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
import { LinearProgress } from '@material-ui/core';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import '../Auth.css';

const successSnackBar = {
  open: true,
  type: 'success',
  message: 'Thay đổi password thành công!'
};

const errorSnackBar = {
  open: true,
  type: 'error',
  message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
};

class ChangePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      oldPass: '',
      newPass: '',
      loading: false,
      open: false
    };
  }

  handleClick = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { username, oldPass, newPass } = this.state;
    const { changePass } = this.props;
    changePass(username, oldPass, newPass);
  };

  render() {
    const {error} = this.props;
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: '20vh' }}>
        {/* {error ? <CustomizedSnackbars value={errorSnackBar} handleClose={() => this.setState({open: false})}/> : '' } */}
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
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <form className="form" noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="email"
              // autoComplete="email"
              autoFocus
              onChange={event => {
                this.setState({ username: event.target.value });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="oldPass"
              label="Old Password"
              name="oldPass"
              type="password"
              autoComplete="current-password"
              autoFocus
              onChange={event => {
                this.setState({ oldPass: event.target.value });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPass"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => {
                this.setState({ newPass: event.target.value });
              }}
            />
            <div style={{ height: 20 }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.handleClick}
            >
              Update Password
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}
//a..

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePass: (username, oldPass, newPass) =>
      dispatch(actions.ChangePass(username, oldPass, newPass))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
