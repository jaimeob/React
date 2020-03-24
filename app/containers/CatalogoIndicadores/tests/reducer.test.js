import { fromJS } from 'immutable';
import catalogoIndicadoresReducer from '../reducer';

describe('catalogoIndicadoresReducer', () => {
  it('returns the initial state', () => {
    expect(catalogoIndicadoresReducer(undefined, {})).toEqual(fromJS({}));
  });
});
