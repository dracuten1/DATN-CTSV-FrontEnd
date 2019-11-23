import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 'fit-content',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    select: {
        padding: 10,
        paddingRight: 35
    }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [selectItem, setSelectItem] = React.useState(0);

    const handleChange = event => {
        setSelectItem(event.target.value);
    };
    const drawData = () => {
        const { data } = props;
        return data.map((val, ind) => {
            return (
                <MenuItem key={ind} value={ind}>{val}</MenuItem>
            );
        });
    };
    const { label } = props;
    return (
        <div style={{ display: 'flex', alignContent: 'baseline', height: 'fit-content' }}>
            {label &&
                <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>{label}</span>
            }
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={selectItem}
                    onChange={handleChange}
                    inputProps={{ className: classes.select }}
                // style={{ width: 'max-content' }}
                >
                    {drawData()}
                </Select>
            </FormControl>
        </div >
    );
}