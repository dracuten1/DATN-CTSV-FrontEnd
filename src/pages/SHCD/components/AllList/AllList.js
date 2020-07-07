import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider
} from '@material-ui/core';

import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import mockData from './data';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/DRL/action';
import { Filters } from '../Filters';
import { AddDialog } from '../AddDialog';
import { MuiThemeProvider } from '@material-ui/core';
import themeTable from 'shared/styles/theme/overrides/MuiTable';

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

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { isCase } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();
  let arrColumns = [];
  switch (isCase) {
    case 1://Dang ky
      arrColumns = Columns.DKSHCD;
      break;
    case 2://Diem danh
      arrColumns = Columns.DDSHCD;
      break;
    case 3://Kiem tra
      arrColumns = Columns.KTSHCD;
      break;
    default://Ket qua
      arrColumns = Columns.KQSHCD;
      break;
  }

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isCase ? mockData.info : mockData.importInfo,
    columns: arrColumns
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
      <CardActions className={classes.actions}>
        <MuiThemeProvider theme={themeFilter}>
          <Filters />
          <ContainedButton label="Lọc sinh viên" />
        </MuiThemeProvider>
      </CardActions>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MuiThemeProvider theme={themeTable}>
              <MaterialTable
                icons={icons}
                title={
                  <div>
                    {isCase ? (
                      <b>THÔNG TIN SINH VIÊN</b>
                    ) : (
                        <b>DANH SÁCH IMPORT</b>
                      )}
                  </div>
                }
                columns={state.columns}
                data={state.data}
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
            </MuiThemeProvider>
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
          Import
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Thêm dữ liệu
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

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
