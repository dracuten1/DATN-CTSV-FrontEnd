import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import * as AdminUsersHandler from 'handlers/AdminUserHandler';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));



const UserList = () => {
  const classes = useStyles();
  // const [users] = useState(mockData);
  const [signers, setSigners] = React.useState([]);

  const getSignerEnum = async () => {

    const response = await AdminUsersHandler.getAllUsers();

    setSigners(response);
  };

  React.useEffect(() => {
    getSignerEnum();
  }, []);



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable users={signers} rerender={getSignerEnum} />
      </div>
    </div>
  );
};

export default UserList;
