import { fromJS } from 'immutable';
import seguimientoEtapasReducer from '../reducer';

describe('seguimientoEtapasReducer', () => {
  it('returns the initial state', () => {
    expect(seguimientoEtapasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
