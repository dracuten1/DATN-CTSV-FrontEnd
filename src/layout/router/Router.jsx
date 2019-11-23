
import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import history from 'historyConfig';
import StudentCertification from 'pages/studentCertification/StudentCertification';
import DashboardDRL from 'pages/DRL/DashboardDRL';


class Routers extends React.PureComponent {

    render() {
        return (
            <Router history={history}>
                <Switch >
                    <Route exact path="/">
                        <StudentCertification />
                    </Route>
                    <Route exact path="/drl">
                        <DashboardDRL />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default (Routers);
