/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import T from 'prop-types';
import { compose } from 'recompose';
import {
  startCase,
  find,
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
      numUsuarioLogeado,
      cargarPlazasAutorizadas,
    } = this.props;
    
    if(inhabilitado === 0){
      if(!requeridoRelacion){
        cargarDatosCatalogo2(relaciones[0].SP,relaciones[0].Parametros,idxCatalogo,relaciones[0].IdCatalogo)
        
      }
    }
    if(relaciones[0].Nombre === 'Plazas'){
      cargarPlazasAutorizadas(numUsuarioLogeado)
    }
    
  }

  render(){

    const {
      classes,
      nombre,
      idxCatalogo,
      valor,
      // requerido,
      inhabilitado,
      relacionaOtro,
      plazaUsuarioLogeado,
      plazasAutorizadas,
      tabSelected,
      relaciones,
      actions:{
        cambiarValorCatalogo,
      },
    } = this.props;

    let {
      itemsCatalogo,
    } = this.props;
    
    itemsCatalogo === undefined || itemsCatalogo === null ? itemsCatalogo = [] : itemsCatalogo;
    plazasAutorizadas === undefined || plazasAutorizadas === null || plazasAutorizadas.length === 0 ? plazasAutorizadas.push({'IdPlaza': plazaUsuarioLogeado}) : plazasAutorizadas;

    return(
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor={nombre}>{nombre}</InputLabel>
          <Select
            name={relaciones[0].Nombre}
            value={valor}
            disabled={inhabilitado === 1}
            autoWidth
            onChange={cambiarValorCatalogo(idxCatalogo,relaciones,relacionaOtro)}
            style={{
              fontSize:'0.8rem',
            }}
            // input={<Input name={Nombre} id="name-disabled" />}
          >
            {itemsCatalogo.map((opc,idxOpc) => {
              if(relaciones[0].Nombre === 'Plazas' && find(plazasAutorizadas,{'IdPlaza': opc.IdPlazaReal}) && tabSelected === 0 && inhabilitado === 0){
                return <MenuItem
                  key={`item_cat_${idxOpc}`}
                  value={opc.Id}
                >
                  {startCase(opc.Descripcion)}
                </MenuItem>
              // eslint-disable-next-line no-else-return
              }else if(relaciones[0].Nombre !== 'Plazas' && tabSelected === 0){
                return <MenuItem
                  key={`item_cat_${idxOpc}`}
                  value={opc.Id}
                >
                  {startCase(opc.Descripcion)}
                </MenuItem>
              }else if (tabSelected === 1){
                return <MenuItem
                  key={`item_cat_${idxOpc}`}
                  value={opc.Id}
                >
                  {startCase(opc.Descripcion)}
                </MenuItem>
              }else if(relaciones[0].Nombre === 'Plazas' && tabSelected === 0 && inhabilitado === 1){
                return <MenuItem
                  key={`item_cat_${idxOpc}`}
                  value={opc.Id}
                >
                  {startCase(opc.Descripcion)}
                </MenuItem>
              }
              return null
            })}
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
  numUsuarioLogeado:T.number,
  tabSelected:      T.number,
  plazaUsuarioLogeado:T.number,
  // requerido:        T.bool,
  relacionaOtro:    T.bool,
  requeridoRelacion:         T.bool,
  cargarDatosCatalogo2:      T.func,
  itemsCatalogo:    T.array,
  plazasAutorizadas:T.array,
  cargarPlazasAutorizadas: T.func,
}

export default compose(
  withStyles(styles),
)(CatalogoComponent)