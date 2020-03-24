import ActionsGenerator from 'utils/lib/ActionsGenerator';
import {
  prefix,
  subfix,
} from './constants';

export const Actions = new ActionsGenerator({
  prefix,
  subfix,
});

Actions.name('UI_TOGGLE_OPEN_DRAWER')
  .set((type) => 
    function uiToggleOpenDrawe(open) {
      return {
        type,
        open,
      };
    }
  );

export default Actions;
