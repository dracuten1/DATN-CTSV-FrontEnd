import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PrintList from 'pages/XNSV/components/PrintList/PrintList';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
}));

const StudentCertification = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <PrintList />
      </Grid>
    </div >
  );
};

export default StudentCertification;
