import { all, fork } from 'redux-saga/effects';
import { getPokemonListSaga } from '@modules/pokemon/dux/sagas';

function* sagas() {
  yield all([fork(getPokemonListSaga)]);
}

export default sagas;
