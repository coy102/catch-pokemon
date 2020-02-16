import { Sprites, Type } from './pokemonDetail/pokemon';

export interface ICaugthPokemon {
  id?: number;
  name?: string;
  sprites?: Sprites;
  types?: Array<Type>;
}

export interface IThrowBall {
  isCaught: boolean;
  isThrowing: boolean;
  caughtPokemon?: ICaugthPokemon;
}
