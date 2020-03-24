
import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { size, uniqueId } from 'lodash';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
    maxWidth: '90%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

function FormSelectMultiple(props) {
  const {
    requerido,
    indice,
    isComplete,
    inhabilitado,
    nomCampo,
    indiceEtapa,
    valor,
    onChange,
    opciones,
    classes,
  } = props;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  }
  return (
    <React.Fragment>
      <FormControl required={requerido} className={classes.formControl}>
        <InputLabel style={{fontSize: 14, color: !isComplete && requerido && size(valor) === 0 ? 'red' : 'rgba(0, 0, 0, 0.54)'}} htmlFor="select-multiple-chip">{nomCampo}</InputLabel>
        <Select
          multiple
          value={inhabilitado ? valor.split('_') : valor}
          onChange={onChange(indiceEtapa,indice)}
          disabled={inhabilitado === 1}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {opciones.map((opcion) => (
            <MenuItem key={uniqueId(`selectM_`)} value={opcion.value}>
              {opcion.value}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText
          style={{color: !isComplete && requerido && size(valor) === 0 && !inhabilitado ? 'red' : 'gray'}}
        >
          {!isComplete && requerido && size(valor) === 0 && !inhabilitado ? 'Campo Requerido *' : ''}
        </FormHelperText>
      </FormControl>
    </React.Fragment>
  );
}

FormSelectMultiple.propTypes = {
  requerido: T.bool,
  indice: T.number,
  isComplete: T.bool,
  inhabilitado: T.number,
  nomCampo: T.string,
  valor: T.any,
  onChange: T.func,
  opciones: T.array,
  classes: T.object,
  indiceEtapa: T.number,
};

export default compose(
  withStyles(styles),
)(FormSelectMultiple);