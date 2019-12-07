import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import * as actions from 'reduxs/reducers/Authentication/action';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            confirmPassword: '',
            errorMsg: '',
            //verifycationCode: null,
        };
    };

    handleClick = () => {
        const { username, password } = this.state;
        const { onAuth } = this.props;
        onAuth(username, password);
    };

    resetPassword = () => {
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            this.setState({ errorMsg: 'Mật khẩu mới không trùng khớp' });
            return;
        }
        this.setState({ errorMsg: '' });
        const { onSetNewPassword } = this.props;
        onSetNewPassword(password);
    };

    render() {
        const classes = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            margin: {
                margin: theme.spacing(1),
            },
            withoutLabel: {
                marginTop: theme.spacing(3),
            },
            textField: {
                width: 200,
            },
        }));
        const { username, password, showPassword, confirmPassword, errorMsg } = this.state;
        let errorMessage = null;
        const { error, isAuthenticated, authRedirectPath, loading, resetPassword } = this.props;
        if (error) {
            errorMessage = (
                <p>{error.message}</p>
            );
        }
        if (errorMsg !== '') {
            errorMessage = (
                <p>{errorMsg}</p>
            );
        }
        let authRedirect = null;
        if (isAuthenticated) {
            authRedirect = <Redirect to={authRedirectPath} />;
        }
        let form = null;
        if (loading) {
            form = <CircularProgress />;
        } else if (resetPassword) {
            form = <div className={classes.root}>
                <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="new-password">Mật khẩu mới</InputLabel>
                    <Input
                        id="new-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => { this.setState({ password: event.target.value }); }}

                    />
                </FormControl>
                <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="confirm-password">Nhập lại mật khẩu</InputLabel>
                    <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(event) => { this.setState({ confirmPassword: event.target.value }); }}
                    />
                </FormControl>
                <Button className={classes.margin} variant="outlined" onClick={this.resetPassword} >Xác nhận</Button>
            </div>;
        } else
            form =
                <div className={classes.root}>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="username">Tên đăng nhập</InputLabel>
                        <Input
                            id="username"
                            value={username}
                            onChange={(event) => { this.setState({ username: event.target.value }); }
                            }
                        />
                    </FormControl>;
                <FormControl fullWidth className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => { this.setState({ password: event.target.value }); }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => this.setState({ showPassword: !showPassword })}
                                    // onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button className={classes.margin} variant="outlined" onClick={this.handleClick} >Đăng nhập</Button>
                </div>;
        return (
            <div>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }
};



const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        resetPassword: state.auth.resetPassword,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetNewPassword: (password) => dispatch(actions.handleNewPassword(password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);