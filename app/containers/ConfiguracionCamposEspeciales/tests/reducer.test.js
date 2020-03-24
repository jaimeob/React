import { fromJS } from 'immutable';
import configuracionCamposEspecialesReducer from '../reducer';

describe('configuracionCamposEspecialesReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionCamposEspecialesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
