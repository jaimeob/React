
import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
    maxWidth: '90%',
  },
});

function FormSelect(props) {
  const {
    requerido,
    indice,
    isComplete,
    inhabilitado,
    nomCampo,
    valor,
    onChange,
    tipo,
    opciones,
    classes,
    indiceEtapa,
  } = props;

  return (
    <React.Fragment>
      <FormControl required={requerido} className={classes.formControl}>
        <InputLabel 
          style={{fontSize: 14, color: !isComplete && requerido && !inhabilitado ? 'red' : 'gray'}} 
          htmlFor={`select${indice}`}
        >
          {nomCampo}
        </InputLabel>
        <Select
          value={valor}
          disabled={inhabilitado === 1}
          onChange={onChange(indiceEtapa,indice)}
          style={{fontSize: 14}}
          error={!isComplete && requerido && !inhabilitado}
          inputProps={{
            name: `select${indice}`,
            id: `select${indice}`,
          }}
        >
          {opciones.map((opc) => (
            <MenuItem style={{fontSize: 14}} key={`menuItem_${tipo}_${indice}_${opc.value}`} value={ opc.value }>
              {opc.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          style={{color: isComplete && requerido && !inhabilitado ? 'red' : 'gray'}}
        >
          {!isComplete && requerido && !inhabilitado ? 'Campo Requerido *' : ''}
        </FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}

FormSelect.propTypes = {
  requerido: T.bool,
  indice: T.number,
  isComplete: T.bool,
  inhabilitado: T.number,
  nomCampo: T.string,
  valor: T.any,
  onChange: T.func,
  tipo: T.number,
  opciones: T.array,
  classes: T.object,
  indiceEtapa: T.number,
};

export default compose(
  withStyles(styles),
)(FormSelect);
