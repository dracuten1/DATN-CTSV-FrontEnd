/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 8,
    marginBottom: 0,
    width: 200
  },
  input: {
    height: 0
  }
}));

const date = new Date();

export default function UncontrolledTextField(props) {
  const classes = useStyles();

  const { label, handleChange } = props;
  return (
    <div className={classes.container}>
      <span>{label}</span>
      <TextField
        type="date"
        id="outlined-search"
        className={classes.textField}
        defaultValue={moment(date).format('YYYY-MM-DD')}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
        variant="outlined"
        inputProps={{
          style: {
            height: 40,
            padding: '0px 10px'
          }
        }}
      />
    </div>
  );
}
