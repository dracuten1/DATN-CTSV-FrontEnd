import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersTable } from './components';
import * as AdminUsersHandler from 'handlers/AdminUserHandler';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
  }
}));



const UserList = () => {
  const classes = useStyles();
  // const [users] = useState(mockData);
  const [signers, setSigners] = React.useState([]);

  const getSignerEnum = async () => {

    const response = await AdminUsersHandler.getAllUsers();

    parseAttributes(response);
    setSigners(response);
  };

  const parseAttributes = users => {
    users.forEach(user => {
      user.Attributes.forEach(attribute => {
        user[attribute.Name] = attribute.Value;
      });
    })
  }

  React.useEffect(() => {
    getSignerEnum();
    // eslint-disable-next-line
  }, []);



  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.title}><SupervisorAccountIcon className={classes.icon} fontSize='large' />QUẢN LÝ NGƯỜI DÙNG</div>
        <UsersTable users={signers} rerender={getSignerEnum} />
      </div>
    </div>
  );
};

export default UserList;
