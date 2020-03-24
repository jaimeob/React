import { fromJS } from 'immutable';
import pedidosNuevoReducer from '../reducer';

describe('pedidosNuevoReducer', () => {
  it('returns the initial state', () => {
    expect(pedidosNuevoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
