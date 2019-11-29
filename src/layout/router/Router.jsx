import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
import StudentCertification from 'pages/XNSV/studentCertification/StudentCertification';
import DashboardDRL from 'pages/DRL/DashboardDRL';

class Routers extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={themeUI}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <StudentCertification />
            </Route>
            <Route exact path="/drl">
              <DashboardDRL />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default Routers;
