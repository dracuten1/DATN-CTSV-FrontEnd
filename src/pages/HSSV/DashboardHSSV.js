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
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Title url="/drl" title="Hồ Sơ Sinh Viên" />
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

export default DashboardHSSV;
