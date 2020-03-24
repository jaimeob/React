import { fromJS } from 'immutable';
import inventarioCiclicoReducer from '../reducer';

describe('inventarioCiclicoReducer', () => {
  it('returns the initial state', () => {
    expect(inventarioCiclicoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
