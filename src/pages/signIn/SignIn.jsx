/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
// import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// import logo from 'shared/images/minilogo.png';

import history from 'historyConfig';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Copyright ©
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = {
    '@global': {
        body: {
            backgroundColor: "white",
        },
    },
    paper: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '8px'
    },
    submit: {
        marginTop: '16px',
        marginBottom: '28px',
    },
    signup: {
        color: '#3f51b5',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    }
};

class SignIn extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            // firstLogin: true,
        };
    }

    handleFormSubmition = (event) => {
        event.preventDefault();
        const { signIn, userState } = this.props;
        const { username, password } = this.state;
        signIn(username, password);
        const { isSignIn } = userState;
        if (!isSignIn) {
            // this.setState({ firstLogin: false });
        }
    }


    render() {
        const { classes } = this.props;
        // const { firstLogin } = this.state;
        // const { isSignIn } = userState;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
        </Typography>
                    <form className={classes.form} onSubmit={this.handleFormSubmition}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={event => { this.setState({ username: event.target.value }); }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={event => { this.setState({ password: event.target.value }); }}
                        />
                        {false &&
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        }
                        {/* {(!firstLogin && !isSignIn ) &&
                            <span style={{ color: "red" }}>The username or password have entered is incorrect.
                            </span>
                        } */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" variant="body2">
                                    Forgot password?
              </Link>
                            </Grid>
                            <Grid item>
                                <span className={classes.signup} onKeyPress={() => { }} onClick={() => { history.push('/signup'); }} variant="body2">
                                    Don&apos;t have an account? Sign Up
                                </span>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container >
        );
    }
}



export default ((withStyles(useStyles)(SignIn)));