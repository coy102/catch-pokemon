import { AxiosResponse } from 'axios';
import { IDetailPokemon } from './pokemon';
import { IPokemonSpecies } from './species';
import { IEvolutionChain } from './evolutionChain';
import { IElementTypes } from './elementTypes';

export type IPokemonDetailResponse = AxiosResponse<IDetailPokemon>;
export type IPokemonSpeciesResponse = AxiosResponse<IPokemonSpecies>;
export type IEvolutionsResponse = AxiosResponse<IEvolutionChain>;

export interface PokemonDetailState {
  isFetching: boolean;
  message: string;
  pokemon?: IPokemon;
}

export interface IPokemon {
  detail?: IDetailPokemon;
  species?: IPokemonSpecies;
  evolutions?: IEvolutionChain;
  elementType?: IElementTypes;
}
