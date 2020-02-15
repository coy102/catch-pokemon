import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { GET_POKEMON, GET_MORE_POKEMON, GET_POKEMON_DETAIL } from './constants';
import { IInitialState } from '../types/state';

const initialState: IInitialState = {
  pokemonList: {
    currentOffset: 20,
    isFetching: false,
    pokemons: [],
    newPokemons: [],
    message: '',
  },
  pokemonDetail: {
    isFetching: false,
    message: '',
    pokemon: {},
  },
};

const pokemonDetailReducer = handleActions(
  {
    [GET_POKEMON_DETAIL.REQUEST]: state => ({
      ...state,
      message: '',
      isFetching: true,
    }),
    [GET_POKEMON_DETAIL.SUCCESS]: (state, { payload: { pokemon } }) => ({
      ...state,
      pokemon,
      isFetching: false,
    }),
    [GET_POKEMON_DETAIL.FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      message,
      isFetching: false,
    }),
  },
  initialState.pokemonDetail
);

export const pokemonsReducer = handleActions(
  {
    // GET POKEMONS LIST
    [GET_POKEMON.REQUEST]: state => ({
      ...state,
      message: '',
      isFetching: true,
    }),
    [GET_POKEMON.SUCCESS]: (state, { payload: { pokemons } }) => ({
      ...state,
      pokemons,
      isFetching: false,
    }),
    [GET_POKEMON.FAILURE]: (state, { payload: { message } }) => ({
      ...state,
      message,
      isFetching: false,
    }),
    // LOAD MORE POKEMON REDUCER
    [GET_MORE_POKEMON.REQUEST]: state => ({ ...state, isFetching: true }),
    [GET_MORE_POKEMON.SUCCESS]: (state, { payload: { newPokemons } }) => ({
      ...state,
      isFetching: false,
      currentOffset: state.currentOffset + 20,
      pokemons: [...state.pokemons, ...newPokemons],
    }),
    [GET_MORE_POKEMON.FAILURE]: state => ({
      ...state,
      isFetching: false,
    }),
  },
  initialState.pokemonList
);

export default combineReducers({
  pokemonDetail: pokemonDetailReducer,
  pokemonList: pokemonsReducer,
});
