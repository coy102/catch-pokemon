import { createAction } from 'redux-actions';
import { GET_POKEMON, GET_MORE_POKEMON } from './constants';

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
