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
import Actions from '../../../../reduxs/reducers/DRL/action';
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

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { dataPrint, isAlllist } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();
  let arrColumns = [];
  switch (isAlllist) {
    case 1://SV nuoc ngoai
      arrColumns = Columns.SVNN;
      break;
    case 2://DTB
      arrColumns = Columns.DTB;
      break;
    case 3://Danh sach tot nghiep
      arrColumns = Columns.DSTN;
      break;
    case 4://Hoan thanh tin chi
      arrColumns = Columns.HTCT;
      break;
    case 5://Dang hoc
      arrColumns = Columns.HTCT;
      break;
    case 6://Canh cao hoc vu
      arrColumns = Columns.CCHV;
      break;
    case 7://Bi thoi hoc
      arrColumns = Columns.CCHV;
      break;
    default://Dang ky hoc phan
      arrColumns = Columns.DKHP;
      break;
  }

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isAlllist ? mockData.info : mockData.importInfo,
    columns: arrColumns
  });

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardActions className={classes.actions}>
        <Filters />
        <ContainedButton label="Lọc sinh viên" />
      </CardActions>
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <MaterialTable
              icons={icons}
              title={
                <div>
                  {isAlllist ? (
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
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Danh sách tình trạng
        </Button>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
          size="small"
        >
          Sinh viên nước ngoài
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Điểm trung bình
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Tốt nghiệp
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Hoàn tất chương trình
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Đang học
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Cảnh cáo học vụ
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Bị thôi học
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Bảo lưu
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
          variant="contained"
          color="primary"
          size="small"
        >
          Đăng ký HP
        </Button>
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
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
        <Button
          onClick={() => dispatch(Actions.handleAllList())}
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
