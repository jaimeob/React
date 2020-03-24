/* eslint-disable react/no-array-index-key */
/**
 *
 * FormCheckbox
 *
 */

import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
    maxWidth: '90%',
  },
});

function FormCheckbox(props) {
  const {
    requerido,
    indice,
    isComplete,
    inhabilitado,
    nomCampo,
    valor,
    onChange,
    opciones,
    classes,
  } = props;

  return (
    <React.Fragment>
      <Grid item xs={6} sm={3} md={3} style={{marginTop: 16}}>
        <FormControl >
          <Typography style={{fontSize: 14, fontWeight: 'bold'}}>
            {`${nomCampo}`}
          </Typography>
          <FormHelperText
            style={{color: !isComplete && requerido && !inhabilitado ? 'red' : 'gray'}}
          >
            {!isComplete && requerido && !inhabilitado ? 'Campo Requerido *' : ''}
          </FormHelperText>
        </FormControl>
      </Grid>
      {opciones.map((opc, campoIndex) =>
        <React.Fragment key={`reactSelectM_${indice}_${campoIndex}`}>
          {campoIndex === 3 ? <Grid item xs={6} sm={3} md={3}/> : null}
          <Grid key={`selectMopcion_${indice}_${campoIndex}`} item xs={6} sm={3} md={3}>
            <FormControlLabel 
              className={classes.formControl}
              required={requerido}
              control={
                <Checkbox
                  // eslint-disable-next-line no-nested-ternary
                  checked={valor.length > 0 ? valor[campoIndex] === opc.value : false}
                  onChange={onChange(indice, campoIndex)}
                  value={opc.value}
                  color="primary"
                  disabled={inhabilitado === 1}
                />
              }
              label={opc.value}
            />
          </Grid>
        </React.Fragment>)}
    </React.Fragment>
  );
}

FormCheckbox.propTypes = {
  requerido: T.bool,
  indice: T.number,
  isComplete: T.bool,
  inhabilitado: T.number,
  nomCampo: T.string,
  valor: T.any,
  onChange: T.func,
  opciones: T.array,
  classes: T.object,
};

export default compose(
  withStyles(styles),
)(FormCheckbox);