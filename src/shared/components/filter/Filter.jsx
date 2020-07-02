import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    padding: 16,
    paddingRight: 35
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SimpleSelect(props) {
  const classes = useStyles();
  const {
    label,
    prop,
    clickFilter,
    helperText,
    defaultValue,
    multiple
  } = props;
  const [selectItem, setSelectItem] = React.useState(defaultValue);
  const [selectItemMulti, setSelectItemMulti] = React.useState(Array.isArray(defaultValue) ? defaultValue : []);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSelectItem(event.target.value);
    clickFilter(prop, event.target.value);
  };

  const handleChangeMulti = event => {
    setSelectItemMulti(event.target.value);
    clickFilter(prop, event.target.value);
  };

  const drawData = () => {
    const { data } = props;
    return data.map((val, ind) => {
      return val === 'None' ? (
        <MenuItem key={ind} value={''}>
          {val}
        </MenuItem>
      ) : (
        <MenuItem key={ind} value={val}>
          {val}
        </MenuItem>
      );
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        alignContent: 'baseline',
        height: 'fit-content'
      }}
    >
      {/* {label && (
        <span style={{ minWidth: 'fit-content', alignSelf: 'center' }}>
          {label}
        </span>
      )} */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          {label}
        </InputLabel>
        {multiple ? (
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectItemMulti}
            multiple
            onChange={handleChangeMulti}
            labelWidth={labelWidth}
            MenuProps={MenuProps}
            inputProps={{ className: classes.select }}
          >
            {drawData()}
          </Select>
        ) : (
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectItem}
            onChange={handleChange}
            labelWidth={labelWidth}
            inputProps={{ className: classes.select }}
          >
            {drawData()}
          </Select>
        )}
        {helperText ? <FormHelperText>{helperText}</FormHelperText> : <div />}
      </FormControl>
    </div>
  );
}
