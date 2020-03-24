/* eslint-disable no-else-return */
/*
 *
 * Transformacion reducer
 *
 */

import { fromJS } from 'immutable';
// import {parseInt,flatten} from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  NUEVO_FORMULARIO,
  REGRESAR,
  SET_PERMISOS,
  SET_FORMULARIOS,
  LIMPIAR_STATE,
  SET_PREGUNTAS,
  MOSTRAR_PREGUNTAS,
  ON_PREGUNTA_LISTA_CHANGE,
  ON_CHANGE_RESPUESTA_MULTIPLE,
  ON_CHANGE_INPUT_RESPUESTA,
  HANDLE_ABRIR_MODAL,
  SET_RESPUESTA_GUARDADA,
  SET_USUARIOS_EVALUACION,
  // SET_VALIDACION_PREGUNTA,
  SET_CALIFICACION,
  SET_CALIFICACION_DETALLE,
  HANDLE_CHANGE_ARCHIVO,
  HANDLE_DELETE_ARCHIVO,
  ON_ROWS_SELECCIONADOS_CHANGE,
} = Actions.getConstants();

// Array.prototype.move = function (from, to) {
//   this.splice(to, 0, this.splice(from, 1)[0]);
// };

function respuestaFormularioReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:{
      return state;
    }
    case LIMPIAR_STATE:{
      // const datos = state.getIn(['formularioRespuesta', 'datos']).toJS();
      // const tipoFormulario = state.getIn(['formularioRespuesta', 'tipoFormulario'])
      return state.setIn(['formularioRespuesta', 'stepper'], 0)
      // .setIn(['formularioRespuesta','tipoFormulario'], tipoFormulario)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case SET_FORMULARIOS: {
      return state.setIn(['formularioRespuesta','datos'], fromJS(action.data))
        .setIn(['formularioRespuesta','tipoFormulario'], action.tipoFormulario)

    }
    case SET_RESPUESTA_GUARDADA: {
      const stepper = state.getIn(['formularioRespuesta', 'stepper']);
      const tipoFormulario = state.getIn(['formularioRespuesta', 'tipoFormulario'])
      let datosUsuarios = []
      let idAsignacion = ''
      // const datos = state.getIn(['formularioRespuesta', 'datos']).toJS();
      if(stepper===1 && tipoFormulario ==='REFEVA'){
        datosUsuarios = state.getIn(['formularioRespuesta', 'datosUsuarios']).toJS();
        idAsignacion = state.getIn(['formularioRespuesta', 'idAsignacion'])
        
        const idUsuarioEvaluar = state.getIn(['formularioRespuesta', 'idUsuarioEvaluar'])
        datosUsuarios.forEach(usuarioEvaluado => {
          if(usuarioEvaluado.IdUsuario === idUsuarioEvaluar){
            usuarioEvaluado.RefEstatus='REFCOM'
            usuarioEvaluado.Estatus='Completado'
            usuarioEvaluado.Color='rgb(40, 149, 15)'
          }
        });

        return initialState.setIn(['formularioRespuesta', 'datos'], fromJS(action.datos))
          .setIn(['formularioRespuesta','tipoFormulario'], tipoFormulario)
          .setIn(['formularioRespuesta','stepper'], 2)
          .setIn(['formularioRespuesta', 'datosUsuarios'], fromJS(datosUsuarios))
          .setIn(['formularioRespuesta', 'idAsignacion'], idAsignacion)
      }
      return initialState.setIn(['formularioRespuesta', 'stepper'], 0)
        .setIn(['formularioRespuesta', 'datos'], fromJS(action.datos))
        .setIn(['formularioRespuesta','tipoFormulario'], tipoFormulario)        
    }
    case SET_PREGUNTAS: {
      const {
        formulario,
        formularioSeccion,
        formularioPregunta,
        formularioPreguntaDetalle,
      } = action.datos

      
      // const datos = state.getIn(['formularioRespuesta', 'datos']).toJS()
      const usuarioEvaluar = state.getIn(['formularioRespuesta','idUsuarioEvaluar'])
      const datosUsuarios = state.getIn(['formularioRespuesta','datosUsuarios']).toJS()
      let nombreEvaluado = ''
      if(action.idUsuarioEvaluar){
        const usuarioSeleccionado = datosUsuarios.filter(usuario=> usuario.IdUsuario === action.idUsuarioEvaluar)
        nombreEvaluado = usuarioSeleccionado.length>0?usuarioSeleccionado[0].Usuario :''
      }

      // const datoSeleccionado = datos.filter(dato=> dato.IdAsignacion === action.idAsignacion)
      // const refEstatus = datoSeleccionado[0].Referencia !== 'REFEXP' && datoSeleccionado[0].Referencia !== 'REFCOM'
      // const permiteEditar = formulario[0].IdRespuesta? formulario[0].PermiteEditar:true


      let idKey = 0      
      const preguntas = []
      const archivos = []


      formularioSeccion.forEach((seccion) => {
        const seccionNueva = {
          orden : seccion.Orden,
          contador:idKey+1,
          idSeccionTemporal:seccion.FormularioSeccionId,
          idSeccion:seccion.FormularioSeccionId,
          idRespuestaSeccion:seccion.IdRespuestaSeccion,
          mostrarSeccion:false,
          nombreSeccion:seccion.Nombre,
          errorNombreSeccion:false,
          datosValidos:true,
          tipoPregunta:'SECCION',
          descripcionSeccion:seccion.Descripcion,
          errorDescripcionSeccion:false,
          ultimoAgregado:true,
          colorSeccion:seccion.Color,
          calificacion:0,
        }
        preguntas.push(seccionNueva)
        idKey += 1
        // if(preguntas[i].tipoPregunta === 'PA' || preguntas[i].tipoPregunta === 'SM' || preguntas[i].tipoPregunta === 'LD'){


        formularioPregunta.forEach((pregunta) => {
          if(seccion.FormularioSeccionId === pregunta.IdFormularioSeccion){
            const datosOpciones = []
            const datosPreguntas = []
            const datosArchivos = []
            const valorPregunta = pregunta.TipoPregunta === 'PA' || pregunta.TipoPregunta === 'SM' || pregunta.TipoPregunta === 'LD'
            let respuestaPregunta
            let valorTexto
            const datosSeleccionados = []
            formularioPreguntaDetalle.forEach((preguntaDetalle) => {
              let respuestaDetalle = ''
              let valorTextoDetalle = ''
              // const totalPreguntas = formularioPreguntaDetalle.filter(detalle=> detalle.IdFormularioPregunta === pregunta.FormularioPreguntaId && !detalle.EsOpcion)
              // const totalOpciones = formularioPreguntaDetalle.filter(detalle => detalle.IdFormularioPregunta === pregunta.FormularioPreguntaId && detalle.EsOpcion)
              if(pregunta.FormularioPreguntaId === preguntaDetalle.IdFormularioPregunta){
                if(valorPregunta && preguntaDetalle.IdRespuestaPreguntaDetalle){
                  if(pregunta.TipoPregunta === 'SM'|| pregunta.TipoPregunta === 'LD'){
                    respuestaPregunta=`${preguntaDetalle.IdRespuesta}`
                    valorTexto=preguntaDetalle.ValorTexto
                    valorTextoDetalle=preguntaDetalle.IdRespuesta === preguntaDetalle.FormularioPreguntaDetalleId?preguntaDetalle.ValorTexto:''
                  }else{
                    respuestaPregunta=preguntaDetalle.IdRespuesta?preguntaDetalle.IdRespuesta:preguntaDetalle.ValorTexto
                  }
                  
                }
                if(preguntaDetalle.IdRespuestaPreguntaDetalle){
                  if(pregunta.TipoPregunta === 'CV'){
                    respuestaDetalle=preguntaDetalle.IdRespuesta===1
                    valorTextoDetalle=preguntaDetalle.ValorTexto
                  }else{
                    respuestaDetalle = preguntaDetalle.IdRespuesta?`${preguntaDetalle.IdRespuesta}`:preguntaDetalle.ValorTexto
                  }
                }
                if(preguntaDetalle.EsOpcion){
                  const datoOpcion =       
                  {
                    id:preguntaDetalle.Orden,
                    idPreguntaDetalle:preguntaDetalle.FormularioPreguntaDetalleId,
                    idRespuestaPreguntaDetalleId:preguntaDetalle.IdRespuestaPreguntaDetalle,
                    nombre:preguntaDetalle.Nombre,
                    valor:preguntaDetalle.Valor,
                    valorInvertido:preguntaDetalle.ValorInvertido,
                    noAplica:preguntaDetalle.NoAplica,
                    errorNombre:false,
                    errorValor:false,
                    errorValorInvertido:false,
                  }
                  datosOpciones.push(datoOpcion)
                }else{
                  const datoPregunta =       
                  {
                    id:preguntaDetalle.Orden,
                    idPreguntaDetalle:preguntaDetalle.FormularioPreguntaDetalleId,
                    idRespuestaPreguntaDetalleId:preguntaDetalle.IdRespuestaPreguntaDetalle,
                    nombre:preguntaDetalle.Nombre,
                    valor:preguntaDetalle.Valor,
                    requerido:preguntaDetalle.Requerido,
                    archivo:preguntaDetalle.Archivo,
                    invertido:preguntaDetalle.Invertido,
                    captura:preguntaDetalle.Captura,
                    noAplica:preguntaDetalle.NoAplica,
                    errorNombre:false,
                    errorValor:false,
                    respuesta:respuestaDetalle || '',
                    valorTexto:valorTextoDetalle || '',
                    idArchivo:preguntaDetalle.IdArchivo,
                    estatus:preguntaDetalle.Estatus,
                    seleccionado:preguntaDetalle.IdRespuestaPreguntaDetalle>0,
                    calificacion:0,
                    // respuestaBooleana:false,
                  }
                  datosPreguntas.push(datoPregunta)
                }
              }
            })  

            // En esta parte si se permite subir archivo agregar datos a subir archivo
            if(pregunta.TipoPregunta === 'SA'){
              let indiceAgregado = 0
              formularioPreguntaDetalle.forEach((preguntaDetalle) => {
                if(pregunta.FormularioPreguntaId === preguntaDetalle.IdFormularioPregunta){
                  let hayArchivo = false
                  if(preguntaDetalle.Evidencia !== ''){
                    hayArchivo=true
                    archivos.push({Ruta:preguntaDetalle.RutaEvidencia, 
                      Nombre:preguntaDetalle.NombreEvidencia,
                      indicePregunta:idKey, 
                      idPreguntaDetalle:preguntaDetalle.FormularioPreguntaDetalleId, 
                      idArchivo:preguntaDetalle.IdArchivo})
                  }


                  const archivo =       
                    {
                      idPreguntaDetalle:preguntaDetalle.FormularioPreguntaDetalleId,
                      descripcion:preguntaDetalle.Nombre,
                      evidencia:preguntaDetalle.Evidencia?preguntaDetalle.Evidencia:'',
                      subioEvidencia:hayArchivo,
                      // idArchivo:preguntaDetalle.IdArchivo,
                      // Cambiar el estatus y traerlo diferente ya que quede la subida de archivo
                      requerido:preguntaDetalle.Requerido,
                      estatus:preguntaDetalle.Estatus,
                    }
                  if(preguntaDetalle.IdRespuestaPreguntaDetalle && preguntaDetalle.Estatus === 'REFCOM'){
                    datosSeleccionados.push(indiceAgregado)
                  }
                  datosArchivos.push(archivo)
                  indiceAgregado+=1
                }
              })
            }
            const preguntaNueva = {
              orden : pregunta.Orden,
              contador:idKey+1,
              idSeccion:pregunta.IdFormularioSeccion,
              idSeccionTemporal:pregunta.IdFormularioSeccion,
              idRespuestaPregunta:pregunta.IdRespuestaPregunta,
              idPregunta:pregunta.FormularioPreguntaId,
              nombrePregunta:pregunta.Nombre,
              errorNombrePregunta:false,
              datosValidos:true,
              tipoPregunta:pregunta.TipoPregunta,
              errorTipoPregunta:false,
              solicitarRespuesta:pregunta.SolicitarRespuesta,
              tieneCalificacion:pregunta.TieneCalificacion,
              datosPreguntas,
              datosOpciones,
              mostrarPregunta:false,
              colorSeccion:seccion.Color,
              respuesta:respuestaPregunta || '',
              valorTexto:valorTexto || '',
              calificacion:0,
              valorMaximo:pregunta.ValorMaximo,
              datosArchivos,
              datosSeleccionados,
            }
            preguntas.push(preguntaNueva)
            idKey += 1
          }
        })  
      })

      return state.setIn(['formularioRespuesta', 'stepper'], 1)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','titulo'], formulario[0].Nombre)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','descripcion'], formulario[0].Descripcion)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','preguntas'], fromJS(preguntas))
        .setIn(['formularioRespuesta', 'nuevaRespuesta','idAsignacion'], action.idAsignacion)
        .setIn(['formularioRespuesta','idUsuarioEvaluar'], action.idUsuarioEvaluar?action.idUsuarioEvaluar:usuarioEvaluar)
        .setIn(['formularioRespuesta','nombreEvaluado'], nombreEvaluado)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','idRespuesta'], formulario[0].IdRespuesta) 
        .setIn(['formularioRespuesta', 'nuevaRespuesta','requiereValidacion'], formulario[0].RequiereValidacion)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','permiteEditar'], formulario[0].IdRespuesta?formulario[0].PermiteEditar:true)
        .setIn(['formularioRespuesta', 'nuevaRespuesta','existeRespuesta'], formulario[0].IdRespuesta>0)
        .setIn(['formularioRespuesta', 'documentacion','archivos'], fromJS(archivos))
    }
    case REGRESAR: {
      
      const stepper = state.getIn(['formularioRespuesta', 'stepper']);
      const tipoFormulario = state.getIn(['formularioRespuesta', 'tipoFormulario'])
      let datosUsuarios = []
      let idAsignacion = ''
      const datos = state.getIn(['formularioRespuesta', 'datos']).toJS();
      if(stepper===1 && tipoFormulario ==='REFEVA'){
        datosUsuarios = state.getIn(['formularioRespuesta', 'datosUsuarios']).toJS();
        idAsignacion = state.getIn(['formularioRespuesta', 'idAsignacion'])
        return initialState.setIn(['formularioRespuesta','datos'],  fromJS(datos))
          .setIn(['formularioRespuesta','tipoFormulario'], tipoFormulario)
          .setIn(['formularioRespuesta','stepper'], 2)
          .setIn(['formularioRespuesta', 'datosUsuarios'], fromJS(datosUsuarios))
          .setIn(['formularioRespuesta', 'idAsignacion'], idAsignacion)
      }
      return initialState.setIn(['formularioRespuesta','datos'],  fromJS(datos))
        .setIn(['formularioRespuesta','tipoFormulario'], tipoFormulario)

    }
    // case SET_VALIDACION_PREGUNTA: {
    //   return state.updateIn(
    //     [
    //       'formularioRespuesta',
    //       'nuevaRespuesta',
    //       'preguntas',
    //       action.indice,
    //     ],
    //     stt => stt.merge({
    //       calificacion: action.calificacion,
    //       datosValidos: action.datosValidos,
    //     })
    //   )
    // }
    case SET_CALIFICACION: {
      if(action.tipo === 0)
        return state.updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.indice,
          ],
          stt => stt.merge({
            calificacion: action.calificacion,
            datosValidos: action.datosValidos,
          })
        ).updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.idSeccion,
          ],
          stt => stt.merge({
            datosValidos: action.datosValidos,
          })
        )
      return state.setIn(['formularioRespuesta','calificacion'], action.calificacion)
    }
    case SET_CALIFICACION_DETALLE: {
      return state.updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosPreguntas',
          action.indiceDato,
        ],
        stt => stt.merge({
          calificacion: action.calificacion,
        })
      )
    }
    case MOSTRAR_PREGUNTAS: {
      // return state
      const preguntas = state.getIn(['formularioRespuesta', 'nuevaRespuesta', 'preguntas']).toJS();
      const seccionSeleccionada = state.getIn(['formularioRespuesta', 'nuevaRespuesta', 'preguntas',action.indice]).toJS()
      // const seccionSeleccionada= JSON.parse(JSON.stringify(seccionSeleccionadaArray)); 
      // const seccionSeleccionada = state.getIn(['formularioRespuesta', 'nuevaRespuesta', 'preguntas',action.indice]).toJS();
      preguntas[action.indice].mostrarSeccion = action.mostrar

      preguntas.forEach((pregunta,indice) => {
        if(pregunta.tipoPregunta !== 'SECCION' && pregunta.idSeccionTemporal === seccionSeleccionada.idSeccionTemporal){
          preguntas[indice].mostrarPregunta = action.mostrar
        }
        if(pregunta.idSeccionTemporal !== seccionSeleccionada.idSeccionTemporal){
          if (pregunta.tipoPregunta === 'SECCION'){
            preguntas[indice].mostrarSeccion = false
          }else{
            preguntas[indice].mostrarPregunta = false
          }

        }
          
      })
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      // }
      return state.setIn(['formularioRespuesta', 'nuevaRespuesta', 'preguntas'], fromJS(preguntas))
    }
    case ON_PREGUNTA_LISTA_CHANGE: {
      return state.updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          respuesta: `${action.valor}`,
        })
      )
    }
    case ON_CHANGE_INPUT_RESPUESTA: {
      if(action.tipo === 0)
        return state.updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.indice,
          ],
          stt => stt.merge({
            valorTexto: action.valor,
          })
        ).updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.indice,
            'datosPreguntas',
            action.idDato,
          ],
          stt => stt.merge({
            valorTexto: action.valor,
          })
        )
      return state.updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indice,
          'datosPreguntas',
          action.idDato,
        ],
        stt => stt.merge({
          valorTexto: action.valor,
        })
      )
    }
    case ON_CHANGE_RESPUESTA_MULTIPLE: {
      if(action.tipo === 0){
        const pregunta = state.getIn(['formularioRespuesta','nuevaRespuesta','preguntas',action.indice]).toJS()
  
        return state.updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.indice,
          ],
          stt => stt.merge({
            respuesta: action.valor,
          })
        )
      }
      if(action.tipo === 1)
        return state.updateIn(
          [
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
            action.indice,
            'datosPreguntas',
            action.idDato,
          ],
          stt => stt.merge({
            respuesta: action.valor,
          })
        )
      return state
    }
    case HANDLE_ABRIR_MODAL: { 
      return state.updateIn(
        [
          'formularioRespuesta',
          'datosModal',
        ],
        stt => stt.merge({
          abrirModal: action.band,
          mensajeConfirmacion:action.band?'¿Deseá continuar?':'',

        })
      )
    }
    case HANDLE_CHANGE_ARCHIVO: {
      const datos = state.getIn(['formularioRespuesta','nuevaRespuesta','preguntas',action.indicePregunta,'datosPreguntas',action.indiceDato])
      const datoPregunta = JSON.parse(JSON.stringify(datos))

      const archivos = state.getIn(
        [
          'formularioRespuesta',
          'documentacion',
          'archivos',
        ]
      ).toJS()
      for (let i = 0; i < action.formData.length; i+=1) {
        archivos.push({File:action.formData[i],idPreguntaDetalle:datoPregunta.idPreguntaDetalle,idArchivo:datoPregunta.idArchivo,indicePregunta:action.indicePregunta})
      }
      return state.setIn(
        [
          'formularioRespuesta',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      ).updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosArchivos',
          action.indiceDato,
        ],
        stt => stt.merge({
          evidencia: `Archivo ${action.indiceDato}`,
          estatus: datoPregunta.seleccionado?'REFCOM':'REFPEN',
          subioEvidencia:true,
        })
      ).updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosPreguntas',
          action.indiceDato,
        ],
        stt => stt.merge({
          estatus: datoPregunta.seleccionado?'REFCOM':'REFPEN',
        })
      )
    }

    case ON_ROWS_SELECCIONADOS_CHANGE: {
      const {
        indicePregunta,
        rowSeleccionados,
      } = action
      const datosArchivos = state.getIn(['formularioRespuesta','nuevaRespuesta','preguntas',indicePregunta,'datosArchivos']).toJS()
      const datosPreguntas = state.getIn(['formularioRespuesta','nuevaRespuesta','preguntas',indicePregunta,'datosPreguntas']).toJS()

      datosPreguntas.forEach((dato,index) => {
        dato.seleccionado = false
        dato.estatus = 'REFPEN'
        datosArchivos[index].estatus = 'REFPEN'
      })

      rowSeleccionados.forEach((row) => {
        datosPreguntas[row].seleccionado = true
        if(datosArchivos[row].requerido){
          datosArchivos[row].estatus = datosArchivos[row].evidencia !== '' ?'REFCOM':'REFPEN'
          datosPreguntas[row].estatus = datosArchivos[row].evidencia !== '' ?'REFCOM':'REFPEN'
        }else{
          datosArchivos[row].estatus = 'REFCOM'
          datosPreguntas[row].estatus = 'REFCOM'
        }
      })


      return state
        .setIn(['formularioRespuesta','nuevaRespuesta','preguntas',indicePregunta,'datosArchivos'],fromJS(datosArchivos))
        .setIn(['formularioRespuesta','nuevaRespuesta','preguntas',indicePregunta,'datosPreguntas'],fromJS(datosPreguntas))
        .setIn(['formularioRespuesta','nuevaRespuesta','preguntas',indicePregunta,'datosSeleccionados'],rowSeleccionados)
    }


    case HANDLE_DELETE_ARCHIVO: {
      const datos = state.getIn(['formularioRespuesta','nuevaRespuesta','preguntas',action.indicePregunta,'datosPreguntas',action.indiceDato])
      const datoPregunta = JSON.parse(JSON.stringify(datos))

      const archivos = state.getIn(
        [
          'formularioRespuesta',
          'documentacion',
          'archivos',
        ]
      ).toJS()

      archivos.forEach((archivo,index) => {
        if (archivo.idPreguntaDetalle === datoPregunta.idPreguntaDetalle)
          archivos.splice(index,1)
      })

      return state.setIn(
        [
          'formularioRespuesta',
          'documentacion',
          'archivos',
        ],
        fromJS(archivos),
      ).updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosArchivos',
          action.indiceDato,
        ],
        stt => stt.merge({
          evidencia:'',
          estatus: datoPregunta.seleccionado && !datoPregunta.requerido?'REFCOM':'REFPEN',
          subioEvidencia:true,
        })
      ).updateIn(
        [
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosPreguntas',
          action.indiceDato,
        ],
        stt => stt.merge({
          estatus: datoPregunta.seleccionado && !datoPregunta.requerido?'REFCOM':'REFPEN',
        })
      )
    }
    case SET_USUARIOS_EVALUACION: {
      console.log("Como estan los datos",action.datos)
      return state.setIn(['formularioRespuesta', 'datosUsuarios'], fromJS(action.datos))
        .setIn(['formularioRespuesta', 'idAsignacion'], action.idAsignacion)
        .setIn(['formularioRespuesta', 'stepper'], 2)
    }
    default: {
      return state;
    } 
  }
}

export default respuestaFormularioReducer;


