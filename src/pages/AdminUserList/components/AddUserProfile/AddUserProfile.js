import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { DialogContent, TextField, DialogActions, Button, LinearProgress } from '@material-ui/core';
import * as AdminUserHandler from 'handlers/AdminUserHandler';
import { useState } from 'react';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 400
  },
});


function AddDialog(props) {
  const classes = useStyles();
  const [progress, setProgress] = useState(true);
  const { open, onClose, handleAddUser } = props;
  const [error, setError] = useState('');
  const user = { role: 'normal' }
  const onLostFocus = field => event => {
    user[field] = event.target.value;
  }


  const handleAdd = async () => {

    setProgress(false);
    const res = await AdminUserHandler.addUser(user);
    if (res.User) {
      handleAddUser(res.User);
      onClose();
    }
    else {
      setError(res.message);
    }
    setProgress(true);

  };


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} className={classes.container} >
      <div style={{ height: 10 }}>
        <LinearProgress color="secondary" hidden={progress} />
      </div>
      <DialogTitle id="simple-dialog-title">THÊM NGƯỜI DÙNG</DialogTitle>
      <DialogContent className={classes.container}>
        <TextField
          className={classes.textField}
          label="Tài khoản"
          margin="normal"
          onBlur={onLostFocus('username')}
        />
        <TextField
          className={classes.textField}
          label="Email"
          margin="normal"
          onBlur={onLostFocus('email')}
        />
        {/* Status
        <RadioGroup aria-label="Status" defaultValue={'Active'} style={{ display: 'flex', flexDirection: 'row' }} onBlur={onLostFocus('DL')}>
          <FormControlLabel value="Active" control={<Radio />} label="Active" />
          <FormControlLabel value="Disable" control={<Radio />} label="Disable" />
        </RadioGroup> */}
        <div style={{ color: 'red' }}>{error}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); setError(''); }} color="primary">
          Huỷ
          </Button>
        <Button onClick={handleAdd} color="primary" >
          Thêm
          </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
