import { combineReducers } from 'redux';
import notifier from '@modules/notify/dux/reducers';

const reducers = combineReducers({
  notifier
});

export default reducers;
