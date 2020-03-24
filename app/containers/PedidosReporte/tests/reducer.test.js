import { fromJS } from 'immutable';
import pedidosReporteReducer from '../reducer';

describe('pedidosReporteReducer', () => {
  it('returns the initial state', () => {
    expect(pedidosReporteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
