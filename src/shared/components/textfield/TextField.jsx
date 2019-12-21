import React from 'react';
import MUITextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// import { useDispatch } from 'react-redux';
// import Actions from '../../../../reduxs/reducers/DRL/action';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
}));

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
