import { fromJS } from 'immutable';
import usuariosReducer from '../reducer';

describe('usuariosReducer', () => {
  it('returns the initial state', () => {
    expect(usuariosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
