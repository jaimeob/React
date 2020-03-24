import { fromJS } from 'immutable';
import porcentajeMontoNegociadoReducer from '../reducer';

describe('porcentajeMontoNegociadoReducer', () => {
  it('returns the initial state', () => {
    expect(porcentajeMontoNegociadoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
