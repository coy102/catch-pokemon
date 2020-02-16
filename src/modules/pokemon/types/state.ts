import { IPokemonsState } from './pokemonList';
import { PokemonDetailState } from './pokemonDetail';
import { IThrowBall } from './throwBall';

export interface IInitialState {
  pokemonList: IPokemonsState;
  pokemonDetail: PokemonDetailState;
  throwBall: IThrowBall;
}
