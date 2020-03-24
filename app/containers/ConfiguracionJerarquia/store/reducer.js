/*
 *
 * ConfiguracionJerarquia reducer
 *
 */

import { fromJS, List } from 'immutable';
import STATE from './state';
import Actions from './actions';

export const initialState = fromJS(STATE);

export const {
  DEFAULT_ACTION,
  SET_STEPPER,
  SET_MODAL_DELETE,
  SET_DATA,
  SET_SELECTED_ITEMS,
  SET_DEPARTMENTS_AND_POSITIONS,
  ON_CHANGE_COMBO,
  SET_JERARQUIA,
  RESET_LISTADO_JERARQUIA,
  REGRESAR_LISTADO,
  SET_MODAL_BACK,
  SET_EDIT_JERARQUIA,
  SET_TOTAL_POSITIONS,
  SET_IMAGE_FILE,
  SET_PERMISOS,
  RESET_CONTAINER,
  SET_ACTIVE,
  SET_NAME,
  SET_ERROR,
  SET_TOGGLE_MODAL,
} = Actions.getConstants();

function configuracionJerarquiaReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION: {
      return state;
    }
    case SET_STEPPER: {
      return state.setIn([
        'stepper',
      ], action.stepper)
    }
    case SET_MODAL_DELETE: {
      const modalDelete = state.getIn(['modalDelete']);

      return state.setIn([
        'modalDelete',
      ], !modalDelete)
    }
    case SET_DATA: {
      return state.setIn([
        'listadoJerarquias',
        'backend',
        'data',
      ], List(action.data))
    }
    case SET_SELECTED_ITEMS: {
      return state.setIn([
        'listadoJerarquias',
        'frontend',
        'selectedItems',
      ], List(action.selectedItems))
    }
    case SET_DEPARTMENTS_AND_POSITIONS: {
      const {
        departments,
        positions,
      } = action;

      return state.setIn([
        'registrarJerarquia',
        'backend',
        'departments',
      ], List(departments))
        .setIn([
          'registrarJerarquia',
          'backend',
          'positions',
        ], List(positions))
    }
    case ON_CHANGE_COMBO: {
      const {
        index,
        selected,
      } = action;
      
      if(index === 1){
        const arreglo = selected || [];
        const lista = [];
        let totalPositions = 0;
        const positions = state.getIn(['registrarJerarquia', 'backend', 'positions']).toJS();

        for (let i = 0; i < arreglo.length; i+=1) {
          lista.push(
            {
              seleccionado: false,
              ...selected[i],
            }
          )
        }

        totalPositions = positions.filter(el => lista.some(elem => elem.value ===  el.idDepartamento)).length;
    
        return state.setIn([
          'registrarJerarquia',
          'frontend',
          'selectedDepartment',
        ], List(lista))
          .setIn([
            'registrarJerarquia',
            'frontend',
            'totalPositions',
          ], totalPositions);
      }

      return state;
    }
    case SET_JERARQUIA: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'jerarquia',
      ], fromJS(action.jerarquia))
    }
    case RESET_LISTADO_JERARQUIA: {
      return state.setIn([
        'listadoJerarquias',
        'backend',
        'data',
      ], List(action.data))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'idJerarquia',
        ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'selectedDepartment',
        ], List([]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'jerarquia',
        ], List([]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'totalPositions',
        ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'error',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'name',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'stepper',
        ], 0)
    }
    case REGRESAR_LISTADO: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'idJerarquia',
      ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'selectedDepartment',
        ], List([]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'jerarquia',
        ], List([]))
        .setIn([
          'modalBack',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'totalPositions',
        ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'active',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'error',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'name',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'stepper',
        ], 0) 
    }
    case SET_MODAL_BACK: {
      const modalBack = state.getIn(['modalBack']);

      return state.setIn([
        'modalBack',
      ], !modalBack)
    }
    case SET_EDIT_JERARQUIA: {
      const {
        payload: {
          IdsDepartamento,
          Jerarquia,
          JerarquiaId,
          Nombre,
        },
      } = action;
    
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'selectedDepartment',
      ], List(IdsDepartamento))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'idJerarquia',
        ], JerarquiaId)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'jerarquia',
        ], List([Jerarquia]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'name',
        ], Nombre)
        .setIn([
          'stepper',
        ], 1);
    }
    case SET_TOTAL_POSITIONS: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'totalPositions',
      ], action.totalPositions)
    }
    case SET_IMAGE_FILE: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'imageFile',
      ], action.imageFile)
    }
    case SET_PERMISOS: {
      return state.setIn([
        'permisos',
      ], fromJS(action.payload));
    }
    case RESET_CONTAINER: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'idJerarquia',
      ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'selectedDepartment',
        ], List([]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'jerarquia',
        ], List([]))
        .setIn([
          'registrarJerarquia',
          'frontend',
          'totalPositions',
        ], 0)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'active',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'error',
        ], false)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'name',
        ], '')
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], '')
        .setIn([
          'stepper',
        ], 0)
    }
    case SET_ACTIVE: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'active',
      ], action.active)
    }
    case SET_NAME: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'name',
      ], action.name)
    }
    case SET_ERROR: {
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'error',
      ], action.error)
        .setIn([
          'registrarJerarquia',
          'frontend',
          'errorLabel',
        ], action.errorLabel)
    }
    case SET_TOGGLE_MODAL: {
      const openModal = state.getIn(['registrarJerarquia', 'frontend', 'openModal']);
      
      return state.setIn([
        'registrarJerarquia',
        'frontend',
        'openModal',
      ], !openModal)
    }
    default:
      return state;
  }
}

export default configuracionJerarquiaReducer;