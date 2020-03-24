import { fromJS } from 'immutable';
import porcentajeCumplimientoReducer from '../reducer';

describe('porcentajeCumplimientoReducer', () => {
  it('returns the initial state', () => {
    expect(porcentajeCumplimientoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
