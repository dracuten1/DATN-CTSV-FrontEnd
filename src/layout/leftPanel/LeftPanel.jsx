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
import Scholarship from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routers from 'layout/router/Router';
import { useDispatch, connect } from 'react-redux';
import DRLActions from 'reduxs/reducers/DRL/action';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import * as AuthActions from 'reduxs/reducers/Authentication/action';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import history from 'historyConfig';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@material-ui/core/Avatar';
const drawerWidth = 240;

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
    marginRight: 10,
  }
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = url => event => {
    if (url) history.push(url)
    setAnchorEl(null);
  };


  const drawer = (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', paddingTop: 8 }} >
        <Avatar></Avatar>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Xin chào {props.username}<KeyboardArrowDownIcon />
        </Button>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose()}
        style={{ top: 30 }}
      >
        {props.group === 'Admins' ?
          <div>
            <MenuItem onClick={handleClose('/admin')}><SupervisorAccountIcon className={classes.icon} />Quản lý người dùng</MenuItem>
            <MenuItem onClick={handleClose('/signers')}><BorderColorIcon className={classes.icon} />Quản lý người ký</MenuItem>
          </div>
          : <div></div>
        }
        <MenuItem onClick={handleClose('/changepass')}> <LockIcon className={classes.icon} />Đổi mật khẩu</MenuItem>
        <MenuItem onClick={() => {
          dispatch(AuthActions.logout());
          history.push('/');
        }}><ExitToAppIcon className={classes.icon} />Đăng xuất</MenuItem>
      </Menu>
      <List>
        {/* <ListItem
          button
          component="a"
          onClick={() => history.push('/admin')}
        >
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý người dùng" />
        </ListItem>
        <ListItem
          button
          component="a"
          onClick={() => history.push('/signers')}
        >
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý người ký" />
        </ListItem>
        <ListItem
          button
          component="a"
          onClick={() => history.push('/changepass')}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Đổi mật khẩu" />
        </ListItem> */}
        <Divider />
        <ListItem
          button
          component="a"
          onClick={() => dispatch(XNSVActions.getNotPrintYet())}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Xác nhận sinh viên" />
        </ListItem>
        <ListItem
          button
          component="a"
          onClick={() => dispatch(DRLActions.getNotPrintYet())}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Điểm rèn luyện" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/ttsv')}>
          <ListItemIcon>
            <Status />
          </ListItemIcon>
          <ListItemText primary="Tình trạng sinh viên" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/qllt')}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Quản lý lưu trú" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/shcd')}>
          <ListItemIcon>
            <Activity />
          </ListItemIcon>
          <ListItemText primary="Sinh hoạt công dân" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/ktkl')}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Khen thưởng - Kỷ luật" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/qlhb')}>
          <ListItemIcon>
            <Scholarship />
          </ListItemIcon>
          <ListItemText primary="Quản lý học bổng" />
        </ListItem>
        <ListItem button component="a" onClick={() => history.push('/hssv')}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Hồ sơ sinh viên" />
        </ListItem>
      </List>
    </div >
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

  return {
    username: tmpUsername ? tmpUsername.username : '',
    group: tmpGroup ? tmpGroup[0] : '',
  };
};

export default connect(mapStateToProps)(ResponsiveDrawer);
