import React from 'react';
import Filter from 'shared/components/filter/Filter';
import { makeStyles } from '@material-ui/core/styles';
import './Filters.scss';

const useStyles = makeStyles(() => ({

    container: {
        display: 'flex',
        flexDirection: 'row',
    }
}));

export default function Filters() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Filter label='Học kỳ' data={['HKI', 'HKII', 'Cả năm']} />
            <Filter label='Năm học' data={[2016, 2017, 2018, 2019, 2020]} />
            <Filter label='Khoa' data={['CNTT', 'CNSH', 'DIA CHAT']} />
            <Filter label='Loại xác nhận' data={['ABC', 'DEF']} />
        </div>
    );
}