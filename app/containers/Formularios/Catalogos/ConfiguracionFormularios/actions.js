/*
 *
 * Transformacion actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/FORMULARIO/',
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
Actions.name('OBTENER_TIPOS_PREGUNTAS').set(
  type =>
    function obtenerTiposPreguntasAction() {
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

Actions.name('ON_ELIMINAR_FORMULARIO').set(
  type =>
    function onEliminarFormularioAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_FORMULARIOS_ELIMINAR').set(
  type =>
    function setFormulariosEliminarAction(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('ON_ELIMINAR_FORMULARIO_MODAL').set(
  type =>
    function onEliminarFormularioModalAction(id) {
      return {
        type,
        id,
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

Actions.name('GET_FORMULARIOS').set(
  type =>
    function getFormulariosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_FORMULARIOS').set(
  type =>
    function setFormulariosAction(data) {
      return {
        type,
        data,
      };
    },
);

Actions.name('GET_USUARIOS').set(
  type =>
    function getUsuariosAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_USUARIOS').set(
  type =>
    function setUsuariosAction(data) {
      return {
        type,
        data,
      };
    },
);


Actions.name('GET_FORMULARIO_DETALLE').set(
  type =>
    function getFormularioDetalleAction(idFormulario) {
      return {
        type,
        idFormulario,
      };
    },
);

Actions.name('SET_FORMULARIO_DETALLE').set(
  type =>
    function setFormularioDetalleAction(datos) {
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
Actions.name('MOSTRAR_COMPONENTE').set(
  type =>
    function mostrarComponenteAction() {
      return {
        type,
      };
    },
);



Actions.name('AGREGAR_PREGUNTA').set(
  type =>
    function agregarPreguntaAction(tipo) {
      return {
        type,
        tipo,
      };
    },
);

Actions.name('DEFAULT').set(
  type =>
    function defaultAction() {
      return {
        type,
      };
    },
);

Actions.name('NUEVO_FORMULARIO').set(
  type =>
    function nuevoFormularioAction() {
      return {
        type,
      };
    },
);

Actions.name('OPEN_MODAL').set(
  type =>
    function openModalAction() {
      return {
        type,
      };
    },
);

Actions.name('CLOSE_MODAL').set(
  type =>
    function closeModalAction() {
      return {
        type,
      };
    },
);

Actions.name('SET_TIPOS_PREGUNTAS').set(
  type =>
    function setTiposPreguntasAction(datos) {
      return {
        type,
        datos,
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

Actions.name('ON_INPUT_PREGUNTA_CHANGE').set(
  type =>
    function onInputPreguntaChangeAction(indice, valor) {
      return {
        type,
        indice,
        valor,
      };
    },
);

Actions.name('ON_INPUT_NOMBRE_SECCION_CHANGE').set(
  type =>
    function onInputNombreSeccionChangeAction(indice, valor) {
      return {
        type,
        indice,
        valor,
      };
    },
);

Actions.name('ON_INPUT_DESCRIPCION_SECCION_CHANGE').set(
  type =>
    function onInputDescripcionSeccionChangeAction(indice, valor) {
      return {
        type,
        indice,
        valor,
      };
    },
);

Actions.name('ON_COLOR_SECCION_CHANGE').set(
  type =>
    function onColorSeccionChangeAction(indice, color) {
      return {
        type,
        indice,
        color,
      };
    },
);


Actions.name('ON_INPUT_RESPUESTA_CHANGE').set(
  type =>
    function onInputRespuestaChangeAction(indice,tipo) {
      return {
        type,
        indice,
        tipo,
      };
    },
);

Actions.name('COPIAR_PREGUNTA').set(
  type =>
    function copiarPreguntaAction(indice,tipo) {
      return {
        type,
        indice,
        tipo,
      };
    },
);

Actions.name('ELIMINAR_PREGUNTA').set(
  type =>
    function eliminarPreguntaAction(indice) {
      return {
        type,
        indice,
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


Actions.name('ON_INPUT_DATO_PREGUNTA_CHANGE').set(
  type =>
    function onInputDatoPreguntaChangeAction(tipo,indice,indicePregunta, valor) {
      return {
        type,
        tipo,
        indice,
        indicePregunta,
        valor,
      };
    },
);

Actions.name('ON_INPUT_VALOR_PREGUNTA_CHANGE').set(
  type =>
    function onInputValorPreguntaChangeAction(tipo,tipoValor,indice,indicePregunta, valor) {
      return {
        type,
        tipo,
        tipoValor,
        indice,
        indicePregunta,
        valor,
      };
    },
);

Actions.name('ON_CHANGE_USUARIO').set(
  type =>
    function onChangeUsuarioAction(valor) {
      return {
        type,
        valor,
      };
    },
);

Actions.name('ON_AGREGAR_USUARIO').set(
  type =>
    function onAgregarUsuarioAction() {
      return {
        type,
      };
    },
);

Actions.name('ON_INPUT_CHECK_PREGUNTA_CHANGE').set(
  type =>
    function onInputCheckPreguntaChangeAction(tipo,indice,indicePregunta,valor) {
      return {
        type,
        tipo,
        indice,
        indicePregunta,
        valor,
      };
    },
);

Actions.name('ON_INPUT_CHECK_OPCION_CHANGE').set(
  type =>
    function oonInputCheckOpcionChangeAction(indice,indicePregunta,valor) {
      return {
        type,
        indice,
        indicePregunta,
        valor,
      };
    },
);




Actions.name('ORDENAR_PREGUNTA').set(
  type =>
    function ordenarPreguntaAction(tipo,tipoOrdenamiento,indice) {
      return {
        type,
        tipo,
        tipoOrdenamiento,
        indice,
      };
    },
);

Actions.name('ORDENAR_DATOS_PREGUNTA').set(
  type =>
    function ordenarDatosPreguntaAction(tipo,tipoOrdenamiento,indice,indicePregunta) {
      return {
        type,
        tipo,
        tipoOrdenamiento,
        indice,
        indicePregunta,
      };
    },
);

Actions.name('ELIMINAR_DATOS_PREGUNTA').set(
  type =>
    function eliminarDatosPreguntaAction(tipo,indice,indicePregunta) {
      return {
        type,
        tipo,
        indice,
        indicePregunta,
      };
    },
);



Actions.name('ON_AGREGAR_DATO_PREGUNTA').set(
  type =>
    function onAgregarDatoPreguntaAction(tipo,indice,indicePregunta) {
      return {
        type,
        tipo,
        indice,
        indicePregunta,
      };
    },
);

Actions.name('ON_INPUT_TIPO_PREGUNTA_CHANGE').set(
  type =>
    function onInputTipoPreguntaChangeAction(indice, valor) {
      return {
        type,
        indice,
        valor,
      };
    },
);

Actions.name('GUARDAR_FORMULARIO').set(
  type =>
    function guardarFormularioAction(agregar) {
      return {
        type,
        agregar,
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

Actions.name('HANDLE_VALIDAR_CAMPOS').set(
  type =>
    function handleValidarCamposAction() {
      return {
        type,
      };
    },
);


Actions.name('SET_ERROR_PREGUNTA').set(
  type =>
    function setDatosInvalidosAction(indice,datosValidos) {
      return {
        type,
        indice,
        datosValidos,
      };
    },
);

Actions.name('SET_DATOS_INVALIDOS').set(
  type =>
    function setDatosInvalidosAction(bandConfiguracion,bandPreguntas,bandPreguntasDetalle) {
      return {
        type,
        bandConfiguracion,
        bandPreguntas,
        bandPreguntasDetalle,
      };
    },
);



Actions.name('SET_FORMULARIO_GUARDADO').set(
  type =>
    function setFormularioGuardado(datos) {
      return {
        type,
        datos,
      };
    },
);

Actions.name('REMOVE_ROW').set(
  type =>
    function removeRowAction(row) {
      return {
        type,
        row,
      };
    },
);

export default Actions;