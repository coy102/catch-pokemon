import shortid from 'shortid';

import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  REQUEST_SNACKBAR
} from './constants';

export const requestSnackbar = () => ({
  type: REQUEST_SNACKBAR
});

export const enqueueSnackbar = notification => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + shortid.generate(),
    ...notification
  }
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});
