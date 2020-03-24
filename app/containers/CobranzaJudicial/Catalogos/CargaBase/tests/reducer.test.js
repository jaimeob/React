import { fromJS } from 'immutable';
import cargaBaseReducer from '../reducer';

describe('cargaBaseReducer', () => {
  it('returns the initial state', () => {
    expect(cargaBaseReducer(undefined, {})).toEqual(fromJS({}));
  });
});
