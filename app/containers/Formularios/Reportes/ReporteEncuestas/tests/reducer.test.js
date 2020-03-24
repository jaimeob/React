import { fromJS } from 'immutable';
import reporteEncuestasReducer from '../reducer';

describe('reporteEncuestasReducer', () => {
  it('returns the initial state', () => {
    expect(reporteEncuestasReducer(undefined, {})).toEqual(fromJS({}));
  });
});
