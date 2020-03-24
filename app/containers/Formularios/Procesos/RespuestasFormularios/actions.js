/*
 *
 * Transformacion actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/RESPUESTAS_FORMULARIO/',
  subfix: '_ACTION',
});

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

Actions.name('LIMPIAR_STATE').set(
  type =>
    function limpiarStateAction() {
      return {
        type,
      };
    },
);

Actions.name('GET_FORMULARIOS').set(
  type =>
    function getFormulariosAction(tipoFormulario) {
      return {
        type,
        tipoFormulario,
      };
    },
);

Actions.name('SET_FORMULARIOS').set(
  type =>
    function setFormulariosAction(data,tipoFormulario) {
      return {
        type,
        data,
        tipoFormulario,
      };
    },
);

Actions.name('SET_RESPUESTA_GUARDADA').set(
  type =>
    function setFormulariosAction(datos) {
      return {
        type,
        datos,
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

Actions.name('GET_PREGUNTAS').set(
  type =>
    function getPreguntasAction(idFormulario, idUsuario) {
      return {
        type,
        idFormulario,
        idUsuario,
      };
    },
);

Actions.name('SET_PREGUNTAS').set(
  type =>
    function setPreguntasAction(datos,idAsignacion, idUsuarioEvaluar) {
      return {
        type,
        datos,
        idAsignacion,
        idUsuarioEvaluar,
      };
    },
);

Actions.name('MOSTRAR_PREGUNTAS').set(
  type =>
    function mostrarPreguntasAction(indice,mostrar) {
      return {
        type,
        indice,
        mostrar,
      };
    },
);

Actions.name('ON_PREGUNTA_LISTA_CHANGE').set(
  type =>
    function onPreguntaListaChangeAction(indice, valor) {
      return {
        type,
        indice,
        valor,
      };
    },
);
  
// Actions.name('SET_VALIDACION_PREGUNTA').set(
//   type =>
//     function setValidacionPregunta(indice,validacion,calificacion) {
//       return {
//         type,
//         indice,
//         validacion,
//         calificacion,
//       };
//     },
// );

Actions.name('SET_CALIFICACION').set(
  type =>
    function setCalificacion(tipo,indice,calificacion,datosValidos,idSeccion) {
      return {
        type,
        tipo,
        indice,
        calificacion,
        datosValidos,
        idSeccion,
      };
    },
);

Actions.name('SET_CALIFICACION_DETALLE').set(
  type =>
    function setCalificacion(calificacion,indicePregunta,indiceDato) {
      return {
        type,
        calificacion,
        indicePregunta,
        indiceDato,
      };
    },
);

Actions.name('ON_CHANGE_RESPUESTA_MULTIPLE').set(
  type =>
    function onChangeRespuestaMultipleAction(tipo,indice,idDato,valor) {
      return {
        type,
        tipo,
        indice,
        idDato,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_INPUT_RESPUESTA').set(
  type =>
    function onChangeInputRespuestaAction(tipo,indice,idDato,valor) {
      return {
        type,
        tipo,
        indice,
        idDato,
        valor,
      };
    },
);


Actions.name('HANDLE_ABRIR_MODAL').set(
  type =>
    function handleAbrirModalAction(band) {
      return {
        type,
        band,
      };
    },
);

Actions.name('GUARDAR_RESPUESTAS').set(
  type =>
    function guardarRespuestasAction(agregar) {
      return {
        type,
        agregar,
      };
    },
);

Actions.name('HANDLE_VALIDAR_CAMPOS').set(
  type =>
    function handleValidarCamposAction() {
      return {
        type,
      };
    },
);

Actions.name('HANDLE_CHANGE_ARCHIVO').set(
  type =>
    function handleChangeArchivoAction(file, formData,indicePregunta,indiceDato) {
      return {
        type,
        file,
        formData,
        indicePregunta,
        indiceDato,
      };
    },
);

Actions.name('HANDLE_DOWNLOAD_ARCHIVO').set(
  type =>
    function handleDownloadArchivoAction(indicePregunta,indiceDato) {
      return {
        type,
        indicePregunta,
        indiceDato,
      };
    },
);

Actions.name('HANDLE_DELETE_ARCHIVO').set(
  type =>
    function handleDeleteArchivoAction(indicePregunta,indiceDato) {
      return {
        type,
        indicePregunta,
        indiceDato,
      };
    },
);

Actions.name('ON_ROWS_SELECCIONADOS_CHANGE').set(
  type =>
    function onRowsSeleccionadosChangeAction(indicePregunta,rowSeleccionados) {
      return {
        type,
        indicePregunta,
        rowSeleccionados,
      };
    },
);
Actions.name('GET_USUARIOS_EVALUACION').set(
  type =>
    function getUsuariosEvaluacionAction(idAsignacion) {
      return {
        type,
        idAsignacion,
      };
    },
);
Actions.name('SET_USUARIOS_EVALUACION').set(
  type =>
    function getUsuariosEvaluacionAction(datos, idAsignacion) {
      return {
        type,
        datos,
        idAsignacion,
      };
    },
);

export default Actions;