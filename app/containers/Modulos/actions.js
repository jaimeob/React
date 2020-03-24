/*
 *
 * Modulos actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/MODULOS/',
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

Actions.name('GET_LISTADO').set(
  type =>
    function getListadoAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_TIPOAGRUPADORES').set(
  type =>
    function getTipoagrupadoresAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_URLFUNCION').set(
  type =>
    function getUrlFuncionAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_MODULOFUNCION').set(
  type =>
    function getModuloFuncionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_VALIDAEXISTEMODULO').set(
  type =>
    function getValidaExisteModuloAction(datos) {
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

Actions.name('SET_LISTADO_FILTER').set(
  type =>
    function setListadoFilterAction(datos) {
      return {
        type,
        datos,
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

Actions.name('SET_MODALFUNCIONESDISABLE').set(
  type =>
    function setModalfuncionesdisableAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_NOMBREMODULOSINACTUALIZAR').set(
  type =>
    function setNombremodulosinactualizarAction(datos) {
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

Actions.name('SET_OPEN_SEARCH').set(
  type =>
    function setOpenSearchAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_VACIO_NOMBRE_MODULO').set(
  type =>    
    function setVacioNombreModuloAction(datos,nombreModulo) {
      return {
        type,
        datos,
        nombreModulo,
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

Actions.name('SET_TEXTFIELDDESCRIPCION_TEXT').set(
  type =>
    function setTextfielddescripcionTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TEXTFIELDMODULO_TEXT').set(
  type =>
    function setTextfieldmoduloTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TEXTFIELDNOMBREFUNCION_TEXT').set(
  type =>
    function setTextfieldNombreFuncionTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TIPOAGRUPADORES_TEXT').set(
  type =>
    function setTipoagrupadoresTextAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_VISUALIZATABLA').set(
  type =>
    function setVisualizaTablaAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_DATOSGUARDAR').set(
  type =>
    function setDatosGuardarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_IDMODULO').set(
  type =>
    function setIdModuloAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_TIPOAGRUPADORES').set(
  type =>
    function setTipoagrupadoresAction(datos, tipoAgrupador) {
      return {
        type,
        datos,
        tipoAgrupador,
      };
    },
);

Actions.name('SET_SELECTTIPOAGRUPADOR').set(
  type =>
    function setSelectTipoAgrupadorAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECTURLFUNCION').set(
  type =>
    function setSelectUrlFuncionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_URLFUNCION_SELECT').set(
  type =>
    function setUrlFuncionSelectAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_URLFUNCION').set(
  type =>     
    function setUrlfuncionAction(datos, urlFuncion) {
      return {
        type,
        datos,
        urlFuncion,
      };
    },
);

Actions.name('SET_ACTUALIZAFUNCION').set(
  type =>
    function setActualizaFuncionAction(datos) {
      return {
        type,
        datos,
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

Actions.name('SET_OPEN_MENU_CONTEXTUAL').set(
  type =>
    function setOpenMenuContextualAction(datos) {
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

Actions.name('SET_OPENMODULOSALIR').set(
  type =>
    function setOpenModuloSalirAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPENMODULOSALIRFUNCION').set(
  type =>
    function setOpenModuloSalirFuncionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ORDER').set(
  type =>
    function setOrderAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ORDER_BY').set(
  type =>
    function setOrderByAction(datos) {
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

Actions.name('SET_ROWS_PER_PAGE').set(
  type =>
    function setRowsPerPageAction(datos) {
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

Actions.name('SET_STEPPERADDMODULO').set(
  type =>
    function setStepperaddmoduloAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ERRORTIPOAGRUPADOR').set(
  type =>
    function setErrorTipoAgrupadorAction(datos) {
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

Actions.name('SET_LISTADO_DESACTIVAR_FUNCIONES').set(
  type =>
    function setListadoDesactivarFuncionesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_ACTIVAR_FUNCIONES').set(
  type =>
    function setListadoActivarFuncionesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_DESACTIVAR').set(
  type =>
    function setModulosDesactivarAction(datos) {
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

Actions.name('SET_LOADING').set(
  type =>
    function setLoadingAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('POST_MODULO').set(
  type =>
    function postModuloAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('POST_FUNCIONES').set(
  type =>
    function postFuncionesAction(datos) {
      datos.persist();
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ELIMINAR_FUNCION').set(
  type =>
    function setEliminarFuncionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ELIMINAR_EMPRESA').set(
  type =>
    function setEliminarEmpresaAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ACTIVAR_EMPRESA').set(
  type =>
    function setActivarEmpresaAction(datos) {
      return {
        type,
        datos,
      };
    },
);

export default Actions;
