import React, { useState } from 'react';
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
import Tooltip from '@material-ui/core/Tooltip';
import { HIDE_PROGRESS } from 'reduxs/reducers/LinearProgress/ActionTypes';

let drawerWidth = 250;
let drawerWidthHide = 90;
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
      flexShrink: 0,
      transition: 'all ease-in-out 0.3s',
    }
  },
  drawerHide: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidthHide,
      flexShrink: 0,
      transition: 'all ease-in-out 0.3s',
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
    width: "250px !important",
    transition: 'all ease-in-out 0.3s',
    flexShrink: 0,
  },
  drawerPaperHide: {
    width: 90,
    transition: 'all ease-in-out 0.3s',
    flexShrink: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: 'all ease-in-out 0.3s',
  },
  showSideBarContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // paddingLeft: 250,
    transition: 'all ease-in-out 0.3s',
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
  },
  toggleSideBar: {
    fontSize: 25,
    display: 'block',
    textAlign: 'right',
    paddingRight: 10,
    "&:hover": {
      cursor: 'pointer',
    }
  },
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
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="TÀI KHOẢN" />
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
                  <ListItemText style={{ whiteSpace: "nowrap" }} primary="Quản lý người dùng" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={navigatePage('/signers')}>
                  <ListItemIcon>
                    <BorderColorIcon />
                  </ListItemIcon>
                  <ListItemText style={{ whiteSpace: "nowrap" }} primary="Quản lý người ký" />
                </ListItem>
              </div> : <div />}
            <ListItem button className={classes.nested} onClick={navigatePage('/changepassword')}>
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText style={{ whiteSpace: "nowrap" }} primary="Đổi mật khẩu" />
            </ListItem>
            <ListItem button className={classes.nested} onClick={() => {
              dispatch(AuthActions.logout());
              history.push('/');
            }}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText style={{ whiteSpace: "nowrap" }} primary="Đăng xuất" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
        <ListSubheader style={{ whiteSpace: "nowrap" }}>CHỨC NĂNG</ListSubheader>
        {!isProduction &&
          <ListItem button className={classes.nested} onClick={copyToken}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText style={{ whiteSpace: "nowrap" }} primary="Console log token" />
          </ListItem>
        }
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/xnsv');
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Xác nhận sinh viên" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/drl');
          }}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Điểm rèn luyện" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/ttsv');
          }}
        >
          <ListItemIcon>
            <Status />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Tình trạng sinh viên" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/qllt');
          }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Quản lý lưu trú" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/shcd');
          }}
        >
          <ListItemIcon>
            <Activity />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Sinh hoạt công dân" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/ktkl');
          }}
        >
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Khen thưởng - Kỷ luật" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/qlhb');
          }}
        >
          <ListItemIcon>
            <Scholarship />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Quản lý học bổng" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/qlbh');
          }}
        >
          <ListItemIcon>
            <Hospital />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Quản lý bảo hiểm" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/cdcs');
          }}
        >
          <ListItemIcon>
            <Policy />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Chế độ chính sách" />
        </ListItem>
        <ListItem
          className={classes.nested}
          button
          component="a"
          onClick={() => {
            dispatch({ type: HIDE_PROGRESS });
            history.push('/hssv');
          }}
        >
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="Hồ sơ sinh viên" />
        </ListItem>
      </List>
    </div>
  );

  const drawerIcon = (
    <div>
      <div className={classes.userinfo}>
        <Avatar className={classes.avatar} />
      </div>
      <List>
        <Divider />
        <ListItem onClick={handleMyAccountClick}>
          <ListItemText style={{ whiteSpace: "nowrap" }} primary="TK" />
          {myAccountCollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={myAccountCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {props.group === 'Admins' ?
              <div>
                <Tooltip title="Quản lý người dùng" placement="right">
                  <ListItem button className={classes.nested} onClick={navigatePage('/admin')}>
                    <ListItemIcon>
                      <SupervisorAccountIcon />
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
                <Tooltip title="Quản lý người ký" placement="right">
                  <ListItem button className={classes.nested} onClick={navigatePage('/signers')}>
                    <ListItemIcon>
                      <BorderColorIcon />
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </div> : <div />}
            <Tooltip title="Đổi mật khẩu" placement="right">
              <ListItem button className={classes.nested} onClick={navigatePage('/changepassword')}>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
            <Tooltip title="Đăng xuất" placement="right">
              <ListItem button className={classes.nested} onClick={() => {
                dispatch(AuthActions.logout());
                history.push('/');
              }}>
                <ListItemIcon >
                  <ExitToAppIcon />
                </ListItemIcon>
              </ListItem>
            </Tooltip>
          </List>
        </Collapse>

        <Divider />
        {!isProduction &&
          <ListItem button className={classes.nested} onClick={copyToken}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
          </ListItem>
        }
        <Tooltip title="Xác nhận sinh viên" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/xnsv');
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Điểm rèn luyện" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/drl');
            }}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Tình trạng sinh viên" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/ttsv');
            }}
          >
            <ListItemIcon>
              <Status />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Quản lý lưu trú" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/qllt');
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Sinh hoạt công dân" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/shcd');
            }}
          >
            <ListItemIcon>
              <Activity />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Khen thưởng - Kỷ luật" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/ktkl');
            }}
          >
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Quản lý học bổng" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/qlhb');
            }}
          >
            <ListItemIcon>
              <Scholarship />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Quản lý bảo hiểm" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/qlbh');
            }}
          >
            <ListItemIcon>
              <Hospital />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Chế độ chính sách" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/cdcs');
            }}
          >
            <ListItemIcon>
              <Policy />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
        <Tooltip title="Hồ sơ sinh viên" placement="right">
          <ListItem
            className={classes.nested}
            button
            component="a"
            onClick={() => {
              dispatch({ type: HIDE_PROGRESS });
              history.push('/hssv');
            }}
          >
            <ListItemIcon>
              <Description />
            </ListItemIcon>
          </ListItem>
        </Tooltip>
      </List>
    </div>
  );

  const [checked, setChecked] = useState(true)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} />
      <nav className={!checked ? classes.drawerPaper : classes.drawerHide} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          classes={{
            paper: checked ? classes.drawerPaperHide : classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <div >
            <input id="sidebar" type="checkbox" hidden value={checked} onClick={() => {
              setChecked(!checked);
            }} />
            <label htmlFor="sidebar" className={classes.toggleSideBar}>{checked ? `››` : `‹‹`}</label>
            {checked ? drawerIcon : drawer}
          </div>
        </Drawer>
      </nav>
      <main className={checked ? classes.content : classes.showSideBarContent}>
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
