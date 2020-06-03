import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter } = props;

  return (
    <div className={classes.container}>
      <TextField id="outlined-basic" label="MSSV" variant="outlined" onChange={(event)=>{
         onFilter('mssv', event.target.value);
      }}/>
    </div>
  );
}
