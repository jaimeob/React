import { fromJS } from 'immutable';
import notificacionesReducer from '../reducer';

describe('notificacionesReducer', () => {
  it('returns the initial state', () => {
    expect(notificacionesReducer(undefined, {})).toEqual(fromJS({}));
  });
});
