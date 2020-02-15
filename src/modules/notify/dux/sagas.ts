import { put } from 'redux-saga/effects';
import { VariantType } from 'notistack';
import { enqueueSnackbar } from './actions';

export function* openNotify(message: string, variant: VariantType) {
  const notification = {
    message,
    options: {
      variant,
      preventDuplicate: true,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      }
    }
  };

  yield put(enqueueSnackbar(notification));
}
