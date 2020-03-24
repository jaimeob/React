import { fromJS } from 'immutable';
import bandejaDifusionesReducer from '../reducer';

describe('bandejaDifusionesReducer', () => {
  it('returns the initial state', () => {
    expect(bandejaDifusionesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
