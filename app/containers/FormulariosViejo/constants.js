/*
 *
 * Formularios constants
 *
 */

export const DEFAULT_ACTION = 'app/Formularios/DEFAULT_ACTION';

export const cfgActionsGenerator = {
  prefix: 'APP/CONTAINERS/FORMULARIOS/',
  subfix: '_ACTION',
};

export const REGEXS = {
  VALID_NUMS_WITH_SPACES: /^\d*$/,
  VALID_NUMS_WITHOUT_SPACES: /^\d+$/,
  VALID_ALPHA_WITH_SPACES: /^[a-zA-Z0-9]*$/i,
  VALID_ALPHA_WITHOUT_SPACES: /^[a-zA-Z0-9]+$/i,
  VALID_TEXT_WITH_SPACES: /^[a-zA-Z]*$/i,
  VALID_TEXT_WITHOUT_SPACES: /^[a-zA-Z]+$/i,
  VALID_REQUIRED_WITHOUT_SPACES: /([^\s])/,
  VALID_REQUIRED_WITH_SPACES: /([^\s]*)/,
  VALID_FLOAT: /^[0-9]*[.][0-9]+$/,
};