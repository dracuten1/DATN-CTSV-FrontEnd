import React from 'react';
// import { connect } from 'react-redux';
import SignIn from 'pages/signIn/SignIn';
import LeftPanel from 'pages/leftPanel/LeftPanel';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';

import history from 'historyConfig';


class App extends React.PureComponent {

    render() {
        return (
            <div >
                <LeftPanel />
                <Router history={history}>
                    <Switch >
                        <Route exact path="/">
                            <SignIn />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         moveHistory: state.HistoryState.moveHistory,
//     };
// };

// const mapDispatchToProps = {
// };

export default (App);
