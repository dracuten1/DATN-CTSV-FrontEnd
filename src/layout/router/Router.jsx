import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
import StudentCertification from 'pages/XNSV/studentCertification/StudentCertification';
import DashboardDRL from 'pages/DRL/DashboardDRL';
import Auth from 'pages/Auth/Auth';
import Dashboard from 'pages/Dashboard/Dashboard';

class Routers extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={themeUI}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Auth />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/drl">
              <DashboardDRL />
            </Route>
            <Route exact path="/xnsv">
              <StudentCertification />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default Routers;
