
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
import { uniqueId } from 'lodash';

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
    indiceEtapa,
    nomCampo,
    valor,
    onChange,
    opciones,
    classes,
  } = props;
  // ('opciones: ',opciones);
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
        <React.Fragment key={uniqueId('reactSelectM_')}>
          {campoIndex === 3 ? <Grid item xs={6} sm={3} md={3}/> : null}
          <Grid key={uniqueId('selectMopcion_')} item xs={6} sm={3} md={3}>
            <FormControlLabel 
              className={classes.formControl}
              required={requerido}
              control={
                <Checkbox
                  // eslint-disable-next-line no-nested-ternary
                  checked={opc.id === true}
                  onChange={onChange(indiceEtapa,indice, campoIndex)}
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
  indiceEtapa: T.number,
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