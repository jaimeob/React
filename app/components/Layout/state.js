import produce from 'immer';
import {
  isUndefined,
} from 'lodash';

export const STATE = () => ({
  history: null,
  ui: {
    drawerLeft: {
      open: true,
    },
    topbar: {
      title: "",
    },
  },
  mounted: false,
});

export const HANDLERS = {
  updateDrawer:
    (state) =>
      (prop = '', val) =>
        produce(state, (draft) => {
          const {
            ui: {
              drawerLeft,
            },
          } = draft;
          if (prop in drawerLeft && !isUndefined(val)) {
            draft.ui.drawerLeft[prop] = val;
          }
        }),
}

export const CUSTOM_HANDLERS = (props) => {
  const {
    state: {
      ui: {
        drawerLeft: {
          open: drawerOpen,
        },
      },
    },
    handlers: {
      updateDrawer,
    },
  } = props;
  return {
    ...props,
    handlers: {
      ...props.handlers,
      handleOpenDrawer: () => {
        updateDrawer('open', true)
      },
      handleCloseDrawer: () => {
        updateDrawer('open', false)
      },
      handleToggleDrawer: () => {
        updateDrawer('open', !drawerOpen);
      },
    },
  }
} 

export default STATE;
