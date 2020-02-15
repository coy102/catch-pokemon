import { all, fork } from 'redux-saga/effects';
import pokemonSaga from '@modules/pokemon/dux/sagas';

function* sagas() {
  yield all([fork(pokemonSaga)]);
}

export default sagas;
