import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  MuiThemeProvider,
  Typography,
  Grid
} from '@material-ui/core';
import { logger } from 'core/services/Apploger';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import icons from 'shared/icons';
import Home from '@material-ui/icons/Home';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import * as QLLTHandler from 'handlers/QLLTHandler';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import Types from 'reduxs/reducers/QLLT/actionTypes';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
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
    justifyContent: 'space-between'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #f0f2f4',
    background: 'white',
    marginBottom: '20px',
    borderRadius: '3px',
    alignItems: 'center',
    padding: '20px'
  },
  title: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#1088e7',
    display: 'flex',
    alignItems: 'center'
  },
  ml5px: {
    marginLeft: '5px'
  }
}));

const dt = new Date();
const year = dt.getFullYear();
const convert = year % 100;

let updateBegin = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);
  const { isAdmin } = useSelector(state => state.auth);

  const { dataList, isAlllist, listLink } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    type: 'KTX'
  });
  const [state, setState] = useState({
    data: dataList,
    columns: Columns.KTX
  });

  const handleUpdateState = (response, bool) => {
    setState({
      ...state,
      data: response,
      columns: bool ? Columns.ALL : Columns.KTX
    });
  };

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

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getKtxListWithFilter(filter)).then(data =>
      handleUpdateState(data, false)
    );
    updateBegin += 1;
  }

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
  const errorExportSnackBar = {
    open: true,
    type: 'error',
    message: 'Export thất bại!'
  };
  const hiddenSnackBar = { open: false };
  const [snackBarValue, setSnackBarValue] = React.useState(hiddenSnackBar);
  const handleSnackBarClose = current => event => {
    setSnackBarValue({ ...current, ...hiddenSnackBar });
  };

  return (
    <div>
      <Card
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
        className={classes.titleContainer}
      >
        <Typography className={classes.title}>
          <Home style={{ marginRight: '5px' }} /> QUẢN LÝ LƯU TRÚ
        </Typography>
      </Card>

      <Card {...rest} className={clsx(classes.root, className)}>
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'auto'
              }}
            >
              <Filters onFilter={handleFilter} filter={filter} />
              <ContainedButton
                handleClick={() => {
                  dispatch(ProgressActions.showProgres());
                  if (filter.type === 'Ngoại Trú')
                    dispatch(Actions.getAllListWithFilter(filter)).then(data =>
                      handleUpdateState(data, true)
                    );
                  else
                    dispatch(Actions.getKtxListWithFilter(filter)).then(data =>
                      handleUpdateState(data, false)
                    );
                  updateBegin = 1;
                }}
                label="Lọc dữ liệu"
              />
            </div>
          </MuiThemeProvider>
          <div>
            {isAdmin ? (
              <Button
                onClick={() => setImportOpen(true)}
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: '8px' }}
              >
                <ImportIcon /> &nbsp;Import
              </Button>
            ) : (
              <div />
            )}
            <Button
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                const response = await QLLTHandler.ExportWithFilter(filter);
                if (
                  response.statusCode !== 200 ||
                  response.body === 'Không có gì để export'
                ) {
                  setSnackBarValue(errorExportSnackBar);
                  return;
                }
                setSnackBarValue(successSnackBar);
                const { body } = response;
                dispatch({ type: Types.ADD_LINK_EXPORT, listLink: body });
                dispatch(ProgressActions.hideProgress());
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              <GetAppIcon /> &nbsp;Export
            </Button>
          </div>
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
                      {isAlllist ? (
                        <b>DANH SÁCH NGOẠI TRÚ</b>
                      ) : (
                        <b>DANH SÁCH KTX</b>
                      )}
                    </div>
                  }
                  columns={state.columns}
                  data={state.data}
                  localization={{
                    header: {
                      actions: 'Chức năng'
                    }
                  }}
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
                        dispatch(ProgressActions.showProgres());
                        setTimeout(async () => {
                          resolve();
                          if (oldData) {
                            setState(prevState => {
                              const data = [...prevState.data];
                              if (isAlllist) {
                                newData['Nội trú']['Cập nhật Portal'] =
                                  newData.portal;
                                newData['Nội trú']['KTX'] = newData.ktx;
                                newData['Xác nhận ngoại trú'] = newData.xnnt;
                              }

                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                            });
                            newData.NH = parseNHToString(newData.nh);
                            const type = isAlllist ? 'all' : 'ktx';
                            logger.info('Newdata: ', newData);
                            const response = await QLLTHandler.UpdateOneStudentByType(
                              newData,
                              type
                            );
                            if (response.statusCode !== 200) {
                              setSnackBarValue(errorSnackBar);
                              dispatch(ProgressActions.hideProgress());
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
                        dispatch(ProgressActions.hideProgress());
                      })
                  }}
                />
              </MuiThemeProvider>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <Divider />
        {listLink.length > 0 ? (
          <CardActions className={classes.actions}>
            <Grid container spacing={4}>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <ListLinkDocx data={listLink} />
              </Grid>
            </Grid>
          </CardActions>
        ) : (
          ''
        )}
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={filter.type === 'KTX' ? 2 : 3}
        />
        <CustomizedSnackbars
          value={snackBarValue}
          handleClose={handleSnackBarClose}
        />
      </Card>
    </div>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
