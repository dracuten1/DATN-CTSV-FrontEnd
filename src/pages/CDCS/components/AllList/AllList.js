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
import * as CDCSHandler from 'handlers/CDCSHandler';
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import CustomizedSnackbars from 'shared/components/snackBar/SnackBar';
import Types from 'reduxs/reducers/CDCS/actionTypes';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/CDCS/action';
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
    fromHK: '',
    fromNH: '',
    toHK: '',
    toNH: '',
    mssv: '',
    typeCDCS: '',
    doituong: ''
  });

  const [state, setState] = useState({
    isTK: false,
    data: dataList,
    columns: columns
  });

  if (updateBegin === 0) {
    dispatch(Actions.getDataFilter());
    dispatch(Actions.changeCountingColumnsList());
    updateBegin += 1;
  }

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: columns
    });
    updateBegin += 1;
  }

  if (updateBegin === 2 && state.data.length !== dataList.length) {
    setState({
      ...state,
      data: dataList,
      columns: columns
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
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters onFilter={handleFilter} isCase={isCase} />
        <ContainedButton
          handleClick={() => {
            if (isCase === 6) {
              dispatch(Actions.countingWithMSSV(filter));
            } else {
              dispatch(Actions.countingWithFilter(filter));
            }
            updateBegin = 1;
          }}
          label="Lọc dữ liệu"
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
                // exportButton: true,
                filtering: false
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
                type = 'TT';
                updateBegin = 1;
                dispatch(Actions.changeCountingColumnsList());
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
                dispatch(Actions.changeCountingColumnsCounting());
                updateBegin = 1;
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
                if (isCase === 6) {
                  const response = await CDCSHandler.ExportCountingWithMSSV(
                    filter
                  );
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
                } else {
                  const response = await CDCSHandler.ExportCountingWithFilter(
                    filter
                  );
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
                }
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
