import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {
  Export,
  Import,
  Print,
  Title,
  AllList
} from 'pages/KT_KL/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardKTKL = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Title url="/drl" title="Khen Thưởng - Kỷ Luật" />
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

export default DashboardKTKL;
