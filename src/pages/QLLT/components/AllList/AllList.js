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
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/QLLT/action';
import { Filters } from '../Filters';


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

  const { dataList, isAlllist } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: '19-20',
    type: 'all'
  });
  const [state, setState] = useState({
    data: dataList,
    columns: Columns.ALL
  });

  if (updateBegin === 0) {
    dispatch(Actions.getAllListWithFilter(filter));
    updateBegin += 1;
  }

  if (dataList.length > 0 && updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: isAlllist ? Columns.ALL : Columns.KTX
    });
    updateBegin += 1;
  }

  if ( updateBegin === 2) {
    setState({
      ...state,
      data: dataList,
      columns: isAlllist ? Columns.ALL : Columns.KTX
    });
    updateBegin += 1;
  }

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => {};

  const parseNHToString = nh => {
    switch (nh) {
      case 1:
        return '16-17';
      case 2:
        return '17-18';
      case 3:
        return '18-19';
      case 4:
        return '19-20';
      default:
        return '20-211';
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            if (filter.type === 'all')
              dispatch(Actions.getAllListWithFilter(filter));
            else dispatch(Actions.getKtxListWithFilter(filter));
            updateBegin = 2;
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
                  {isAlllist ? <b>DANH SÁCH TỔNG</b> : <b>DANH SÁCH KTX</b>}
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
                          if (isAlllist) {
                            if (newData.portal)
                              newData['Nội trú']['Cập nhật Portal'] =
                                'Đã cập nhật';
                            else
                              newData['Nội trú']['Cập nhật Portal'] =
                                'Không cập nhật';
                            newData['Nội trú']['KTX'] = newData.ktx;
                          }

                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                        newData.NH = parseNHToString(newData.nh);
                        const type = isAlllist ? 'all' : 'ktx';
                        dispatch(Actions.updateOneStudentByType(newData, type));
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
          onClick={() =>  setImportOpen(true)}
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
      </CardActions>
      <ImportDialog
        open={importOpen}
        handleClose={() => setImportOpen(false)}
        handleImport={handleImport}
        importCase={'import-drl'}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
