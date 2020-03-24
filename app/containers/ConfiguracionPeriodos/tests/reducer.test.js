import { fromJS } from 'immutable';
import configuracionPeriodosReducer from '../reducer';

describe('configuracionPeriodosReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionPeriodosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
