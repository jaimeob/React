import React from 'react';
import T from 'prop-types';
import {
  withStyles,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 150,
  },
});

const DatePickers = props => {
  // params
  const {
    classes,
    label,
    typeDate,
    date,
    minDate,
  } = props;
  // actions
  const {
    onChangeDate,
  } = props;

  return (
    <TextField
      id="date"
      label={label}
      type="date"
      value={date}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min: minDate,
      }}
      onChange={event => onChangeDate(typeDate,event.target.value)}
    />
  );
}

DatePickers.propTypes = {
  classes: T.object.isRequired,
  label: T.string,
  date: T.string,
  typeDate: T.string,
  onChangeDate: T.func,
  minDate: T.string,
}

export default withStyles(useStyles)(DatePickers)