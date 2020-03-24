/*
 *
 * Indicador reducer
 *
 */

import { fromJS, List } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  QUITA_IMAGEN_ESTATUS,
  PONE_IMAGEN_ESTATUS,
  SET_INDICADORES,
  SET_HISTORIAL,
  ON_CLICK_REGRESAR,
  ON_CLICK_RESULTADO,
  SET_PUESTOS_USUARIOS_INDICADORES,
} = Actions.getConstants();

function indicadorReducer(state = initialState, action) {
  switch (action.type) {
    case QUITA_IMAGEN_ESTATUS: {
      return state.update('imagen', stt => stt.merge({
        estatusImagen: 0,
        imagenActiva: false,
      }));
    }
    case PONE_IMAGEN_ESTATUS: {
      // debugger;
      return state.update('imagen', stt => stt.merge({
        estatusImagen: 1,
        imagenActiva: true,
        anchorEl: action.event,
      }));
    }
    case SET_INDICADORES: {
      const usuarioLogeado = state.getIn(
        ['principales', 'usuarioLogeado']
      )
      if(!action.datos.vacio){
        const cuali = action.datos.indicadores[2] || [];
        const cuant = action.datos.indicadores[1] || [];
        const vacio = cuali.lenght === 0 && cuant.length === 0 ? 1 : 0;

        cuant.push(
          {
            'Peso': action.datos.pesoCuan,
            'Indicador': '',
            'ObjetivoMin': '',
            'ObjetivoMax': '',
            'Objetivo': '',
            'ResultadoAnt': '',
            'Resultado': '',
            'Puntos': '',
            'Estatus': '',
            'rowColor': '#CCCCCC',
          },
        )
        cuali.push(
          {
            'Peso': action.datos.pesoCual,
            'Indicador': '',
            'ResultadoAnt': '',
            'Resultado': '',
            'Puntos': '',
            'rowColor': '#CCCCCC',
          },
          {
            'Peso': '',
            'Indicador': '',
            'ResultadoAnt': '',
            'Resultado': '',
            'Puntos': '',
          },
          {
            'Peso': action.datos.pesoTotal,
            'Indicador': 'EVALUACIÓN TOTAL',
            'IndicadorfSize': '12px',
            'Puntos': `${action.datos.evalTotal}%`,
            'PuntosbgColor': '#A9A7A7',
            'rowColor': '#CCCCCC',
          },
        )
        
        return state.setIn(
          ['cualitativos', 'datos'],
          fromJS(cuali),
        ).setIn(
          ['cuantitativos', 'datos'],
          fromJS(cuant),
        ).update('principales', stt => stt.merge({
          puesto: action.datos.puesto,
          plaza: action.datos.plaza,
          nombre: action.datos.nombre,
          evalTotal: action.datos.evalTotal,
          periodo: action.datos.fecEval,
          vacio,
          stepper: 0,
          permisoAutorizar: action.entregado,
          idUsuario: action.usuarioIndicador,
          idPeriodo: action.idPeriodo,
          usuarioIndicador: action.usuarioIndicador === usuarioLogeado,
          autorizador: action.datos.autorizador,
        }))
      }
      return state.setIn(
        ['principales','vacio'],
        1
      )
    }
    case SET_HISTORIAL: {
      return state.setIn(
        ['historial', 'datos'],
        fromJS(action.datos)
      ).update('principales', stt => stt.merge({
        vacio: 0,
        stepper: 1,
        usuarioLogeado: action.usuarioLogeado,
      }))
    }
    case ON_CLICK_REGRESAR: {
      return state.setIn(
        ['principales', 'stepper'],
        1
      ).setIn(
        ['cualitativos', 'datos'],
        []
      ).setIn(
        ['cuantitativos', 'datos'],
        []
      )
    }
    case ON_CLICK_RESULTADO: {
      // Cerrar Detallado
      
      if(action.indice === -1)
        return state.update('resumido', stt => stt.merge({
          bandPopover: false,
          datos: [],
          cabeceras: [],
          nomIndicador: '',
        }))
      // Mostrar Detallado
      const datos = state.getIn(
        [action.tipo, 'datos', action.indice]
      ).toJS();
      const Resumido = JSON.parse(datos.Resumido);
      const detallado = JSON.parse(datos.Detallado);
      for (let i = 0; i < Resumido.Cabeceras.length; i+=1) {
        Resumido.Cabeceras[i].nombre = Resumido.Cabeceras[i].nombre.split(/(?=[A-Z])/).join(" ")
      }
     
      return state.update('resumido', stt => stt.merge({
        bandPopover: true,
        datos: Resumido.Datos,
        cabeceras: Resumido.Cabeceras,
        nomIndicador: datos.Indicador,
        detallado,
      }))
    }
    case SET_PUESTOS_USUARIOS_INDICADORES: {
      return state
        .setIn([
          'descargaMasivaInfo', 
          'usuarios',
        ], 
        List(action.data));
    }
    default:
      return state;
  }
}

export default indicadorReducer;
