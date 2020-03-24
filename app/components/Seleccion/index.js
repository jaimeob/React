/**
 *
 * Seleccion
 *
 */

import React from 'react';
import T from 'prop-types';
import { uniqueId } from 'lodash';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Input,
  withStyles,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = () => ({
  formControl: {
    minWidth: '90%',
    maxWidth: '90%',
    marginTop: 2,
  },
  fullWidth: {
    width: '100%',
    marginTop: 2,
  },
});

function Seleccion(props) {

  const {
    opciones,
    idOpcion,
    nomOpcion,
    classes,
    onChange,
    valor,
    requerido,
    inhabilitado,
    label,
    indice,
    campoValido,
    fullWidth,
  } = props;

  const key = uniqueId(`${label}_`);

  return (
    <React.Fragment>
      <FormControl 
        className={fullWidth ? classes.fullWidth : classes.formControl} 
        error={!campoValido && requerido}
        disabled={opciones.length === 0 || inhabilitado}
      >
        {label &&
          <InputLabel 
            style={{
              fontSize: 14,
              whiteSpace: 'nowrap',
            }} 
            htmlFor={key}
          >
            {label}
          </InputLabel>
        }
        <Select
          value={valor}
          onChange={onChange(indice)}
          name={label}
          displayEmpty
          disabled={inhabilitado}
          input={<Input id={key} />}
          style={{fontSize: 14}}
          MenuProps= {{
            PaperProps: {
              style : {
                maxHeight: 45 * 4.5,
              },
            },
          }}
          inputProps={{
            name: label,
            id: key,
          }}
        >
          {
            opciones.map((elem) => 
              <MenuItem 
                style={{fontSize: 14}} 
                key={uniqueId(`${label}_`)} 
                value={elem[idOpcion]}>
                {elem[nomOpcion]}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
      {requerido && 
        <FormHelperText
          style={{color: !campoValido && requerido ? 'red' : 'gray'}}
        >
          {requerido ? '*Requerido' : ''}
        </FormHelperText> }
    </React.Fragment>
  );
}

Seleccion.propTypes = {
  opciones: T.array,
  idOpcion: T.string,
  nomOpcion: T.string,
  requerido: T.bool,
  valor: T.oneOfType([
    T.string,
    T.number,
  ]),
  fullWidth: T.bool,
  onChange: T.func,
  classes: T.object,
  label: T.string,
  indice: T.number,
  campoValido: T.bool,
  inhabilitado: T.bool,
};

export default withStyles(styles)(Seleccion);
