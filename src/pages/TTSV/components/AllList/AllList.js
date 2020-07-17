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
import ListLinkDocx from 'shared/components/ListLinkDocx/ListLinkDocx';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import { logger } from 'core/services/Apploger';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import Types from 'reduxs/reducers/TTSV/actionTypes';
import * as TTSVHandler from 'handlers/TTSVHandler';
import * as ProgressActions from 'reduxs/reducers/LinearProgress/action';
import Status from '@material-ui/icons/BusinessCenter';
import UpdateIcon from '@material-ui/icons/Update';
import GetAppIcon from '@material-ui/icons/GetApp';
import ImportIcon from '@material-ui/icons/Input';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/TTSV/action';
import UpdateDialog from '../AddDialog/index';
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
let updateBegin = 0;

const AllList = props => {
  const { className, ...rest } = props;
  const TTSVState = useSelector(state => state.TTSVState);

  const { dataList, isCase, listLink } = TTSVState;
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
      arrColumns = Columns.HTCT;
      break;
    case 5: //Dang hoc
      arrColumns = Columns.HTCT;
      break;
    case 6: //Canh cao hoc vu
      arrColumns = Columns.CCHV;
      break;
    case 7: //Bi thoi hoc
      arrColumns = Columns.CCHV;
      break;
    case 8: //Bảo lưu
      arrColumns = Columns.BL;
      break;
    case 9:
      //Dang ky hoc phan
      arrColumns = Columns.DKHP;
      break;
    default:
      //MSSV
      arrColumns = Columns.MSSV;
      break;
  }

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);
  const handleImport = () => { };
  const [filter, setFilter] = React.useState({
    hk: '1',
    nh: `${year - 1}-${year}`,
    type: 'TỐT NGHIỆP',
    mssv: ''
  });

  logger.info('TTSVAction:: getListAll: dataList: ', dataList);

  const [state, setState] = useState({
    data: dataList,
    columns: arrColumns
  });

  // eslint-disable-next-line
  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      newData.scn = data.length + 1;
      // newData.case = reparseCase(newData.case);
      data.push(newData);
      return { ...prevState, data };
    });
  };

  const handleUpdateState = response => {
    switch (filter.type) {
      case 'SINH VIÊN NƯỚC NGOÀI': //SV nuoc ngoai
        arrColumns = Columns.SVNN;
        break;
      case 'TỐT NGHIỆP': //Danh sach tot nghiep
        arrColumns = Columns.DSTN;
        break;
      case 'HOÀN TẤT CHƯƠNG TRÌNH': //Hoan thanh tin chi
        arrColumns = Columns.HTCT;
        break;
      case 'ĐANG HỌC': //Dang hoc
        arrColumns = Columns.HTCT;
        break;
      case 'CẢNH CÁO HỌC VỤ': //Canh cao hoc vu
        arrColumns = Columns.CCHV;
        break;
      case 'BUỘC THÔI HỌC': //Bi thoi hoc
        arrColumns = Columns.CCHV;
        break;
      case 'BẢO LƯU': //Bảo lưu
        arrColumns = Columns.BL;
        break;
      case 'ĐĂNG KÝ HỌC PHẦN':
        //Dang ky hoc phan
        arrColumns = Columns.DKHP;
        break;
      default:
        break;
    }
    setState({
      ...state,
      data: response,
      columns: arrColumns
    });
  };

  const handleUpdateStateMSSV = response => {
    arrColumns = Columns.MSSV;
    setState({
      ...state,
      data: response,
      columns: arrColumns
    });
  };

  const handleShowListData = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getListWithFilter(filter)).then(data =>
      handleUpdateState(data)
    );
  };

  const handleShowDataMSSV = () => {
    dispatch(ProgressActions.showProgres());
    dispatch(Actions.getListWithMSSV(filter)).then(data =>
      handleUpdateStateMSSV(data)
    );
  };

  if (updateBegin === 0) {
    dispatch(ProgressActions.showProgres());
    handleShowListData();
    updateBegin += 1;
  }

  const successSnackBar = {
    open: true,
    type: 'success',
    message: 'Thực hiện thành công!'
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

  const handleFilter = (prop, data) => {
    setFilter({ ...filter, [prop]: data });
  };

  const [updateDialogStage, setUpdateDialogStage] = useState(false);
  const handleCloseUpdateDialog = () => {
    setUpdateDialogStage(false);
  };
  const handleOpenUpdateDialog = () => {
    setUpdateDialogStage(true);
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
          <Status style={{ marginRight: '5px' }} /> TÌNH TRẠNG SINH VIÊN
        </Typography>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={handleShowListData}
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: '8px' }}
          >
            Danh sách tình trạng
          </Button>
          <Button
            onClick={() =>
              dispatch(Actions.changeColumnMSSV()).then(data =>
                handleUpdateStateMSSV([])
              )
            }
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: '8px' }}
          >
            Thông tin sinh viên
          </Button>
        </div>
      </Card>
      <Card {...rest} className={clsx(classes.root, className)}>
        <UpdateDialog
          open={updateDialogStage}
          handleClose={handleCloseUpdateDialog}
        />
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}>
              <Filters onFilter={handleFilter} filter={filter} isCase={isCase} />
              <ContainedButton
                handleClick={
                  isCase === 10 ? handleShowDataMSSV : handleShowListData
                }
                label="Lọc sinh viên"
              />
            </div>
          </MuiThemeProvider>
          <div>
            {isCase !== 10 ? (
              <>
                <Button
                  onClick={handleOpenUpdateDialog}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: '8px' }}
                >
                  <UpdateIcon /> Cập nhật TTSV
                </Button>
                <Button
                  onClick={() => setImportOpen(true)}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginLeft: '8px' }}
                >
                  <ImportIcon /> &nbsp;Import
                </Button>
              </>
            ) : (
                <div />
              )}
            <Button
              onClick={async () => {
                dispatch(ProgressActions.showProgres());
                const response = await TTSVHandler.ExportWithFilter(filter);
                if (
                  response.statusCode !== 200 ||
                  response.body === 'Không có gì để export'
                ) {
                  setSnackBarValue(errorExportSnackBar);
                  dispatch(ProgressActions.hideProgress());
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
                      {isCase === 10 ? (
                        <b>Tình Trạng Sinh Viên</b>
                      ) : (
                          <b>DANH SÁCH {filter.type}</b>
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
                    filtering: false
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
        <CustomizedSnackbars
          value={snackBarValue}
          handleClose={handleSnackBarClose}
        />
        <ImportDialog
          open={importOpen}
          handleClose={() => setImportOpen(false)}
          handleImport={handleImport}
          importCase={4}
          ttsvCase={filter.type}
        />
      </Card>
    </div>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
