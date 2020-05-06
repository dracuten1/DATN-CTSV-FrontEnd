import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { DialogContent, TextField, DialogActions, Button, LinearProgress } from '@material-ui/core';
import * as SignersHandler from 'handlers/SignersHandler';
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  const { open, onClose, handleAddSigner } = props;

  let { user } = props;
  user = !user ? {} : user;

  const onLostFocus = field => event => {
    user[field] = event.target.value;
    console.log(user);
  }


  const handleAdd = async () => {
    setProgress(false);
    await SignersHandler.addSingleSigner(user);
    handleAddSigner(user);
    setProgress(true);
    onClose();
  };


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} className={classes.container}>
      <div style={{ height: 10 }}>
        <LinearProgress color="secondary" hidden={progress} />
      </div>
      <DialogTitle id="simple-dialog-title">THÊM NGƯỜI KÝ</DialogTitle>
      <DialogContent className={classes.container}>
        <TextField
          className={classes.textField}
          label="Họ và tên"
          margin="normal"
          onBlur={onLostFocus('hvtnguoiki')}
        />
        <TextField
          className={classes.textField}
          label="Chức vụ"
          margin="normal"
          onBlur={onLostFocus('chucvu')}
        />
        <TextField
          className={classes.textField}
          label="TL"
          margin="normal"
          onBlur={onLostFocus('TL')}
        />
        <TextField
          className={classes.textField}
          label="KT"
          margin="normal"
          onBlur={onLostFocus('KT')}
        />
        {/* Status
        <RadioGroup aria-label="Status" defaultValue={'Active'} style={{ display: 'flex', flexDirection: 'row' }} onBlur={onLostFocus('DL')}>
          <FormControlLabel value="Active" control={<Radio />} label="Active" />
          <FormControlLabel value="Disable" control={<Radio />} label="Disable" />
        </RadioGroup> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
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
