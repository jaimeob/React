import { fromJS } from 'immutable';
import catalogoEtapasReducer from '../store/reducer';

describe('catalogoEtapasReducer', () => {
  it('returns the initial state', () => {
    expect(catalogoEtapasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
