import { createAction } from 'redux-actions';
import {
  GET_POKEMON,
  GET_MORE_POKEMON,
  GET_POKEMON_DETAIL,
  THROW_BALL,
  OPEN_SETNICK_DIALOG,
  GET_OWNED_POKEMON,
  SET_OWNED_POKEMON,
  REMOVE_OWNED_POKEMON,
  OPEN_REMOVE_DIALOG,
} from './constants';

export const removeOwnedPokemons = {
  request: createAction(REMOVE_OWNED_POKEMON.REQUEST, ({ params }) => params),
  success: createAction(REMOVE_OWNED_POKEMON.SUCCESS),
  failure: createAction(REMOVE_OWNED_POKEMON.FAILURE),
  openRemoveDialog: createAction(OPEN_REMOVE_DIALOG),
};

export const getOwnedPokemons = {
  request: createAction(GET_OWNED_POKEMON.REQUEST),
  success: createAction(GET_OWNED_POKEMON.SUCCESS),
  failure: createAction(GET_OWNED_POKEMON.FAILURE),
};

export const setOwnedPokemons = {
  request: createAction(
    SET_OWNED_POKEMON.REQUEST,
    ({ values }) => values,
    ({ actions }) => actions
  ),
  success: createAction(SET_OWNED_POKEMON.SUCCESS),
  failure: createAction(SET_OWNED_POKEMON.FAILURE),
};

export const throwPokeBall = {
  request: createAction(THROW_BALL.REQUEST),
  success: createAction(THROW_BALL.SUCCESS),
  failure: createAction(THROW_BALL.FAILURE),
  openNickDialog: createAction(OPEN_SETNICK_DIALOG),
};

export const getPokemonDetail = {
  request: createAction(GET_POKEMON_DETAIL.REQUEST, ({ nameOrId }) => nameOrId),
  success: createAction(GET_POKEMON_DETAIL.SUCCESS),
  failure: createAction(GET_POKEMON_DETAIL.FAILURE),
};

export const getPokemons = {
  request: createAction(GET_POKEMON.REQUEST, ({ offset }) => offset),
  success: createAction(GET_POKEMON.SUCCESS),
  failure: createAction(GET_POKEMON.FAILURE),
};

export const getMorePokemons = {
  request: createAction(GET_MORE_POKEMON.REQUEST, ({ offset }) => offset),
  success: createAction(GET_MORE_POKEMON.SUCCESS),
  failure: createAction(GET_MORE_POKEMON.FAILURE),
};
