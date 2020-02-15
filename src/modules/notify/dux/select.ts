import { createSelector } from 'reselect';

const getNotifier = () => state => state.notifier;

export const selectNotification = () =>
  createSelector(
    getNotifier(),
    state => state.notifications
  );
