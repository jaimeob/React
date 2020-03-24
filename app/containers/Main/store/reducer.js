/* eslint-disable no-case-declarations */
/*
 *
 * Main reducer
 *
 */

import { fromJS, List } from 'immutable';
import moment from 'moment';
import _ from 'lodash';
// import get from 'lodash/get';

import INITIAL_STATE from './state'
// import ActionsService from 'containers/Servicios/store/actions';
import Actions from './actions';
import {
  REQUEST_ACTION,
  REQUEST_ACTION_SUCCESS,
  // REQUEST_ACTION_FAILED,
} from './constants';

// ACTIONS
export const {
  UPDATE_TOPBAR_TITLE,
  // REQUEST_CONFIG_PROYECTO,
  UPDATE_DATASOURCES,
  // ADD_ERROR_STACK,
  SET_UI_MOUNTED,
} = Actions.getConstants();

export const initialState = fromJS(INITIAL_STATE);

export const updateDatasources = (
  prop = '',
  val,
) =>
  (ds) =>
    ds.has(prop) ?
      ds.set(prop, fromJS(val)) : ds;

export const updateErrorStack = (
  action = {},
) =>
  (stk) =>
    stk.push(action)

const PATH_DATASOURCE = [
  'backend',
  'datasources',
];

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATASOURCES: {
      // TODO
      const {
        prop = '',
        response: {
          config = {},
          data: [
            resultSet = {},
          ],
        },
        error = false,
        requestAction = '',
      } = action;
      const updatedDs = 
        state.updateIn(
          PATH_DATASOURCE,
          updateDatasources(prop, resultSet)
        );
      return updatedDs
        .update(
          'backend',
          (bknd) => bknd
            .merge({
              stack: bknd
                .get('stack')
                .set(requestAction, fromJS({
                  config,
                  dsprop: prop,
                  status: error ? 'FAILED' : 'SUCCESS' ,
                  date: moment()
                    .format('DD/MM/YYYY HH:mm:ss:SSS'),
                  error,
                }),
                ),
            })
        );
    }
    case UPDATE_TOPBAR_TITLE: {
      return state;
    }
    case REQUEST_ACTION: {// esto estaba en developers1
      return state
        .updateIn([
          'frontend',
          'ui',
        ], (ui) => ui.merge({
          mounted: true,
          loadingRequest: true,
        }))
    }
    case REQUEST_ACTION_SUCCESS: {// esto estaba en developers1
      const updateSource = state.updateIn([
        'backend',
        'datasources',
        'fakeData',
      ], fromJS(action.data))
      return updateSource.setIn([
        'frontend',
        'ui',
        'loadingRequest',
      ], false)
    }
    default:
      return state;
  }
}

export default mainReducer;
