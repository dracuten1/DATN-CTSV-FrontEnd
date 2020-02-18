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
import Actions from '../../../../reduxs/reducers/TTSV/action';
import { Filters } from '../Filters';
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

let updateBegin = 0;
const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { dataList, isCase } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();
  let arrColumns = [];
  switch (isCase) {
    case 1: //SV nuoc ngoai
      arrColumns = Columns.SVNN;
      break;
    case 2: //DTB
      arrColumns = Columns.DTB;
      break;
    case 3: //Danh sach tot nghiep
      arrColumns = Columns.DSTN;
      break;
    case 4: //Hoan thanh tin chi
      arrColumns = Columns.HTTC;
      break;
    case 5: //Dang hoc
      arrColumns = Columns.HTTC;
      break;
    case 6: //Canh cao hoc vu
      arrColumns = Columns.CCHV;
      break;
    case 7: //Bi thoi hoc
      arrColumns = Columns.CCHV;
      break;
    default:
      //Dang ky hoc phan
      arrColumns = Columns.DKHP;
      break;
  }

  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState({
    hk: '1',
    nh: '19-20',
    type: 'DangHoc'
  });
  const [state, setState] = useState({
    data: isCase ? mockData.info : mockData.importInfo,
    columns: arrColumns
  });

  if (updateBegin === 0) {
    dispatch(Actions.getListWithFilter(filter));
    updateBegin += 1;
  }

  if (dataList.length > 0 && updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: arrColumns
    });
    updateBegin += 1;
  }

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      newData.scn = data.length + 1;
      // newData.case = reparseCase(newData.case);
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };

  const handleFilter = (prop, data) => {
    setFilter({ ...filter, [prop]: data });
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            dispatch(Actions.getListWithFilter(filter));
            updateBegin = 1;
          }}
          label="Lọc sinh viên"
        />
      </CardActions>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
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
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          onClick={() => dispatch(Actions.exportWithFilter(filter))}
          variant="contained"
          color="primary"
          size="small"
        >
          Import
        </Button>
        <Button
          onClick={() => dispatch(Actions.exportWithFilter(filter))}
          variant="contained"
          color="primary"
          size="small"
        >
          Export
        </Button>
        <Button
          onClick={() => dispatch(Actions.getListWithFilter(filter))}
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
