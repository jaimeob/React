/* eslint-disable no-unused-expressions */

import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import {
  startCase,
  uniqueId,
} from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit,
  },
});

export class CatalogoComponent extends React.Component{
  
  componentDidMount(){
    const {
      idxCatalogo,
      cargarDatosCatalogo2,
      relaciones,
      requeridoRelacion,
      inhabilitado,
      indiceEtapa,
    } = this.props;
    
    if(inhabilitado === 0){
      if(!requeridoRelacion){
        cargarDatosCatalogo2(relaciones[0].SP,relaciones[0].Parametros,idxCatalogo,relaciones[0].IdCatalogo,indiceEtapa)
      }
    }
  }

  render(){

    const {
      classes,
      nombre,
      idxCatalogo,
      valor,
      requerido,
      inhabilitado,
      relacionaOtro,
      itemsCatalogo,
      relaciones,
      indiceEtapa,
      actions:{
        cambiarValorCatalogo,
      },
    } = this.props;
    
    return(
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={nombre}>{nombre}</InputLabel>
          <Select
            name={relaciones[0].Nombre}
            value={valor}
            disabled={inhabilitado === 1}
            autoWidth
            onChange={cambiarValorCatalogo(idxCatalogo,relaciones,relacionaOtro,indiceEtapa)}
            // input={<Input name={Nombre} id="name-disabled" />}
          >
            {itemsCatalogo.map((opc) => (
              <MenuItem 
                key={uniqueId(`item_cat_`)}
                value={opc.Id}
              >
                {startCase(opc.Descripcion)}
              </MenuItem>
            ))}
          </Select>
          {/* {relaciones[0].Para !== null && relaciones[0].Para !== '' ? <FormHelperText>*Requerido</FormHelperText> : null} */}
        </FormControl>
      </form>
    )
  }
}

CatalogoComponent.propTypes = {
  classes:          T.object,
  actions:          T.object,
  relaciones:       T.array,
  nombre:           T.string,
  idxCatalogo:      T.number,
  valor:            T.number,
  inhabilitado:     T.number,
  indiceEtapa:      T.number,
  requerido:        T.bool,
  relacionaOtro:    T.bool,
  requeridoRelacion:         T.bool,
  cargarDatosCatalogo2:      T.func,
  itemsCatalogo:    T.array,
}

export default compose(
  withStyles(styles),
)(CatalogoComponent)