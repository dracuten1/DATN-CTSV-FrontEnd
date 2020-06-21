import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { logger } from 'core/services/Apploger';
import Filter from 'shared/components/filter/Filter';
import InputDateWithLabel from 'shared/components/inputDateWithLabel/InputDateWithLabel';
import './Filters.scss';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

let tempArr = ['None'];

// function FiltersDRL(props) {
//   const classes = useStyles();
//   const { onFilter, valueType, filter } = props;

//   const DRLState = useSelector(state => state.DRLState);
//   const { listUser } = DRLState;
//   const { nh, hk, type, time, xeploai, status, username, from, to } = filter;
//   if (tempArr.length === 1) tempArr = tempArr.concat(listUser);

//   const dt = new Date();
//   const year = dt.getFullYear();

//   switch (valueType) {
//     case 0:
//       return (
//         <>
//           <Filter
//             clickFilter={onFilter}
//             label="Học kỳ"
//             prop="type"
//             defaultValue={type}
//             data={['None', 'HK1', 'HK2', 'NH']}
//           />
//           <Filter
//             clickFilter={onFilter}
//             label="Năm học"
//             prop="time"
//             defaultValue={time}
//             data={[
//               'None',
//               `${year}-${year + 1}`,
//               `${year - 1}-${year}`,
//               `${year - 2}-${year - 1}`,
//               `${year - 3}-${year - 2}`,
//               `${year - 4}-${year - 3}`,
//               `${year - 5}-${year - 4}`,
//               `${year - 6}-${year - 5}`
//             ]}
//           />
//           <Filter
//             clickFilter={onFilter}
//             label="Xếp loại"
//             prop="xeploai"
//             defaultValue={xeploai}
//             data={[
//               'None',
//               'Xuất sắc',
//               'Giỏi',
//               'Khá',
//               'Trung bình',
//               'Yếu',
//               'Kém'
//             ]}
//           />
//         </>
//       );
//     case 1:
//       return (
//         <>
//           <Filter
//             clickFilter={onFilter}
//             prop="status"
//             label="Trạng thái"
//             defaultValue={status}
//             data={['Đã In', 'Chưa In']}
//           />
//           <Filter
//             clickFilter={onFilter}
//             prop="username"
//             label="User"
//             defaultValue={username}
//             data={tempArr}
//           />
//           <InputDateWithLabel
//             prop="from"
//             clickFilter={onFilter}
//             label="Từ ngày"
//           />
//           <InputDateWithLabel
//             prop="to"
//             clickFilter={onFilter}
//             label="Đến ngày"
//           />
//         </>
//       );
//     case 2:
//       return (
//         <>
//           <Filter
//             clickFilter={onFilter}
//             prop="username"
//             label="User"
//             defaultValue={username}
//             data={tempArr}
//           />
//           <InputDateWithLabel
//             prop="from"
//             defaultValue={from}
//             clickFilter={onFilter}
//             label="Từ ngày"
//           />
//           <InputDateWithLabel
//             prop="to"
//             defaultValue={to}
//             clickFilter={onFilter}
//             label="Đến ngày"
//           />
//         </>
//       );
//     default:
//       return (
//         <>
//           <Filter
//             clickFilter={onFilter}
//             label="Học kỳ"
//             prop="hk"
//             defaultValue={hk}
//             data={['None', '1', '2', '3']}
//           />
//           <Filter
//             clickFilter={onFilter}
//             label="Năm học"
//             prop="nh"
//             defaultValue={nh}
//             data={[
//               'None',
//               `${year}-${year + 1}`,
//               `${year - 1}-${year}`,
//               `${year - 2}-${year - 1}`,
//               `${year - 3}-${year - 2}`,
//               `${year - 4}-${year - 3}`,
//               `${year - 5}-${year - 4}`,
//               `${year - 6}-${year - 5}`
//             ]}
//           />
//         </>
//       );
//   }
// }

export default function Filters(props) {
  const classes = useStyles();
  const { onFilter, valueType, filter } = props;

  const DRLState = useSelector(state => state.DRLState);
  const { listUser } = DRLState;
  if (tempArr.length === 1) tempArr = tempArr.concat(listUser);

  const dt = new Date();
  const year = dt.getFullYear();

  const { nh, hk, type, time, xeploai, status, username, from, to } = filter;

  switch (valueType) {
    case 0:
      return (
        <div className={classes.container}>
          <Filter
            clickFilter={onFilter}
            label="Học kỳ"
            prop="type"
            defaultValue={type}
            data={['None', 'HK1', 'HK2', 'NH']}
          />
          <Filter
            clickFilter={onFilter}
            label="Năm học"
            prop="time"
            defaultValue={time}
            data={[
              'None',
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />
          <Filter
            clickFilter={onFilter}
            label="Xếp loại"
            prop="xeploai"
            defaultValue={xeploai}
            data={[
              'None',
              'Xuất sắc',
              'Giỏi',
              'Khá',
              'Trung bình',
              'Yếu',
              'Kém'
            ]}
          />
        </div>
      );
    case 1:
      return (
        <>
        <InputDateWithLabel
            prop="from"
            clickFilter={onFilter}
            label="Từ ngày"
          />
          <InputDateWithLabel
            prop="to"
            clickFilter={onFilter}
            label="Đến ngày"
          />
          <Filter
            clickFilter={onFilter}
            prop="status"
            label="Trạng thái"
            defaultValue={status}
            data={['Đã In', 'Chưa In']}
          />
          <Filter
            clickFilter={onFilter}
            prop="username"
            label="User"
            defaultValue={username}
            data={tempArr}
          />
        </>
      );
    case 2:
      return (
        <>
          <Filter
            clickFilter={onFilter}
            prop="username"
            label="User"
            defaultValue={username}
            data={tempArr}
          />
          <InputDateWithLabel
            prop="from"
            defaultValue={from}
            clickFilter={onFilter}
            label="Từ ngày"
          />
          <InputDateWithLabel
            prop="to"
            defaultValue={to}
            clickFilter={onFilter}
            label="Đến ngày"
          />
        </>
      );
    default:
      return (
        <>
          <Filter
            clickFilter={onFilter}
            label="Học kỳ"
            prop="hk"
            defaultValue={hk}
            data={['None', '1', '2', '3']}
          />
          <Filter
            clickFilter={onFilter}
            label="Năm học"
            prop="nh"
            defaultValue={nh}
            data={[
              'None',
              `${year}-${year + 1}`,
              `${year - 1}-${year}`,
              `${year - 2}-${year - 1}`,
              `${year - 3}-${year - 2}`,
              `${year - 4}-${year - 3}`,
              `${year - 5}-${year - 4}`,
              `${year - 6}-${year - 5}`
            ]}
          />
        </>
      );
  };

  // return (
  //   <div className={classes.container}>
  //     <FiltersDRL onFilter={onFilter} valueType={valueType} filter={filter} />
  //   </div>
  // );
}
