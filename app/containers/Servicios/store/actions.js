/*
 *
 * Servicios actions
 *
 */

import ActionsGenerator from 'utils/lib/ActionsGenerator';
import { DEFAULT_ACTION } from '../constants';

const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/SERVICIOS/',
  subfix: '_ACTION',
})

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// export function changeTopbarTitleAction(event) {
//   return {
//     type: UPDATE_TOPBAR_NAME,
//     topbarTitle: event.target.value,
//   }
// }

Actions.name('UPDATE_TOPBAR_NAME')
  .set((type) =>
    function fn1(event) {
      return {
        type,
        topbarTitle: event.target.value,
      }
    }
  )

export default Actions;