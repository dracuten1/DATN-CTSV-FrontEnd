import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {
  Export,
  Import,
  Print,
  Title,
  AllList
} from 'pages/HSSV/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardHSSV = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <AllList />
      </Grid>
    </div>
  );
};

export default DashboardHSSV;
