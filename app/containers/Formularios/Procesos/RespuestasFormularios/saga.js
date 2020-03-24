/* eslint-disable object-shorthand */
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';
import ActionsSpinner from 'components/Spinner/store/actions';

import {parseInt} from 'lodash';
import Actions from './actions';
import { obtenerPermisos } from '../../../../services/api';

import {
  getFormulariosApi,
  getFormularioPreguntasApi,
  postGuardarRespuestasApi,
  getDownloadedFile,
  postUploadFile,
  getUsuariosEvaluados,
  // getUsuarios,
  // postGuardarFormularioApi,
} from './api';

export const {
  OBTENER_PERMISOS,
  GET_FORMULARIOS,
  GET_PREGUNTAS,
  GUARDAR_RESPUESTAS,
  HANDLE_VALIDAR_CAMPOS,
  HANDLE_DOWNLOAD_ARCHIVO,
  GET_USUARIOS_EVALUACION,
} = Actions.getConstants();
// Individual exports for testing

const {
  CHANGE_SPINNER,
} = ActionsSpinner.getConstants();

export function* obtenerPermisosAction(){
  // const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
  const paramsPermisos = {
    idModulo: 2247,
    funcionId: 2498,
    idRolEmpresa: 1250,
  }
  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const {
    status,
    data,
  } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

  if(status === 200){

    yield put(
      Actions.get('SET_PERMISOS').fn(data.permisos),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los permisos',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getFormulariosSaga(action){

  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const datos = {
    tipoFormulario: action.tipoFormulario,
    usuario:idUsuario,
  }
  
  const {
    status,
    data,
  } = yield call(getFormulariosApi,datos);
  if(status === 200){
    yield put(
      Actions.get('SET_FORMULARIOS').fn(data,action.tipoFormulario),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los formularios',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* getUsuariosEvaluacionAction(action){

  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  const {
    status,
    data,
  } = yield call(getUsuariosEvaluados,action.idAsignacion, idUsuario);

  if(status === 200){
    yield put(
      Actions.get('SET_USUARIOS_EVALUACION').fn(data, action.idAsignacion),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los usuarios a evaluar',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* getFormularioPreguntasSaga(action){
  
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });

  const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
  // const idUsuarioEvaluar = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'idUsuarioEvaluar']));
  const datos = {
    idFormulario: action.idFormulario,
    usuario:idUsuario,
    usuarioEvaluar:action.idUsuario?action.idUsuario:null,
  }
  const {
    status,
    data = [],
  } = yield call(getFormularioPreguntasApi,datos);
  
  if(status === 200){
    yield put(
      Actions.get('SET_PREGUNTAS').fn(data,action.idFormulario, action.idUsuario)
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener el detalle del formulario',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* guardarRespuestaSaga(action) {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {
    yield put(
      Actions.get('HANDLE_ABRIR_MODAL').fn(false)
    )
    if (action.agregar){
      const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
      const idAsignacion = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'nuevaRespuesta','idAsignacion']));
      const idRespuesta = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'nuevaRespuesta','idRespuesta']));
      const tipoFormulario = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'tipoFormulario']));
      const calificacion = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'calificacion']));
      const idUsuarioEvaluar = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta','idUsuarioEvaluar']));

      const preguntas = yield select((state) => 
        state.getIn(
          [
            'respuestaFormulario',
            'formularioRespuesta',
            'nuevaRespuesta',
            'preguntas',
          ]
        ).toJS()
      )

      const archivos = yield select((state) => 
        state.getIn(
          [
            'respuestaFormulario',
            'formularioRespuesta',
            'documentacion',
            'archivos',
          ]
        ).toJS()
      )
      const arregloArchivos = [];
      if (archivos.length>0){
        for (let k = 0; k < archivos.length; k+=1) {
          const formData = new FormData()
          formData.append('refId', 'documentacion')
          const idPreguntasDetalles = [];
          const datosPreguntas = yield select((state) => 
            state.getIn(
              [
                'respuestaFormulario',
                'formularioRespuesta',
                'nuevaRespuesta',
                'preguntas',
                archivos[k].indicePregunta,
                'datosPreguntas',
              ]
            ).toJS()
          )
          
          const datoPregunta = datosPreguntas.filter(dato => dato.idPreguntaDetalle === archivos[k].idPreguntaDetalle)
          if (datoPregunta[0].seleccionado){
            if (archivos[k].File || archivos[k].Ruta){
              if(archivos[k].File){
                formData.append('files', archivos[k].File, archivos[k].File.name)
                idPreguntasDetalles.push({idPreguntaDetalle:archivos[k].idPreguntaDetalle
                  ,idArchivo:archivos[k].idArchivo})
              }else{
                arregloArchivos.push(
                  {
                    'rutaArchivo': archivos[k].Ruta,
                    'name': archivos[k].Nombre,
                    'idPreguntaDetalle': archivos[k].idPreguntaDetalle,
                    'idArchivo': archivos[k].idArchivo,
                  }
                ) 
              }
            } 
            if (idPreguntasDetalles.length>0 && datoPregunta[0].seleccionado){
              const {
                status: statusFi,
                data : dataFi,
              } = yield call(postUploadFile, formData);
              if(statusFi === 200){
                for (let j = 0; j < dataFi.length; j+=1) {
                  arregloArchivos.push(
                    {
                      'rutaArchivo': dataFi[j].url,
                      'name': dataFi[j].name,
                      'idPreguntaDetalle': idPreguntasDetalles[j].idPreguntaDetalle,
                      'idArchivo': idPreguntasDetalles[j].idArchivo,
                    }
                  ) 
                }
              }
            }
          }
        }
      }

      preguntas.forEach((pregunta) => {
        pregunta.calificacion = parseFloat(pregunta.calificacion)
        if (pregunta.tipoPregunta === 'CVO' ){
          // const bandPregunta = pregunta.nombrePregunta !== '' && pregunta.tipoPregunta !== ''
          pregunta.datosPreguntas.forEach((datoPregunta) => {
            datoPregunta.respuesta= parseInt(datoPregunta.respuesta)
          })
        }
        if (pregunta.tipoPregunta === 'SM' ){
          pregunta.respuesta = parseInt(pregunta.respuesta)
          // const bandPregunta = pregunta.nombrePregunta !== '' && pregunta.tipoPregunta !== ''
        }
        if (pregunta.tipoPregunta === 'LD' ){
          pregunta.respuesta = parseInt(pregunta.respuesta)
          // const bandPregunta = pregunta.nombrePregunta !== '' && pregunta.tipoPregunta !== ''
        }
      })
      
      const datosRespuesta = {
        idUsuario,
        idAsignacion,
        idRespuesta,
        tipoFormulario,
        preguntas,
        archivos: arregloArchivos,
        calificacion,
        idUsuarioEvaluar:tipoFormulario==='REFEVA'?idUsuarioEvaluar:null,
      }

      const {
        status,
        data,
      } = yield call(postGuardarRespuestasApi, datosRespuesta)
      console.log("Preguntas al guardar",preguntas)
      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: 'La respuesta se guardó correctamente',
            options: {
              variant: 'success',
            },
          })
        );
        yield put(
          Actions.get('SET_RESPUESTA_GUARDADA').fn(data)
        );

      } else {
        yield put(
          enqueueSnackbar({
            message: data.message,
            options: {
              variant: 'error',
            },
          })
        );
      }
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al guardar las respuestas',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* validarCamposSaga() {
  yield put({
    type: CHANGE_SPINNER,
    status: true,
  });
  try {    
    const preguntas = yield select((state) => 
      state.getIn(
        [
          'respuestaFormulario',
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
        ]
      ).toJS()
    )
    const permiteEditar = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'nuevaRespuesta','permiteEditar']));
    const existeRespuesta = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'nuevaRespuesta','existeRespuesta']));    
    const tipoFormulario = yield select((state) => state.getIn(['respuestaFormulario', 'formularioRespuesta', 'tipoFormulario']));

    
    let calificacionFinal = 0
    let calificacionSeccion = 0
    let contadorSecciones = 0
    let contadorPreguntas = 0
    let sumaPreguntas = 0
    let sumaSecciones = 0
    let idSeccion = -1
    let datosValidos = true
    let datosCorrectos = true
    
    // if (valido){
    // Validar campos en esta parte solo para quien en la pregunta diga solicitar respuesta
    for (let i = 0; i < preguntas.length; i+=1) {
      const pregunta = preguntas[i]
      let calificacionPregunta = 0
      const noValidar = permiteEditar && tipoFormulario === 'REFFOR' && existeRespuesta
      if(!noValidar){
        if (pregunta.tipoPregunta !== 'SECCION'){
        // preguntas.forEach((pregunta) => {
          if(pregunta.solicitarRespuesta){
            if(pregunta.tipoPregunta === 'PA' || pregunta.tipoPregunta === 'SM' || pregunta.tipoPregunta === 'LD'){
              datosValidos = pregunta.respuesta !== ''
            }else{
              const respondidas = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.respuesta !== '')
              const archivosSubidos = pregunta.datosArchivos.filter(datoArchivo => datoArchivo.evidencia !== '')

              switch (pregunta.tipoPregunta) {
                case 'CV':
                  datosValidos= respondidas.length>0
                  break;
                case 'SA':
                  console.log("Si entro aqui?",pregunta.datosPreguntas.length)
                  console.log("Archivos subidos",archivosSubidos.length)
                  datosValidos= pregunta.datosPreguntas.length === archivosSubidos.length
                  break;
                default:
                  datosValidos= pregunta.datosPreguntas.length === respondidas.length
                  break;
              }
            }
          }else{
          // falta validar Serie de preugntas y Subir archivo
            if (pregunta.tipoPregunta === 'SP'){
              let datosContestados = true
              pregunta.datosPreguntas.forEach((datoPregunta) => {
                if(datoPregunta.requerido && datosContestados){
                  datosContestados = datoPregunta.respuesta !== ''
                }
              })
              datosValidos = datosContestados
            }
            if (pregunta.tipoPregunta === 'SA'){
              let datosContestados = true
              pregunta.datosArchivos.forEach((datoArchivo) => {
                if(datoArchivo.requerido && datosContestados){
                  console.log("Como estan los datos akkkqui",datoArchivo)
                  datosContestados = datoArchivo.evidencia !== ''
                }
              })
              datosValidos = datosContestados
            }
          }
          let aplicarPregunta = true
          // if(bandPreguntasDetalle){
          if ((pregunta.tipoPregunta === 'LD' || pregunta.tipoPregunta === 'SM') && pregunta.tieneCalificacion){
            const idRespuesta = parseInt(pregunta.respuesta)
            // preguntar al eddie si no aplica se queda 100 0 - 0.00
            for (let j = 0; j < pregunta.datosPreguntas.length; j+=1) {
              const respuesta = pregunta.datosPreguntas[j]
              if(respuesta.idPreguntaDetalle === idRespuesta){
                calificacionPregunta = !respuesta.noAplica?respuesta.valor/pregunta.valorMaximo:-1
                aplicarPregunta = !respuesta.noAplica
                yield put(
                  Actions.get('SET_CALIFICACION_DETALLE').fn(calificacionPregunta,i,j)
                )
              }
            }
            // calificacionPregunta = respuesta.length>0?(respuesta[0].valor/pregunta.valorMaximo):0
            if(aplicarPregunta){
              contadorPreguntas+=1
            }
          }
          if (pregunta.tipoPregunta === 'CVO' && pregunta.tieneCalificacion ){
          // Aqui se tiene que dividir entre todas las preguntas al final
            let sumaCalificaciones = 0
            let contadorPreguntasAplicadas = 0 

            for (let j = 0; j < pregunta.datosPreguntas.length; j+=1) {
              const datoPregunta = pregunta.datosPreguntas[j]
              const idRespuesta = parseInt(datoPregunta.respuesta)
              const respuesta = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.idPreguntaDetalle === idRespuesta)
              let valorRespuesta = 0
              if(respuesta.length>0 && !respuesta[0].noAplica){
                contadorPreguntasAplicadas +=1
                if(datoPregunta.invertido){
                  valorRespuesta=respuesta.length>0?respuesta[0].valorInvertido:0
                  sumaCalificaciones += respuesta.length>0?respuesta[0].valorInvertido:0
                }else{
                  valorRespuesta=respuesta.length>0?respuesta[0].valor:0
                  sumaCalificaciones += respuesta.length>0?respuesta[0].valor:0
                }
              }
              const calificacionValor = respuesta.length>0 && !respuesta[0].noAplica? valorRespuesta/pregunta.valorMaximo:-1
              yield put(
                Actions.get('SET_CALIFICACION_DETALLE').fn(calificacionValor,i,j)
              )
            }
            const valorMaximo = contadorPreguntasAplicadas * pregunta.valorMaximo
            aplicarPregunta = contadorPreguntasAplicadas > 0
            calificacionPregunta = valorMaximo>0?(sumaCalificaciones/valorMaximo):0
            if(contadorPreguntasAplicadas > 0){
              contadorPreguntas+=1
            }
            
          }
          // }
          // const variablePrueba = parseFloat(calificacionPregunta).toFixed(2)
          if(aplicarPregunta){
            sumaPreguntas+=calificacionPregunta
          }
        
          if(!datosValidos){
            datosCorrectos = false
          }
          yield put(
            Actions.get('SET_CALIFICACION').fn(0,i,parseFloat(calificacionPregunta).toFixed(2),datosValidos,idSeccion)
          )
        }else{
          if(idSeccion !== -1 ){
            if(contadorPreguntas>0){
              contadorSecciones+=1

              console.log("Suma preguntas",sumaPreguntas)
              console.log("Contador preguntas",contadorPreguntas)
              calificacionSeccion = sumaPreguntas / contadorPreguntas
              console.log("Calificacion de seccion",calificacionSeccion)
              sumaSecciones+=calificacionSeccion
              contadorPreguntas = 0
              sumaPreguntas = 0
              yield put(
                Actions.get('SET_CALIFICACION').fn(0,idSeccion,parseFloat(calificacionSeccion).toFixed(2),true,idSeccion)
              )
            }
          }
          idSeccion=i
        }
      }
    }
    // Calificacion de la seccion final
    if(contadorPreguntas>0){
      // falta ver porque aqui no guarda la calificacion de la seccion
      contadorSecciones+=1
      calificacionSeccion = sumaPreguntas / contadorPreguntas
      sumaSecciones+=calificacionSeccion
      yield put(
        Actions.get('SET_CALIFICACION').fn(0,idSeccion,parseFloat(calificacionSeccion).toFixed(2),true,idSeccion)
      )
    }
    if(contadorSecciones>0){
    // Calificacion final
      calificacionFinal = sumaSecciones / contadorSecciones
      yield put(
        Actions.get('SET_CALIFICACION').fn(1,0,calificacionFinal,true)
      )
    }

    if(datosCorrectos){
      yield put(
        Actions.get('HANDLE_ABRIR_MODAL').fn(true)
      )
    }else{
      yield put(
        enqueueSnackbar({
          message: 'Existen preguntas sin contestar',
          options: {
            variant: 'error',
          },
        })
      );
    }

  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al validar los campos al guardar',
        options: {
          variant: 'error',
        },
      })
    );
  }
  yield put({
    type: CHANGE_SPINNER,
    status: false,
  });
}

