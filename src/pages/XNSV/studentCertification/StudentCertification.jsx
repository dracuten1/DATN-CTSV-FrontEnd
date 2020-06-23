import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, Link } from '@material-ui/core';
import Export from 'shared/components/Export/Export';
import Import from 'shared/components/Import/Import';
import Print from 'shared/components/Print/Print';
import Title from 'shared/components/Title/Title';
import PrintList from 'pages/XNSV/components/PrintList/PrintList';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import XNSVActions from 'reduxs/reducers/XNSV/action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

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
