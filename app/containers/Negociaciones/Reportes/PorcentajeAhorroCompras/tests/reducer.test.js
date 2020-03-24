import { fromJS } from 'immutable';
import porcentajeAhorroComprasReducer from '../reducer';

describe('porcentajeAhorroComprasReducer', () => {
  it('returns the initial state', () => {
    expect(porcentajeAhorroComprasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
