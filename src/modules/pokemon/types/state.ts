import { IPokemonsState } from './pokemonList';
import { PokemonDetailState } from './pokemonDetail';

export interface IInitialState {
  pokemonList: IPokemonsState;
  pokemonDetail: PokemonDetailState;
}
