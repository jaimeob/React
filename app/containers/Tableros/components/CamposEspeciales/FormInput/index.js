
import React from 'react';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { parseInt } from 'lodash';

function FormInput(props) {
  const {
    requerido,
    indice,
    isComplete,
    inhabilitado,
    nomCampo,
    valor,
    onChange,
    tipoInput,
    longitud,
    multiline,
    onInputChange,
    indiceEtapa,
    readOnly,
    width,
    variant,
    rows,
    placeholder,
  } = props

  return (
    <React.Fragment>
      <FormControl 
        style={{
          minWidth: width || '90%',
          maxWidth: width ||'90%',
        }}
      >
        <TextField
          id="standard-disabled"
          required={requerido}
          label={nomCampo}
          placeholder={placeholder || ''}
          multiline={multiline}
          type={tipoInput === 'numero' ? 'number' : 'text'}
          error={!isComplete && requerido && !inhabilitado}
          disabled={inhabilitado === 1}
          rows = {rows}
          variant = {variant || 'standard'}
          helperText={!isComplete && requerido && !inhabilitado ? 'Campo Requerido *' : ''}
          onInput = {onInputChange(tipoInput, longitud)}
          InputLabelProps={{
            style:{
              fontSize: 14,
            },
          }}
          value={valor}
          onChange={onChange(indiceEtapa,indice)}
          inputProps={{
            maxLength: longitud,
            style:{
              fontSize: 14,
            },
            readOnly,
          }}
        />
      </FormControl>
    </React.Fragment>
  );
}

FormInput.propTypes = {
  requerido: T.bool,
  indice: T.number,
  isComplete: T.bool,
  inhabilitado: T.number,
  nomCampo: T.string,
  valor: T.any,
  onChange: T.func,
  tipoInput: T.string,
  onInputChange: T.func,
  multiline: T.bool,
  longitud: T.string,
  readOnly: T.bool,
  width: T.string,
  rows: T.number,
  indiceEtapa: T.number,
  variant: T.string,
  placeholder: T.string,
};

export default compose(
  withHandlers({
    onInputChange: () => (tipoInput, longitud) => (event) => {
      let {
        target: { value },
      } = event;
      // eslint-disable-next-line no-nested-ternary
      value = (tipoInput === 'numero' ? (value > 0 ? (parseInt(value) < longitud ? parseInt(value) : longitud) : 0) : value)
      event.target.value = tipoInput === 'numero' && event.target.value === 0 ? '' : event.target.value;
      return value;
    },
  }),
)(FormInput);
