import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';

import { FormControl, FormControlLabel } from '@material-ui/core';

/* eslint-disable react/prefer-stateless-function */
export class SelectionRadio extends React.Component {
  render() {
    return (
      <div>
        <FormControl component="fieldset">
          <RadioGroup name="gender1">
            <FormControlLabel
              value="dias"
              control={<Radio color="default" />}
              label="Días"
              style={{ width: '70px' }}
            />
            <FormControlLabel
              value="horas"
              control={<Radio color="default" />}
              label="Horas"
            />
          </RadioGroup>
          <FormHelperText>*Requerido</FormHelperText>

        </FormControl>
      </div>
    );
  }
}

export default SelectionRadio;
