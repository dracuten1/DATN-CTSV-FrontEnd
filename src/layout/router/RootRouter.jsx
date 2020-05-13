import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
import ForgotPass from 'pages/Auth/ForgotPass/ForgotPass';
import AuthV2 from 'pages/Auth/Auth.v2';
import LeftPanel from 'layout/leftPanel/LeftPanel';
import store from 'store';

class RootRouter extends React.PureComponent {
    render() {
        return (
            <ThemeProvider theme={themeUI}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <AuthV2 />
                        </Route>
                        <Route exact path="/forgotpass">
                            <ForgotPass />
                        </Route>
                        <Route exact >
                            <LeftPanel />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

const ProtectRoute = () => {
    const { cognitoUser, forgotPassword } = store.getState().auth;

    if (cognitoUser === null) {
        if (forgotPassword) {
            history.push('/forgotpass');
        }
        else {
            history.push('/');
        }
    }
    else {
        history.push('/dashboard')
    }
    return (<RootRouter />);
};

export default ProtectRoute;
