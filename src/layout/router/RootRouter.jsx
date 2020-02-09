import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
import StudentCertification from 'pages/XNSV/studentCertification/StudentCertification';
import DashboardDRL from 'pages/DRL/DashboardDRL';
import Auth from 'pages/Auth/Auth';
import Dashboard from 'pages/Dashboard/Dashboard';
import Routers from 'layout/router/Router';
import LeftPanel from 'layout/leftPanel/LeftPanel';
import store from 'store';

class RootRouter extends React.PureComponent {
    render() {
        return (
            <ThemeProvider theme={themeUI}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/">
                            <Auth />
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


    const { cognitoUser } = store.getState().auth;

    if (cognitoUser === null) {
        history.push('/');
    }
    return (<RootRouter />);
};

export default ProtectRoute;
