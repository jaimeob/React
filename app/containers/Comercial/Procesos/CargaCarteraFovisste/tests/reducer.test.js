import { fromJS } from 'immutable';
import cargaCarteraFovissteReducer from '../store/reducer';

describe('cargaCarteraFovissteReducer', () => {
  it('returns the initial state', () => {
    expect(cargaCarteraFovissteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
