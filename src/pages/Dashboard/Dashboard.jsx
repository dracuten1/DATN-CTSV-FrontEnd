import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Admin from '@material-ui/icons/Person';
import Confirm from '@material-ui/icons/CheckCircleOutline';
import Grade from '@material-ui/icons/Grade';
import Home from '@material-ui/icons/Home';
import Status from '@material-ui/icons/BusinessCenter';
import Description from '@material-ui/icons/Description';
import Policy from '@material-ui/icons/Accessible';
import Activity from '@material-ui/icons/ImportContacts';
import Card from '@material-ui/icons/Payment';
import Hospital from '@material-ui/icons/LocalHospital';
import Scholarship from '@material-ui/icons/School';
import BlockIcon from '@material-ui/icons/Block';
// core components
import { Grid } from '@material-ui/core';
import InfoArea from 'shared/components/InfoArea/InfoArea';
import { title } from 'shared/styles/material';

const useStyles = makeStyles(theme => ({
  section: {
    textAlign: 'center'
  },
  title: {
    ...title,
    textDecoration: 'none',
    fontSize: 40
  },
  description: {
    color: '#999'
  }
}));

const data = [
  {
    title: 'Admin',
    description: 'Quản lý và cấp quyền các tài khoản User',
    icon: Admin,
    iconColor: 'info',
    link: '/xnsv'
  },
  {
    title: 'Xác nhận sinh viên',
    description:
      'Cung cấp các giấy xác nhận thông tin kèm chứng nhận của nhà trường',
    icon: Confirm,
    iconColor: 'info',
    link: '/xnsv'
  },
  {
    title: 'Điểm rèn luyện',
    description:
      'Cung cấp và quản lý điểm rèn luyện từng học kỳ của Sinh Viên',
    icon: Grade,
    iconColor: 'info',
    link: '/drl'
  },
  {
    title: 'Bảo hiểm',
    description:
      'Quản lý và cung cấp bảo hiểm cho Sinh Viên theo từng năm học',
    icon: Hospital,
    iconColor: 'info',
    link: '/qlbh'
  },
  {
    title: 'Thông tin lưu trú',
    description: 'Quản lý nơi cư trú của Sinh Viên theo từng năm học',
    icon: Home,
    iconColor: 'info',
    link: '/qllt0'
  },
  {
    title: 'Tình trạng sinh viên',
    description: 'Quản lý tình trạng Sinh Viên theo từng học kỳ',
    icon: Status,
    iconColor: 'info',
    link: '/ttsv'
  },
  {
    title: 'Hồ sơ sinh viên',
    description: 'Quản lý hồ sơ Sinh Viên',
    icon: Description,
    iconColor: 'info',
    link: '/hssv'
  },
  {
    title: 'Chế độ chính sách',
    description:
      'Quản lý và cung cấp những hỗ trợ cho Sinh Viên theo từng chế độ chính sách',
    icon: Policy,
    iconColor: 'info',
    link: '/cdcs'
  },
  {
    title: 'Sinh hoạt công dân',
    description: 'Quản lý và tổ chức các lớp Sinh Hoạt Công Dân mỗi năm học',
    icon: Activity,
    iconColor: 'info',
    link: '/shcd'
  },
  {
    title: 'Tài khoản ngân hàng',
    description: 'Quản lý tài khoản ngân hàng của Sinh Viên',
    icon: Card,
    iconColor: 'info',
    link: '/tknh'
  },
  {
    title: 'Sinh viên nhận học bổng',
    description:
      'Quản lý và khen thưởng cho Sinh Viên đạt được giải thưởng, học bổng',
    icon: Scholarship,
    iconColor: 'info',
    link: '/qlhb'
  },
  {
    title: 'Khen thưởng - Kỷ luật',
    description: 'Quản lý sinh viên được khen thưởng và bị kỷ luật Sinh Viên',
    icon: BlockIcon,
    iconColor: 'info',
    link: '/ktkl'
  }
];

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={8}>
          <h1 className={classes.title}>Hệ Thống Hỗ Trợ Nghiệp Vụ Phòng Công Tác Sinh Viên</h1>
          {/* <h5 className={classes.description}>
            Tham mưu và giúp Hiệu trưởng xây dựng các kế hoạch, biện pháp tổ
            chức thực hiện các hoạt động nhằm giáo dục về chính trị, tư tưởng
            cho sinh viên; <br /> xây dựng các quy chế, quy định và kế hoạch tổ chức
            quản lý sinh viên; phục vụ quyền lợi chính đáng của sinh viên; tổ
            chức giám sát, kiểm tra, đánh giá kết quả thực hiện công tác sinh
            viên theo nhiệm vụ được giao.
          </h5> */}
        </Grid>
      </Grid>
      <div>
        <Grid container>
          {data.map((item, index) => {
            return (
              <Grid item xs={12} sm={12} md={4} key={`${index}ind`}>
                <InfoArea
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  iconColor={item.iconColor}
                  link={item.link}
                  vertical
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}
