/*
 *
 * Roles actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/USUARIOS/',
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

Actions.name('SET_LISTADO_GUARDAR').set(
  type =>
    function setListadoGuardarAction(datos) {
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

Actions.name('SET_ACTIVAR_REGISTROS').set(
  type =>
    function setActivarRegistrosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_DOWNLOAD_FILE').set(
  type =>
    function getDownloadFileAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_DOWNLOAD_FILES').set(
  type =>
    function getDownloadFilesAction(datos) {
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

/**
 * Aqui empieza lo de registrar usuarios
 * Desarrollador : El Javi
 */
Actions.name('ON_CLICK_REGRESAR').set(
  type =>
    function onClickRegresarAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CHANGE_PESTANA').set(
  type =>
    function onChangePestanaAction(_e, id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('GET_EMPLEADOS').set(
  type =>
    function getEmpleadosAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_PLAZAS').set(
  type =>
    function getPlazasAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_PLAZAS').set(
  type =>
    function setPlazasAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('GET_PUESTOS').set(
  type =>
    function getPuestosAction() {
      return {
        type,
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

Actions.name('SET_ROLES').set(
  type =>
    function setRolesAction(datos, idPuesto) {
      return {
        type,
        datos,
        idPuesto,
      };
    },
);

Actions.name('SET_EMPLEADOS').set(
  type =>
    function setEmpleadosAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CHANGE_EMPLEADO').set(
  type =>
    function onChangeEmpleadoAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_PUESTO').set(
  type =>
    function onChangePuestoAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('SET_EMPRESAS').set(
  type =>
    function setEmpresasAction(datos, valor) {
      return {
        type,
        datos,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_ROL').set(
  type =>
    function onChangeRolAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_PARAMETROS').set(
  type =>
    function onChangeParametrosAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_ARCHIVO').set(
  type =>
    function onChangeArchivoAction(formData, arreglo) {
      return {
        type,
        formData,
        arreglo,
      };
    },
);

Actions.name('ON_CHANGE_ARCHIVO_ROL').set(
  type =>
    function onChangeArchivoRolAction(arreglo) {
      return {
        type,
        arreglo,
      };
    },
);

Actions.name('ON_CHANGE_ARCHIVO_TEMP').set(
  type =>
    function onChangeArchivoTempAction(arreglo) {
      return {
        type,
        arreglo,
      };
    },
);

Actions.name('SET_INFO_EMPLEADOS').set(
  type =>
    function setInfoEmpleadosAction(datos, valor) {
      return {
        type,
        datos,
        valor,
      };
    },
);

Actions.name('ON_CLICK_ARCHIVO').set(
  type =>
    function onClickArchivoAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_DELETE_ARCHIVO').set(
  type =>
    function onDeleteArchivoAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_DELETE_ARCHIVO_MODAL').set(
  type =>
    function onDeleteArchivoModalAction(id) {
      return {
        type,
        id,
      };
    },
);


Actions.name('ON_CLICK_ARCHIVO_TEMP').set(
  type =>
    function onClickArchivoTempAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_DELETE_ARCHIVO_TEMP').set(
  type =>
    function onDeleteArchivoTempAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_DELETE_ARCHIVO_TEMP_MODAL').set(
  type =>
    function onDeleteArchivoTempModalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_PLAZA_TEMPORAL').set(
  type =>
    function onClickPlazaTemporalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_ROL_ADICIONAL').set(
  type =>
    function onClickRolAdicionalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_CERRAR_PLAZA_TEMPORAL').set(
  type =>
    function onClickCerrarPlazaTemporalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_CLICK_CERRAR_ROL_ADICIONAL').set(
  type =>
    function onClickCerrarRolAdicionalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_FECHA_INPUT').set(
  type =>
    function onFechaInputAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_FECHA').set(
  type =>
    function onChangeFechaAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);

Actions.name('ON_FECHA_INPUT_ROL').set(
  type =>
    function onFechaInputRolAction(id, valor) {
      return {
        type,
        id,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_FECHA_ROL').set(
  type =>
    function onChangeFechaRolAction(fechaIni, fechaFin) {
      return {
        type,
        fechaIni,
        fechaFin,
      };
    },
);

Actions.name('GET_NEXT_FILE').set(
  type =>
    function getNextFileAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('ON_ASIGNAR_PLAZA_TEMPORAL').set(
  type =>
    function onAsignarPlazaTemporalAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_ASIGNAR_ROL_ADICIONAL').set(
  type =>
    function onAsignarRolAdicionalAction() {
      return {
        type,
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

Actions.name('ON_CLICK_CHECK').set(
  type =>
    function onClickCheckAction(i, j) {
      return {
        type,
        i,
        j,
      };
    },
);

Actions.name('ON_CLICK_LISTA_DETALLE').set(
  type =>
    function onClickListaDetalleAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_CLICK_VER_DETALLE').set(
  type =>
    function onClickVerDetalleAction(datos, id) {
      return {
        type,
        datos,
        id,
      };
    },
);

Actions.name('ON_CLICK_LISTA_DETALLE_OPCIONES').set(
  type =>
    function onClickListaDetalleOpcionesAction(id, datos) {
      return {
        type,
        datos,
        id,
      };
    },
);

Actions.name('SET_DETALLE_ROL').set(
  type =>
    function setDetalleRolAction(datos, id, detalle) {
      return {
        type,
        datos,
        id,
        detalle,
      };
    },
);

Actions.name('ON_CLICK_LISTA_DETALLE_CERRAR').set(
  type =>
    function onClickListaDetalleCerrarAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_CLICK_PERMISOS_ESPECIALES').set(
  type =>
    function onClickPermisosEspecialesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CLICK_CERRAR_ROL_DETALLE').set(
  type =>
    function onClickCerrarRolDetalleAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_VER_DETALLE_USUARIO').set(
  type =>
    function onVerDetalleUsuarioAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('SET_DETALLE_USUARIO').set(
  type =>
    function setDetalleUsuarioAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_CLICK_GUARDAR').set(
  type =>
    function onClickGuardarAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_CAMPOS_INVALIDOS').set(
  type =>
    function setCamposValidosAction(info, parametros) {
      return {
        type,
        info,
        parametros,
      };
    },
);


Actions.name('ON_CLICK_DESCARGAR_HISTORIAL').set(
  type =>
    function onClickDescargarHistorialAction(id) {
      return {
        type,
        id,
      };
    },
);

Actions.name('ON_CLICK_DESCARGAR_TODO_HISTORIAL').set(
  type =>
    function onClickDescargarTodoHistorialAction() {
      return {
        type,
      };
    },
);

Actions.name('LIMPIAR_STATE').set(
  type =>
    function limpiarStateAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_MOUNTED').set(
  type =>
    function setMountedAction() {
      return {
        type,
      };
    },
);

export default Actions;