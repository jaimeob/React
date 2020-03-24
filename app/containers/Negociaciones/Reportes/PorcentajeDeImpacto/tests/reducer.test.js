import { fromJS } from 'immutable';
import porcentajeDeImpactoReducer from '../reducer';

describe('porcentajeDeImpactoReducer', () => {
  it('returns the initial state', () => {
    expect(porcentajeDeImpactoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
