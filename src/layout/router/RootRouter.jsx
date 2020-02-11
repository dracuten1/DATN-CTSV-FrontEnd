import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
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