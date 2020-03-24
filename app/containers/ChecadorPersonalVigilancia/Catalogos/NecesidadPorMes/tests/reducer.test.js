import { fromJS } from 'immutable';
import necesidadPorMesReducer from '../reducer';

describe('necesidadPorMesReducer', () => {
  it('returns the initial state', () => {
    expect(necesidadPorMesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
