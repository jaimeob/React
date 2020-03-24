/*
 *
 * PorcentajeAhorroCompras reducer
 *
 */

import { fromJS } from 'immutable';
import INITIAL_STATE from './state';
import Actions from './actions';

export const initialState = fromJS(INITIAL_STATE);

export const {
  DEFAULT_ACTION,
  HANDLE_CHANGE_DATE,
  REQUEST_GOAL_PORCENT_SAVE_SUCCESS,
  REQUEST_PORCENT_SAVE_SUCCESS,
  HANDLE_CHARGE_PROGRESS,
  HANDLE_DATE_CLICK,
  CHANGE_FECHAS,
} = Actions.getConstants();

function porcentajeAhorroComprasReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case HANDLE_CHANGE_DATE: {
      const {
        typeDate,
        value,
      } = action

      if (typeDate === "dateStart") {
        return state
          .setIn([
            typeDate,
          ], value)
          .setIn([
            "dateEnd",
          ], value)
      }

      return state
        .setIn([
          typeDate,
        ], value)
    }
    case REQUEST_GOAL_PORCENT_SAVE_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action

      return state
        .setIn([
          "goalPorcent",
        ], data)
    }
    case REQUEST_PORCENT_SAVE_SUCCESS: {
      const {
        data: {
          data,
        },
      } = action

      return state
        .setIn([
          "Table",
          "rows",
        ], data)
        .setIn([
          "showInfo",
        ], true)
    }
    case HANDLE_CHARGE_PROGRESS: {
      const {
        val,
      } = action

      return state
        .setIn([
          "progressActive",
        ], val)
    }
    case HANDLE_DATE_CLICK: {
      const {
        event,
      } = action

      return state
        .setIn([
          "fechaInput",
        ], event)
    }
    case CHANGE_FECHAS: {
      const {
        dateStart,
        dateEnd,
      } = action

      return state
        .setIn([
          'dateStart',
        ], dateStart)
        .setIn([
          'dateEnd',
        ], dateEnd)
    }
    default:
      return state;
  }
}

export default porcentajeAhorroComprasReducer;