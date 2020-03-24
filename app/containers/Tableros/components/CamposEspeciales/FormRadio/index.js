
import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { uniqueId } from 'lodash';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
    maxWidth: '90%',
  },
});

function FormRadio(props) {
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
      <Grid key={`selectS_${tipo}_${indice}`} item xs={4} sm={3} md={3} style={{paddingTop: 16}}>
        <FormControl>
          <Typography style={{fontSize: 14, fontWeight: 'bold'}}>{`${nomCampo}`}</Typography>
        </FormControl>
        <FormHelperText
          style={{color: !isComplete && requerido && !inhabilitado ? 'red' : 'gray'}}
        >
          {!isComplete && requerido && !inhabilitado ? 'Campo Requerido *' : ''}
        </FormHelperText>
      </Grid>
      {opciones.map((opc, index) => (
        <React.Fragment>
          {index === 3 ? <Grid item xs={4} sm={3} md={3}/> : null}
          <Grid key={uniqueId(`selectSopc_`)} item xs={4} sm={3} md={3} >
            <FormControlLabel
              className={classes.formControl}
              required={requerido}
              control={
                <Radio
                  checked={valor === opc.value}
                  onChange={onChange(indiceEtapa,indice, index)}
                  value={opc.value}
                  disabled={inhabilitado === 1}
                  name="radiob"
                  aria-label="A"
                  style={{ fontSize: 14}}
                />
              }
              label={opc.value}                            
            />
          </Grid>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}

FormRadio.propTypes = {
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
)(FormRadio);