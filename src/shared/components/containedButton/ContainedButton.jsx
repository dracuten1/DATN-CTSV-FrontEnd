/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

export default function ContainedButton(props) {
  const classes = useStyles();

  const { handleClick, label } = props;
  return (
    <div>
      <Button
        tabIndex={1}
        onClick={handleClick}
        variant="contained"
        className={classes.button}
      >
        {label}
      </Button>
    </div>
  );
}
