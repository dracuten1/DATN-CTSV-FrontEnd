import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import * as SignersHandler from 'handlers/SignersHandler';
import CreateIcon from '@material-ui/icons/Create';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EditDialog from 'pages/UserList/components/UserProfile/index';
import AddDialog from 'pages/UserList/components/AddUserProfile/index';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Button
} from '@material-ui/core';

import { getInitials } from 'helpers';

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
  const { className, users, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialog, setEditDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const onCloseEditDialog = event => {
    setEditDialog(false);
  }

  const [addDialog, setAddDialog] = useState(false);
  const onCloseAddDialog = event => {
    setAddDialog(false);
  }

  const handleSelectAll = event => {
    const { users } = props;


    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const editSigner = user => event => {
    setSelectedUser(user);
    setEditDialog(true)
  }

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleAdd = data => {
    users.push(data);
  }

  return (
    <div>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >

        <EditDialog open={editDialog} onClose={onCloseEditDialog} user={selectedUser} />
        <AddDialog open={addDialog} onClose={onCloseAddDialog} handleAddSigner={handleAdd} />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Họ tên</TableCell>
                    <TableCell>Chức vụ</TableCell>
                    <TableCell>TL</TableCell>
                    <TableCell>KT</TableCell>
                    <TableCell>Tình trạng</TableCell>
                    <TableCell></TableCell>
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
                        selected={selectedUsers.indexOf(user.id) !== -1}
                      >
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body1">{user.hvtnguoiki}</Typography>
                        </TableCell>
                        <TableCell>{user.chucvu}</TableCell>
                        <TableCell>{user.TL}
                        </TableCell>
                        <TableCell>{user.KT}</TableCell>
                        <TableCell>
                          {user.DL === 'Active' ? <LockOpenIcon /> : <LockIcon />}
                        </TableCell>
                        <TableCell onClick={editSigner(user)}>
                          <IconButton  >
                            <CreateIcon />
                          </IconButton >
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
        Thêm người kí
        </Button>
    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
