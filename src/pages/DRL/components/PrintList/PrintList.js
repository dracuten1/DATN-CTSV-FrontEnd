import React, { useState, useEffect } from 'react';
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
  Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DRLActions from 'reduxs/reducers/DRL/action';
import { logger } from 'core/services/Apploger';
import icons from '../../../../shared/icons';
import { AddDialog } from '../AddDialog';

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


const PrintList = props => {

  const { className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const dataPrint = useSelector(state => state.DRLState.dataPrint);
  logger.info("dataPrint: ", dataPrint);
  const [open, setOpen] = React.useState(false);
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
          'HK': 'Năm học-Học kỳ',
          "NH": 'Năm Học',
          "All": 'Tất cả',
          "TK": 'Toàn Khoá'
        },
        filterCellStyle: {
          paddingTop: 1
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

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };

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
                      logger.info("Olddata: ", oldData);
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
        <Button
          onClick={() => dispatch(DRLActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem toàn bộ
        </Button>
        <Button
          onClick={() => {
            dispatch(DRLActions.handlePrintList());
            dispatch(DRLActions.getNotPrintYet());
          }}
          variant="contained"
          color="primary"
          size="small"
        >
          Danh sách in
        </Button>

        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          Thêm sinh viên in
        </Button>
        <Button
          onClick={() => dispatch(DRLActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Import
        </Button>
        <Button
          onClick={() => dispatch(DRLActions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
        <Button
          onClick={() => dispatch(DRLActions.handlePrint())}
          variant="contained"
          color="primary"
          size="small"
        >
          In theo trường hợp
        </Button>
      </CardActions>
      <AddDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleAdd={handleAdd}
      />
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};



export default PrintList;
