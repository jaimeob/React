/*
 *
 * Reportes reducer
 *
 */

import { fromJS } from 'immutable';
import {
  isUndefined,
} from 'lodash';
import { DEFAULT_ACTION } from './constants';
// import { array } from 'prop-types';
import Actions from './actions';
import STATE from './state';

export const {
  SET_COMBOS,
  SET_ALMACENES,
  SET_MOLDES,
  SET_AÑOS,
  SET_PERIODOS,
  SET_ORIGEN_DESTINO,
  ON_INPUT_CHANGE,
  MOSTRAR_CARGANDO,
  SET_DATOS_REPORTES,
  SET_USUARIO,
  ON_CHANGE_FECHA,
  ON_FECHA_INPUT,
  SET_DATOS_CONFIABILIDAD,
  LIMPIAR_STATE,
  LIMPIAR_CAMPOS,
} = Actions.getConstants();
export const initialState = fromJS(STATE);

function reportesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case  LIMPIAR_STATE:
      return initialState;
    case  LIMPIAR_CAMPOS:
      return state.setIn(['configuracion','campos','plaza','valor'],'')
        .setIn(['configuracion','campos','almacen','valor'],'')
        .setIn(['configuracion','campos','molde','valor'],'')
        .setIn(['configuracion','campos','año','valor'],'')
        .setIn(['configuracion','campos','periodo','valor'],'')
        .setIn(['configuracion','campos','fechaInicio','valor'],'')
        .setIn(['configuracion','campos','fechaFinal','valor'],'')
        .setIn(['configuracion','campos','codigoInicio','valor'],'')
        .setIn(['configuracion','campos','codigoFinal','valor'],'')
        .setIn(['configuracion','campos','origen','valor'],'')
        .setIn(['configuracion','campos','destino','valor'],'')
        .setIn(['configuracion','campos','tipoMovimiento','valor'],'')
        .setIn([ 'configuracion','parametros', 'fechaInicio'], null)
        .setIn([ 'configuracion','parametros', 'fechaFin'], null)
        .setIn([ 'configuracion','parametros', 'fechaInput'], null)
        .setIn(['configuracion','combos','almacenes'],[])
        .setIn(['configuracion','combos','moldes'],[])
        .setIn(['configuracion','combos','años'],[])
        .setIn(['configuracion','combos','periodos'],[])
        .setIn(['configuracion','combos','tiposMovimientos'],[])
        .setIn(['configuracion','combos','origenes'],[])
        .setIn(['configuracion','combos','destinos'],[])

    case SET_COMBOS: {
      return state.updateIn(
        [
          'configuracion',
          'combos',
        ],
        stt => stt.merge({
          tiposReportes: fromJS(action.datos.tiposReportes),
          tiposMovimientos: fromJS(action.datos.tiposMovimiento),
          plazas: fromJS(action.datos.plazas),
        })
      )
    }
    case SET_DATOS_CONFIABILIDAD: {
      return state.updateIn(
        [
          'configuracion',
          'datosConfiabilidad',
          'datos',
        ],
        stt => stt.merge({
          datosFamiliaImporte: fromJS(action.datos.datosFamiliaImporte),
          datosFamiliaItems: fromJS(action.datos.datosFamiliaItems),
          datosCostoInventario: fromJS(action.datos.datosCostoInventario),
          datosTotalConteo: fromJS(action.datos.datosTotalConteo),
          datosConteosRealizados: fromJS(action.datos.datosConteosRealizados),
          datosEncabezado: fromJS(action.datos.datosEncabezado),
        })
      ).setIn(['mostrarConfiabilidad'],true)
        .setIn(['cargando'],false)
    }

    case SET_ALMACENES: {
      return state.setIn(['configuracion','combos','almacenes'],action.datos)
        .setIn(['configuracion','combos','años'],[])
        .setIn(['configuracion','combos','periodos'],[])
    }
    case SET_MOLDES: {
      return state.setIn(['configuracion','combos','moldes'],action.datos)
    }
    case SET_AÑOS: {
      return state.setIn(['configuracion','combos','años'],action.datos)
        .setIn(['configuracion','combos','periodos'],[])
    }
    case SET_PERIODOS: {
      return state.setIn(['configuracion','combos','periodos'],action.datos)
    }
    case SET_ORIGEN_DESTINO: {

      if(action.tiposMovimiento === 6 || action.tiposMovimiento === 15 || action.tiposMovimiento === 16){
        return state.setIn(['configuracion','combos','datosOrigen'],action.datos)
          .setIn(['configuracion','combos','origenes'],action.datos)
          .setIn(['configuracion','combos','destinos'],action.datos)
      }
      return state.setIn(['configuracion','combos','datosOrigen'],action.datos)
        .setIn(['configuracion','combos','origenes'],action.datos)


    }
    case SET_DATOS_REPORTES: {
      return state.setIn(['configuracion','datosReporte'],action.datos)
        .setIn(['cargando'],false)
    }
    case MOSTRAR_CARGANDO: {
      return state.setIn(['cargando'],action.bandera)
    }
    case SET_USUARIO: {
      return state.setIn(['usuarioLogeado'], action.usuarioId)
    }
    case ON_CHANGE_FECHA: {
      return state.updateIn(['configuracion','parametros'], stt => stt.merge({
        fechaInicio : action.fechaIni,
        fechaFin : action.fechaFin,
      }))
    }
    case ON_FECHA_INPUT: {
      return state.setIn(
        [ 
          'configuracion',
          'parametros', 
          'fechaInput',
        ],
        action.event
      );
    }
    case ON_INPUT_CHANGE: {
      // aqui iran los moldes y los tipos de reportes ya que no depende de la seleccion
      // const campo = action.campo >0 ? 'plaza':'tipoReporte'
      if (action.campo === 0){
        const mostrarKardex = action.valor === 3
        // const mostrarConfiabilidad = action.valor === 4
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'tipoReporte',
          ],
          stt => stt.merge({
            valor: action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','molde','mostrar'],action.valor < 3)
          .setIn(['configuracion','campos','año','mostrar'],action.valor === 4) 
          .setIn(['configuracion','campos','periodo','mostrar'],action.valor === 4)
          .setIn(['configuracion','campos','fechaInicio','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','tipoMovimiento','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','origen','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','destino','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','codigoInicio','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','codigoFinal','mostrar'],mostrarKardex)
          .setIn(['configuracion','campos','plaza','valor'],'')
          .setIn(['configuracion','campos','almacen','valor'],'')
          .setIn(['configuracion','campos','molde','valor'],'')
          .setIn(['configuracion','campos','año','valor'],'')
          .setIn(['configuracion','campos','periodo','valor'],'')
          .setIn(['configuracion','campos','tipoMovimiento','valor'],'')
          .setIn(['configuracion','campos','origen','valor'],'')
          .setIn(['configuracion','campos','destino','valor'],'')
          .setIn(['configuracion','campos','codigoInicio','valor'],'')
          .setIn(['configuracion','campos','codigoFinal','valor'],'')
          .setIn(['configuracion','parametros','fechaInicio'],null)
          .setIn(['configuracion','parametros','fechaInicio'],null)
          .setIn(['configuracion','datosReporte'],[])
          .setIn(['habilitarConsulta'],action.valor !== 4)
          .setIn(['mostrarConfiabilidad'],false)
          // .setIn(['mostrarConfiabilidad'],mostrarConfiabilidad)

      }

      if (action.campo === 1){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'plaza',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor) || action.valor <0 ?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','almacen','valor'],'')
          .setIn(['configuracion','campos','molde','valor'],'')
          .setIn(['configuracion','campos','año','valor'],'')
          .setIn(['configuracion','campos','periodo','valor'],'')

      }

      if (action.campo === 2){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'almacen',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','molde','valor'],'')
          .setIn(['configuracion','campos','año','valor'],'')
          .setIn(['configuracion','campos','periodo','valor'],'')
      }

      if (action.campo === 3){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'molde',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        )
      }
      if (action.campo === 4){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'año',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','periodo','valor'],'')
      }
      if (action.campo === 6){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'periodo',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['habilitarConsulta'],!isUndefined(action.valor) && action.valor!=='')
      }
      if (action.campo === 7){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'tipoMovimiento',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','origen','valor'],'')
          .setIn(['configuracion','campos','destino','valor'],'')
      }
      if (action.campo === 8){
        const destinoSeleccionado = state.getIn(['configuracion','campos', 'destino','valor'])
        const datosOrigen = state.getIn(['configuracion','combos', 'datosOrigen'])
        const arrayDestino = JSON.parse(JSON.stringify(datosOrigen))

        const tipoMovimiento = state.getIn(['configuracion','campos', 'tipoMovimiento','valor'])
        
        const agregarDestinos = tipoMovimiento === 6 || tipoMovimiento === 15 || tipoMovimiento === 16

        const mismoOrigen = action.valor === destinoSeleccionado
        const arrayDestinoFiltrado= arrayDestino.filter(destino => destino.IdOrigen !== action.valor)
        const destino = mismoOrigen ? '' : destinoSeleccionado
        // const array = mismoOrigen ? arrayDestinoFiltrado : arrayDestino
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'origen',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','destino','valor'],destino)
          .setIn(['configuracion','combos','destinos'],agregarDestinos?fromJS(arrayDestinoFiltrado):[])
          
      }
      if (action.campo === 9){
        const origenSeleccionado = state.getIn(['configuracion','campos', 'origen','valor'])
        const datosOrigen = state.getIn(['configuracion','combos', 'datosOrigen'])
        const arrayOrigen = JSON.parse(JSON.stringify(datosOrigen))
        
        const arrayOrigenFiltrado= arrayOrigen.filter(origen => origen.IdOrigen !== action.valor)
        const mismoOrigen = action.valor === origenSeleccionado
        const origen = mismoOrigen ? '' : origenSeleccionado
        // const array = mismoOrigen ? arrayOrigenFiltrado : arrayOrigen
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'destino',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        ).setIn(['configuracion','campos','origen','valor'],origen)
          .setIn(['configuracion','combos','origenes'],fromJS(arrayOrigenFiltrado))
      }
      if (action.campo === 10){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'codigoInicio',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        )
      }
      if (action.campo === 11){
        return state.updateIn(
          [
            'configuracion',
            'campos',
            'codigoFinal',
          ],
          stt => stt.merge({
            valor: isUndefined(action.valor)?'':action.valor,
            // campoValido: action.valor !== '',
          })
        )
      }

      return state
    }
    default:
      return state;
  }
}

export default reportesReducer;
