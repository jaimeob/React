/*
 *
 * Reportes actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/INVENTARIOMOLDES/PROCESOS/REPORTES/',
  subfix: '_ACTION',
});


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

Actions.name('SET_USUARIO').set(
  type =>
    function setUsuarioAction(usuarioId) {
      return {
        type,
        usuarioId,
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

Actions.name('GET_COMBOS').set(
  type =>
    function getCombosAction(usuario) {
      return {
        type,
        usuario,
      };
    },
);

Actions.name('GET_REPORTE').set(
  type =>
    function getReporteAction() {
      return {
        type,
      };
    },
);
Actions.name('LIMPIAR_CAMPOS').set(
  type =>
    function limpiarCamposAction() {
      return {
        type,
      };
    },
);



Actions.name('SET_COMBOS').set(
  type =>
    function setCombosAction(datos) {
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



Actions.name('SET_MOLDES').set(
  type =>
    function setMoldesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_AÑOS').set(
  type =>
    function setMoldesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_PERIODOS').set(
  type =>
    function setMoldesAction(datos) {
      return {
        type,
        datos,
      };
    },
);




Actions.name('SET_ORIGEN_DESTINO').set(
  type =>
    function setOrigenDestinoAction(datos,tipoMovimiento) {
      return {
        type,
        datos,
        tipoMovimiento,
      };
    },
);

Actions.name('SET_DATOS_REPORTES').set(
  type =>
    function setDatosReportesAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('SET_DATOS_CONFIABILIDAD').set(
  type =>
    function setDatosConfiabilidadAction(datos) {
      return {
        type,
        datos,
      };
    },
);


Actions.name('MOSTRAR_CARGANDO').set(
  type =>
    function mostrarCargandoAction(bandera) {
      return {
        type,
        bandera,
      };
    },
);

Actions.name('ON_INPUT_CHANGE').set(
  type =>
    function onInputChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);
Actions.name('ON_INPUT_PLAZA_CHANGE').set(
  type =>
    function onInputPlazaChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);
Actions.name('ON_INPUT_ALMACEN_CHANGE').set(
  type =>
    function onInputAlmacenChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);

Actions.name('ON_INPUT_ANIO_CHANGE').set(
  type =>
    function onInputAnioChangeAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);


Actions.name('ON_INPUT_TIPO_MOVIMIENTO').set(
  type =>
    function onInputTipoMovimientoAction(campo, valor) {
      return {
        type,
        campo,
        valor,
      };
    },
);



Actions.name('HANDLE_DOWNLOAD_EXCEL').set(
  type =>
    function handleDownloadExcelAction(tipoReporte) {
      return {
        type,
        tipoReporte,
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

Actions.name('ON_FECHA_INPUT').set(
  type =>
    function onFechaInputAction(id, event) {
      return {
        type,
        id,
        event,
      };
    },
);
export default Actions;
