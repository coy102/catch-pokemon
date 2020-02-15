import { combineReducers } from 'redux';
import notifier from '@modules/notify/dux/reducers';
import pokemon from '@modules/pokemon/dux/reducers';

const reducers = combineReducers({
  notifier,
  pokemon,
});

export default reducers;
