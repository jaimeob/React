/*
 *
 * IndicadoresDireccion reducer
 *
 */

import { fromJS } from 'immutable';
// import { concat, orderBy } from 'lodash';
import Actions from './actions';
import STATE from './state';

export const initialState = fromJS(STATE);
export const {
  SET_DATOS,
  SET_HEIGHT,
  SET_FILTROS,
  ON_CHANGE_FILTRO,
  SET_DEPARTAMENTO_PUESTOS,
} = Actions.getConstants();

function indicadoresDireccionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATOS:
      return state.setIn(
        ['tabla', 'datos'],
        fromJS(action.datos)
      );
    case SET_FILTROS: {
      return state.updateIn(
        ['principales', 'filtros'],
        stt => stt.merge({
          periodo: fromJS(action.datos.periodo),
          periodoSlc: action.datos.periodo.length > 0 ? action.datos.periodo[0].PeriodoId : '',
          direccion: fromJS(action.datos.direccion),
          plaza: fromJS(action.datos.plaza),
          departamento: fromJS(action.datos.departamento),
          formatoEvaluacion: fromJS(action.datos.formato),
        })
      )
    }
    case SET_HEIGHT: {
      return state.update('principales', stt => stt.merge({
        height: action.height,
        tableHeight: action.tableHeight,
      }))
    }
    case ON_CHANGE_FILTRO: {
      const {
        id,
        valor,
      } = action;
      if(id === 0){
        return state.setIn(
          ['principales', 'filtros', 'periodoSlc'],
          valor
        );
      }
      if(id === 1){
        return state.setIn(
          ['principales', 'filtros', 'direccionSlc'],
          valor || []
        );
      }
      if(id === 2){
        return state.setIn(
          ['principales', 'filtros', 'plazaSlc'],
          valor
        );
      }
      if(id === 3){
        return state.setIn(
          ['principales', 'filtros', 'departamentoSlc'],
          valor || []
        );
      }
      if(id === 4){
        return state.setIn(
          ['principales', 'filtros', 'puestoSlc'],
          valor || []
        );
      }
      if(id === 5){
        return state.setIn(
          ['principales', 'filtros', 'formatoEvalSlc'],
          valor
        );
      }
      return state;
    }
    case SET_DEPARTAMENTO_PUESTOS: {
      // let puestos = state.getIn(
      //   ['principales', 'filtros', 'puesto']
      // ).toJS();
      // puestos = orderBy(concat(puestos, action.datos), 'Nombre', 'asc');
      
      return state.setIn(
        ['principales', 'filtros', 'puesto'],
        fromJS(action.datos),
      )
    }
    default:
      return state;
  }
}

export default indicadoresDireccionReducer;
