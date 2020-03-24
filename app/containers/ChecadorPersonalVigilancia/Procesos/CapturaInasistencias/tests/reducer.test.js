import { fromJS } from 'immutable';
import capturaInasistenciasReducer from '../reducer';

describe('capturaInasistenciasReducer', () => {
  it('returns the initial state', () => {
    expect(capturaInasistenciasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
