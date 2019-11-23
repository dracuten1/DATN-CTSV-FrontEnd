import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import themeUI from 'shared/styles/theme';

import {
  Export,
  Import,
  Print,
  Title,
  PrintList,
  AllList
} from 'pages/DRL/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const DashboardDRL = () => {
  const classes = useStyles();
  const DRLState = useSelector(state => state.DRLState);
  const { isPrintList } = DRLState;
  return (
    <ThemeProvider theme={themeUI}>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Title />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Export />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Import />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Print />
          </Grid>

          <Grid item lg={12} md={12} xl={12} xs={12}>
            {isPrintList ? <PrintList /> : <AllList />}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default DashboardDRL;
