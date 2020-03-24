import { createSelector } from 'reselect';
import { initialState } from './reducer';


/**
 * Direct selector to the main state domain
 */

const selectMainDomain = state => state.get('main', initialState);
const selectGlobalDomain = state => state.get('global', initialState);



/**
 * Other specific selectors
 */

/**
 * Default selector used by Main
 */

const PATHS = {
  project: [
    'backend',
    'datasources',
    'project',
  ],
};

const makeSelectGlobal = () =>
  createSelector(selectGlobalDomain, substate => substate.toJS());

const makeSelectMain = () =>
  createSelector(selectMainDomain, substate => substate.toJS());

const makeSelectConfigProject = () =>
  createSelector(
    selectMainDomain,
    (mainstate) => mainstate.getIn(
      PATHS.project,
      initialState
        .getIn([
          'backend',
          'datasources',
          'project',
        ]),
    ).toJS()
  )

export default makeSelectMain;
export { selectMainDomain, makeSelectConfigProject, makeSelectGlobal };
