import { call, takeLatest, put, all, select } from 'redux-saga/effects';
import { openNotify } from '@modules/notify/dux/sagas';

import { getPokemons, getMorePokemons, getPokemonDetail } from './actions';
import { GET_POKEMON, GET_MORE_POKEMON, GET_POKEMON_DETAIL } from './constants';
import pokemonSelect from './selectors';
import pokemonApi from '../services/api';
import { IPokemonResponse, IPokemonsState } from '../types/pokemonList';
import { IPokemon } from '../types/pokemonDetail';

const pokeApi = pokemonApi();
const pokeSelect = pokemonSelect();

/**
 * get detail pokemon with name or id pokemon on it
 * @param {*} { payload: nameOrId }
 * @returns
 */
function* getPokemonDetailSaga(action: any) {
  try {
    const { payload: nameOrId } = action;

    // Call paralel api to get detail pokemon and get species
    const [detailRes, speciesRes] = yield all([
      call(pokeApi.getPokemonDetail, nameOrId),
      call(pokeApi.getPokemonSpecies, nameOrId),
    ]);

    if (detailRes.status === 200 && speciesRes.status === 200) {
      const { evolution_chain } = speciesRes.data;
      // Call paralel api to get detail evo and element types
      const [evo, types] = yield all([
        call(pokeApi.universalGetWithUrl, evolution_chain.url),
        call(pokeApi.universalGetWithUrl, detailRes.data.types[0].type.url),
      ]);

      const pokemon: IPokemon = {
        detail: detailRes.data,
        species: speciesRes.data,
        evolutions: evo.data,
        elementType: types.data,
      };

      yield put(getPokemonDetail.success({ pokemon }));
      return;
    }
    yield put(getPokemonDetail.failure({ message: 'Sorry, Something Happen' }));
    return;
  } catch (error) {
    yield put(
      getPokemonDetail.failure({
        message: error.message,
      })
    );
  }
}

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
export function* getPokemonListSaga({ payload }: any) {
  try {
    const res: IPokemonResponse = yield call(pokeApi.getPokemonList, payload);
    const { results } = res.data;
    yield put(
      getPokemons.success({
        pokemons: results,
      })
    );
  } catch (error) {
    yield put(getPokemons.failure({ message: `${error.message}` }));
  }
}

export default function* pokemonSaga() {
  yield all([
    takeLatest(GET_POKEMON_DETAIL.REQUEST, getPokemonDetailSaga),
    takeLatest(GET_MORE_POKEMON.REQUEST, getMorePokemonListSaga),
    takeLatest(GET_POKEMON.REQUEST, getPokemonListSaga),
  ]);
}
