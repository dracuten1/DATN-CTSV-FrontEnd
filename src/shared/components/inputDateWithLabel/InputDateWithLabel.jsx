/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    input: {
        height: 0,
    }
}));

export default function UncontrolledTextField(props) {
    const classes = useStyles();

    const {label, value} = props;
    return (
        <div className={classes.container}>
            <span>{label}</span>
            <TextField
                type="date"
                id="outlined-search"
                className={classes.textField}
                defaultValue={value}
                margin="normal"
                variant="outlined"
                inputProps={{className: classes.input}}
            />
        </div>
    );
}
