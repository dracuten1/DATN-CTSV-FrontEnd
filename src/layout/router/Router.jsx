import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import history from 'historyConfig';
import themeUI from 'shared/styles/theme';
import StudentCertification from 'pages/XNSV/studentCertification/StudentCertification';
import DashboardDRL from 'pages/DRL/DashboardDRL';
import Dashboard from 'pages/Dashboard/Dashboard';
import ChangePass from 'pages/Auth/ChangePass/ChangePass';
import DashboardHSSV from 'pages/HSSV/DashboardHSSV';
import DashboardQLLT from 'pages/QLLT/DashboardQLLT';
import DashboardTTSV from 'pages/TTSV/DashboardTTSV';
import DashboardQLHB from 'pages/QLHB/DashboardHB';
import DashboardQLBH from 'pages/QLBH/DashboardBH';
// import DashboardSHCD from 'pages/SHCD/DashboardSHCD';
// import DashboardKTKL from 'pages/KT_KL/DashboardKTKL';
import DashboardCDCS from 'pages/CDCS/DashboardCDCS';
import DashboardSigners from 'pages/UserList/index';
import DashboardAdminUsers from 'pages/AdminUserList/index';
import store from 'store';

class Routers extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={themeUI}>
        <Router history={history}>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/changepassword">
              <ChangePass />
            </Route>
            <Route exact path="/drl">
              <DashboardDRL />
            </Route>
            <Route exact path="/xnsv">
              <StudentCertification />
            </Route>
            <Route exact path="/hssv">
              <DashboardHSSV />
            </Route>
            <Route exact path="/qlhb">
              <DashboardQLHB />
            </Route>
            <Route exact path="/qlbh">
              <DashboardQLBH />
            </Route>
            <Route exact path="/qllt">
              <DashboardQLLT />
            </Route>
            <Route exact path="/shcd">
              <Dashboard />
              {/* <DashboardSHCD /> */}
            </Route>
            <Route exact path="/ttsv">
              <DashboardTTSV />
            </Route>
            <Route exact path="/ktkl">
              <Dashboard />
              {/* <DashboardKTKL /> */}
            </Route>
            <Route exact path="/cdcs">
              <DashboardCDCS />
            </Route>
            <Route exact path="/signers">
              <DashboardSigners />
            </Route>
            <Route exact path="/admin">
              <DashboardAdminUsers />
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
  return <Routers />;
};

export default ProtectRoute;
