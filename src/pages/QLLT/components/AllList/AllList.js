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
  Divider,
  Grid
} from '@material-ui/core';

import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
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

const dt = new Date();
const year = dt.getFullYear();
const convert = year % 100;

let updateBegin = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { dataList, isAlllist, listLink } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${convert - 1}-${convert}`,
    type: 'All'
  });
  const [state, setState] = useState({
    data: dataList,
    columns: Columns.ALL
  });

  if (updateBegin === 0) {
    dispatch(Actions.getAllListWithFilter(filter));
    updateBegin += 1;
  }

  if (updateBegin === 1) {
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
        return `${convert - 6}-${convert - 5}`;
      case 2:
        return `${convert - 5}-${convert - 4}`;
      case 3:
        return `${convert - 4}-${convert - 3}`;
      case 4:
        return `${convert - 3}-${convert - 2}`;
      case 5:
        return `${convert - 2}-${convert - 1}`;
      case 6:
        return `${convert - 1}-${convert}`;
      default:
        return `${convert}-${convert + 1}`;
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            if (filter.type === 'All')
              dispatch(Actions.getAllListWithFilter(filter));
            else dispatch(Actions.getKtxListWithFilter(filter));
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
                            if (newData.xnnt)
                              newData['Xác nhận ngoại trú'] = 'Đã xác nhận';
                            else
                              newData['Xác nhận ngoại trú'] = 'Không xác nhận';
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
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Button
              onClick={() => setImportOpen(true)}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Import
            </Button>
            <Button
              onClick={() => dispatch(Actions.exportWithFilter(filter))}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Export
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
      <ImportDialog
        open={importOpen}
        handleClose={() => setImportOpen(false)}
        handleImport={handleImport}
        importCase={filter.type === 'KTX' ? 2 : 3}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
