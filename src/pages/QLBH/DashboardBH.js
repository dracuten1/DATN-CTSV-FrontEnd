import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import {
  AllList
} from 'pages/QLBH/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardQLBH = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <AllList />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardQLBH;
