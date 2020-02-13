import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Confirm from '@material-ui/icons/CheckCircleOutline';
import Grade from '@material-ui/icons/Grade';
import Home from '@material-ui/icons/Home';
import Status from '@material-ui/icons/BusinessCenter';
import Description from '@material-ui/icons/Description';
import Policy from '@material-ui/icons/Accessible';
import Activity from '@material-ui/icons/ImportContacts';
import Card from '@material-ui/icons/Payment';
import BlockIcon from '@material-ui/icons/Block';
import Hospital from '@material-ui/icons/LocalHospital';
import Scholarship from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Routers from 'layout/router/Router';
import { useDispatch } from 'react-redux';
import DRLActions from 'reduxs/reducers/DRL/action';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import QLLTActions from 'reduxs/reducers/QLLT/action';

import history from 'historyConfig';

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

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
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
        <ListItem
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
          button
          component="a"
          onClick={() =>  history.push('/qllt')}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Quản lý lưu trú" />
        </ListItem>
        <ListItem
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
          button
          component="a"
          onClick={() => history.push('/hssv')}
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

export default ResponsiveDrawer;
