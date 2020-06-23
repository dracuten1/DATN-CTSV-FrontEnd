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
  Grid,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core';
import { logger } from 'core/services/Apploger';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import * as CDCSHandler from 'handlers/CDCSHandler';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/CDCS/actionTypes';
import Actions from 'reduxs/reducers/CDCS/action';
import Columns from './columns';
import { Filters } from '../Filters';
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

const dt = new Date();
const year = dt.getFullYear();
const convert = year % 100;

let updateBegin = 0;
let columns = [];

const AllList = props => {
  const { className, ...rest } = props;
  const CDCSState = useSelector(state => state.CDCSState);
  const { dataList, isCase, listLink } = CDCSState;

  const classes = useStyles();
  const dispatch = useDispatch();

  let title;
  switch (isCase) {
    case 1:
      columns = Columns.DTTS;
      title = 'Dân Tộc Thiểu Số';
      break;
    case 2: //DTB
      columns = Columns.HTDX;
      title = 'Hỗ Trợ DX';
      break;
    case 3: //Danh sach tot nghiep
      columns = Columns.TCXH;
      title = 'Trợ Cấp Xã Hội';
      break;
    case 4: //Hoan thanh tin chi
      columns = Columns.MGHP;
      title = 'Miễn Giảm Học Phí';
      break;
    case 5: //Dang hoc
      columns = Columns.SVKT;
      title = 'Sinh Viên Khuyết Tật';
      break;
    default:
      //MSSV
      columns = Columns.TKMSSV;
      title = 'Thống Kê Theo MSSV';
      break;
  }

  const [importOpen, setImportOpen] = React.useState(false);
  const [filter, setfilter] = React.useState({
    fromHK: '1',
    fromNH: `${year - 1}-${year}`,
    toHK: '2',
    toNH: `${year - 1}-${year}`,
    mssv: '',
    typeCDCS: 'DTTS',
    doituong: ''
  });

  const [state, setState] = useState({
    isTK: false,
    data: dataList,
    columns: columns
  });

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getDataFilter());
    dispatch(Actions.countingWithFilter(filter)).then(data =>
      handleUpdateState(data)
    );
    updateBegin += 1;
  }

  const handleFilter = (prop, data) => {
    setfilter({ ...filter, [prop]: data });
  };

  const handleImport = () => {};

  const handleUpdateState = response => {
    switch (filter.typeCDCS) {
      case 'DTTS':
        columns = Columns.DTTS;
        title = 'Dân Tộc Thiểu Số';
        break;
      case 'HTDX': 
        columns = Columns.HTDX;
        title = 'Hỗ Trợ DX';
        break;
      case 'TCXH': 
        columns = Columns.TCXH;
        title = 'Trợ Cấp Xã Hội';
        break;
      case 'MGHP': 
        columns = Columns.MGHP;
        title = 'Miễn Giảm Học Phí';
        break;
      case 'SVKT': 
        columns = Columns.SVKT;
        title = 'Sinh Viên Khuyết Tật';
        break;
      default:
        columns = Columns.DTTS;
        title = 'Dân Tộc Thiểu Số';
        break;
    }
    setState({
      ...state,
      data: response,
      columns: columns
    });
  };

  const handleUpdateStateMSSV = (response) => {
    columns = Columns.TKMSSV;
    title = 'Thống Kê Theo MSSV';
    setState({
      ...state,
      data: response,
      columns: columns
    });
  };

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công!'
  };
  const errorSnackBarType = {
    open: true,
    type: 'error',
    message: 'Vui lòng chọn loại CDCS!'
  };
  const errorSnackBarMSSV = {
    open: true,
    type: 'error',
    message: 'Vui lòng nhập MSSV!'
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

  React.useEffect(() => {
    dispatch(ProgressActions.hideProgress());
    // eslint-disable-next-line
  }, []);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} isCase={isCase} filter={filter}/>
        <ContainedButton
          handleClick={() => {
            dispatch(ProgressActions.showProgres());
            if (isCase === 6) {
              filter.mssv === '' ?
                setSnackBarValue(errorSnackBarMSSV)
              :
                dispatch(Actions.countingWithMSSV(filter)).then(data =>
                handleUpdateStateMSSV(data)
                );
            } else {
              filter.typeCDCS === '' ?
                setSnackBarValue(errorSnackBarType)
              :
                dispatch(Actions.countingWithFilter(filter)).then(data =>
                handleUpdateState(data)
                );
            }
          }}
          label="Lọc dữ liệu"
        />
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
                  <b>{title}</b>
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
                filtering: false
              }}
            />
            </MuiThemeProvider>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Grid container spacing={4}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Button
              onClick={() => {
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.countingWithFilter(filter)).then(data =>
                  handleUpdateState(data)
                  );
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Danh sách
            </Button>
            <Button
              onClick={() => {
                dispatch(ProgressActions.showProgres());
                dispatch(Actions.changeCountingColumnsCounting());
              }}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              Thống kê theo MSSV
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
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                let response;
                if (isCase === 6) {
                  response = await CDCSHandler.ExportCountingWithMSSV(
                    filter
                  );
                } else {
                  response = await CDCSHandler.ExportCountingWithFilter(
                    filter
                  );
                }
                if (
                  response.statusCode !== 200 ||
                  response.body === 'Không có gì để export'
                ) {
                  dispatch(ProgressActions.hideProgress());
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
        importCase={filter.typeCDCS}
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
