import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import {
  Export,
  Import,
  Print,
  Title,
  AllList
} from 'pages/QLLT/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardQLLT = () => {
  const classes = useStyles();
  // eslint-disable-next-line
  const DRLState = useSelector(state => state.DRLState);
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Title url="/drl" title="Quản Lý Lưu Trú" />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Export many={20} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Import many={20} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Print many={20} />
        </Grid>

        <Grid item lg={12} md={12} xl={12} xs={12}>
          <AllList />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardQLLT;
