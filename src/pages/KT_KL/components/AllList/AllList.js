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
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core';

import ContainedButton from 'shared/components/containedButton/ContainedButton';
import icons from 'shared/icons';
import mockData from './data';
import Actions from '../../../../reduxs/reducers/DRL/action';
import { Filters } from '../Filters';
import { AddDialog } from '../AddDialog';
import { MuiThemeProvider } from '@material-ui/core';
import themeTable from 'shared/styles/theme/overrides/MuiTable';
import themeFilter from 'shared/styles/theme/overrides/MuiFilter';
import BlockIcon from '@material-ui/icons/Block';
import ImportIcon from '@material-ui/icons/Input';
import PostAddIcon from '@material-ui/icons/PostAdd';
import PrintIcon from '@material-ui/icons/Print';
import ListAltIcon from '@material-ui/icons/ListAlt';
import * as KTKLhandler from 'handlers/KTKLHandler';
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

const AllList = props => {
  const { className, ...rest } = props;
  const QLLTState = useSelector(state => state.QLLTState);

  const { isKyLuat } = QLLTState;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({
    data: isKyLuat ? mockData.info : mockData.importInfo,
    columns: isKyLuat
      ? [
        { title: 'STT', field: 'stt', editable: 'never', filtering: false },
        { title: 'MSSV', field: 'mssv', filtering: false },
        { title: 'Họ tên', field: 'name', filtering: false },
        {
          title: 'Nội dung vi phạm',
          field: 'ktx'
        },
        {
          title: 'Hình thức kỷ luật',
          field: 'portal'
        },
        {
          title: 'Số quyết định',
          field: 'portal'
        },
        {
          title: 'Ngày quyết định',
          field: 'portal'
        },
        {
          title: 'Trách nhiệm pháp lý',
          field: 'portal'
        },
        {
          title: 'Năm học',
          field: 'year',
          lookup: {
            1: '2016-2017',
            2: '2017-2018',
            3: '2018-2019',
            4: '2019-2020'
          },
          filterCellStyle: {
            paddingTop: 1
          }
        },
        {
          title: 'Học kỳ',
          field: 'semester',
          lookup: {
            1: '1',
            2: '2'
          },
          filterCellStyle: {
            paddingTop: 1
          }
        }
      ]
      : [
        { title: 'STT', field: 'stt', editable: 'never', filtering: false },
        { title: 'MSSV', field: 'mssv', filtering: false },
        { title: 'Họ tên', field: 'name', filtering: false },
        {
          title: 'Thành tích',
          field: 'ktx'
        },
        {
          title: 'Cấp đạt giải',
          field: 'ktx'
        },
        {
          title: 'Số tiền',
          field: 'ktx'
        },
        {
          title: 'Loại',
          field: 'ktx'
        },
        {
          title: 'Cấp khen thưởng',
          field: 'ktx'
        },
        {
          title: 'Quyết định',
          field: 'ktx'
        },
        {
          title: 'Ngày',
          field: 'ktx'
        },
        {
          title: 'Năm học',
          field: 'year',
          lookup: {
            1: '2016-2017',
            2: '2017-2018',
            3: '2018-2019',
            4: '2019-2020'
          },
          filterCellStyle: {
            paddingTop: 1
          }
        },
        {
          title: 'Học kỳ',
          field: 'semester',
          lookup: {
            1: '1',
            2: '2'
          },
          filterCellStyle: {
            paddingTop: 1
          }
        },
        {
          title: 'Ghi chú',
          field: 'note',
          filtering: false
        }
      ]
  });

  const handleAdd = newData => {
    setState(prevState => {
      const data = [...prevState.data];
      data.push(newData);
      return { ...prevState, data };
    });
    setOpen(false);
  };
  //TKKT: Thong ke ky luat
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleTKKLClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleTKKLClose = () => {
    setAnchorEl(null);
  };

  //TKKL: Thong ke khen thuong
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleTKKTClick = (event) => {
    setAnchorEl2(event.currentTarget);

  };
  const handleTKKTClose = () => {
    setAnchorEl2(null);
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
          <BlockIcon style={{ marginRight: '5px' }} /> KHEN THƯỞNG - KỶ LUẬT
        </Typography>
        <div>
          <Button
            aria-controls="thongkekyluat"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleTKKLClick}
          >
            THỐNG KÊ KỶ LUẬT
          </Button>
          <Menu
            id="thongkekyluat"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleTKKLClose}
          >
            <MenuItem onClick={handleTKKLClose}>Theo MSSV</MenuItem>
            <MenuItem onClick={handleTKKLClose}>Tất cả sinh viên</MenuItem>
          </Menu>
          <Button
            aria-controls="thongkekhenthuong"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            className={classes.ml5px}
            onClick={handleTKKTClick}
          >
            THỐNG KÊ KHEN THƯỞNG
          </Button>
          <Menu
            id="thongkekhenthuong"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleTKKTClose}
          >
            <MenuItem onClick={handleTKKTClose}>Theo MSSV</MenuItem>
            <MenuItem onClick={handleTKKTClose}>Tất cả sinh viên</MenuItem>
            <MenuItem onClick={handleTKKTClose}>Theo Cấp Đạt Giải</MenuItem>
            <MenuItem onClick={handleTKKTClose}>Theo Cấp Khen Thưởng</MenuItem>
            <MenuItem onClick={handleTKKTClose}>Theo Loại Khen Thưởng</MenuItem>
          </Menu>

        </div>
      </Card>

      <Card {...rest} className={clsx(classes.root, className)}>
        <CardActions className={classes.actions}>
          <MuiThemeProvider theme={themeFilter}>
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'auto' }}>
              <Filters />
              <ContainedButton label="Lọc sinh viên" />
            </div>
          </MuiThemeProvider>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              <ImportIcon /> &nbsp;Import
        </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '8px' }}
            >
              <PrintIcon />&nbsp;Export
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
                      {isKyLuat ? (
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
              </MuiThemeProvider>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <Divider />
        <AddDialog
          open={open}
          handleClose={() => setOpen(false)}
          handleAdd={handleAdd}
        />
      </Card>
    </div>
  );
};

AllList.propTypes = {
  className: PropTypes.string
};

export default AllList;
