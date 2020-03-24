/*
 *
 * Main actions
 *
 */
import ActionsGenerator from 'utils/lib/ActionsGenerator';

export const Actions = new ActionsGenerator({
  prefix: 'APP/CONTAINERS/MAIN/',
  subfix: '_ACTION',
});

export const ACTIONS_KEYS = {
  UPDATE_TOPBAR_TITLE: (type) =>
    (title) => ({
      type,
      title,
    }),
  REQUEST_API: (type) =>
    (payload) => ({
      type,
      ...payload,
    }),
  UPDATE_DATASOURCES: (type) => (
    requestAction = '',
    prop = '',
    response = {},
    error = false,
  ) => ({
    type,
    requestAction,
    prop,
    response,
    error,
  }),
  REQUEST_CONFIG_FAILED: (type) =>
    (request) => ({
      type,
      request,
    }),
  OBTENER_PERMISOS: (type) =>
    () => ({
      type,
    }),
}

Object.keys(ACTIONS_KEYS).forEach((action) => {
  Actions
    .name(action)
    .set(ACTIONS_KEYS[action])
});

export default Actions;
