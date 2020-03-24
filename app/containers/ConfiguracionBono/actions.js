/*
 *
 * ConfiguracionBono actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/CONFIGURACIONBONO/',
  subfix: '_ACTION',
});

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_OPEN_FILTER').set(
  type =>
    function setOpenFilterAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_CONFIGURACION_BONO').set(
  type =>
    function getConfiguracionBonoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_CONFIGURACION_BONO').set(
  type =>
    function setConfiguracionBonoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_FILTER').set(
  type =>
    function setListadoFilterAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ROWS_PER_PAGE').set(
  type =>
    function setRowsPerPageAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_SEARCH').set(
  type =>
    function setOpenSearchAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SEARCH_TEXT').set(
  type =>
    function setSearchTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_STEPPER').set(
  type =>
    function setStepperAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TEXTFIELD_GRUPO').set(
  type =>
    function setTextfieldGrupoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TEXTFIELD_DIAS').set(
  type =>
    function setTextfieldDiasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_MENSAJE_LABEL').set(
  type =>    
    function setMensajeLabelAction(datos,campo,valor) {
      return {
        type,
        datos,
        campo,
        valor,
      };
    },
);

Actions.name('SET_OPENMODULOSALIR').set(
  type =>
    function setOpenModuloSalirAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('PUESTOS_CONFIGURACION_BONO').set(
  type =>
    function puestosConfiguracionBonoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PUESTOS').set(
  type =>
    function setPuestosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PUESTOS_DRAG').set(
  type =>
    function setPuestosDragAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PUESTOS_ASIGNADOS').set(
  type =>
    function setPuestosAsignadosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('OBTENER_PERMISOS').set(
  type =>
    function obtenerPermisos() {
      return {
        type,
      };
    },
);

Actions.name('SET_PERMISOS').set(
  type =>
    function setPermisos(payload) {
      return {
        type,
        payload,
      };
    },
);

Actions.name('SET_SELECTED').set(
  type =>
    function setSelectedAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_MENU_CONTEXTUAL').set(
  type =>
    function setOpenMenuContextualAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ID').set(
  type =>
    function setIdAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ACTIVAR_REGISTROS').set(
  type =>
    function setActivarRegistrosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_MODAL').set(
  type =>
    function setOpenModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_VACIO_NOMBRE').set(
  type =>    
    function setVacioNombreAction(datos,nombre,control) {
      return {
        type,
        datos,
        nombre,
        control,
      };
    },
);

Actions.name('GET_VALIDA_EXISTE').set(
  type =>
    function getValidaExisteAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('POST_GUARDAR').set(
  type =>
    function postGuardarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO').set(
  type =>
    function setListadoAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_NOMBRE_SIN_ACTUALIZAR').set(
  type =>
    function setNombreSinActualizarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_DESACTIVAR').set(
  type =>
    function setListadoDesactivarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PAGE').set(
  type =>
    function setPageAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_ACTIVAR').set(
  type =>
    function setListadoActivarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_MODULOSDISABLE').set(
  type =>
    function setModulosdisableAction(datos) {
      return {
        type,
        datos,
      };
    },
);

export default Actions;
