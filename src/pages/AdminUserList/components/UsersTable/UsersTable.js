import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import * as AdminUserHandler from 'handlers/AdminUserHandler';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddDialog from 'pages/AdminUserList/components/AddUserProfile';
import PersonIcon from '@material-ui/icons/Person';
import SecurityIcon from '@material-ui/icons/Security';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Button,
} from '@material-ui/core';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users, rerender, ...rest } = props;

  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [addDialog, setAddDialog] = useState(false);
  const onCloseAddDialog = event => {
    setAddDialog(false);
  }

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const toggleEnabled = (username, type) => async event => {
    type = type === true ? 'disable' : 'enable';
    await AdminUserHandler.togleEnable({ username, type });
    rerender();
  }

  const toggleGroups = (username, grName) => async event => {
    const stament = grName ? "remove" : "add";
    const groupName = "Admins";
    await AdminUserHandler.togleGroups({ username, stament, groupName });
    rerender();
  }

  const parseAttributes = user => {
    user.Attributes.forEach(attribute => {
      user[attribute.Name] = attribute.Value;
    });
  }

  const handleAdd = data => {
    parseAttributes(data);
    users.push(data);
  }

  return (
    <div>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <AddDialog open={addDialog} onClose={onCloseAddDialog} handleAddUser={handleAdd} />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Tài khoản</TableCell>
                    <TableCell>Họ tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Tình trạng người dùng</TableCell>
                    <TableCell>Nhóm</TableCell>
                    <TableCell>Kích hoạt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length === 0 ?
                    <TableRow
                      className={classes.tableRow}
                    >
                      <TableCell align='center' colSpan={7}>
                        <CircularProgress />
                      </TableCell>

                    </TableRow>
                    :
                    users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={user.id}
                      >
                        <TableCell >{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body1">{user.Username}</Typography>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.UserStatus}</TableCell>
                        <TableCell>
                          <IconButton disabled={props.username === user.Username} onClick={toggleGroups(user.Username, user.GroupName)}  >
                            {user.GroupName ? <SecurityIcon titleAccess="Admin" /> : <PersonIcon titleAccess="Normal User" />}
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton disabled={props.username === user.Username} onClick={toggleEnabled(user.Username, user.Enabled)}  >
                            {user.Enabled === true ? <LockOpenIcon /> : <LockIcon />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={users.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <div style={{ height: 20 }} />
      <Button
        color="primary"
        variant="contained"
        onClick={() => { setAddDialog(true) }}
      >
        <PersonAddIcon fontSize="small" style={{ marginRight: 10 }} />
        Thêm người dùng
      </Button>
    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  const tmpUsername = state.auth.cognitoUser;

  return {
    username: tmpUsername ? tmpUsername.username : '',
  };
};

export default connect(mapStateToProps)(UsersTable);
