import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DataTable from 'shared/components/dataTable/DataTable';
import Filters from 'shared/components/filters/Filters';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import BeforeStudentCertificateDialog from 'pages/XNSV/beforeStudentCertificateDialog/BeforeStudentCertificateDialog';
import Export from 'shared/components/Export/Export';
import Import from 'shared/components/Import/Import';
import Print from 'shared/components/Print/Print';
import Title from 'shared/components/Title/Title';
import XNTKTDialog from 'pages/XNSV/XNTruockhiThemDialog/XNTruocKhiThemDialog';
import BeforeStudentExportCertificateDialog from 'pages/XNSV/beforeStudentExportCertificateDialog/BeforeStudentExportCertificateDialog';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const StudentCertification = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Title url="/" title="Xác Nhận Sinh Viên" />
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Filters />
            <ContainedButton label="Lọc sinh viên" />
          </div>
          <DataTable />
          <div style={{ display: 'flex', justifyContent: 'row' }}>
            <BeforeStudentCertificateDialog />
            <ContainedButton label="Xem danh sách in" />
            <ContainedButton handleDialog={() => setOpen(true)} label="In" />
            <BeforeStudentExportCertificateDialog />
            <XNTKTDialog open={open} handleClose={() => setOpen(false)} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentCertification;
