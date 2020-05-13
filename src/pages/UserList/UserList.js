import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import * as SignersHandler from 'handlers/SignersHandler';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  title: {
    fontSize: 30,
    marginBottom: 30
  }
}));



const UserList = () => {
  const classes = useStyles();
  // const [users] = useState(mockData);
  const [signers, setSigners] = React.useState([]);

  const getSignerEnum = async () => {

    const response = await SignersHandler.getAllSigners();

    setSigners(response);
  };

  React.useEffect(() => {
    getSignerEnum();
  }, []);



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}>QUẢN LÝ NGƯỜI KÝ</div>
        <UsersTable users={signers} />
      </div>
    </div>
  );
};

export default UserList;
