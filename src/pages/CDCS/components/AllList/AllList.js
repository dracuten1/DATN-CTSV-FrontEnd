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
  Grid,
  MuiThemeProvider,
  Typography
} from '@material-ui/core';
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import Policy from '@material-ui/icons/Accessible';
import * as CDCSHandler from 'handlers/CDCSHandler';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import ImportDialog from 'shared/components/importDialogNewHost/ImportDialogNewHost';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import Types from 'reduxs/reducers/CDCS/actionTypes';
import Actions from 'reduxs/reducers/CDCS/action';
import Columns from './columns';
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
// const convert = year % 100;

let isList = true;
let updateBegin = 0;
let columns = [];

const AllList = props => {
  const { className, ...rest } = props;
  const CDCSState = useSelector(state => state.CDCSState);
  const { isAdmin } = useSelector(state => state.auth);

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
    DoiTuong: []
  });

  const [state, setState] = useState({
    isTK: false,
    data: dataList,
    columns: columns
  });

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

  const handleUpdateStateMSSV = response => {
    columns = Columns.TKMSSV;
    title = 'Thống Kê Theo MSSV';
    setState({
      ...state,
      data: response,
      columns: columns
    });
  };

  const handleShowListDataWithFilter = () => {
    isList = true;
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.listDataWithFilter(filter)).then(data =>
      handleUpdateState(data)
    );
  };

  const handleShowDataWithFilter = () => {
    isList = false;
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.countingWithFilter(filter)).then(data =>
      handleUpdateState(data)
    );
  };

  const handleShowDataWithMSSV = () => {
    isList = false;
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.changeCountingColumnsCounting());
  };

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getDataFilter()).then(payload => {
      const { DoiTuongCDCS } = payload;
      setfilter({
        ...filter,
        DoiTuong: DoiTuongCDCS.length > 0 ? [DoiTuongCDCS[0].SK] : []
      });
    });
    // dispatch(Actions.countingWithFilter(filter)).then(data =>
    //   handleUpdateState(data)
    // );
    handleShowListDataWithFilter();
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
    message: 'Thực hiện thất bại!'
  };
  const errorSnackBarType = {
    open: true,
    type: 'error',
    message: 'Vui lòng chọn Đối Tượng!'
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
          <Policy style={{ marginRight: '5px' }} /> CHẾ ĐỘ CHÍNH SÁCH
        </Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleShowListDataWithFilter}
          >
            Danh sách theo loại CDCS
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleShowDataWithFilter}
          >
            Thống kê theo loại CDCS
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleShowDataWithMSSV}
          >
            Thống kê theo MSSV
          </Button>
        </div>
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
              <Filters
                onFilter={handleFilter}
                isCase={isCase}
                isList={isList}
                filter={filter}
              />
              <ContainedButton
                handleClick={() => {
                  if (isCase === 6) {
                    if (filter.mssv === '') {
                      setSnackBarValue(errorSnackBarMSSV);
                      dispatch(ProgressActions.hideProgress());
                    } else handleShowDataWithMSSV();
                  } else if (!isList && filter.DoiTuong.length === 0) {
                    setSnackBarValue(errorSnackBarType);
                    dispatch(ProgressActions.hideProgress());
                  } else
                    isList
                      ? handleShowListDataWithFilter()
                      : handleShowDataWithFilter();
                }}
                label="Lọc dữ liệu"
              />
            </div>
          </MuiThemeProvider>
          <div>
            {isAdmin ? (
              <>
                {isList ? (
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
              </>
            ) : (
              <div />
            )}
            <Button
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                let response;
                if (isCase === 6) {
                  response = await CDCSHandler.ExportCountingWithMSSV(filter);
                } else {
                  response = isList
                    ? await CDCSHandler.ExportListWithFilter(filter)
                    : await CDCSHandler.ExportCountingWithFilter(filter);
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
              <GetAppIcon /> &nbsp; Export
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
                  editable={{
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(async () => {
                          resolve();
                          const { PK, SK } = oldData;
                          const response = await CDCSHandler.DeleteData(PK, SK);
                          if (response.statusCode !== 200) {
                            dispatch(ProgressActions.hideProgress());
                            setSnackBarValue(errorSnackBar);
                            return;
                          }
                          dispatch(ProgressActions.hideProgress());
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
          importCase={filter.typeCDCS}
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
