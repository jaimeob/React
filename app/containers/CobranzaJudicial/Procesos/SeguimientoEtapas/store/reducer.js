/*
 *
 * SeguimientoEtapas reducer
 *
 */
import { fromJS, List } from 'immutable';
import moment from 'moment';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_PLAZAS,
  SET_SELECTED_PLAZA,
  SET_STEPPER,
  SET_CLIENTE,
  SET_SHOW_MODAL_ETAPA,
  HANDLE_CHANGE_ARCHIVO,
  SET_CLIENTES_SEGUIMIENTO,
  SET_ETAPAS_SEGUIMIENTO,
  ON_CHANGE_INPUT,
  ON_CHANGE_SELECTED_ETAPA,
  SET_SHOW_MODAL_FINALIZAR_ETAPA,
  SET_FILTER_CLIENTES_SEGUIMIENTO,
  SET_SHOW_SEARCH_TEXT_FIELD,
  SET_SEARCH_TEXT_FIELD,
  SET_SHOW_FILTERS,
  SET_FOCUSED_INPUT,
  ON_CHANGE_DATES,
  SET_SELECTED,
  SET_ROWS_PER_PAGE,
  SET_PAGE,
  SET_PERMISOS,
} = ACTIONS.getConstants()

function seguimientoEtapasReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
    case SET_PLAZAS: {
      return state
        .setIn([
          'seguimientoEtapas',
          'backend',
          'plazas',
        ], List(action.data))
    }
    case SET_SELECTED_PLAZA: {
      return state
        .setIn([
          'seguimientoEtapas',
          'frontend',
          'selectedPlaza',
        ], action.selectedPlaza)
    }
    case SET_STEPPER: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'stepper',
      ], action.stepper)
    }
    case SET_CLIENTE: {
      const {
        data:{
          id,
          EtapaId,
          NomCliente,
          Plaza,
          FechaAsignacionEtapa,
          FehaDemanda,
          Etapa,
          MontoReclamado,
          DiasTranscurridos,
          FechaEtapa,
          DiasEtapa,
          EmpresaId,
          Expediente,
          Antecedente,
          Juzgado,
        },
      } = action;

      const fechaDemandaFormateadaSplit = FehaDemanda.split('/');

      let fechaDemandaFormateada = `${fechaDemandaFormateadaSplit[2]}-${fechaDemandaFormateadaSplit[1]}-${fechaDemandaFormateadaSplit[0]}`
      
      if(fechaDemandaFormateada==='undefined-undefined-'){
        fechaDemandaFormateada = '';
      }

      return state.updateIn(
        ['seguimientoAbogado',
          'frontend',
          'cliente'],
        stt => stt.merge({
          clienteId: id,
          etapaId: EtapaId,
          empresaId: EmpresaId,
          nombreCliente: NomCliente,
          plaza: Plaza,
          fechaAsignacion: FechaAsignacionEtapa,
          // fechaDemanda: FehaDemanda,
          montoReclamado: MontoReclamado,
          diasTranscurridos: DiasTranscurridos,
        })
      ).updateIn(
        ['seguimientoAbogado',
          'frontend',
          'etapa'],
        stt => stt.merge({
          nombreEtapa: Etapa,
          fechaEtapa: FechaEtapa,
          diasTranscurridosEtapa: DiasEtapa,
          archivoEtapaSubido: false,
          archivoEtapa: null,
          nombreArchivoEtapa: '',
          selectedEtapa: 0,
          observacionFinalizarEtapa: '',
          archivoFinalizarEtapaSubido: false,
          archivoFinalizarEtapa: null,
          nombreArchivoFinalizarEtapa: '',  observacionEtapa: '',
  
        })
      ).updateIn(
        ['seguimientoAbogado',
          'frontend',
          'demanda'],
        stt => stt.merge({
          fechaDemanda: fechaDemandaFormateada || null,
          expediente: Expediente,
          antecedente: Antecedente,
          juzgado: Juzgado,
        })
      )
    }
    case SET_SHOW_MODAL_ETAPA: {
      return state.setIn(
        ['seguimientoAbogado',
          'frontend',
          'showModalEtapa',
        ], !state.getIn(
          ['seguimientoAbogado',
            'frontend',
            'showModalEtapa',
          ]))
    }
    case SET_SHOW_MODAL_FINALIZAR_ETAPA: {
      return state.setIn(
        ['seguimientoAbogado',
          'frontend',
          'showModalFinalizarEtapa',
        ], !state.getIn(
          ['seguimientoAbogado',
            'frontend',
            'showModalFinalizarEtapa',
          ]))
    }
    case HANDLE_CHANGE_ARCHIVO: {
      switch(action.input){
        case 1: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'etapa',
            'archivoEtapa',
          ], fromJS(action.formData[0]))
            .setIn([
              'seguimientoAbogado',
              'frontend',
              'etapa',
              'nombreArchivoEtapa',
            ], action.formData[0].name)
            .setIn([
              'seguimientoAbogado',
              'frontend',
              'etapa',
              'archivoEtapaSubido',
            ], true);
        }
        case 2: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'etapa',
            'archivoFinalizarEtapa',
          ], fromJS(action.formData[0]))
            .setIn([
              'seguimientoAbogado',
              'frontend',
              'etapa',
              'nombreArchivoFinalizarEtapa',
            ], action.formData[0].name)
            .setIn([
              'seguimientoAbogado',
              'frontend',
              'etapa',
              'archivoFinalizarEtapaSubido',
            ], true);
        }
        default:
          return state;
      }
    }
    case SET_CLIENTES_SEGUIMIENTO : {
      return state.setIn([
        'seguimientoEtapas',
        'backend',
        'data',
      ], List(action.data))
    }
    case SET_FILTER_CLIENTES_SEGUIMIENTO : {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'filterData',
      ], List(action.data))
    }
    case SET_ETAPAS_SEGUIMIENTO: {
      return state.setIn([
        'seguimientoAbogado',
        'backend',
        'etapas',
      ], List(action.data))
    }
    case ON_CHANGE_INPUT: {
      switch(action.input){
        case 1: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'demanda',
            'antecedente',
          ], action.value)
        }
        case 2: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'demanda',
            'expediente',
          ], action.value)
        }
        case 3: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'demanda',
            'juzgado',
          ], action.value)
        }
        case 4: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'demanda',
            'fechaDemanda',
          ], action.value)
        }
        case 5: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'etapa',
            'notaEtapa',
          ], action.value)
        }
        case 6: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'etapa',
            'observacionEtapa',
          ], action.value)
        }
        case 7: {
          return state.setIn([
            'seguimientoAbogado',
            'frontend',
            'etapa',
            'observacionFinalizarEtapa',
          ], action.value)
        }
        default:
          return state;
      }
    }
    case ON_CHANGE_SELECTED_ETAPA:{
      return state.setIn([
        'seguimientoAbogado',
        'frontend',
        'etapa',
        'selectedEtapa',
      ], action.selectedEtapa)
    }
    case SET_SHOW_SEARCH_TEXT_FIELD: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'showSearchTextField',
      ], !state.getIn(['seguimientoEtapas',
        'frontend',
        'tabla',
        'showSearchTextField']))
    }
    case SET_SEARCH_TEXT_FIELD: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'searchTextField',
      ], action.searchTextField)
    }

    case SET_SHOW_FILTERS: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'showFilters',
      ], !state.getIn(['seguimientoEtapas',
        'frontend',
        'tabla',
        'showFilters']))
    }
    case SET_FOCUSED_INPUT: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'focusedInput',
      ], action.focusedInput)
    }
    case ON_CHANGE_DATES: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'startDate',
      ], action.startDate)
        .setIn([
          'seguimientoEtapas',
          'frontend',
          'tabla',
          'endDate',
        ], action.endDate)
    }
    case SET_SELECTED: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'selected',
      ], action.selected)
    }
    case SET_ROWS_PER_PAGE: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'rowsPerPage',
      ], action.rowsPerPage)
    }
    case SET_PAGE: {
      return state.setIn([
        'seguimientoEtapas',
        'frontend',
        'tabla',
        'page',
      ], action.page)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
  }
}

export default seguimientoEtapasReducer;
