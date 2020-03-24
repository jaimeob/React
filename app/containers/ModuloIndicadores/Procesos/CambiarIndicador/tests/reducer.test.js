import { fromJS } from 'immutable';
import cambiarIndicadorReducer from '../reducer';

describe('cambiarIndicadorReducer', () => {
  it('returns the initial state', () => {
    expect(cambiarIndicadorReducer(undefined, {})).toEqual(fromJS({}));
  });
});
