import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import { useDispatch, useSelector } from 'react-redux';
import DRLActions from 'reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';
import icons from 'shared/icons';
// import history from 'historyConfig';
import { AddDialog } from '../AddDialog';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-start'
  }
}));

let valueCase = null;
let updateBegin = 0;
let isPrint = false;
const PrintList = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const dataPrint = useSelector(state => state.DRLState.dataPrint);
  const listLink = useSelector(state => state.DRLState.listLink);

  logger.info('listLink', listLink);
  logger.info('dataPrint: ', dataPrint);
  const [open, setOpen] = React.useState(false);
  const [notice, setNotice] = React.useState(false);

  const [state, setState] = useState({
    data: dataPrint,
    columns: [
      {
        title: 'Đã In',
        field: 'isPrint',
        editable: 'onAdd',
        type: 'boolean',
        render: rowData => (
          <div style={{ marginLeft: '10px' }}>
            {rowData.isPrint ? <icons.CheckBox /> : <icons.CheckBlank />}
          </div>
        )
      },
      { title: 'STT', field: 'stt', editable: 'never', filtering: false },
      { title: 'MSSV', field: 'mssv', editable: 'onAdd', filtering: false },
      {
        title: 'Họ tên',
        field: 'name',
        editable: 'never',
        filtering: false
      },
      {
        title: 'Trường hợp',
        field: 'case',
        lookup: {
          HK: 'Năm học-Học kỳ',
          NH: 'Năm Học',
          All: 'Tất cả',
          TK: 'Toàn Khoá'
        },
        filterCellStyle: {
          paddingTop: 1
        },
        customFilterAndSearch: (term, rowData) => {
          if (valueCase !== term) {
            valueCase = term;
          }
          if (term.length !== 0) {
            return term == rowData.case;
          }
          return rowData;
        }
      },
      {
        title: 'Ngày in',
        field: 'date',
        editable: 'never',
        type: 'date',
        filtering: false
      }
    ]
  });

  if (updateBegin === 0) {
    dispatch(DRLActions.getNotPrintYet());
    updateBegin += 1;
  }

  if (dataPrint.length > 0 && updateBegin === 1) {
    setState({ ...state, data: dataPrint });
    updateBegin += 1;
  }

  if (isPrint) {
    setState({ ...state, data: dataPrint });
    isPrint = !isPrint;
  }

  const reparseCase = tmpcase => {
    switch (tmpcase) {
      case 'Học kỳ':
        return 'HK';
      case 'Năm học':
        return 'NH';
      case 'Tất cả':
        return 'All';
      case 'Toàn khoá':
        return 'TK';
    }
  }

  const handleAdd = newData => {
    setOpen(false);
    setState(prevState => {
      const data = [...prevState.data];
      logger.info("HOT FIX: ", data);
      logger.info("HOT FIX: ", newData);
      newData.stt = data.length + 1;
      newData.date = moment(new Date()).format('DD/MM/YYYY');
      newData.case =reparseCase(newData.case);

        data.push(newData);
      return { ...prevState, data };
    });
  };

  logger.info('dataTable: ', state.data);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  <b>DANH SÁCH IN</b>
                </div>
              }
              columns={state.columns}
              data={state.data}
              actions={[
                {
                  icon: icons.Print,
                  tooltip: 'Print'
                }
              ]}
              options={{
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                rowStyle: {
                  backgroundColor: '#EEE'
                },
                // exportButton: true,
                filtering: true
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      logger.info('Olddata: ', oldData);
                      const { pk, sk } = oldData;
                      dispatch(DRLActions.deleteOneCertificate(pk, sk));
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  })
              }}
            />
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Button
              onClick={() => dispatch(DRLActions.handleAllList())}
              variant="contained"
              color="primary"
              size="small"
            >
              Xem toàn bộ
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                // dispatch(DRLActions.handlePrintList());
                dispatch(DRLActions.getNotPrintYet());
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              Danh sách in
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => setOpen(true)}
              variant="contained"
              color="primary"
              size="small"
            >
              Thêm sinh viên in
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => dispatch(DRLActions.handleAllList())}
              variant="contained"
              color="primary"
              size="small"
            >
              Import
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => dispatch(DRLActions.handleAllList())}
              variant="contained"
              color="primary"
              size="small"
            >
              Export
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              onClick={() => {
                dispatch(DRLActions.handlePrint(valueCase));
                isPrint = !isPrint;
              }}
              variant="contained"
              color="primary"
              size="small"
            >
              In theo trường hợp
            </Button>
          </Grid>
          {listLink.length > 0 ? (
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <ListLinkDocx data={listLink} />
            </Grid>
          ) : (
              ''
            )}
        </Grid>
      </CardActions>
      <AddDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleAdd={handleAdd}
      />
      <Dialog
        open={notice}
        onClose={() => setNotice(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Không có gì để in
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotice(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
