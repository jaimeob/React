/*
 *
 * CambiarIndicador reducer
 *
 */

import { fromJS } from 'immutable';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  QUITA_IMAGEN_ESTATUS,
  PONE_IMAGEN_ESTATUS,
  SUBIR_ARCHIVOS_TEMP,
  OBTENER_ARCHIVOS,
  ABRIR_MODAL,
  ABRIR_MODAL_GUARDAR,
  DESACTIVAR_ACEPTAR,
  LIMPIAR_STATE,
  MODAL_CERRAR,
  SET_INDICADORES,
  SET_DEPARTAMENTOS,
  SET_PUESTOS,
  SET_EMPLEADOS,
  ON_CHANGE_RESULTADO,
  ON_CHANGE_COMBO,
  ON_CLICK_CERRAR_VENTANA,
  ON_ELIMINAR_ARCHIVO,
} = Actions.getConstants();

function cambiarIndicadorReducer(state = initialState, action) {
  switch (action.type) {
    case QUITA_IMAGEN_ESTATUS: {
      return state.update('imagen', stt => stt.merge({
        estatusImagen: 0,
        imagenActiva: false,
      }));
    }
    case ABRIR_MODAL: {
      return state.update('principales', stt => stt.merge({
        idArchivo: action.id,
        abrirModalArchivo: action.id !== -1,
      }))
    }
    case PONE_IMAGEN_ESTATUS: {
      // debugger;
      return state.update('imagen', stt => stt.merge({
        estatusImagen: 1,
        imagenActiva: true,
        anchorEl: action.event,
      }));
    }
    case SUBIR_ARCHIVOS_TEMP: {
      const observaciones = state.getIn(
        ['prinicipales', 'observaciones']
      );

      return state.update(
        'principales',
        stt => stt.merge({
          archivos: action.archivos,
          archivosTemp: action.archivosTemp,
          archivosPaginado: action.archivos.slice(0,2),
          bandAceptar: observaciones !== '',
        })
      )
    }
    
    case LIMPIAR_STATE: {
      const filtros = state.getIn(
        ['principales', 'filtros']
      ).toJS();

      return initialState.setIn(
        ['principales', 'filtros', 'departamentos'],
        fromJS(filtros.departamentos),
      ).setIn(
        ['principales', 'vacio'],
        1
      )
    }

    case MODAL_CERRAR: {
      return state.setIn(
        ['principales', 'bandModalCerrar'],
        !state.getIn(
          ['principales', 'bandModalCerrar']
        )
      )
    }

    case OBTENER_ARCHIVOS: {
      const principales = state.get('principales').toJS();
      const {
        paginaInicio,
        paginaFin,
        archivos,
      } = principales;

      const newPagFin = action.id === 1 ? paginaFin + 2 : paginaFin - 2;
      const newPagIni = action.id === 1 ? paginaInicio + 2 : paginaInicio - 2;
      
      return state.update('principales', stt => stt.merge({
        paginaInicio : newPagIni,
        paginaFin : newPagFin,
        archivosPaginado : archivos.slice(newPagIni, newPagFin),
      }))
    }
    case DESACTIVAR_ACEPTAR: 
      return state.setIn(
        ['principales', 'bandAceptar'],
        false
      )

    case SET_DEPARTAMENTOS: 
      return state.setIn(
        ['principales', 'filtros', 'departamentos'],
        fromJS(action.datos) || [],
      ).setIn(
        ['principales', 'vacio'],
        1
      )
    
    case SET_INDICADORES: {
      if(!action.datos.vacio){
        const cuali = action.datos.indicadores[2] || [];
        const cuant = action.datos.indicadores[1] || [];
        const vacio = cuali.lenght === 0 && cuant.length === 0 ? 1 : 0;
        for (let i = 0; i < cuali.length; i+=1) {
          cuali[i].ResultadoInput = cuali[i].Resultado.substr(0, cuali[i].Resultado.length - 1);
        }
        for (let j = 0; j < cuant.length; j+=1) {
          cuant[j].ResultadoInput = cuant[j].Resultado.substr(0, cuant[j].Resultado.length - 1);
        }
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
            'IndicadorColSpan': 8,
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
          idPeriodo: action.datos.idPeriodo,
          vacio,
        }))
      }
      return state.setIn(
        ['principales','vacio'],
        1
      )
    }
    case SET_PUESTOS: 
      return state.setIn(
        ['principales', 'filtros', 'puestos'],
        fromJS(action.datos) || [],
      )

    case SET_EMPLEADOS : 
      return state.setIn(
        ['principales', 'filtros', 'empleados'],
        fromJS(action.datos) || [],
      )
    
    case ON_CHANGE_RESULTADO: {
      const {
        opcion,
        id,
        valor,
      } = action;
      // eslint-disable-next-line no-useless-escape
      const regExp = new RegExp('^[0-9]+(\.[0-9]{0,2})?$');
      const valorActual = state.getIn(
        [opcion, 'datos', id, 'ResultadoInput']
      )
      const val = regExp.test(valor) || valor === '' ? valor : valorActual;

      return state.setIn(
        [opcion, 'datos', id, 'ResultadoInput'],
        valor > 120 ? 120 : val.substring(0,6),
      ).setIn(
        ['principales', 'hayCambios'],
        true
      )
    }
    case ON_CHANGE_COMBO: {
      const {
        id,
        valor,
      } = action;

      if(id === 1){
        return state.updateIn(
          ['principales', 'filtros'],
          stt => stt.merge({
            departamentoSlc: valor,
            puestoSlc: '',
            empleadoSlc: '',
            filtrar: false,
          })
        )
      }
      if(id === 2){
        return state.updateIn(
          ['principales', 'filtros'],
          stt => stt.merge({
            puestoSlc: valor,
            empleadoSlc: '',
            filtrar: false,
          })
        )
      }
      if(id === 3){
        return state.updateIn(
          ['principales', 'filtros'],
          stt => stt.merge({
            empleadoSlc: valor,
            filtrar: true,
          })
        )
      }
      
      const archivos = state.getIn(
        ['principales', 'archivos']
      )
      // debugger;
      return state.update('principales', stt => stt.merge({
        bandAceptar: archivos.length > 0 && action.valor.trim() !== '',
        observaciones: action.valor.trim() === '' ? '' : action.valor,
        observacionesValido: action.valor.trim() !== '',
      }))
    }
    case ON_CLICK_CERRAR_VENTANA: 
      return state.setIn(
        ['principales', 'bandGuardar'],
        false,
      )
    
    case ON_ELIMINAR_ARCHIVO: {
      const principales = state.get('principales').toJS();
      const {
        archivos,
        idArchivo,
      } = principales;
      
      archivos.splice(idArchivo, 1);
      const archivosTemp = new FormData();
      archivosTemp.append('refId', 'formato');

      for(let i = 0; i < archivos.length; i+=1){
        archivosTemp.append('files', archivos[i], archivos[i].name);
      }

      return state.update('principales', stt => stt.merge({
        archivosTemp,
        archivos,
        archivosPaginado: archivos.slice(0, 2),
        idArchivo: null,
        abrirModalArchivo: false,
        archivoTempValido: archivos.length !== 0,
      }))
    }
    case ABRIR_MODAL_GUARDAR: {
      const bandGuardar = state.getIn(
        ['principales', 'bandGuardar']
      )
      return state.setIn(
        ['principales', 'bandGuardar'],
        !bandGuardar,
      )
    }
    default:
      return state;
  }
}

export default cambiarIndicadorReducer;
