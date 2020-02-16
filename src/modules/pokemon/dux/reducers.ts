import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  GET_POKEMON,
  GET_MORE_POKEMON,
  GET_POKEMON_DETAIL,
  THROW_BALL,
  OPEN_SETNICK_DIALOG,
} from './constants';
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
  throwBall: {
    isCaught: false,
    isThrowing: false,
    caughtPokemon: {},
  },
};

const throwBallReducer = handleActions(
  {
    [THROW_BALL.REQUEST]: state => ({ ...state, isThrowing: true }),
    [THROW_BALL.SUCCESS]: (
      state,
      { payload: { isCaught, caughtPokemon } }
    ) => ({
      ...state,
      isCaught,
      caughtPokemon,
      isThrowing: false,
    }),
    [THROW_BALL.FAILURE]: state => ({
      ...state,
      isThrowing: false,
    }),
    [OPEN_SETNICK_DIALOG]: (state, { payload: { isCaught } }) => ({
      ...state,
      isCaught,
    }),
  },
  initialState.throwBall
);

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
  throwBall: throwBallReducer,
  pokemonDetail: pokemonDetailReducer,
  pokemonList: pokemonsReducer,
});
