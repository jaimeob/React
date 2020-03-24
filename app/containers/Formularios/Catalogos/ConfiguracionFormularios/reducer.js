/* eslint-disable no-else-return */
/*
 *
 * Transformacion reducer
 *
 */

import { fromJS } from 'immutable';
import {parseInt,flatten} from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  DEFAULT,
  NUEVO_FORMULARIO,
  REGRESAR,
  SET_PERMISOS,
  MOSTRAR_COMPONENTE,
  ON_INPUT_CHANGE,
  ON_INPUT_PREGUNTA_CHANGE,
  ON_INPUT_NOMBRE_SECCION_CHANGE,
  ON_INPUT_DESCRIPCION_SECCION_CHANGE,
  ON_COLOR_SECCION_CHANGE,
  ON_INPUT_RESPUESTA_CHANGE,
  ON_INPUT_DATO_PREGUNTA_CHANGE,
  ON_INPUT_VALOR_PREGUNTA_CHANGE,
  ON_INPUT_CHECK_PREGUNTA_CHANGE,
  ON_INPUT_CHECK_OPCION_CHANGE,
  ON_INPUT_TIPO_PREGUNTA_CHANGE,
  ORDENAR_PREGUNTA,
  ORDENAR_DATOS_PREGUNTA,
  COPIAR_PREGUNTA,
  ELIMINAR_PREGUNTA,
  MOSTRAR_PREGUNTAS,
  ELIMINAR_DATOS_PREGUNTA,
  SET_TIPOS_PREGUNTAS,
  AGREGAR_PREGUNTA,
  SET_FORMULARIOS,
  SET_FORMULARIO_DETALLE,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_USUARIOS,
  ON_CHANGE_USUARIO,
  ON_AGREGAR_USUARIO,
  ON_AGREGAR_DATO_PREGUNTA,
  HANDLE_ABRIR_MODAL,
  SET_FORMULARIO_GUARDADO,
  SET_DATOS_INVALIDOS,
  SET_ERROR_PREGUNTA,
  LIMPIAR_STATE,
  ON_ELIMINAR_FORMULARIO_MODAL,
  SET_FORMULARIOS_ELIMINAR,
  REMOVE_ROW,
} = Actions.getConstants();

// Array.prototype.move = function (from, to) {
//   this.splice(to, 0, this.splice(from, 1)[0]);
// };

function formularioReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT:{
      return state;
    }
    case LIMPIAR_STATE:{
      return initialState;
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case MOSTRAR_COMPONENTE: {
      const mostrarComponente = state.getIn(['formularioTabla','mostrarComponente'])      
      return state .setIn(['formularioTabla', 'mostrarComponente'], !mostrarComponente)
    }
    case SET_TIPOS_PREGUNTAS: { 
      return state.setIn(['formularioTabla','combos','tipoPreguntas'], fromJS(action.datos))
    }
    case HANDLE_ABRIR_MODAL: { 
      return state.updateIn(
        [
          'formularioTabla',
          'datosModal',
        ],
        stt => stt.merge({
          abrirModal: action.band,
          mensajeConfirmacion:action.band?'¿Deseá continuar?':'',

        })
      )
    }
    case SET_DATOS_INVALIDOS: {

      const titulo = state.getIn(['formularioTabla', 'nuevoFormulario', 'campos','titulo','valor'])
      // const descripcion = state.getIn(['formularioTabla', 'nuevoFormulario', 'campos','descripcion','valor'])
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS()

      let stt = state;
      preguntas.forEach((pregunta,indicePregunta) => {
        if (pregunta.tipoPregunta !== 'SECCION'){
          stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'errorNombrePregunta'], pregunta.nombrePregunta === '')
          stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'errorTipoPregunta'], pregunta.tipoPregunta === '')

          // const bandPregunta = pregunta.nombrePregunta !== '' && pregunta.tipoPregunta !== ''
          pregunta.datosPreguntas.forEach((datoPregunta,indiceDato) => {
            if (pregunta.tipoPregunta !== 'PA'){
              stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'datosPreguntas',indiceDato,'errorNombre'], datoPregunta.id !== '' && datoPregunta.nombre === '')
            }
            if (pregunta.tipoPregunta === 'LD' && pregunta.tipoPregunta === 'SM'){
              stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'datosPreguntas',indiceDato,'errorValor'], datoPregunta.id !== '' && datoPregunta.valor === '' && !datoPregunta.noAplica)
            }
          })

          pregunta.datosOpciones.forEach((datoOpcion,indiceDato) => {
            const valorInvertido = pregunta.datosPreguntas.filter(dPregunta => dPregunta.id !== '' && dPregunta.invertido)
            if (pregunta.tipoPregunta === 'CVO'){
              stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'datosOpciones',indiceDato,'errorNombre'], datoOpcion.id !== '' && datoOpcion.nombre === '')
              stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'datosOpciones',indiceDato,'errorValor'], datoOpcion.id !== '' && datoOpcion.valor === '' && !datoOpcion.noAplica)
              if(valorInvertido.length>0){
                stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'datosOpciones',indiceDato,'errorValorInvertido'], datoOpcion.id !== '' && datoOpcion.valorInvertido === '' && !datoOpcion.noAplica)
              }
            }
          })
        }else{
          stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'errorNombreSeccion'], pregunta.nombreSeccion === '')
          // stt = stt.setIn(['formularioTabla', 'nuevoFormulario','preguntas',indicePregunta,'errorDescripcionSeccion'], pregunta.descripcionSeccion === '')
        }
      })

      return stt.setIn(['formularioTabla', 'nuevoFormulario','campos','titulo','campoValido'], titulo !== '')
      // .setIn(['formularioTabla', 'nuevoFormulario','campos','descripcion','campoValido'], descripcion !== '')

    }
    case SET_ERROR_PREGUNTA: {
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          datosValidos: action.datosValidos,
        })
      )
    }
    case SET_FORMULARIOS: {
      return state.setIn(['formularioTabla', 'datos'], fromJS(action.data))
    }
    case SET_USUARIOS: {
      return state.setIn(['formularioTabla','combos','usuarios'], fromJS(action.data))
    }
    case REGRESAR: {
      const disabled = {
        agregar: true,
        guardar: true,
      }

      const modal = {
        value: false,
        stepper: 0,
        text: '',
        options: 'Select',
      }

      const nuevoFormulario = {
        idConfiguracion:null,
        idKey:0,
        campos: {
          titulo: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
          descripcion: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
          tipoFormulario: {
            valor: 'REFENC',
            campoValido: true,
            disabled: false,
          },
          validacion: {
            valor: false,
            campoValido: true,
            disabled: false,
          },
          usuario: {
            valor: '',
            campoValido: true,
            disabled: false,
          },
          permiteEditar: {
            valor: false,
            campoValido: true,
            disabled: false,
          },
        },
        tablas: {
          usuariosAsignados: {
            datos: [],
            seleccionados: [],
          },
        },
        preguntas:[],
      }
      
      return state.setIn(['formularioTabla', 'nuevoFormulario'], fromJS(nuevoFormulario))
        .setIn(['formularioTabla', 'disabled'], fromJS(disabled))
        .setIn(['formularioTabla', 'stepper'], 0)
        .setIn(['formularioTabla', 'modal'], fromJS(modal))
        .setIn(['formularioTabla', 'nuevoFormulario', 'combos', 'usuarios'], fromJS(action.data))
    }
    case ON_INPUT_CHANGE: {
      if(action.campo === 0)
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'titulo',
          ],
          stt => stt.merge({
            valor: action.valor,
            campoValido: action.valor !== '',
          })
        )
      if(action.campo === 1)
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'descripcion',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: action.valor !== '',
          })
        )
      if(action.campo === 2){
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'tipoFormulario',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: (action.valor >= 0),
          })
        ).setIn(['formularioTabla', 'nuevoFormulario','campos', 'validacion','valor'], action.valor === 'REFEVA')
      }
      if(action.campo === 3)
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'validacion',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: (action.valor >= 0),
          })
        )
      if(action.campo === 4)
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'permiteEditar',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: (action.valor >= 0),
          })
        ).updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'permiteCapturaLibre',
          ],
          stt => stt.merge({
            valor: false,
            // campoValido: (action.valor >= 0),
          })
        )
      if(action.campo === 5)
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'permiteCapturaLibre',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: (action.valor >= 0),
          })
        ).updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'campos',
            'permiteEditar',
          ],
          stt => stt.merge({
            valor: false,
            // campoValido: (action.valor >= 0),
          })
        )
      return state;
    }
    case ON_INPUT_PREGUNTA_CHANGE: {
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          nombrePregunta: action.valor,
          errorNombrePregunta:action.valor === '',
        })
      )
    }
    case ON_INPUT_NOMBRE_SECCION_CHANGE: {
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          nombreSeccion: action.valor,
          errorNombreSeccion:action.valor === '',
        })
      )
    }
    case ON_INPUT_DESCRIPCION_SECCION_CHANGE: {
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          descripcionSeccion: action.valor,
          // errorDescripcionSeccion:action.valor === '',
        })
      )
    }
    case ON_COLOR_SECCION_CHANGE: {
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          colorSeccion: action.color,
        })
      )
    }
    case ON_INPUT_RESPUESTA_CHANGE: {
      const respuesta = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice,'solicitarRespuesta']);
      const tieneCalificacion = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice,'tieneCalificacion']);
      const arrayDatosPreguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice,'datosPreguntas']).toJS();
      arrayDatosPreguntas.forEach((dato,index) => {
        arrayDatosPreguntas[index].requerido = action.tipo === 0?!respuesta:respuesta
      })
      // dato.requerido
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          solicitarRespuesta: action.tipo === 0?!respuesta:respuesta,
          tieneCalificacion:action.tipo === 1?!tieneCalificacion:tieneCalificacion,
          datosPreguntas: arrayDatosPreguntas,
        })
      )
    }
    case ON_INPUT_DATO_PREGUNTA_CHANGE: {
      // const datosTipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones';
      const tipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones'
      // const datoPregunta = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta]).toJS();
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indicePregunta,
          tipo,
          action.indice,
        ],
        stt => stt.merge({
          nombre: action.valor,
          errorNombre: action.valor === '',
        })
      )
    }
    case ON_INPUT_VALOR_PREGUNTA_CHANGE: {
      // const datosTipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones';
      const tipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones'
      // const tipoValor = action.tipoValor === 0 ? 'valor':'valorInvertido'
      const valorRecibido = action.valor !== ''?parseInt(action.valor):''
      if(action.tipoValor === 0){
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'preguntas',
            action.indicePregunta,
            tipo,
            action.indice,
          ],
          stt => stt.merge({
            valor: valorRecibido,
            errorValor:valorRecibido === '',
          })
        )
      }
      // const datoPregunta = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta]).toJS();
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indicePregunta,
          tipo,
          action.indice,
        ],
        stt => stt.merge({
          valorInvertido: valorRecibido,
          errorValorInvertido:valorRecibido === '',
        })
      )
    }
    case ON_INPUT_CHECK_PREGUNTA_CHANGE: {
      // const datosTipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones';
      let tipo=''
      switch (action.tipo) {
        case 0:
          tipo='requerido'
          break;
        case 1:
          tipo='archivo'
          break;
        case 2:
          tipo='invertido'
          break;
        case 3:
          tipo='captura'
          break;
        case 4:
          tipo='noAplica'
          break;
        default: 
      }
      const dato = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,'datosPreguntas',action.indice,tipo]);
      return state.setIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indicePregunta,
          'datosPreguntas',
          action.indice,
          tipo,
        ],!dato)
    }
    case ON_INPUT_CHECK_OPCION_CHANGE: {
      // const datosTipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones';
      const noAplica = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,'datosOpciones',action.indice,'noAplica']);
      return state.setIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indicePregunta,
          'datosOpciones',
          action.indice,
          'noAplica',
        ],!noAplica)
    }
    case ORDENAR_PREGUNTA: {
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS();
      const preguntaSeleccionada = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice]).toJS();
      const indiceMovido = action.tipoOrdenamiento === 0 ? action.indice+1:action.indice-1
      let preguntaMovida = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',indiceMovido]).toJS();
      
      // Si es seccion validar que haya mas de una seccion
      const arraySecciones = preguntas.filter(dato => dato.tipoPregunta === 'SECCION')
      let agregoSiguiente = false
      // Enviar ordenar por tipo
      // Validar que la pregunta no pueda estar en la posicion 0 (Listo)
      if(action.tipo === 0){
        let indiceSeccion =0
        preguntas.forEach((pregunta,index) => {
          if(pregunta.tipoPregunta === 'SECCION'){
            if(index < action.indice && action.tipoOrdenamiento === 1){
              indiceSeccion=index
            }
            if(index > action.indice && action.tipoOrdenamiento === 0 && !agregoSiguiente){
              indiceSeccion=index
              agregoSiguiente=true
            }
          }
        })
        
        const arrayPreguntas = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION' && dato.idSeccionTemporal === preguntaSeleccionada.idSeccionTemporal)
        
        const seccionMovida = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',indiceSeccion]).toJS();
        const arrayMovidos = preguntas.filter(dato => dato.tipoPregunta !== 'SECCION' && dato.idSeccionTemporal === seccionMovida.idSeccionTemporal)
        if(arraySecciones.length>1){
          // debugger;
          const intento = preguntas.splice(action.indice,(arrayPreguntas.length+1))


          if(action.tipoOrdenamiento === 0){
            indiceSeccion = action.indice+(arrayMovidos.length + 1)
          }else{
            indiceSeccion = action.indice-(arrayMovidos.length + 1)
          }
          let cont = 0
          for( let i = indiceSeccion; cont < intento.length; i+=1){
            preguntas.splice(i,0,intento[cont]);
            cont += 1
          }

        }
      }else{
        if(preguntaMovida.tipoPregunta === 'SECCION' && action.tipoOrdenamiento === 1){
          preguntaMovida = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',indiceMovido-1]).toJS();
        }
        preguntas[action.indice].idSeccionTemporal = preguntaMovida.idSeccionTemporal
        preguntas[action.indice].colorSeccion = preguntaMovida.colorSeccion
        preguntas.splice(indiceMovido,0,preguntas.splice(action.indice,1)[0]);
      }

      // Si es seccion sacar todas las preguntas que pertenecen a la seccion y sumarle 1 que es la seccion
      preguntas.forEach((pregunta,index) => {
        preguntas[index].orden = index+1
      })
      // Si es pregunta que se quede con la seccion del movido

      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas'], fromJS(preguntas))

    }
    case ORDENAR_DATOS_PREGUNTA: {
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      const tipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones'
      const datos = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo]).toJS();
      const indiceMovido = action.tipoOrdenamiento === 0 ? action.indice+1:action.indice-1
      if(datos.length>1){
        datos.splice(indiceMovido,0,datos.splice(action.indice,1)[0]);
      }
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo], fromJS(datos))
    }
    case COPIAR_PREGUNTA: {
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS();
      const key = state.getIn(['formularioTabla', 'nuevoFormulario', 'idKey']);
      // const ultimaPregunta = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',preguntas.length-1]).toJS();
      const preguntaCopiada = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice]).toJS();

      // preguntaCopiada.orden=16
      // const indiceMovido = action.tipoOrdenamiento === 0 ? action.indice+1:action.indice-1
      const preguntaNueva = {
        orden : preguntaCopiada.orden,
        contador:key+1,
        idPregunta:null,
        nombrePregunta:'',
        errorNombrePregunta:false,
        datosValidos:true,
        tipoPregunta:'',
        errorTipoPregunta:false,
        solicitarRespuesta:false,
        tieneCalificacion:true,
        ultimoAgregado:true,
        idSeccion:null,
        idSeccionTemporal:preguntaCopiada.idSeccionTemporal,
        mostrarPregunta:true,
        colorSeccion:preguntaCopiada.colorSeccion,
        datosOpciones:[   
          {
            id:'',
            idPreguntaDetalle:null,
            nombre:'',
            valor:'',
            valorInvertido:'',
            noAplica:false,
            errorNombre:false,
            errorValor:false,
            errorValorInvertido:false,
          },
        ],
        datosPreguntas:[
          {
            id:'',
            idPreguntaDetalle:null,
            nombre:'',
            valor:'',
            requerido:false,
            archivo:false,
            invertido:false,
            captura:false,
            noAplica:false,
            errorNombre:false,
            errorValor:false,
          },
        ],
      }
      preguntaCopiada.idPregunta = null
      if(preguntaCopiada.tipoPregunta !== 'SECCION'){
        preguntaCopiada.datosPreguntas.forEach((pregunta,index) => {
          preguntaCopiada.datosPreguntas[index].idPreguntaDetalle = null
        })
        preguntaCopiada.datosOpciones.forEach((opcion,index) => {
          preguntaCopiada.datosOpciones[index].idPreguntaDetalle = null
        })
      }

      const nuevaPregunta = action.tipo === 0 ? preguntaCopiada : preguntaNueva
      // if(datos.length>1){
      preguntas.splice(action.indice+1,0,nuevaPregunta);
      preguntas.forEach((pregunta,index) => {
        if(index > action.indice){
          preguntas[index].orden+=1
          preguntas[index].ultimoAgregado = action.indice+1 === index
          if(action.indice+1 === index){
            preguntas[index].contador = key+1
          }
        }
        if(pregunta.idSeccionTemporal === preguntaCopiada.idSeccionTemporal){
          if(pregunta.tipoPregunta==='SECCION'){
            preguntas[index].mostrarSeccion=true
          }else{
            preguntas[index].mostrarPregunta=true
          }
        }
      })
      // }
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas'], fromJS(preguntas))
        .setIn(['formularioTabla', 'nuevoFormulario', 'idKey'], key+1)
    }
    case ELIMINAR_PREGUNTA: {
      
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS();
      const preguntaSeleccionada = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice]).toJS();
      // const indiceMovido = action.tipoOrdenamiento === 0 ? action.indice+1:action.indice-1
      // if(datos.length>1){
      const idSeccion = preguntaSeleccionada.idSeccionTemporal
      if(preguntaSeleccionada.tipoPregunta==='SECCION'){
        for( let i = 0; i < preguntas.length; i+=1){
          if(preguntas[i].idSeccionTemporal===idSeccion){
            preguntas.splice(i,1)
            i-=1
          }
        }
      }else{
        preguntas.splice(action.indice,1)
      }
      
      // preguntas.splice(action.indice,1)
      // }
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas'], fromJS(preguntas))
    }
    case MOSTRAR_PREGUNTAS: {
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS();
      const seccionSeleccionada = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indice]).toJS()
      // const seccionSeleccionada= JSON.parse(JSON.stringify(seccionSeleccionadaArray)); 
      
      preguntas[action.indice].mostrarSeccion = action.mostrar

      preguntas.forEach((pregunta,indice) => {
        if(pregunta.tipoPregunta !== 'SECCION' && pregunta.idSeccionTemporal === seccionSeleccionada.idSeccionTemporal){
          preguntas[indice].mostrarPregunta = action.mostrar
        }
      })
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      // }
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas'], fromJS(preguntas))
    }
    case ELIMINAR_DATOS_PREGUNTA: {
      // tipoOrdenamiento (0 'descendiente'/ 1'ascendente'
      const tipo = action.tipo === 0 ? 'datosPreguntas':'datosOpciones'
      const datos = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo]).toJS();
      // const indiceMovido = action.tipoOrdenamiento === 0 ? action.indice+1:action.indice-1
      // if(datos.length>1){
      datos.splice(action.indice,1)
      // }
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo], fromJS(datos))
    }
    case ON_AGREGAR_DATO_PREGUNTA: {
      const tipo = action.tipo ===0 ? 'datosPreguntas':'datosOpciones'
      const datos = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo]).toJS();
      const datoPregunta = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo,action.indice]).toJS();

      if (datoPregunta.id === '' && datoPregunta.nombre!== '' && action.tipo ===0 ){
        const registroNuevo = {
          id:'',
          idPreguntaDetalle:null,
          nombre:'',
          valor:'',
          requerido:false,
          archivo:false,
          invertido:false,
          captura:false,
          noAplica:false,
          errorNombre:false,
          errorValor:false,
        }
        datos[action.indice].id = datos.length
        datos.push(registroNuevo)
        return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo], fromJS(datos))
      }
      if (datoPregunta.id === '' && datoPregunta.nombre!== '' && action.tipo ===1 ){
        const registroNuevo = {
          id:'',
          idPreguntaDetalle:null,
          nombre:'',
          valor:'',
          valorInvertido:'',
          noAplica:false,
          errorNombre:false,
          errorValor:false,
          errorValorInvertido:false,
        }
        datos[action.indice].id = datos.length
        datos.push(registroNuevo)
        return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas',action.indicePregunta,tipo], fromJS(datos))
      }
      return state
    }
    case ON_INPUT_TIPO_PREGUNTA_CHANGE: {
      if(action.valor==='PA')
        return state.updateIn(
          [
            'formularioTabla',
            'nuevoFormulario',
            'preguntas',
            action.indice,
          ],
          stt => stt.merge({
            tipoPregunta: action.valor,
            errorTipoPregunta: action.valor === '',
            tieneCalificacion:action.valor === 'SM' || action.valor === 'LD' || action.valor === 'CVO',
          })
        ).setIn(['formularioTabla','nuevoFormulario','preguntas',action.indice,'datosPreguntas',0,'id'],1)
      return state.updateIn(
        [
          'formularioTabla',
          'nuevoFormulario',
          'preguntas',
          action.indice,
        ],
        stt => stt.merge({
          tipoPregunta: action.valor,
          errorTipoPregunta: action.valor === '',
        })
      )
    }
    case SET_FORMULARIO_GUARDADO: {
    // Conservar los datos que no esten en nuevo formulario n_n
      const tiposPreguntas = state.getIn(
        [
          'formularioTabla',
          'combos',
          'tipoPreguntas',
        ]
      )
      const usuarios = state.getIn(
        [
          'formularioTabla',
          'combos',
          'usuarios',
        ]
      )
      
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
      
      return initialState.setIn(['formularioTabla', 'stepper'], 0)
        .setIn(['formularioTabla', 'datos'], fromJS(action.datos))
        .setIn(['formularioTabla','combos','tipoPreguntas'], fromJS(tiposPreguntas))
        .setIn(['formularioTabla','combos','usuarios'], fromJS(usuarios))
        .setIn(['permisos'], permisos)
    }
    case SET_FORMULARIOS_ELIMINAR: {
      // Conservar los datos que no esten en nuevo formulario n_n
      const tiposPreguntas = state.getIn(
        [
          'formularioTabla',
          'combos',
          'tipoPreguntas',
        ]
      )
      const usuarios = state.getIn(
        [
          'formularioTabla',
          'combos',
          'usuarios',
        ]
      )
        
      const permisos = state.getIn(
        [
          'permisos',
        ]
      )
        
      return initialState.setIn(['formularioTabla', 'stepper'], 0)
        .setIn(['formularioTabla', 'datos'], fromJS(action.datos))
        .setIn(['formularioTabla','combos','tipoPreguntas'], fromJS(tiposPreguntas))
        .setIn(['formularioTabla','combos','usuarios'], fromJS(usuarios))
        .setIn(['permisos'], permisos)
        .setIn(['formularioTabla', 'eliminarModal'], false)
        .setIn(['formularioTabla', 'idFormularioEliminar'], 0)
    }
    case NUEVO_FORMULARIO: {
      const preguntas = []
      const registroNuevo = {
        orden : 1,
        contador:1,
        idSeccion:null,
        idSeccionTemporal:1,
        mostrarSeccion:true,
        nombreSeccion:'',
        errorNombreSeccion:false,
        datosValidos:true,
        tipoPregunta:'SECCION',
        descripcionSeccion:'',
        // errorDescripcionSeccion:false,
        ultimoAgregado:true,
        colorSeccion:'',
      }
      preguntas.push(registroNuevo)
      return state.setIn(['formularioTabla', 'stepper'], 1)
        .setIn(['formularioTabla', 'nuevoFormulario','editar'],false)
        .setIn(['formularioTabla', 'nuevoFormulario','idKey'],1)
        .setIn(['formularioTabla', 'nuevoFormulario','preguntas'], fromJS(preguntas))
    }
    case SET_FORMULARIO_DETALLE: {
      const {
        formulario,
        formularioSeccion,
        formularioPregunta,
        formularioPreguntaDetalle,
        usuariosAutorizados,
      } = action.datos
      const usuariosAsignados = []
      usuariosAutorizados.forEach((usuario,indice) => {
        const elUsuario =       
        {
          IdAsignacion: indice+1,
          Departamento: usuario.Departamento,
          NoEmpleado: usuario.NoEmpleado,
          Nombre: usuario.Nombre,
          Plaza: usuario.Plaza,
          Puesto: usuario.Puesto, 
          UsuarioDominio: usuario.UsuarioDominio,
          UsuarioId: usuario.UsuarioId,
          UsuariosAutorizadosFormularioId:usuario.UsuariosAutorizadosFormularioId,
        }
        usuariosAsignados.push(elUsuario)
      })

      let idKey = 0      
      const preguntas = []

      formularioSeccion.forEach((seccion) => {
        const seccionNueva = {
          orden : seccion.Orden,
          contador:idKey+1,
          idSeccionTemporal:seccion.FormularioSeccionId,
          idSeccion:seccion.FormularioSeccionId,
          mostrarSeccion:false,
          nombreSeccion:seccion.Nombre,
          errorNombreSeccion:false,
          datosValidos:true,
          tipoPregunta:'SECCION',
          descripcionSeccion:seccion.Descripcion,
          // errorDescripcionSeccion:false,
          ultimoAgregado:true,
          colorSeccion:seccion.Color,
        }
        preguntas.push(seccionNueva)
        idKey += 1
        formularioPregunta.forEach((pregunta) => {
          if(seccion.FormularioSeccionId === pregunta.IdFormularioSeccion){
            const datosOpciones = []
            const datosPreguntas = []
            formularioPreguntaDetalle.forEach((preguntaDetalle) => {
              // const totalPreguntas = formularioPreguntaDetalle.filter(detalle=> detalle.IdFormularioPregunta === pregunta.FormularioPreguntaId && !detalle.EsOpcion)
              // const totalOpciones = formularioPreguntaDetalle.filter(detalle => detalle.IdFormularioPregunta === pregunta.FormularioPreguntaId && detalle.EsOpcion)
              if(pregunta.FormularioPreguntaId === preguntaDetalle.IdFormularioPregunta){
                if(preguntaDetalle.EsOpcion){
                  const datoOpcion =       
              {
                id:preguntaDetalle.Orden,
                idPreguntaDetalle:preguntaDetalle.FormularioPreguntaDetalleId,
                nombre:preguntaDetalle.Nombre,
                valor:preguntaDetalle.Valor,
                valorInvertido:preguntaDetalle.ValorInvertido,
                noAplica:preguntaDetalle.NoAplica===1,
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
                nombre:preguntaDetalle.Nombre,
                valor:preguntaDetalle.Valor,
                requerido:preguntaDetalle.Requerido,
                archivo:preguntaDetalle.Archivo,
                invertido:preguntaDetalle.Invertido,
                captura:preguntaDetalle.Captura,
                noAplica:preguntaDetalle.NoAplica===1,
                errorNombre:false,
                errorValor:false,
              }
                  datosPreguntas.push(datoPregunta)
                }
              }
            })  
            const nuevaPregunta =  
            {
              id:'',
              idPreguntaDetalle:null,
              nombre:'',
              valor:'',
              requerido:false,
              archivo:false,
              invertido:false,
              captura:false,
              noAplica:false,
              errorNombre:false,
              errorValor:false,
            }
            datosPreguntas.push(nuevaPregunta)
            const nuevaOpcion =  
            {
              id:'',
              idPreguntaDetalle:null,
              nombre:'',
              valor:'',
              valorInvertido:'',
              noAplica:false,
              errorNombre:false,
              errorValor:false,
              errorValorInvertido:false,
            }
            datosOpciones.push(nuevaOpcion)

            const preguntaNueva = {
              orden : pregunta.Orden,
              contador:idKey+1,
              idSeccion:pregunta.IdFormularioSeccion,
              idSeccionTemporal:pregunta.IdFormularioSeccion,
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
            }
            preguntas.push(preguntaNueva)
            idKey += 1
          }
        })  
      })
      return state.setIn(['formularioTabla', 'stepper'], 1)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'idConfiguracion'], formulario[0].ConfiguracionFormularioId)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'titulo','valor'], formulario[0].Nombre)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'descripcion','valor'], formulario[0].Descripcion)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'tipoFormulario','valor'], formulario[0].TipoFormulario)
        .setIn(['formularioTabla', 'nuevoFormulario','existeAsignacion'], formulario[0].ExisteAsignacion)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'validacion','valor'], formulario[0].RequiereValidacion)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'permiteEditar','valor'], formulario[0].PermiteEditar)
        .setIn(['formularioTabla', 'nuevoFormulario','campos', 'permiteCapturaLibre','valor'], formulario[0].PermiteCapturaLibre)
        .setIn(['formularioTabla', 'nuevoFormulario','preguntas'], fromJS(preguntas))
        .setIn(['formularioTabla', 'nuevoFormulario','tablas', 'usuariosAsignados', 'datos'], fromJS(usuariosAsignados))
        .setIn(['formularioTabla', 'nuevoFormulario','editar'],true)
        .setIn(['formularioTabla', 'nuevoFormulario','idKey'],idKey)

    }
    case AGREGAR_PREGUNTA: {
      const preguntas = state.getIn(['formularioTabla', 'nuevoFormulario', 'preguntas']).toJS();
      const key = state.getIn(['formularioTabla', 'nuevoFormulario', 'idKey']);
      const secciones = preguntas.filter(dato => dato.tipoPregunta === 'SECCION')
      const ultimaSeccion = secciones[secciones.length-1]
      let registroNuevo
      if (action.tipo === 0){
        registroNuevo = {
          orden : preguntas.length+1,
          contador:key+1,
          idSeccionTemporal:secciones.length+1,
          idSeccion:null,
          mostrarSeccion:true,
          nombreSeccion:'',
          errorNombreSeccion:false,
          datosValidos:true,
          tipoPregunta:'SECCION',
          descripcionSeccion:'',
          // errorDescripcionSeccion:false,
          ultimoAgregado:true,
          colorSeccion:'',
        }
      }else{
        registroNuevo = {
          orden : preguntas.length+1,
          contador:key+1,
          idPregunta:null,
          nombrePregunta:'',
          errorNombrePregunta:false,
          datosValidos:true,
          tipoPregunta:'',
          errorTipoPregunta:false,
          solicitarRespuesta:false,
          tieneCalificacion:true,
          ultimoAgregado:true,
          idSeccion:null,
          idSeccionTemporal:secciones.length,
          mostrarPregunta:true,
          colorSeccion:ultimaSeccion.colorSeccion,
          datosOpciones:[   
            {
              id:'',
              idPreguntaDetalle:null,
              nombre:'',
              valor:'',
              valorInvertido:'',
              noAplica:false,
              errorNombre:false,
              errorValor:false,
              errorValorInvertido:false,
            },
          ],
          datosPreguntas:[
            {
              id:'',
              idPreguntaDetalle:null,
              nombre:'',
              valor:'',
              requerido:false,
              archivo:false,
              invertido:false,
              errorNombre:false,
              errorValor:false,
            },
          ],
        }
      }
      // },

      preguntas.forEach((pregunta,index) => {
        preguntas[index].ultimoAgregado = false
      })

      preguntas.forEach((pregunta,index) => {
        if(pregunta.idSeccionTemporal === registroNuevo.idSeccionTemporal){
          if(pregunta.tipoPregunta==='SECCION'){
            preguntas[index].mostrarSeccion=true
          }else{
            preguntas[index].mostrarPregunta=true
          }
          
        }
      })

      preguntas.push(registroNuevo)
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'preguntas'], fromJS(preguntas))
        .setIn(['formularioTabla', 'nuevoFormulario', 'idKey'], key+1)
    }
    case ON_ELIMINAR_FORMULARIO_MODAL: {
      const modal = state.getIn(['formularioTabla', 'eliminarModal']);
      return state.updateIn(
        [
          'formularioTabla',
        ],
        stt => stt.merge({
          eliminarModal: !modal,
          idFormularioEliminar: action.id,
        })
      )
    }
    case OPEN_MODAL: {
  
      return state.updateIn(
        ['formularioTabla',
          'modal',
        ],
        stt => stt.merge({
          value: true,
        })
      );
      // return state.setIn(['formularioTabla', 'modal', 'value'], true);
    }
    case CLOSE_MODAL: {
      return state.setIn(['formularioTabla', 'modal', 'value'], false);
    }
    case ON_CHANGE_USUARIO: {
      const {
        valor,
      } = action;
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'campos', 'usuario', 'valor'], valor);
    }
    case ON_AGREGAR_USUARIO: {
      const usuario = state.getIn(['formularioTabla', 'nuevoFormulario', 'campos', 'usuario', 'valor']);
      const usuariosAsignados = state.getIn(['formularioTabla', 'nuevoFormulario', 'tablas', 'usuariosAsignados', 'datos']).toJS();
      usuariosAsignados.push(usuario)

      usuariosAsignados.forEach((usuarioAsignado, index) => {
        usuarioAsignado.IdAsignacion = index + 1
      });
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'campos', 'usuario', 'valor'],'')
        .setIn(['formularioTabla', 'nuevoFormulario', 'tablas', 'usuariosAsignados', 'datos'], fromJS(usuariosAsignados))
    }
    case REMOVE_ROW: {
      const usuariosAsignados = state.getIn(['formularioTabla', 'nuevoFormulario', 'tablas', 'usuariosAsignados', 'datos']).toJS();
      const filterUsers = usuariosAsignados.filter(user => user.IdAsignacion !== action.row)
      return state.setIn(['formularioTabla', 'nuevoFormulario', 'campos', 'usuario', 'valor'],'')
        .setIn(['formularioTabla', 'nuevoFormulario', 'tablas', 'usuariosAsignados', 'datos'], fromJS(filterUsers))
    }
    default: {
      return state;
    } 
  }
}

export default formularioReducer;


