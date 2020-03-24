/**
 *
 * PlanDeTrabajo
 *
 */
import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import socketIOClient from "socket.io-client";
import Actions from './actions';
import makeSelectPlanDeTrabajo from './selectors';
import saga from './saga';
import reducer from './reducer';
import Portafolios from './components/Portafolios';
import ListadosProyectos from './components/ListadoProyectos';
import ImpactosDocumentos from './components/ImpactosDocumentos';
import ImpactosRiesgos from './components/impactosRiesgos';

import LineaBase from "./components/LineaBase";

/* eslint-disable react/prefer-stateless-function */
export class PlanDeTrabajo extends React.Component {
  
  componentDidMount(){
    const {
      usuarioGlobal: {
        IdDepartamento,
        IdEmpleado,
        IdPlaza,
        IdPuesto,
        Imagen,
        Nombre,
        // UsuarioDominio,
        // UsuarioId,
      },
      insertCurrentUserState,
    } = this.props;

    const currentUser = {
      IdDepartamento,
      IdEmpleado,
      IdPlaza,
      IdPuesto,
      Imagen,
      Nombre,
    }
    insertCurrentUserState(currentUser);
  }

  render() {
    const {
      planDeTrabajo:{
        portafolios,
        stepper,
        lineaBase,
        listadoProyectos,
        // imagenAvatar,
        numUsuarioLogeado,
        nomUsuarioLogeado,
        IdUsuarioAutorizador,
      },
      
      actions:{
        abrirModalFormularioAction,
        cerrarModalFormularioAction,
        changeColorPortafolioAction,
        guardarPortafolioAction,
        ajustarNombreAction,
        setCarpetasAction,
        mostrarOpcionesPortafoliosAction,
        obtenerPortafoliosAction,
        abrirEdicionPortafolioAction,
        onAbrirPopAction,
        changeStepperAction,
        abrirModalProyectosAction,
        onChangePlantillaAction,
        handleChangePrioridadAction,
        setNombreProyectoAction,
        cerrarModalProyectosAction,
        obtenerPlantillasAction,
        obtenerEmpleadosAction,
        onChangeEmpleadoAction,
        changeColorProyectoAction,
        guardarProyectoAction,
        obtenerProyectosAction,
        redireccionarPortafoliosAction,
        abrirEdicionProyectoAction,
        onFechaInputAction,
        onChangeEstatusAction,
        onChangeResponsableAction,
        onFechaInputResAction,
        changeFechaAction,
        changeFechaResponsableAction,
        onClickLimpiarAction,
        onClickFiltrarAction,
        onClickFiltrarPendientesAction,
        cambiarStepperAction,
        handleChangeTabDetailsAction,
        setMensajesChatAction,
        onChangeTextFieldEscribirMensajeAction,
        abrirModalObservacionesAction,
        cerrarModalObservacionesAction,
        setAutorizadorAction,
        abrirModalDocumentosAction,
        obtenerObservacionesAction,
        abrirGuardarModalAction,
      },
      usuarioGlobal: {
        IdDepartamento,
        IdEmpleado,
        IdPlaza,
        IdPuesto,
        Imagen,
        Nombre,
        UsuarioDominio,
        UsuarioId,
      },
      permisos,
      
    } = this.props;
    
    const propsLineaBase ={
      lineaBase,
    }

    const propsListadoProyectos ={
      listadoProyectos,
    }
    
    switch (stepper) {
      case 0:
      // COMPONENTE DE JAIME 
        return(
          <Portafolios
            portafolios = {portafolios}
            // METODOS
            abrirModalFormulario = {abrirModalFormularioAction}
            cerrarModalFormulario = {cerrarModalFormularioAction}
            changeColorPortafolio = {changeColorPortafolioAction}
            guardarPortafolio = {guardarPortafolioAction}
            ajustarNombre = {ajustarNombreAction}
            setCarpetas ={setCarpetasAction}
            mostrarOpcionesPortafolios = {mostrarOpcionesPortafoliosAction}
            obtenerPortafolios = {obtenerPortafoliosAction}
            abrirEdicionPortafolio ={abrirEdicionPortafolioAction}
            onAbrirPop = {onAbrirPopAction}
            changeStepper = {changeStepperAction}
            redireccionarPortafolios = {redireccionarPortafoliosAction}
            numUsuarioLogeado = {IdEmpleado}
          />
        );
      case 1:
      // COMPONENTE DE JAIME 
        return (          
          <ListadosProyectos
            listadoProyectos = {listadoProyectos}
            // METODOS
            abrirModalProyectos = {abrirModalProyectosAction}
            onChangePlantilla={onChangePlantillaAction}
            handleChangePrioridad = {handleChangePrioridadAction}
            setNombreProyecto = {setNombreProyectoAction}
            cerrarModalProyectos = {cerrarModalProyectosAction}
            obtenerPlantillas = {obtenerPlantillasAction}
            obtenerEmpleados = {obtenerEmpleadosAction}
            onChangeEmpleado = {onChangeEmpleadoAction}
            changeColorProyecto = {changeColorProyectoAction}
            guardarProyecto = {guardarProyectoAction}
            obtenerProyectos ={obtenerProyectosAction}
            redireccionarPortafolios = {redireccionarPortafoliosAction}
            abrirEdicionProyecto ={abrirEdicionProyectoAction}
            onFechaInput = {onFechaInputAction}
            onChangeEstatus ={onChangeEstatusAction}
            onChangeResponsable = {onChangeResponsableAction}
            onFechaInputRes = {onFechaInputResAction}
            changeFecha = {changeFechaAction}
            changeFechaResponsable ={changeFechaResponsableAction}
            onClickLimpiar={onClickLimpiarAction}
            onClickFiltrar ={onClickFiltrarAction}
            cambiarStepper={cambiarStepperAction}
            abrirModalObservaciones={abrirModalObservacionesAction}
            cerrarModalObservaciones ={cerrarModalObservacionesAction}
            IdDepartamento={IdDepartamento}
            IdPuesto = {IdPuesto}
            setAutorizadorAction = {setAutorizadorAction}
            abrirModalDocumentos = {abrirModalDocumentosAction}
            propsListadoProyectos = {propsListadoProyectos}
            onClickFiltrarPendientes ={onClickFiltrarPendientesAction}
            obtenerObservaciones={obtenerObservacionesAction}
            abrirGuardarModal = {abrirGuardarModalAction}
          />         
        );
      case 2:
      // COMPONENTE DE ALEXIS
        return(
          <LineaBase 
            propsLineaBase = {propsLineaBase}
            handleChangeTabDetails={handleChangeTabDetailsAction}
            setMensajesChat = {setMensajesChatAction}
            onChangeTextFieldEscribirMensaje = {onChangeTextFieldEscribirMensajeAction}
            numUsuarioLogeado = {numUsuarioLogeado}
            nomUsuarioLogeado = {nomUsuarioLogeado}
            IdUsuarioAutorizador = {IdUsuarioAutorizador}
            listadoProyectos = {listadoProyectos}
            cerrarModalObservaciones = {cerrarModalObservacionesAction}
          />
        );
      case 3:
        // COMPONENTE DE ALEXIS
        return(
          <ImpactosDocumentos
            propsListadoProyectos ={propsListadoProyectos}
            permisos = {permisos}
          />
        );

      case 4:
        // COMPONENTE DE ALEXIS
        return(
          <ImpactosRiesgos
            propsListadoProyectos ={propsListadoProyectos}
            permisos = {permisos}
          />
        );

        
      default:
        return null;
    }
  }
}

PlanDeTrabajo.propTypes = {
  planDeTrabajo: T.object,
  actions: T.object,
  usuarioGlobal:  T.object,
  insertCurrentUserState: T.func,
};

const mapStateToProps = createStructuredSelector({
  planDeTrabajo: makeSelectPlanDeTrabajo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'planDeTrabajo', reducer });
const withSaga = injectSaga({ key: 'planDeTrabajo', saga,mode: DAEMON });
const withActions = Actions.bindReduxStore();

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withActions,
  connect(
    /* mapStateToProps */
    null,
    /* mapDispatchToProps */
    (dispatch) => ({
      dispatch,
      insertCurrentUserState: (currentUser) => {         
        dispatch({
          type: 'APP/CONTAINER/TABLEROS/INSERT_CURRENT_USER_ACTION',
          currentUser,
        });

      },

    })
  ),
)(PlanDeTrabajo);
