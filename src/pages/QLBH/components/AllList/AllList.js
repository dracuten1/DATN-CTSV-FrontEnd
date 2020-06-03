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
import { logger } from 'core/services/Apploger';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import * as QLHBHandler from 'handlers/QLHBHandler';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/QLHB/action';
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
let type = 'KK';

const AllList = props => {
  const { className, ...rest } = props;
  const QLHBState = useSelector(state => state.QLHBState);
  const { dataList, isHBKK, listLink } = QLHBState;

  const classes = useStyles();
  const dispatch = useDispatch();

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${convert - 1}-${convert}`
  });

  const [state, setState] = useState({
    data: dataList,
    columns: isHBKK ? Columns.HBKK : Columns.HBTT
  });

  if (updateBegin === 0) {
    dispatch(Actions.getListWithFilter(filter, type));
    updateBegin += 1;
  }

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: isHBKK ? Columns.HBKK : Columns.HBTT
    });
    updateBegin += 1;
  }

  if (updateBegin === 2 && state.data.length !== dataList.length) {
    setState({
      ...state,
      data: dataList,
      columns: isHBKK ? Columns.HBKK : Columns.HBTT
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

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công!'
  };
  const errorSnackBar = {
    open: true,
    type: 'error',
    message: 'Đã xảy ra lỗi, vui lòng kiểm tra lại!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} />
        <ContainedButton
          handleClick={() => {
            dispatch(Actions.getListWithFilter(filter, type));
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
                  {isHBKK ? <b>Danh Sách HBKK</b> : <b>DANH SÁCH HBTT</b>}
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
                filtering: false
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout( async () => {
                      resolve();
                      if (oldData) {
                        logger.info('Newdata: ', newData);
                        const response = await QLHBHandler.UpdateOneStudentByType(newData, type);
                        if (response.statusCode !== 200){
                            setSnackBarValue(errorSnackBar);
                            return;
                        }
                        setSnackBarValue(successSnackBar);
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),

                onRowDelete:  oldData =>
                  new Promise(resolve => {
                    setTimeout( async ()  =>  {
                      resolve();
                      logger.info('Olddata: ', oldData);
                      const { PK, SK, id } = oldData;
                      const response = await QLHBHandler.DeleteOneCertificate(PK, SK, type, id);
                      if (response.statusCode !== 200){
                          setSnackBarValue(errorSnackBar);
                          return;
                      }
                      setSnackBarValue(successSnackBar);
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
              onClick={() => {
                type = 'KK';
                updateBegin = 1;
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              HBKK
            </Button>
            <Button
              onClick={() => {
                type = 'TT';
                updateBegin = 1;
                dispatch(Actions.getListWithFilter(filter, type));
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              HBTT
            </Button>
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
              onClick={() => dispatch(Actions.exportWithFilter(filter, type))}
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
        importCase={isHBKK ? 'KK' : 'TT'}
      />
      <CustomizedSnackbars
        value={snackBarValue}
        handleClose={handleSnackBarClose}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
