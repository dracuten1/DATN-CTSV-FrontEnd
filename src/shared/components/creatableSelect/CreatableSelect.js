/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
    },
    divider: {
        margin: theme.spacing(2),
        width: '90%',
        alignSelf: 'center'
    }
}));

export default function FreeSoloCreateOption(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const { passNewValueToParent } = props;
    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {

                let tmpvalue;
                if (typeof newValue === 'string') {
                    tmpvalue = {
                        title: newValue,
                    };
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    tmpvalue = {
                        title: newValue.inputValue,
                    }
                } else {
                    tmpvalue = newValue;
                }

                setValue(tmpvalue)
                passNewValueToParent({
                    target: {
                        value: tmpvalue.title,
                    }
                });
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Thêm "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={props.option}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(option) => option.title}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} margin="normal" className={classes.textField} label="Công ty" />
            )}
        />
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
// ];
