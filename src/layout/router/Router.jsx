
import React from 'react';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import history from 'historyConfig';
import StudentCertification from 'pages/studentCertification/StudentCertification';



class Routers extends React.PureComponent {

    render() {
        return (
            <Router history={history}>
                <Switch >
                    <Route exact path="/">
                        <StudentCertification />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default (Routers);
