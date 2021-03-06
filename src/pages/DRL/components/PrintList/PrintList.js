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
  Divider
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../../../reduxs/reducers/DRL/action';

import mockData from './data';
import icons from '../icons';
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
    justifyContent: 'flex-end'
  }
}));

const PrintList = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const DRLState = useSelector(state => state.DRLState);
  const { dataPrint } = DRLState;

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
      { title: 'MSSV', field: 'mssv', editable: 'onAdd' },
      { title: 'Họ tên', field: 'name', editable: 'never' },
      {
        title: 'Trường hợp',
        field: 'case',
        lookup: {
          1: 'Năm học-Học kỳ',
          2: 'Năm Học',
          3: 'Tất cả',
          4: 'Toàn Khoá'
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
                  icon: icons.Import,
                  tooltip: 'Import',
                  isFreeAction: true
                  // onClick: (event, rowData) =>
                },
                {
                  icon: icons.Print,
                  tooltip: 'Print'
                },
                {
                  icon: icons.Add,
                  tooltip: 'Add User',
                  isFreeAction: true,
                  onClick: event => {
                    setOpen(true);
                  }
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
                exportButton: true,
                filtering: true
              }}
              editable={{
                // onRowAdd: newData =>
                //   new Promise(resolve => {
                //     setTimeout(() => {
                //       resolve();
                //       setState(prevState => {
                //         const data = [...prevState.data];
                //         data.push(newData);
                //         return { ...prevState, data };
                //       });
                //     }, 600);
                //   }),
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
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Xem toàn bộ
        </Button>
        <Button
          onClick={() => dispatch(Actions.handlePrintList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Danh sách in
        </Button>
        <Button
          onClick={() => dispatch(Actions.handlePrint())}
          variant="contained"
          color="primary"
          size="small"
        >
          In theo trường hợp
        </Button>
      </CardActions>
      <AddDialog open={open} handleClose={() => setOpen(false)} />
    </Card>
  );
};

PrintList.propTypes = {
  className: PropTypes.string
};

export default PrintList;
