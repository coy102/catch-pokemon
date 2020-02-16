import { call, takeLatest, put, all, select, delay } from 'redux-saga/effects';
import { openNotify } from '@modules/notify/dux/sagas';
import Router from 'next/router';

import {
  getPokemons,
  getMorePokemons,
  getPokemonDetail,
  throwPokeBall,
  setOwnedPokemons,
  getOwnedPokemons,
} from './actions';
import {
  GET_POKEMON,
  GET_MORE_POKEMON,
  GET_POKEMON_DETAIL,
  THROW_BALL,
  SET_OWNED_POKEMON,
  GET_OWNED_POKEMON,
} from './constants';
import pokemonSelect from './selectors';
import {
  catchPokemonService,
  pokemonApi,
  ownedPokemonStorage,
} from '../services';
import { IPokemonResponse, IPokemonsState } from '../types/pokemonList';
import { IPokemon, PokemonDetailState } from '../types/pokemonDetail';
import { IThrowBall } from '../types/throwBall';

const { getOwnedStorage, setOwnedStorage } = ownedPokemonStorage;
const pokeApi = pokemonApi();
const pokeSelect = pokemonSelect();
const catchPokemons = catchPokemonService(getOwnedStorage());

/**
 * get owned pokemons from localstorage
 */
function* getOwnedPokemonsSaga() {
  try {
    const ownedPokemons = yield call(getOwnedStorage);
    yield put(getOwnedPokemons.success({ pokemons: ownedPokemons }));
  } catch (error) {
    yield call(openNotify, error, 'warning');
    yield put(getOwnedPokemons.failure());
  }
}

/**
 * set or save new pokemon after success catch a pokemon
 * @param {*} { payload: values, meta: actions }
 * @returns
 */
function* setOwnedPokemon({ payload: values, meta: actions }: any) {
  const pokemonState: IThrowBall = yield select(pokeSelect.selectThrowBall());
  const { setSubmitting } = actions;
  const { pokemonNick } = values;
  const { caughtPokemon } = pokemonState;

  const newPokemons = catchPokemons.getNewPokemons({
    caughtPokemon,
    pokemonNick,
  });

  if (newPokemons.valid) {
    // if, pokemon valid or dont have any nickname it will save new pokemon
    yield call(setOwnedStorage, newPokemons.newPokemons);
    yield call(setSubmitting, false);
    yield put(throwPokeBall.openNickDialog({ isCaught: false }));
    yield put(setOwnedPokemons.success());
    yield call(openNotify, `You saved ${pokemonNick}`, 'default');
    yield call(Router.push, '/pokemon/owneds');

    return;
  }
  // else, already has a nickname, call open notify warning with output message
  // from getNewPokemons
  yield call(openNotify, newPokemons.message, 'warning');
  yield put(setOwnedPokemons.failure());
  yield call(setSubmitting, false);
  return;
}

/**
 * throw a ball with 50% chance and copy detail state to caughtPokemon state
 * for reuse caughtPokemon to setOwnedPokemon
 * @returns
 */
function* throwBallSaga() {
  const pokemonState: PokemonDetailState = yield select(
    pokeSelect.selectPokemonDetail()
  );

  const { types, sprites, name, id } = pokemonState.pokemon.detail;
  const caughtPokemon = { types, sprites, name, id };

  const percentage = yield call(catchPokemons.getPercentageChance, 0.5);

  yield delay(1500);

  if (percentage) {
    // if get 50% chance it will set to coughtPokemon state
    yield put(throwPokeBall.success({ isCaught: true, caughtPokemon }));
    yield call(openNotify, `Gotcha!`, 'default');
    return;
  }
  yield call(
    openNotify,
    `Oops! ${name} broke your poke ball, keep spirit!! `,
    'default'
  );
  yield put(throwPokeBall.failure());

  return;
}

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
    takeLatest(GET_OWNED_POKEMON.REQUEST, getOwnedPokemonsSaga),
    takeLatest(SET_OWNED_POKEMON.REQUEST, setOwnedPokemon),
    takeLatest(THROW_BALL.REQUEST, throwBallSaga),
    takeLatest(GET_POKEMON_DETAIL.REQUEST, getPokemonDetailSaga),
    takeLatest(GET_MORE_POKEMON.REQUEST, getMorePokemonListSaga),
    takeLatest(GET_POKEMON.REQUEST, getPokemonListSaga),
  ]);
}
