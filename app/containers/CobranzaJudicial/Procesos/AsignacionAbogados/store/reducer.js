/*
 *
 * AsignacionAbogados reducer
 *
 */
import { fromJS, List } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import STATE from './state';
import ACTIONS from './actions';
export const initialState = fromJS(STATE);

const {
  SET_PLAZAS,
  REQUEST_GET_YEAR_SUCCESS,
  HANDLE_CHANGE_COMPANY,
  REQUEST_GET_DATES_SUCCESS,
  HANDLE_CHANGE_DATE,
  HANDLE_CLICK_BUTTON_SEARCH,
  HANDLE_CHANGE_TEXT_SEARCH,
  REQUEST_GET_COMPANYS_SUCCESS,
  REQUEST_GET_LIST_CLIENTS_SUCCESS,
  HANDLE_OPEN_MODAL,
  HANDLE_CHANGE_TEXT_MODAL,
  HANDLE_CLICK_LEAVE_DIALOG,
  HANDLE_CHANGE_CARTERA,
  HANDLE_CHANGE_LAWYER,
  HANDLE_CLICK_LEAVE_ASSIGN,
  REQUEST_GET_LAWYERS_SUCCESS,
  REQUEST_GET_TYPES_CARTERAS_SUCCESS,
  SET_LAYOUT_COLUMNS,
  SET_CLIENT_SELECTED,
  SET_PERMISOS,
} = ACTIONS.getConstants()


function asignacionAbogadosReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
    case SET_PLAZAS: {
      return state
        .setIn([
          'backend',
          'plazas',
        ], List(action.data))
    }
    case HANDLE_CHANGE_COMPANY: {
      const {
        value,
      } = action;

      const textDate = value === 10 || value === 12 ? 'Fecha' : 'Semana';

      return state
        .setIn([
          'frontend',
          'companySelected',
        ], value)
        .setIn([
          'frontend',
          'textComboDate',
        ], textDate)
        .setIn([
          'backend',
          'rows',
        ], [])
        .setIn([
          'frontend',
          'dateSelected',
        ], {})
    }
    case REQUEST_GET_YEAR_SUCCESS: {
      const {
        data: {
          SemanaRetail,
          AnioRetail,
        },
      } = action;

      return state
        .setIn([
          'frontend',
          'year',
        ], AnioRetail)
        .setIn([
          'frontend',
          'retailWeek',
        ], SemanaRetail)
    }
    case HANDLE_CHANGE_DATE: {
      const {
        value,
      } = action;

      const id = value.SemanaRetail ? value.SemanaRetail : value.MesRetail;

      return state
        .setIn([
          'frontend',
          'dateSelected',
        ], value)
        .setIn([
          'frontend',
          'retailWeek',
        ], id)
    }
    case REQUEST_GET_DATES_SUCCESS: {
      const {
        data,
      } = action;

      return state
        .setIn([
          'frontend',
          'dates',
        ], data)
    }
    case HANDLE_CLICK_BUTTON_SEARCH: {
      const value = !state.getIn([
        'frontend',
        'activeSearch',
      ]);

      return state
        .setIn([
          'frontend',
          'activeSearch',
        ], value)
        .setIn([
          'frontend',
          'searchText',
        ], '');
    }
    case HANDLE_CHANGE_TEXT_SEARCH: {
      const {
        text,
      } = action

      return state
        .setIn([
          'frontend',
          'searchText',
        ], text);
    }
    case REQUEST_GET_COMPANYS_SUCCESS: {
      const {
        data,
      } = action

      return state
        .setIn([
          'frontend',
          'companys',
        ], fromJS(data))
    }
    case REQUEST_GET_LIST_CLIENTS_SUCCESS: {
      const {
        data:{
          data,
        },
      } = action
     
      return state
        .setIn([
          'backend',
          'rows',
        ], fromJS(data))
    }
    case SET_LAYOUT_COLUMNS: {
      const {
        data,
      } = action

      const columns = data.map(column => ({
        id: column.Column,
        align: "left",
        disablePadding: false,
        label: column.Label,
      }));
      
      const columnsToSearch = data.map(column => column.Column)

      return state
        .setIn([
          'frontend',
          'columns',
        ], fromJS(columns))
        .setIn([
          'frontend',
          'columnsToSearch',
        ], fromJS(columnsToSearch))
    }
    case HANDLE_OPEN_MODAL: {
      const {
        open,
        dialog,
      } = action

      return state
        .setIn([
          'frontend',
          dialog,
        ], open)
    }
    case HANDLE_CHANGE_TEXT_MODAL: {
      const {
        text,
        option,
      } = action

      return state
        .setIn([
          'frontend',
          option,
        ], text)
    }
    case HANDLE_CLICK_LEAVE_DIALOG: {
      const {
        dialog,
        option,
      } = action;

      return state
        .setIn([
          'frontend',
          dialog,
        ], false)
        .setIn([
          'frontend',
          option,
        ], '')
    }
    case HANDLE_CHANGE_CARTERA: {
      const {
        value,
      } = action;

      return state
        .setIn([
          'frontend',
          'carteraSelected',
        ], value)
    }
    case HANDLE_CHANGE_LAWYER: {
      const {
        value,
      } = action;

      return state
        .setIn([
          'frontend',
          'lawyerSelected',
        ], value)
    }
    case HANDLE_CLICK_LEAVE_ASSIGN: {

      return state
        .setIn([
          'frontend',
          'modalAssign',
        ], false)
        /*
        .setIn([
          'frontend',
          'comboCartera',
        ], [])
        */
        .setIn([
          'frontend',
          'carteraSelected',
        ], 0)
        /*
        .setIn([
          'frontend',
          'comboLawyer',
        ], [])
        */
        .setIn([
          'frontend',
          'lawyerSelected',
        ], 0)
    }
    case REQUEST_GET_LAWYERS_SUCCESS: {
      const {
        data:{
          data,
        },
      } = action

      return state
        .setIn([
          'frontend',
          'comboLawyer',
        ], fromJS(data))
    }
    case REQUEST_GET_TYPES_CARTERAS_SUCCESS: {
      const {
        data:{
          data,
        },
      } = action

      return state
        .setIn([
          'frontend',
          'comboCartera',
        ], fromJS(data))
    }
    case SET_CLIENT_SELECTED: {
      const {
        clientSelected,
      } = action

      const asignaciones = state.getIn(['backend', 'rows']).toJS();

      const clienteSeleccionado = asignaciones.find((asignacion) => asignacion.Id === clientSelected);

      const carteraCliente = clienteSeleccionado.TipoCartera.trim().toUpperCase();

      const comboCartera = state.getIn(['frontend', 'comboCartera']).toJS();

      let carteraSeleccionada = comboCartera.find(cartera => cartera.Nombre.trim().toUpperCase() === carteraCliente);

      if(!carteraSeleccionada){
        // eslint-disable-next-line prefer-destructuring
        carteraSeleccionada = comboCartera[1];
      }

      const comboAbogado = state.getIn(['frontend', 'comboLawyer']).toJS();

      const abogadoSeleccionado = comboAbogado.find(abogado => abogado.Id === clienteSeleccionado.idAbogado) ||  0;

      return state
        .setIn([
          'frontend',
          'clientSelected',
        ], clientSelected)
        .setIn(['frontend', 'carteraSelected'], carteraSeleccionada.Id || 0)
        .setIn(['frontend', 'lawyerSelected'], abogadoSeleccionado.Id || 0)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
  }
}

export default asignacionAbogadosReducer;
