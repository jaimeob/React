import { fromJS } from 'immutable';
import reporteAsistenciaReducer from '../reducer';

describe('reporteAsistenciaReducer', () => {
  it('returns the initial state', () => {
    expect(reporteAsistenciaReducer(undefined, {})).toEqual(fromJS({}));
  });
});
