import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from './constants';

interface IState {
  notifications: Array<any>;
}

const defaultState: IState = {
  notifications: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};
