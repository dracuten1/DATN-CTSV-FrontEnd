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
import ImportDialog from 'shared/components/importDialog/ImportDialog';
import { logger } from 'core/services/Apploger';
import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import Columns from './columns';
import Actions from '../../../../reduxs/reducers/TTSV/action';
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
    default:
      //Dang ky hoc phan
      arrColumns = Columns.DKHP;
      break;
  }

  //Import props
  const [importOpen, setImportOpen] = React.useState(false);
  const handleImport = () => { };
  const [filter, setFilter] = React.useState({
    hk: '',
    nh: '',
    type: ''
  });

  logger.info('TTSVAction:: getListAll: dataList: ', dataList);

  const [state, setState] = useState({
    data: dataList,
    columns: arrColumns
  });

  if (updateBegin === 0) {
    dispatch(Actions.getListWithFilter({
      hk: '1',
      nh: `${year}-${year + 1}`,
      type: 'TỐT NGHIỆP'
    }));
    updateBegin += 1;
  }

  if (updateBegin === 1) {
    setState({
      ...state,
      data: dataList,
      columns: arrColumns
    });
    updateBegin += 1;
  }

  // const handleAdd = newData => {
  //   setState(prevState => {
  //     const data = [...prevState.data];
  //     newData.scn = data.length + 1;
  //     // newData.case = reparseCase(newData.case);
  //     data.push(newData);
  //     return { ...prevState, data };
  //   });
  // };

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
                  <b>DANH SÁCH {filter.type}</b>
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
        importCase={4}
        ttsvCase={filter.type}
      />
    </Card>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
