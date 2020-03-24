/*
 *
 * DiasPromedio actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/DIASPROMEDIO/',
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
  REQUEST_GOAL_DAYS: (type) =>
    function getGoalPorcent() {
      return {
        type,
      }
    },
  REQUEST_GOAL_DAYS_SUCCESS: (type) =>
    function getGoalPorcent(data) {
      return {
        type,
        data,
      }
    },
  REQUEST_DAYS_AVERAGE_SUCCESS: (type) =>
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
  REQUEST_DAYS_AVERAGE_DETAIL: (type) =>
    function getDetail(employe) {
      return {
        type,
        employe,
      }
    },
  REQUEST_DAYS_AVERAGE_DETAIL_SUCCESS: (type) =>
    function updateDetailState(data) {
      return {
        type,
        data,
      }
    },
  HANDLE_CLOSE_DETAIL: (type) =>
    function closeModalDetail() {
      return {
        type,
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
