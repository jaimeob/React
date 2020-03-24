import { fromJS } from 'immutable';
import pedidosReducer from '../reducer';

describe('pedidosReducer', () => {
  it('returns the initial state', () => {
    expect(pedidosReducer(undefined, {})).toEqual(fromJS({}));
  });
});
