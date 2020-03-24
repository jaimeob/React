// eslint-disable-next-line import/no-unresolved
import { defaultAction } from '../actions';
// eslint-disable-next-line import/no-unresolved
import { DEFAULT_ACTION } from '../constants';

describe('ListadoFamilias actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DEFAULT_ACTION,
      };
      expect(defaultAction()).toEqual(expected);
    });
  });
});
