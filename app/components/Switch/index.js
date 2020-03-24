/**
 *
 * Switch
 *
 */

import React from 'react';
import T from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import SwitchNormal from '@material-ui/core/Switch';


const GreenSwitch = withStyles({
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
})(SwitchNormal);

/* eslint-disable react/prefer-stateless-function */
function Switch(props) {
  const {
    onChange,
    checked,
  } = props;

  return (
    <div>
      <GreenSwitch
        onChange ={onChange}
        checked = {checked}
      />
    </div>
  );
}

Switch.propTypes = {
  onChange: T.func,
  checked:  T.bool,
};

export default Switch;
