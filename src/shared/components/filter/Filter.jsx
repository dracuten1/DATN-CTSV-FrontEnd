import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 'fit-content'
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    padding: 16,
    paddingRight: 35
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [selectItem, setSelectItem] = React.useState(null);
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const { label, prop, clickFillter } = props;
  const handleChange = event => {
    setSelectItem(event.target.value);
    clickFillter(prop, event.target.value);
  };
  const drawData = () => {
    const { data } = props;
    return data.map((val, ind) => {
      return (
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
      </FormControl>
    </div>
  );
}
