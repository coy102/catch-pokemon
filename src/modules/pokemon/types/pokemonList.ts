import { AxiosResponse } from 'axios';

export interface IPokemons {
  name: string;
  url: string;
}

export interface IPokemonsResult {
  results?: Array<IPokemons>;
}

export interface IPokemonsState extends IPokemonsResult {
  isFetching: boolean;
  currentOffset: number;
  message: string;
  pokemons: Array<IPokemons>;
  newPokemons: Array<IPokemons>;
}

export type IPokemonResponse = AxiosResponse<IPokemonsResult>;
