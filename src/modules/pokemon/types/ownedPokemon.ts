import { Sprites, Type } from './pokemonDetail/pokemon';

interface IOwneds {
  id: string;
  name?: string;
  dateCatch?: string;
}

export interface IOwnedPokemonStorage {
  id: number;
  name?: string;
  sprites?: Sprites;
  types?: Array<Type>;
  owneds?: Array<IOwneds>;
}

export interface ICheckedState {
  pokemonId: number;
  ownsId: Array<any>;
}

export interface IOwnedPokemonState {
  isFetching: boolean;
  isPosting: boolean;
  isOpenDialog: boolean;
  errorMessage: '';
  pokemons: Array<IOwnedPokemonStorage>;
}
