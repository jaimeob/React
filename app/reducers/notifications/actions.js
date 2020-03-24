import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
} from './constants';

export function enqueueSnackbar(notification) {
  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      ...notification,
    },
  };
}

export function removeSnackbar(key) {
  return {
    type: REMOVE_SNACKBAR,
    key,
  }
};

