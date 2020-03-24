/*
 *
 * BandejaDifusiones actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from './constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINER/BANDEJADIFUSIONES/',
  subfix: '_ACTION',
});

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

Actions.name('HANDLE_CHANGE_TAB_DIFUSIONES').set(
  type =>
    function handleChangeTabAction(event, value) {
      return {
        type,
        event,
        value,
      };
    },
);

Actions.name('SELECTED_TAB').set(
  type =>
    function selectedTabAction(event) {
      // event.persist();
      return {
        type,
        event,
      };
    },
);

Actions.name('HANDLE_CHANGE_COMENTARIOS').set(
  type =>
    function handleChangeComentarios(event) {
      return {
        type,
        mensaje : event.target.value,
      }
    }
)

Actions.name('CHANGE_ASUNTO').set(
  type =>
    function handleChangeComentarios(event) {
      return {
        type,
        mensaje : event.target.value,
      }
    }
)



Actions.name('POST_INSERT_DIFUSIONS').set(
  type =>
    function postInsertDifusions(event) {
      return {
        type,
        // /data,
        mensaje : event,
      };
    },
);
Actions.name('INSERT_DIFUSION').set(
  type =>
    function insercionDifusionAction(event) {
      return {
        type,
        // /data,
        data : event,
      };
    },
);

Actions.name('GET_DEPARTAMENTOS').set(
  type =>
    function getDepartamentosAction() {
      return {
        type,
      };
    },
);

Actions.name('REQUEST_DEPARTAMENTOS').set(
  type =>
    function requestDepartamentosAction(datos) {
      return {
        type,
        datos : datos.data,
      };
    },
);

Actions.name('GET_DIFUSIONES').set(
  type =>
    function getDifusionesAction() {
      return {
        type,
      };
    },
);

Actions.name('OPEN_DIFUSION').set(
  type =>
    function openDifusionAction(datos) {
      return {
        type,
        data: datos,
      };
    },
);


export default Actions;
