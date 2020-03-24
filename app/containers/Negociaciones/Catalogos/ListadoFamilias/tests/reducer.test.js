import { fromJS } from 'immutable';
// eslint-disable-next-line import/no-unresolved
import listadoFamiliasReducer from '../reducer';

describe('listadoFamiliasReducer', () => {
  it('returns the initial state', () => {
    expect(listadoFamiliasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
