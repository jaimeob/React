/**
 *
 * Switch
 *
 */

import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Switch, FormControlLabel } from '@material-ui/core';


const SwitchCustomGreen = withStyles({
  switchBase: {
    '&$checked + $bar': {
      color: '#28950f',
      backgroundColor: '#28950f',
    },
    '&$checked': {
      color: '#28950f',
    },
  },
  checked: {},
  bar: {},
})(Switch);

function SwitchCustom(props) {
  const {
    onChange,
    checked,
    value,
    label,
  } = props;

  return (
    <React.Fragment>
      <FormControlLabel
        control={
          <SwitchCustomGreen 
            checked={checked} 
            onChange={onChange}
            value={value}
          />
        }
        label={label || null}
      />
    </React.Fragment>
  );
}

SwitchCustom.propTypes = {
  onChange: T.func,
  checked:  T.bool,
  value: T.bool,
  label: T.string,
};

export default SwitchCustom;
