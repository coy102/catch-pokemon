import { IPokemonsState } from './pokemonList';
import { PokemonDetailState } from './pokemonDetail';
import { IThrowBall } from './throwBall';
import { IOwnedPokemonState } from './ownedPokemon';

export interface IInitialState {
  pokemonList: IPokemonsState;
  pokemonDetail: PokemonDetailState;
  throwBall: IThrowBall;
  ownedPokemons: IOwnedPokemonState;
}
