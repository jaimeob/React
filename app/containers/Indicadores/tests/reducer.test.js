import { fromJS } from 'immutable';
import indicadoresReducer from '../reducer';

describe('indicadoresReducer', () => {
  it('returns the initial state', () => {
    expect(indicadoresReducer(undefined, {})).toEqual(fromJS({}));
  });
});
