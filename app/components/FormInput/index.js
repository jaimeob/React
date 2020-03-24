/**
 *
 * FormInput
 *
 */

import React from 'react';
import T from 'prop-types';
import { compose, withHandlers } from 'recompose';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { parseInt } from 'lodash';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
      allowNegative={false}
    />
  );
}

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
    readOnly,
    width,
    variant,
    rows,
    placeholder,
    adorno,
    adornoFinal,
    numero,
    name,
    focus,
    mostrarShrink,
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
          id={`standard-disabled ${valor}`}
          label={nomCampo}
          autoComplete='off'
          name={name}
          autoFocus={focus}
          placeholder={placeholder || ''}
          multiline={multiline}
          type={tipoInput === 'numero' ? 'number' : 'text'}
          error={!isComplete && requerido && !inhabilitado}
          disabled={inhabilitado}
          rows={rows}
          variant = {variant || 'standard'}
          helperText={requerido && !inhabilitado ? '*Requerido' : ''}
          onInput = {onInputChange(tipoInput, longitud)}
          InputLabelProps={{
            shrink:mostrarShrink,
            style:{
              fontSize: 14,
            },
          }}
          value={valor}
          onChange={onChange(indice)}
          lang="en"
          InputProps={{
            startAdornment: adorno,
            endAdornment: adornoFinal,
            inputComponent: numero && NumberFormatCustom,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            autoFocus: focus,
            maxLength: longitud,
            startadornment: adorno,
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
  variant: T.string,
  placeholder: T.string,
  adorno: T.element,
  adornoFinal: T.element,
  numero: T.bool,
  name: T.string,
  focus: T.bool,
  mostrarShrink: T.bool,
};

export default compose(
  withHandlers({
    onInputChange: () => (tipoInput, longitud) => (event) => {
      let {
        target: { value },
      } = event;
      // eslint-disable-next-line no-nested-ternary
      value = (tipoInput === 'numero' ? (value > 0 ? (parseInt(value) < longitud ? parseInt(value) : longitud) : 0) : value)
      // eslint-disable-next-line no-nested-ternary
      event.target.value = tipoInput === 'numero' && event.target.value === 0 ? '' : (event.target.value.trim() === '' ? '' : event.target.value);
      return value;
    },
  }),
)(FormInput);
