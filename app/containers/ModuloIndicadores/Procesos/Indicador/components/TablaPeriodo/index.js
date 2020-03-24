/* eslint-disable no-nested-ternary */
import React from 'react';
import T from 'prop-types';
// import 'react-dates/initialize';
// import 'react-dates/lib/css/_datepicker.css';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import DataTable from 'components/DataTable';

const styles = () => ({
  success: {
    backgroundColor: '#28950F',
    '&:disabled': {
      backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    '&:hover': {
      backgroundColor: '#1d7109',
    },
  },
  nubesita: {
    color : '#F9AA33',
  },
  nubesitaTriste: {
    color : 'rgba(0, 0, 0, 0.26)',
  },
})

function TablaPeriodo(props){
  const {
    cabeceras,
    datos,
    onClickDetalle,
  } = props;

  const configuracion = {
    filtro : false,
    descarga : false,
    columnas : false,
    imprimir : false,
    seleccionable: 'none',
    paginado: true,
    buscar: true,
  };
  
  return(
    <React.Fragment>
      <DataTable 
        headers = {cabeceras}
        data = {datos}
        configuracion = {configuracion}
        opciones = {
          [
            {'icon' : 'ver', 'action': onClickDetalle},
          ]
        }
        // params = {
        //   {
        //     mostrarBarra: true,
        //     sinToolbar: true,
        //   }
        // }
        // admin
        temporal
        elevacion={4}
      />
    </React.Fragment>
  )
}

TablaPeriodo.propTypes = {
  cabeceras: T.array,
  datos: T.array,
  onClickDetalle: T.func,
};


export default compose(
  withStyles(styles),
  withHandlers({
    
  }),
)(TablaPeriodo);

