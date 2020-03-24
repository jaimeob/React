/*
 *
 * PorcentajeAhorroCompras actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/PORCENTAJEAHORROCOMPRAS/',
  subfix: '_ACTION',
});

export const ACTION_KEYS = {
  DEFAUL_ACTION: (type) =>
    function funDefault() {
      return {
        type,
      }
    },
  HANDLE_CHANGE_DATE: (type) =>
    function changeDate(typeDate,value) {
      return {
        type,
        typeDate,
        value,
      }
    },
  REQUEST_GOAL_PORCENT_SAVE: (type) =>
    function getGoalPorcent() {
      return {
        type,
      }
    },
  REQUEST_GOAL_PORCENT_SAVE_SUCCESS: (type) =>
    function getGoalPorcent(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_PORCENT_SAVE_SUCCESS: (type) =>
    function getPorcentSave(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CHARGE_PROGRESS: (type) =>
    function getPorcentSave(val) {
      return {
        type,
        val,
      }
    },
  HANDLE_DATE_CLICK: (type) =>
    function getPorcentSave(id, event) {
      return {
        type,
        id,
        event,
      }
    },
  CHANGE_FECHAS: (type) =>
    function changeFechasAction(dateStart, dateEnd) {
      return {
        type,
        dateStart,
        dateEnd,
      }
    },
};
Object.keys(ACTION_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTION_KEYS[action])
});

export default Actions;

