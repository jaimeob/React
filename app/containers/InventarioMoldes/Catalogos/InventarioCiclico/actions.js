/*
 *
 * MovimientosInventario actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import toSafeInteger from 'lodash/toSafeInteger';
// import { debug } from 'util';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/INVENTARIOCICLICO/',
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

Actions.name('LIMPIAR_STATE').set(
  type =>
    function limpiarStateAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_FECHAS').set(
  type =>
    function setFechasAction(fecha) {
      return {
        type,
        fecha,
      };
    },
);

Actions.name('SET_FECHA_SELECCIONADA').set(
  type =>
    function setFechaSeleccionadaAction(fecha) {
      return {
        type,
        fecha,
      };
    },
);

Actions.name('SET_DIA_SELECCIONADO').set(
  type =>
    function setDiaSeleccionadoAction(fecha) {
      return {
        type,
        fecha,
      };
    },
);
Actions.name('REGRESAR').set(
  type =>
    function regresarAction() {
      return {
        type,
      };
    },
);


Actions.name('NUEVA_CAPTURA_INVENTARIO').set(
  type =>
    function nuevaCapturaInventarioAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_INSUMO_SELECCIONADO').set(
  type =>
    function setInsumoSeleccionadoAction(insumoSeleccionado) {
      return {
        type,
        insumoSeleccionado,
      };
    },
);

Actions.name('GET_ALMACENES').set(
  type =>
    function getAlmacenesAction(usuarioLogeado) {
      return {
        type,
        usuarioLogeado,
      };
    },
);
Actions.name('GET_ESTATUS').set(
  type =>
    function getEstatusAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_ESTATUS').set(
  type =>
    function setEstatusAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_ALMACENES').set(
  type =>
    function setAlmacenesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_MOLDES_ALMACEN').set(
  type =>
    function setMoldesAlmacenAction(id,datos) {
      return {
        type,
        id,
        datos,
      };
    },
);

Actions.name('SET_INSUMOS_ALMACEN').set(
  type =>
    function setInsumosMoldeAction(datos) {
      return {
        type,
        datos,
      };
    },
);
// Actions.name('ON_SELECTION_CHANGE').set(
//   type =>
//     function onSelectionChangeAction(campo, valor) {
//       return {
//         type,
//         campo,
//         valor,
//       };
//     },
// );

Actions.name('HANDLE_CHANGE_ALMACEN').set(
  type =>
    function handleChangeAlmacenAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('HANDLE_CHANGE_MOLDE').set(
  type =>
    function handleChangeMoldeAction(event) {
      return {
        type,
        event : {
          id: toSafeInteger(event.target.value),
          nombre: event.currentTarget.textContent,
        },
      };
    },
);

Actions.name('HANDLE_CHANGE_ESTATUS').set(
  type =>
    function handleChangeEstatusAction(tipoInsumo,indice,valor) {
      return {
        type,
        tipoInsumo,
        indice,
        valor,
      };
    },
);

Actions.name('ON_INPUT_MONTO_MOLDE').set(
  type =>
    function onInputMontoMoldeAction(index, value) {
      return {
        type,
        index,
        value,
      };
    },
);


Actions.name('ON_CHANGE_CELDA').set(
  type =>
    function onChangeCeldaAction(indice,tipo,nombre,celda) {
      return {
        type,
        indice,
        tipo,
        nombre,
        celda,
      };
    },
);


Actions.name('ON_ROWS_SELECCIONADOS_CHANGE').set(
  type =>
    function onRowsSeleccionadosChangeAction(rowSeleccionados,insumoSeleccionado) {
      return {
        type,
        rowSeleccionados,
        insumoSeleccionado,
      };
    },
);
Actions.name('ON_SEARCH_CHANGE').set(
  type =>
    function onSearchChangeAction(tipo,textoBusqueda) {
      return {
        type,
        tipo,
        textoBusqueda,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO').set(
  type =>
    function handleChangeArchivoAction(file, formData,tipoInsumo,indice) {
      return {
        type,
        file,
        formData,
        tipoInsumo,
        indice,
      };
    },
);

Actions.name('HANDLE_DELETE_ARCHIVO').set(
  type =>
    function handleDeleteArchivoAction(tipoInsumo,indice) {
      return {
        type,
        tipoInsumo,
        indice,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_ARCHIVO').set(
  type =>
    function handleDownloadArchivoAction(tipoInsumo,indice) {
      return {
        type,
        tipoInsumo,
        indice,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO_EVIDENCIA').set(
  type =>
    function handleChangeArchivoEvidenciaAction(file, formData,tipoEvidencia) {
      return {
        type,
        file,
        formData,
        tipoEvidencia,
      };
    },
);

Actions.name('HANDLE_DELETE_ARCHIVO_EVIDENCIA').set(
  type =>
    function handleDeleteArchivoEvidenciaAction(tipoEvidencia) {
      return {
        type,
        tipoEvidencia,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_ARCHIVO_EVIDENCIA').set(
  type =>
    function handleDownloadArchivoEvidenciaAction(tipoEvidencia) {
      return {
        type,
        tipoEvidencia,
      };
    },
);

Actions.name('ON_CERRAR_INVENTARIO').set(
  type =>
    function onCerrarInventarioAction(cerrar) {
      return {
        type,
        cerrar,
      };
    },
);

Actions.name('HANDLE_ABRIR_MODAL').set(
  type =>
    function handleAbrirModalAction(abrir = false,tipoModal) {
      return {
        type,
        abrir,
        tipoModal,
      };
    },
);

Actions.name('HANDLE_ABRIR_MODAL_RESULTADOS').set(
  type =>
    function handleAbrirModalResultadosAction(abrir = false) {
      return {
        type,
        abrir,
      };
    },
);


Actions.name('SET_CARGANDO').set(
  type =>
    function setCargandoAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('HANDLE_ELIMINAR_MODAL').set(
  type =>
    function handleEliminarModalAction(abrir = false,IdEvidencia) {
      return {
        type,
        abrir,
        IdEvidencia,
      };
    },
);


Actions.name('ON_GUARDAR_INVENTARIO').set(
  type =>
    function onGuardarInventarioAction(guardar = false) {
      return {
        type,
        guardar,
      };
    },
);

// Actions.name('SET_INVENTARIOS_ALMACEN').set(
//   type =>
//     function setInventariosAlmacenAction(datos) {
//       return {
//         type,
//         datos,
//       };
//     },
// );

Actions.name('SET_INVENTARIO_GUARDADO').set(
  type =>
    function setInventarioGuardadoAction(datos) {
      return {
        type,
        datos,
      };
    },
);



Actions.name('ON_SUBIR_ARCHIVO_EVIDENCIA').set(
  type =>
    function onSubirArchivoEvidenciaAction(file, formData,fecha) {
      return {
        type,
        file,
        formData,
        fecha,
      };
    },
);

Actions.name('ON_DELETE_ARCHIVO_EVIDENCIA').set(
  type =>
    function onDeleteArchivoEvidenciaAction(eliminar) {
      return {
        type,
        eliminar,
      };
    },
);

Actions.name('ON_DOWNLOAD_ARCHIVO_EVIDENCIA').set(
  type =>
    function onDownloadArchivoEvidenciaAction(IdEvidencia) {
      return {
        type,
        IdEvidencia,
      };
    },
);

Actions.name('SET_EVIDENCIAS_ALMACEN').set(
  type =>
    function setEvidenciasAlmacenAction(datos) {
      return {
        type,
        datos,
      };
    },
);

// Actions.name('SET_FECHA_INICIAL_ALMACEN').set(
//   type =>
//     function setFechaInicialAlmacenAction(datos) {
//       return {
//         type,
//         datos,
//       };
//     },
// );

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

Actions.name('SET_USUARIO').set(
  type =>
    function setUsuarioAction(usuarioId) {
      return {
        type,
        usuarioId,
      };
    },
);



Actions.name('SET_CANTIDAD_RESULTADOS').set(
  type =>
    function setCantidadResultadosAction() {
      return {
        type,
      };
    },
);

Actions.name('HANDLE_OBTENER_DETALLE_INVENTARIO').set(
  type =>
    function handleObtenerDetalleInventarioAction(IdInventarioCiclico,tipoDetalle) {
      return {
        type,
        IdInventarioCiclico,
        tipoDetalle,
      };
    },
);

Actions.name('HANDLE_MOSTRAR_DETALLE').set(
  type =>
    function handleMostrarDetalleAction(datos,tipoDetalle,idInventarioCiclico) {
      return {
        type,
        datos,
        tipoDetalle,
        idInventarioCiclico,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_EXCEL').set(
  type =>
    function handleDownloadExcelAction(tipoExcel) {
      return {
        type,
        tipoExcel,
      };
    },
);

Actions.name('SET_RESULTADOS').set(
  type =>
    function setResultadosAction() {
      return {
        type,
      };
    },
);


export default Actions;