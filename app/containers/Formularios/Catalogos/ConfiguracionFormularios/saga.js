/* eslint-disable object-shorthand */
import { takeLatest, call, put, select} from 'redux-saga/effects';
import {
  enqueueSnackbar,
} from 'reducers/notifications/actions';

import Actions from './actions';
// import { obtenerPermisos } from '../../../../services/api';

import {
  getTiposPreguntasApi,
  getFormularios,
  getUsuarios,
  postGuardarFormularioApi,
  getFormularioDetalleApi,
  deleteFormularioApi,
} from './api';

export const {
  OBTENER_PERMISOS,
  OBTENER_TIPOS_PREGUNTAS,
  GET_FORMULARIOS,
  GET_FORMULARIO_DETALLE,
  GET_USUARIOS,
  GUARDAR_FORMULARIO,
  HANDLE_VALIDAR_CAMPOS,
  ON_ELIMINAR_FORMULARIO,
} = Actions.getConstants();
// Individual exports for testing

// export function* obtenerPermisosAction(){
//   // const paramsPermisos = yield select((state) => state.getIn(['global','paramsPermisos']).toJS());
//   const paramsPermisos = {
//     idModulo: 2247,
//     funcionId: 2498,
//     idRolEmpresa: 1250,
//   }
//   const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
//   const {
//     status,
//     data,
//   } = yield call(obtenerPermisos, {...paramsPermisos, idUsuario});

//   if(status === 200){

//     yield put(
//       Actions.get('SET_PERMISOS').fn(data.permisos),
//     );
//   } else{
//     yield put(
//       enqueueSnackbar({ 
//         // message: data.message,
//         message: 'Error al obtener los permisos',
//         options: { 
//           variant: 'error', 
//         }, 
//       })
//     )
//   }
// }

export function* obtenerTiposPreguntasSaga(){
  try {
    const {
      status,
      data,
    } = yield call(getTiposPreguntasApi);
    if(status === 200){
      yield put(
        Actions.get('SET_TIPOS_PREGUNTAS').fn(data),
      );
    } else{
      yield put(
        enqueueSnackbar({ 
        // message: data.message,
          message: 'Error al obtener los tipos de preguntas',
          options: { 
            variant: 'error', 
          }, 
        })
      )
    }
  } catch(error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el tipo de preguntas',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* onEliminarFormularioSaga() {
  try {
    const idFormulario = yield select((state) => 
      state.getIn(
        [
          'formulario',
          'formularioTabla',
          'idFormularioEliminar',
        ]
      )
    )
        
    const datos = {
      idFormulario,
    };
    const {
      status,
      data = [],
    } = yield call(deleteFormularioApi, datos);

    if(status === 200){
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'success',
          },
        })
      )
      yield put(
        Actions.get('SET_FORMULARIOS_ELIMINAR').fn(data.datos)
      )
    } else {
      yield put(
        enqueueSnackbar({
          message: data.message,
          options: {
            variant: 'error',
          },
        })
      );
      yield put(
        Actions.get('ON_ELIMINAR_FORMULARIO_MODAL').fn(0)
      );
    }
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener la información',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* getFormulariosAction(){
  
  const {
    status,
    data,
  } = yield call(getFormularios);
  
  if(status === 200){
    yield put(
      Actions.get('SET_FORMULARIOS').fn(data),
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
}

export function* getUsuariosAction(){
  const {
    status,
    data,
  } = yield call(getUsuarios);
  if(status === 200){
 
    yield put(
      Actions.get('SET_USUARIOS').fn(data),
    );
  } else{
    yield put(
      enqueueSnackbar({ 
        // message: data.message,
        message: 'Error al obtener los usuarios',
        options: { 
          variant: 'error', 
        }, 
      })
    )
  }
}

export function* getFormularioDetalleSaga(action){
  try{
    const {
      status,
      data = [],
    } = yield call(getFormularioDetalleApi,action.idFormulario);
    if(status === 200){
      yield put(
        Actions.get('SET_FORMULARIO_DETALLE').fn(data)
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
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Hubo un error al obtener el detalle',
        options: {
          variant: 'error',
        },
      })
    );
  }
}

