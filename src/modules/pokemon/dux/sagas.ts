import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { openNotify } from '@modules/notify/dux/sagas';

import { getPokemons, getMorePokemons } from './actions';
import { GET_POKEMON, GET_MORE_POKEMON } from './constants';
import pokemonSelect from './selectors';
import pokemonApi from '../services/api';
import { IPokemonResponse, IPokemonsState } from '../types/pokemonList';

const pokeApi = pokemonApi();
const pokeSelect = pokemonSelect();
/**
 * get more pokemon result with currentOffset + 20
 * @returns
 */
function* getMorePokemonListSaga() {
  try {
    const { currentOffset }: IPokemonsState = yield select(
      pokeSelect.selectPokemonList()
    );

    const res: IPokemonResponse = yield call(
      pokeApi.getPokemonList,
      currentOffset
    );
    const { results } = res.data;
    yield put(
      getMorePokemons.success({
        newPokemons: results,
      })
    );
  } catch (error) {
    yield put(getMorePokemons.failure({}));
    yield call(openNotify, error.message, 'warning');
  }
}

/**
 * get list pokemons
 * @export
 * @param {*} [action]
 */
export function* getPokemonListSaga(action?: any) {
  try {
    const { payload: offset } = action;
    const res: IPokemonResponse = yield call(pokeApi.getPokemonList, offset);
    const { results } = res.data;
    yield put(
      getPokemons.success({
        pokemons: results,
      })
    );

    yield put(getPokemons.failure({ message: res.status }));
  } catch (error) {
    yield put(getPokemons.failure({ message: `${error.message}` }));
  }
}

export default function* pokemonSaga() {
  yield all([
    takeLatest(GET_MORE_POKEMON.REQUEST, getMorePokemonListSaga),
    takeLatest(GET_POKEMON.REQUEST, getPokemonListSaga),
  ]);
}
