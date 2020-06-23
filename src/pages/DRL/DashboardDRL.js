import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import {
  Export,
  Import,
  Print,
  Title,
  PrintList,
} from 'pages/DRL/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardDRL = () => {
  const classes = useStyles();

  useSelector(state => state.DRLState);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <PrintList />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardDRL;
