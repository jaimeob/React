import { fromJS } from 'immutable';
import asignacionAbogadosReducer from '../reducer';

describe('asignacionAbogadosReducer', () => {
  it('returns the initial state', () => {
    expect(asignacionAbogadosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
