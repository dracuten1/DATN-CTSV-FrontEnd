import React from 'react';
import Button from '@material-ui/core/Button';
import MUITextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import moment from 'moment';
import VayVonDialog from 'pages/XNSV/components/VayVonDialog/VayVonDialog';
import ThucTapDialog from 'pages/XNSV/components/ThucTapDialog/ThucTapDialog';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// import { useDispatch } from 'react-redux';
// import Actions from '../../../../reduxs/reducers/DRL/action';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
}));

const date = new Date();


const TextField = props => {

    const classes = useStyles();
    const { label, defaultValue, handleBlur } = props;

    return (
        <MUITextField
            // key={defaultValue}
            className={classes.textField}
            label={label}
            defaultValue={defaultValue}
            onBlur={handleBlur}
            margin="normal"
            variant="outlined"
        />
    );
};

export default TextField;
