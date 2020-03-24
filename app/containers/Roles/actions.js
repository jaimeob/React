/*
 *
 * Roles actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/ROLES/',
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

Actions.name('SET_LISTADO_ACTIVAR').set(
  type =>
    function setListadoActivarAction(datos) {
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

Actions.name('SET_LISTADO_DESACTIVAR_EMPRESAS').set(
  type =>
    function setListadoDesactivarEmpresasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_LISTADO_ACTIVAR_EMPRESAS').set(
  type =>
    function setListadoActivarEmpresasAction(datos) {
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

Actions.name('SET_TEXTO_MODAL').set(
  type =>
    function setTextoModalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_VACIO_NOMBRE_MODULO').set(
  type =>
    function setVacioNombreModuloAction(datos,nombreRol) {
      return {
        type,
        datos,
        nombreRol,
      };
    },
);

Actions.name('SET_TEXTFIELDNOMBREROL_TEXT').set(
  type =>
    function setTextfieldnombrerolTextAction(datos) {
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

Actions.name('SET_VISUALIZATABLA').set(
  type =>
    function setVisualizaTablaAction(datos) {
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

Actions.name('SET_MODULOSDISABLE').set(
  type =>
    function setModulosdisableAction(datos) {
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

Actions.name('GET_VALIDAEXISTEROL').set(
  type =>
    function getValidaExisteRolAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OBJETOSINACTUALIZAR').set(
  type =>
    function setObjetosinactualizarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_STEPPEROPENMODALADD').set(
  type =>
    function setStepperopenmodaladdAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPENMODULOSALIRMODAL').set(
  type =>
    function setOpenmodulosalirmodalAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_EMPRESAS').set(
  type =>
    function getEmpresasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_MODULOS').set(
  type =>
    function getModulosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_GETEMPRESAS').set(
  type =>
    function setGetempresasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECT_EMPRESAS').set(
  type =>
    function setSelectEmpresasAction(datos,getEmpresas) {
      return {
        type,
        datos,
        getEmpresas,
      };
    },
);



Actions.name('ON_CHANGE_PARAMETROS').set(
  type =>
    function onChangeParametros(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('SET_MODULOS').set(
  type =>
    function setModulosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('HANDLE_CLICK_LISTA').set(
  type =>
    function handleClickListaAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('GET_MODULO_FUNCION').set(
  type =>
    function getModuloFuncionAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_ROLES').set(
  type =>
    function getRolesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_FUNCIONES').set(
  type =>
    function setFuncionesAction(datos) {
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

Actions.name('SET_SELECTED_PERMISOS_NORMALES').set(
  type =>
    function setSelectedPermisosNormalesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_OPEN_MODAL_PERMISOS_ESPECIALES').set(
  type =>
    function setOpenModalPermisosEspecialesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SELECTED_PERMISOS_ESPECIALES').set(
  type =>
    function setSelectedPermisosEspecialesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_DATOS_GUARDAR').set(
  type =>
    function setDatosGuardarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('POST_ROL').set(
  type =>
    function postRolAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ACTUALIZA_PERMISOS').set(
  type =>
    function setActualizaPermisosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ID_ROL_EMPRESA').set(
  type =>
    function setIdRolEmpresaAction(datos) {
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

Actions.name('SET_SOLO_LECTURA_ROL').set(
  type =>
    function setSoloLecturaRolAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_SOLO_LECTURA_EMPRESA').set(
  type =>
    function setSoloLecturaEmpresaAction(datos) {
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

Actions.name('SET_ELIMINAR_EMPRESA').set(
  type =>
    function setEliminarEmpresaAction(datos) {
      return {
        type,
        datos,
      };
    },
);

export default Actions;
