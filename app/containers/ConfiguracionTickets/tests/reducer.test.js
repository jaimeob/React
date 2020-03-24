import { fromJS } from 'immutable';
import configuracionTicketsReducer from '../reducer';

describe('configuracionTicketsReducer', () => {
  it('returns the initial state', () => {
    expect(configuracionTicketsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