export function* validarCamposSaga() {
  try {

    let mensaje = 'Existen datos obligatorios en blanco. Favor de ingresarlos'
    // let sinPreguntas = false
    let sinDatos = false
    let sinError = true
    // este variara dependiendo las validaciones
    
    const campos = yield select((state) => 
      state.getIn(
        [
          'formulario',
          'formularioTabla',
          'nuevoFormulario',
          'campos',
        ]
      ).toJS()
    )
    
    const preguntas = yield select((state) => 
      state.getIn(
        [
          'formulario',
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
        ]
      ).toJS()
    )
    
    const validarValor = campos.tipoFormulario.valor === 'REFEVA' || (campos.tipoFormulario.valor === 'REFENC' && campos.validacion.valor)

    const totalPreguntas = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION') 

    const preguntasVacias = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION' && (dato.nombrePregunta === '' || dato.tipoPregunta === ''))
    const seccionesVacias = preguntas.filter(dato => dato.tipoPregunta === 'SECCION' && dato.nombreSeccion === '' )
    
    let bandPreguntasDetalle = true
    
    for (let i = 0; i < preguntas.length; i+=1) {
      const pregunta = preguntas[i]

      if (pregunta.tipoPregunta !== 'SECCION'){
        const bandPregunta = pregunta.nombrePregunta !== '' && pregunta.tipoPregunta !== ''
        // preguntas.forEach((pregunta) => {
        // if(bandPreguntasDetalle){
        if (pregunta.tipoPregunta !== 'PA'){
          const preguntasAgregadas = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.id !== '')
          const preguntasSinNombre = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.id !== '' && datoPregunta.nombre === '')
          bandPreguntasDetalle = preguntasSinNombre.length === 0 && preguntasAgregadas.length>0
          sinDatos = preguntasAgregadas.length === 0
        }
        if (pregunta.tipoPregunta === 'SM' || pregunta.tipoPregunta === 'LD'){
          const datoVacio = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.id !== '' && datoPregunta.valor === '' && !datoPregunta.noAplica)
          bandPreguntasDetalle = validarValor && pregunta.tieneCalificacion ? datoVacio.length === 0 && bandPreguntasDetalle:true
        }
        if (pregunta.tipoPregunta === 'CVO'){
          const opcionesSinNombre = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.id !== '' && datoOpcion.nombre === '')
          const opcionesAgregadas = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.id !== '')
          const valorInvertido = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.id !== '' && datoPregunta.invertido)
          const valores = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.id !== '' && datoOpcion.valor === '' && !datoOpcion.noAplica)
          const bandValor = validarValor && pregunta.tieneCalificacion? valores.length === 0:true
          let bandValorInvertido = true
          if(valorInvertido.length>0){
            const valoresInvertidos = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.id !== '' && datoOpcion.valorInvertido === '' && !datoOpcion.noAplica)
            bandValorInvertido = validarValor && pregunta.tieneCalificacion? valoresInvertidos.length === 0:true
          }

          bandPreguntasDetalle = bandValor && bandValorInvertido && opcionesSinNombre.length === 0 && opcionesAgregadas.length> 0
          sinDatos = opcionesAgregadas.length === 0
        }
        // }
        if(sinError){
          sinError = bandPregunta && bandPreguntasDetalle
        }
        yield put(
          Actions.get('SET_ERROR_PREGUNTA').fn(i,bandPregunta && bandPreguntasDetalle)
        )
      }else{
        const bandSeccion = pregunta.nombreSeccion !== ''
        if(sinError){
          sinError = bandSeccion
        }
        yield put(
          Actions.get('SET_ERROR_PREGUNTA').fn(i,bandSeccion)
        )
      }
    }

    // })
    // Validar parte de configuracion
    const bandConfiguracion = campos.titulo.valor !== ''
    const bandPreguntas = totalPreguntas.length>0 && preguntasVacias.length === 0 && seccionesVacias.length === 0
    
    // Validar parte de preguntas
    const valido = bandConfiguracion && bandPreguntas && sinError
    // Validar parte de detalles
  
    if (valido){
      yield put(
        Actions.get('HANDLE_ABRIR_MODAL').fn(true)
      )
    } else{
      yield put(
        Actions.get('SET_DATOS_INVALIDOS').fn(bandConfiguracion,bandPreguntas,bandPreguntasDetalle)
      )


      if(totalPreguntas.length===0 && bandConfiguracion ){
        mensaje='Agregar al menos 1 pregunta'
      }
      if(sinDatos && bandConfiguracion){
        mensaje='La pregunta no tiene ningun dato agregado'
      }


      yield put(
        enqueueSnackbar({
          message: mensaje,
          options: {
            variant: 'warning',
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

}

export function* onGuardarFormularioSaga(action) {
  try {
    yield put(
      Actions.get('HANDLE_ABRIR_MODAL').fn(false)
    )
    if (action.agregar){
      const idUsuario = yield select((state) => state.getIn(['global', 'currentUser', 'UsuarioId']));
      const campos = yield select((state) => 
        state.getIn(
          [
            'formulario',
            'formularioTabla',
            'nuevoFormulario',
            'campos',
          ]
        ).toJS()
      )
      const usuariosAutorizados = yield select((state) => 
        state.getIn(
          [
            'formulario',
            'formularioTabla',
            'nuevoFormulario',
            'tablas',
            'usuariosAsignados',
            'datos',
          ]
        ).toJS()
      )
      const preguntas = yield select((state) => 
        state.getIn(
          [
            'formulario',
            'formularioTabla',
            'nuevoFormulario',
            'preguntas',
          ]
        ).toJS()
      )
      preguntas.forEach((pregunta,index) => {
        if(pregunta.tipoPregunta !== 'SECCION'){
          // if(pregunta.tipoPregunta !== 'PA'){
          preguntas[index].datosPreguntas = pregunta.datosPreguntas.filter(datoPregunta => datoPregunta.id !== '')
          // }
          preguntas[index].datosOpciones = pregunta.datosOpciones.filter(datoOpcion => datoOpcion.id !== '')
        }
      })

      const configuracionFormulario = {
        idConfiguracion:campos.idConfiguracion,
        titulo:campos.titulo.valor,
        descripcion:campos.descripcion.valor,
        tipoFormulario:campos.tipoFormulario.valor,
        validacion:campos.validacion.valor,
        permiteEditar:campos.permiteEditar.valor,
        permiteCapturaLibre:campos.permiteCapturaLibre.valor,
      }
      const datosFormulario = {
        configuracionFormulario,
        preguntas,
        usuariosAutorizados,
        idUsuario,
      }
      const {
        status,
        data,
      } = yield call(postGuardarFormularioApi, datosFormulario)

      if(status === 200){
        yield put(
          enqueueSnackbar({
            message: 'El formulario se guardó correctamente',
            options: {
              variant: 'success',
            },
          })
        );
        yield put(
          Actions.get('SET_FORMULARIO_GUARDADO').fn(data)
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
        message: 'Hubo un error al guardar la configuracion',
        options: {
          variant: 'error',
        },
      })
    );
  }

}

// Individual exports for testing
export default function* formularioSaga() {
  yield[
    // takeLatest(
    //   OBTENER_PERMISOS,
    //   obtenerPermisosAction
    // ),
    takeLatest(
      OBTENER_TIPOS_PREGUNTAS,
      obtenerTiposPreguntasSaga
    ),
    takeLatest(
      GET_FORMULARIOS,
      getFormulariosAction
    ),
    takeLatest(
      GET_FORMULARIO_DETALLE,
      getFormularioDetalleSaga
    ),
    takeLatest(
      GUARDAR_FORMULARIO,
      onGuardarFormularioSaga
    ),
    takeLatest(
      HANDLE_VALIDAR_CAMPOS,
      validarCamposSaga
    ),
    takeLatest(
      GET_USUARIOS,
      getUsuariosAction
    ),
    takeLatest(
      ON_ELIMINAR_FORMULARIO,
      onEliminarFormularioSaga,
    ),
  ]
}
