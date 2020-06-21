import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Home from '@material-ui/icons/Home';
import Status from '@material-ui/icons/BusinessCenter';
import Description from '@material-ui/icons/Description';
import Activity from '@material-ui/icons/ImportContacts';
import BlockIcon from '@material-ui/icons/Block';
import LockIcon from '@material-ui/icons/Lock';
import Hospital from '@material-ui/icons/LocalHospital';
import Scholarship from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Policy from '@material-ui/icons/Accessible';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routers from 'layout/router/Router';
import { useDispatch, connect } from 'react-redux';

import * as AuthActions from 'reduxs/reducers/Authentication/action';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import history from 'historyConfig';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Avatar from '@material-ui/core/Avatar';
import { ListSubheader, Collapse, Typography, TextField } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

//File Actions
// import CDCSActions from 'reduxs/reducers/CDCS/action';
// import DRLActions  from 'reduxs/reducers/DRL/action';
// import QLBHActions from 'reduxs/reducers/QLBH/action';
// import QLHBActions from 'reduxs/reducers/QLHB/action';
// import QLLTActions from 'reduxs/reducers/QLLT/action';
// import TTSVActions from 'reduxs/reducers/TTSV/action';
// import XNSVActions from 'reduxs/reducers/XNSV/action';


const drawerWidth = 240;
const appStage = process.env.REACT_APP_STAGE.trim();

const isProduction =
  appStage !== undefined && appStage !== null && appStage.trim() === "production";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  icon: {
    marginRight: 10
  },
  userinfo: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  avatar: {
    marginBottom: 25,
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [myAccountCollapse, setMyAccountCollapse] = React.useState(false);

  const handleMyAccountClick = () => {
    setMyAccountCollapse(!myAccountCollapse);
  };

  let textArea;

  const copyToken = (event) => {
    console.log(props.token);
  };

  const navigatePage = url => event => {
    history.push(url);
  };



  const drawer = (
    <div>
      <div className={classes.userinfo}>
        <Avatar className={classes.avatar} />
        <Typography variant="h2" gutterBottom>
          {props.username.toUpperCase()}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Admin
        </Typography>
      </div>
      <List>
        <Divider />
        <ListItem onClick={handleMyAccountClick}>
          <ListItemText primary="MY ACCOUNT" />
          {myAccountCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={myAccountCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.group === 'Admins' ?
              <div>
                <ListItem button className={classes.nested} onClick={navigatePage('/admin')}>
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quản lý người dùng" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={navigatePage('/signers')}>
                  <ListItemIcon>
                    <BorderColorIcon />
                  </ListItemIcon>
                  <ListItemText primary="Quản lý người ký" />
                </ListItem>
              </div> : <div />}
            <ListItem button className={classes.nested} onClick={navigatePage('/changepassword')}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Đổi mật khẩu" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {
              dispatch(AuthActions.logout());
              history.push('/');
            }}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListSubheader>MAIN</ListSubheader>
        {!isProduction &&
          <ListItem button className={classes.nested} onClick={copyToken}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Console log token" />
          </ListItem>
        }
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/xnsv')}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Xác nhận sinh viên" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/drl')}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Điểm rèn luyện" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/ttsv')}
        >
          <ListItemIcon>
            <Status />
          </ListItemIcon>
          <ListItemText primary="Tình trạng sinh viên" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/qllt')}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Quản lý lưu trú" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/shcd')}
        >
          <ListItemIcon>
            <Activity />
          </ListItemIcon>
          <ListItemText primary="Sinh hoạt công dân" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/ktkl')}
        >
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Khen thưởng - Kỷ luật" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/qlhb')}
        >
          <ListItemIcon>
            <Scholarship />
          </ListItemIcon>
          <ListItemText primary="Quản lý học bổng" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/qlbh')}
        >
          <ListItemIcon>
            <Hospital />
          </ListItemIcon>
          <ListItemText primary="Quản lý bảo hiểm" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => history.push('/cdcs')}
        >
          <ListItemIcon>
            <Policy />
          </ListItemIcon>
          <ListItemText primary="Chế độ chính sách" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() =>
            history.push('/hssv')
          }
        >
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Hồ sơ sinh viên" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Routers />
      </main>
    </div>
  );
}

const mapStateToProps = state => {

  const tmpUsername = state.auth.cognitoUser;
  const tmpGroup = state.auth.cognitoUser ? state.auth.cognitoUser.signInUserSession.idToken.payload['cognito:groups'] : '';
  const token = !isProduction && state.auth.cognitoUser ? state.auth.cognitoUser.signInUserSession.idToken.jwtToken : '';

  return {
    username: tmpUsername ? tmpUsername.username : '',
    group: tmpGroup ? tmpGroup[0] : '',
    token: token,
  };
};

export default connect(mapStateToProps)(ResponsiveDrawer);