export function* handleDownloadArchivoSaga(action) {
  try {
    let url = '';
    let band = true;
    let file;
    let nombreArchivo
    let ruta;
    // const insumo = action.tipoInsumo === 0 ? 'piezas' : 'accesorios'
    // const datos = state.getIn(
    //   ['formularioRespuesta'
    // ,'nuevaRespuesta'
    // ,'preguntas'
    // ,action.indicePregunta
    // ,'datosPreguntas'
    // ,action.indiceDato])

    const datos = yield select((state) => 
      state.getIn(
        [
          'respuestaFormulario',
          'formularioRespuesta',
          'nuevaRespuesta',
          'preguntas',
          action.indicePregunta,
          'datosArchivos',
          action.indiceDato,
        ]
      )
    )
    const datoPregunta = JSON.parse(JSON.stringify(datos))
    // const idInsumo = action.tipoInsumo === 0 ? datoInsumo.IdPieza : datoInsumo.IdAccesorio
    const archivos = yield select((state) => 
      state.getIn(
        [
          'respuestaFormulario',
          'formularioRespuesta',
          'documentacion',
          'archivos',

        ]
      ).toJS()
    )

    if (archivos[0].Nombre ){
      archivos.forEach((archivo) => {
        if (archivo.idPreguntaDetalle === datoPregunta.idPreguntaDetalle){
          ruta = archivo.Ruta
          nombreArchivo = archivo.Nombre
        }
        
      })
      const {
        status,
        data,
      } = yield call (getDownloadedFile, ruta);
      if(status === 200){
        url = window.URL.createObjectURL(new Blob([data]));
      } else {
        yield put(
          enqueueSnackbar({
            message: 'Hubo un error al descargar el archivo',
            options: {
              variant: 'error',
            },
          })
        )
        band = false;
      }
    }else{
      archivos.forEach((archivo) => {
        if (archivo.idPreguntaDetalle === datoPregunta.idPreguntaDetalle)
          file = archivo.File
      })
      url = window.URL.createObjectURL(new Blob([file]));
      nombreArchivo=file.name
    }
    
    if(band){
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      yield put(
        enqueueSnackbar({
          message: 'Se ha descargado el archivo correctamente.',
          options: {
            variant: 'success',
          },
        })
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al descargar el archivo',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

// Individual exports for testing
export default function* respuestaFormularioSaga() {
  yield[
    takeLatest(
      OBTENER_PERMISOS,
      obtenerPermisosAction
    ),
    takeLatest(
      GET_FORMULARIOS,
      getFormulariosSaga
    ),
    takeLatest(
      GET_PREGUNTAS,
      getFormularioPreguntasSaga
    ),
    takeLatest(
      GUARDAR_RESPUESTAS,
      guardarRespuestaSaga
    ),
    takeLatest(
      HANDLE_VALIDAR_CAMPOS,
      validarCamposSaga
    ),
    takeLatest(
      HANDLE_DOWNLOAD_ARCHIVO,
      handleDownloadArchivoSaga,
    ),
    takeLatest(
      GET_USUARIOS_EVALUACION,
      getUsuariosEvaluacionAction
    ),
  ]
}

